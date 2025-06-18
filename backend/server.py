import requests
from huggingface_hub import InferenceClient
from flask_cors import CORS
from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Test route
@app.route("/")
def memb():
    logger.info("Accessed default route")
    return {"default": ["Member1", "Member2", "Member3"]}

# External API Base URL
base_url = "https://zenquotes.io/api/random"


def get_quote():
    url = base_url
    try:
        response = requests.get(url)
        logger.info(f"Fetching quote from {url}")
        if response.status_code == 200:
            quote_data = response.json()[0]
            logger.info("Successfully retrieved quote")
            return quote_data
        else:
            logger.error(f"Failed to retrieve quote: {response.status_code}, {response.text}")
            return None
    except Exception as e:
        logger.error(f"Error while fetching quote: {str(e)}")
        return None

# Members API route
@app.route("/quote")
def quote():
    logger.info("Accessed /quote route")
    quote_data = get_quote()
    if quote_data:
        result = quote_data["q"]
        logger.info("Returning fetched quote")
        return jsonify({"quote_data": [result, "Member2", "Member3"]})
    else:
        logger.warning("No quote data available")
        return jsonify({"error": "Failed to fetch quote"}), 500

# Firebase Admin SDK Initialization
try:
    cred = credentials.Certificate(".json")
    firebase_admin.initialize_app(cred)
    logger.info("Firebase Admin SDK initialized successfully")
except Exception as e:
    print(f"Error initializing Firebase Admin SDK: {str(e)}")

# Initialize Firestore
try:
    db = firestore.client()
    logger.info("Firestore client initialized successfully")
except Exception as e:
    print(f"Error initializing Firestore client: {str(e)}")

# Get diary entries
@app.route('/entries', methods=['GET'])
def get_entries():
    try:
        logger.info("Fetching diary entries from Firestore")
        diary_entries_ref = db.collection('diary_entry')
        docs = diary_entries_ref.stream()
        entries = [
            {
                "id": doc.id,
                "content": doc.to_dict().get("content", ""),
                "title": doc.to_dict().get("title", "Untitled"),
                "date": doc.to_dict().get("date", "No date specified"),
            }
            for doc in docs
        ]
        logger.info(f"Retrieved {len(entries)} entries")
        return jsonify(entries), 200
    except Exception as e:
        logger.error(f"Error fetching entries: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Add a new diary entry
@app.route('/entries', methods=['POST'])
def add_entry():
    try:
        logger.info("Adding new diary entry")
        data = request.json
        title = data.get('title')
        content = data.get('content')
        date = data.get('date')

        if not title or not content:
            logger.warning("Missing required fields in request body")
            return jsonify({"error": "Missing required fields"}), 400

        new_entry = {
            "title": title,
            "content": content,
            "date": firestore.SERVER_TIMESTAMP
        }
        doc_ref = db.collection('diary_entry').add(new_entry)
        logger.info(f"Entry added with ID: {doc_ref[1].id}")
        return jsonify({"id": doc_ref[1].id, "message": "Entry added successfully"}), 201
    except Exception as e:
        logger.error(f"Error adding entry: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Delete a diary entry
@app.route('/entries/<entry_id>', methods=['DELETE'])
def delete_entry(entry_id):
    try:
        logger.info(f"Attempting to delete entry with ID: {entry_id}")
        doc_ref = db.collection('diary_entry').document(entry_id)
        doc_ref.delete()
        logger.info(f"Entry {entry_id} deleted successfully")
        return jsonify({"message": f"Entry {entry_id} deleted successfully"}), 200
    except Exception as e:
        logger.error(f"Error deleting entry {entry_id}: {str(e)}")
        return jsonify({"error": str(e)}), 500



@app.route('/test-firestore')
def test_firestore():
    try:
        test_ref = db.collection('test').stream()
        return jsonify({"message": "Firestore is connected"}), 200
    except Exception as e:
        logger.error(f"Firestore test failed: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Start Flask server
if __name__ == '__main__':
    logger.info("Starting Flask server")
    app.run(debug=True)
