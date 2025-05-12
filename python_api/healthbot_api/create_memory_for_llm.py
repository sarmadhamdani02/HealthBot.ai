from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pathlib import Path
from tqdm import tqdm
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
import os
from dotenv import load_dotenv

load_dotenv()
HUGGINGFACE_TOKEN = os.getenv("HF_TOKEN")

# ✅ Load PDFs
data_path = "pdf_data/"

def load_pdf_files(data_path):
    pdf_files = list(Path(data_path).rglob("*.pdf"))
    documents = []

    for pdf_file in tqdm(pdf_files, desc="Loading PDFs", unit="file"):
        try:
            loader = PyPDFLoader(str(pdf_file))
            docs = loader.load()  # Try loading the PDF
            documents.extend(docs)
        except Exception as e:
            print(f"❌ Error loading {pdf_file}: {e}")  # Skip corrupt files but continue

    return documents

documents = load_pdf_files(data_path)
print(f"\n✅ Total documents loaded: {len(documents)}")

# ✅ Create text chunks
def create_chunks(data):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    text_chunks = text_splitter.split_documents(data)
    return text_chunks

text_chunks = create_chunks(documents)
print(f"Text Chunk Size= {len(text_chunks)}")

# ✅ Get embedding model
def get_embedding_model():
    try:
        embedding_model = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",  # ✅ Corrected Model Name
            model_kwargs={"token": HUGGINGFACE_TOKEN}  # ✅ Authentication
        )
        return embedding_model
    except Exception as e:
        print(f"❌ Error loading embedding model: {e}")
        return None

embedding_model = get_embedding_model()

if embedding_model is None:
    print("⚠️ Failed to load embedding model. Exiting...")
    exit(1)

# ✅ Store embeddings in FAISS DB
DB_FAISS_PATH = "vectorStore/db_faiss"

try:
    db = FAISS.from_documents(text_chunks, embedding_model)
    db.save_local(DB_FAISS_PATH)
    print(f"✅ Success! Embeddings saved in {DB_FAISS_PATH}")
except Exception as e:
    print(f"❌ Error saving embeddings: {e}")
