from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from config import Config

app = Flask(__name__)
CORS(app)

# Load configuration
app.config.from_object(Config)

# GoPhish API configuration
GOPHISH_API_URL = app.config['GOPHISH_API_URL']
GOPHISH_API_KEY = app.config['GOPHISH_API_KEY']

@app.route('/api/campaigns')
def get_campaigns():
    try:
        response = requests.get(
            f"{GOPHISH_API_URL}/campaigns/",
            headers={'Authorization': GOPHISH_API_KEY}
        )
        response.raise_for_status()
        campaigns = response.json()
        return jsonify(campaigns)
    except requests.RequestException as e:
        app.logger.error(f"Error fetching campaigns: {str(e)}")
        return jsonify({"error": "Unable to fetch campaigns. Please try again later."}), 500

@app.route('/api/campaigns/<int:id>')
def get_campaign_details(id):
    try:
        response = requests.get(
            f"{GOPHISH_API_URL}/campaigns/{id}",
            headers={'Authorization': GOPHISH_API_KEY}
        )
        response.raise_for_status()
        campaign = response.json()
        return jsonify(campaign)
    except requests.RequestException as e:
        app.logger.error(f"Error fetching campaign details for id {id}: {str(e)}")
        return jsonify({"error": "Unable to fetch campaign details. Please try again later."}), 500

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

@app.route('/api/campaigns', methods=['POST'])
def create_campaign():
    campaign_data = request.json
    try:
        response = requests.post(
            f"{GOPHISH_API_URL}/campaigns/",
            headers={'Authorization': GOPHISH_API_KEY},
            json=campaign_data
        )
        response.raise_for_status()
        return jsonify(response.json()), 201
    except requests.RequestException as e:
        app.logger.error(f"Error creating campaign: {str(e)}")
        return jsonify({"error": "Unable to create campaign. Please try again later."}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
