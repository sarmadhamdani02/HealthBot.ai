from flask import Flask, request, jsonify
from flask_cors import CORS
from connect_memory_with_llm import qa_chain, symptom_chain
import json
import asyncio
from doctor_scrapper import OladocScraper

app = Flask(__name__)
CORS(app)

def run_async(func, *args, **kwargs): #helper funciton for running async
    return asyncio.run(func(*args, **kwargs))

@app.route("/healthbot_chat", methods=["POST"])
def health_bot_chat():
    try:
        # Get and validate input
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON received"}), 400
        
        user_query = data.get("query") or data.get("input")
        if not user_query:
            return jsonify({"error": "No query provided"}), 400

        # Process symptoms
        symptom_response = symptom_chain.invoke({"input": user_query})
        try:
            symptom_data = json.loads(symptom_response)
            print("Raw Symptom Response:", symptom_response)  # Debug log
        except json.JSONDecodeError:
            symptom_data = {"symptoms": [], "doctorTypeNeeded": "General Physician"}

        # Get main response
        qa_response = qa_chain({"question": user_query})

        return jsonify({
            "answer": qa_response.get("answer", str(qa_response)),
            "symptoms": symptom_data.get("symptoms", []),
            "doctor": symptom_data.get("doctorTypeNeeded", "General Physician")
        })

    except Exception as e:
        return jsonify({
            "error": str(e),
            "details": "Server error occurred"
        }), 500

@app.route('/scrape', methods=['POST'])
def scrape_doctors():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON received"}), 400

    city = data.get('city')
    doctor = data.get('doctor')

    if not city or not doctor:
        return jsonify({"error": "Please provide both 'city' and 'doctor' in the JSON body."}), 400

    scraper = OladocScraper(city, doctor)
    try:
        doctors = run_async(scraper.scrape)
        return jsonify(doctors)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)