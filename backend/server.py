
import requests
from huggingface_hub import InferenceClient
from flask_cors import CORS

from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore


app = Flask(__name__)
CORS(app)
@app.route("/")
def memb():
    return {"deafult11111":["deafu", "Members2", "Members3"]}




base_url = "https://favqs.com/api/qotd"

def get_quote():
    url = base_url
    response = requests.get(url)
   
    if(response.status_code == 200):
        quote_data = response.json()
        return quote_data
    
    else:
        print("failed to retrieve data ",response)



#members api route
@app.route("/quote")
def quote():
    quote_data = get_quote()
    if quote_data:
        result = quote_data["quote"]["body"]
    return {"quote_data":[result, "Members2", "Members3"]}






# Initialize Firebase Admin SDK with the service account
cred = credentials.Certificate("dream-app-diary-firebase-adminsdk-opqku-89d6b60134.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

@app.route('/entries', methods=['GET'])
def get_entries():
    try:
        diary_entries_ref = db.collection('diary_entry')
        docs = diary_entries_ref.stream()
        entries = [
            {
                "id": doc.id,
                "content": doc.to_dict().get("content", ""),  # Default to empty string if missing
                "title": doc.to_dict().get("title", "Untitled"),  # Default title
                "date": doc.to_dict().get("date", firestore.SERVER_TIMESTAMP),
            }
            for doc in docs
        ]
        return jsonify(entries), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route to add a new diary entry
@app.route('/entries', methods=['POST'])
def add_entry():
    try:
        data = request.json
        title = data.get('title')
        content = data.get('content')
        date = data.get('date')

        # Validate request body
        if not title or not content or not date:
            return jsonify({"error": "Missing required fields"}), 400

        # Add new document to Firestore
        new_entry = {
            "title": title,
            "content": content,
            "date": firestore.SERVER_TIMESTAMP
        }
        doc_ref = db.collection('diary_entry').add(new_entry)
        return jsonify({"id": doc_ref[1].id, "message": "Entry added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to delete a diary entry
@app.route('/entries/<entry_id>', methods=['DELETE'])
def delete_entry(entry_id):
    try:
        doc_ref = db.collection('diary_entry').document(entry_id)
        doc_ref.delete()
        return jsonify({"message": f"Entry {entry_id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Start the Flask server
if __name__ == '__main__':
    app.run(debug=True)
