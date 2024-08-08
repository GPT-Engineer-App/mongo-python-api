from flask import Flask, render_template, request, jsonify, redirect, url_for
from pymongo import MongoClient
import os
import requests

app = Flask(__name__)

# Load MongoDB configuration from environment variables
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
MONGO_DB = os.getenv('MONGO_DB', 'mydatabase')
MONGO_COLLECTION = os.getenv('MONGO_COLLECTION', 'mycollection')

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
collection = db[MONGO_COLLECTION]

# GoPhish API configuration
GOPHISH_API_URL = os.getenv('GOPHISH_API_URL', 'http://localhost:3333')
GOPHISH_API_KEY = os.getenv('GOPHISH_API_KEY', 'your-api-key')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/campaigns')
def campaigns():
    try:
        response = requests.get(
            f"{GOPHISH_API_URL}/api/campaigns/",
            headers={
                'Authorization': f'Bearer {GOPHISH_API_KEY}',
                'Content-Type': 'application/json',
            }
        )
        response.raise_for_status()
        campaigns = response.json()
        return render_template('campaigns.html', campaigns=campaigns)
    except requests.RequestException as e:
        return render_template('error.html', error=str(e))

@app.route('/campaign/<int:id>')
def campaign_details(id):
    try:
        response = requests.get(
            f"{GOPHISH_API_URL}/api/campaigns/{id}",
            headers={
                'Authorization': f'Bearer {GOPHISH_API_KEY}',
                'Content-Type': 'application/json',
            }
        )
        response.raise_for_status()
        campaign = response.json()
        return render_template('campaign_details.html', campaign=campaign)
    except requests.RequestException as e:
        return render_template('error.html', error=str(e))

@app.route('/create', methods=['GET', 'POST'])
def create_document():
    if request.method == 'POST':
        data = request.form.to_dict()
        result = collection.insert_one(data)
        return redirect(url_for('index'))
    return render_template('create_document.html')

@app.route('/read/<id>')
def read_document(id):
    document = collection.find_one({'_id': id})
    if document:
        return render_template('document_details.html', document=document)
    else:
        return render_template('error.html', error='Document not found')

@app.route('/update/<id>', methods=['GET', 'POST'])
def update_document(id):
    document = collection.find_one({'_id': id})
    if request.method == 'POST':
        data = request.form.to_dict()
        result = collection.update_one({'_id': id}, {'$set': data})
        return redirect(url_for('index'))
    return render_template('update_document.html', document=document)

@app.route('/delete/<id>')
def delete_document(id):
    result = collection.delete_one({'_id': id})
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
