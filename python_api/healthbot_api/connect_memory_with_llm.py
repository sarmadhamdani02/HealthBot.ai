import os
from dotenv import load_dotenv
from langchain.memory import ConversationBufferMemory
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from location_data import get_weather, get_news
from prompts import SYSTEM_PROMPT, SYMPTOM_EXTRACTION_PROMPT  # Import from our new prompts file
import random
import time

# Load environment variables
load_dotenv(override=True)

# API Key Management System
class APIKeyManager:
    def __init__(self):
        self.keys = [
            os.getenv("OPENROUTER_API_KEY1"),
            os.getenv("OPENROUTER_API_KEY2"),
            os.getenv("OPENROUTER_API_KEY3"),
            os.getenv("OPENROUTER_API_KEY4")
        ]
        self.keys = [key for key in self.keys if key]  # Filter out None values
        if not self.keys:
            raise ValueError("No API keys found in environment variables")
        
        self.current_key_index = 0
        self.key_status = {key: "active" for key in self.keys}
        self.last_failure_time = {}
        self.retry_delay = 60  # seconds to wait before retrying a failed key
    
    def get_current_key(self):
        return self.keys[self.current_key_index]
    
    def rotate_key(self):
        original_index = self.current_key_index
        while True:
            self.current_key_index = (self.current_key_index + 1) % len(self.keys)
            if self.key_status.get(self.get_current_key(), "active") == "active":
                return self.get_current_key()
            if self.current_key_index == original_index:
                # All keys are temporarily disabled, wait and reset
                time.sleep(self.retry_delay)
                self.reset_all_keys()
    
    def mark_key_failed(self, key):
        self.key_status[key] = "failed"
        self.last_failure_time[key] = time.time()
        self.rotate_key()
    
    def reset_all_keys(self):
        current_time = time.time()
        for key, status in self.key_status.items():
            if status == "failed" and (current_time - self.last_failure_time.get(key, 0)) > self.retry_delay:
                self.key_status[key] = "active"

# Initialize API Key Manager
api_key_manager = APIKeyManager()

# Initialize components
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

weather_info = get_weather() or "Weather data unavailable"
news_info = get_news() or "No recent health news"

# Load LLM with retry mechanism
def load_llm(max_retries=3):
    retry_count = 0
    last_error = None
    
    while retry_count < max_retries:
        current_key = api_key_manager.get_current_key()
        try:
            llm = ChatOpenAI(
                openai_api_base="https://openrouter.ai/api/v1",
                openai_api_key=current_key,
                model="mistralai/mistral-small-24b-instruct-2501:free",
                temperature=0.7,
                max_retries=1,
                timeout=30
            )
            # Test the connection with a small prompt
            llm.invoke("test")
            return llm
        except Exception as e:
            last_error = e
            print(f"Error with API key {current_key[-4:]}: {str(e)}")
            api_key_manager.mark_key_failed(current_key)
            retry_count += 1
            time.sleep(1)  # brief delay before retry
    
    raise Exception(f"All API keys failed after retries. Last error: {str(last_error)}")

# Load FAISS database
try:
    db = FAISS.load_local("vectorStore/db_faiss", embedding_model, allow_dangerous_deserialization=True)
    retriever = db.as_retriever(search_kwargs={'k': 3})
except Exception as e:
    print(f"Error loading FAISS: {e}")
    db = None
    retriever = None

# Create prompt templates using imported prompts
healthbot_prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT)
]).partial(
    weather_info=str(weather_info),
    news_info=str(news_info)
)

symptom_extraction_prompt = ChatPromptTemplate.from_template(SYMPTOM_EXTRACTION_PROMPT)

# Create chains
symptom_chain = (
    symptom_extraction_prompt
    | load_llm()
    | StrOutputParser()
)

# Main QA Chain with error handling
def create_qa_chain():
    try:
        return ConversationalRetrievalChain.from_llm(
            llm=load_llm(),
            retriever=retriever,
            memory=memory,
            combine_docs_chain_kwargs={"prompt": healthbot_prompt},
            verbose=True
        ) if retriever else None
    except Exception as e:
        print(f"Error creating QA chain: {e}")
        return None

qa_chain = create_qa_chain()

# For testing
if __name__ == "__main__":
    test_query = "I have headache and chest pain"
    print("QA Response:", qa_chain({"question": test_query}))
    print("Symptom Response:", symptom_chain.invoke({"input": test_query}))