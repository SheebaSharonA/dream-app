from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize the Flask application and SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///diary.db'  # Database file path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the DiaryEntry model
class DiaryEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<DiaryEntry {self.title}>'

# Create the database tables
with app.app_context():
    db.create_all()

# Route to create a new diary entry
@app.route('/api/entries', methods=['POST'])
def create_entry():
    data = request.get_json()
    
    if not data or not data['date'] or not data['title'] or not data['content']:
        return jsonify({"error": "Missing data"}), 400

    new_entry = DiaryEntry(
        date=data['date'],
        title=data['title'],
        content=data['content']
    )
    db.session.add(new_entry)
    db.session.commit()

    return jsonify({
        "id": new_entry.id,
        "date": new_entry.date,
        "title": new_entry.title,
        "content": new_entry.content
    }), 201

# Route to get all diary entries
@app.route('/api/entries', methods=['GET'])
def get_entries():
    entries = DiaryEntry.query.all()
    entries_data = [{
        "id": entry.id,
        "date": entry.date,
        "title": entry.title,
        "content": entry.content
    } for entry in entries]
    
    return jsonify(entries_data), 200

# Route to get a single diary entry by id
@app.route('/api/entries/<int:id>', methods=['GET'])
def get_entry(id):
    entry = DiaryEntry.query.get_or_404(id)
    return jsonify({
        "id": entry.id,
        "date": entry.date,
        "title": entry.title,
        "content": entry.content
    }), 200

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
