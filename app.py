from flask import Flask, render_template, request, jsonify, redirect, url_for
from pymongo import MongoClient
import os
import requests
from config import Config

app = Flask(__name__)

# Load configuration
app.config.from_object(Config)

# MongoDB setup
client = MongoClient(app.config['MONGO_URI'])
db = client[app.config['MONGO_DB']]
collection = db[app.config['MONGO_COLLECTION']]

# GoPhish API configuration
GOPHISH_API_URL = app.config['GOPHISH_API_URL']
GOPHISH_API_KEY = app.config['GOPHISH_API_KEY']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/campaigns')
def campaigns():
    try:
        response = requests.get(
            f"{GOPHISH_API_URL}/campaigns/",
            headers={'Authorization': GOPHISH_API_KEY}
        )
        response.raise_for_status()
        campaigns = response.json()
        return render_template('campaigns.html', campaigns=campaigns)
    except requests.RequestException as e:
        app.logger.error(f"Error fetching campaigns: {str(e)}")
        return render_template('error.html', error="Unable to fetch campaigns. Please try again later.")

@app.route('/campaign/<int:id>')
def campaign_details(id):
    try:
        response = requests.get(
            f"{GOPHISH_API_URL}/campaigns/{id}",
            headers={'Authorization': GOPHISH_API_KEY}
        )
        response.raise_for_status()
        campaign = response.json()
        return render_template('campaign_details.html', campaign=campaign)
    except requests.RequestException as e:
        app.logger.error(f"Error fetching campaign details for id {id}: {str(e)}")
        return render_template('error.html', error="Unable to fetch campaign details. Please try again later.")

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

@app.route('/create_campaign', methods=['GET', 'POST'])
def create_campaign():
    if request.method == 'POST':
        campaign_data = request.form.to_dict()
        try:
            response = requests.post(
                f"{GOPHISH_API_URL}/campaigns/",
                headers={'Authorization': GOPHISH_API_KEY},
                json=campaign_data
            )
            response.raise_for_status()
            return redirect(url_for('campaigns'))
        except requests.RequestException as e:
            app.logger.error(f"Error creating campaign: {str(e)}")
            return render_template('error.html', error="Unable to create campaign. Please try again later.")
    return render_template('create_campaign.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
