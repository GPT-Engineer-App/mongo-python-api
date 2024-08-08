from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_cors import CORS
import requests
from config import Config
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Load configuration
app.config.from_object(Config)

# GoPhish API configuration
GOPHISH_API_URL = app.config['GOPHISH_API_URL']
GOPHISH_API_KEY = app.config['GOPHISH_API_KEY']

# MongoDB configuration
client = MongoClient(app.config['MONGO_URI'])
db = client[app.config['MONGO_DB']]
collection = db[app.config['MONGO_COLLECTION']]

# Error handling decorator
def handle_errors(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except requests.RequestException as e:
            app.logger.error(f"API request error: {str(e)}")
            return jsonify({"error": "An error occurred while processing your request"}), 500
        except Exception as e:
            app.logger.error(f"Unexpected error: {str(e)}")
            return jsonify({"error": "An unexpected error occurred"}), 500
    return wrapper

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/campaigns')
@handle_errors
def get_campaigns():
    response = requests.get(
        f"{GOPHISH_API_URL}/campaigns/",
        headers={'Authorization': GOPHISH_API_KEY}
    )
    response.raise_for_status()
    campaigns = response.json()
    return jsonify(campaigns)

@app.route('/api/campaigns/<int:id>')
@handle_errors
def get_campaign_details(id):
    response = requests.get(
        f"{GOPHISH_API_URL}/campaigns/{id}",
        headers={'Authorization': GOPHISH_API_KEY}
    )
    response.raise_for_status()
    campaign = response.json()
    return jsonify(campaign)

@app.route('/api/campaigns', methods=['POST'])
@handle_errors
def create_campaign():
    campaign_data = request.json
    response = requests.post(
        f"{GOPHISH_API_URL}/campaigns/",
        headers={'Authorization': GOPHISH_API_KEY},
        json=campaign_data
    )
    response.raise_for_status()
    return jsonify(response.json()), 201

@app.route('/campaigns')
def campaigns():
    campaigns = requests.get(
        f"{GOPHISH_API_URL}/campaigns/",
        headers={'Authorization': GOPHISH_API_KEY}
    ).json()
    return render_template('campaigns.html', campaigns=campaigns)

@app.route('/campaign/<int:id>')
def campaign_details(id):
    campaign = requests.get(
        f"{GOPHISH_API_URL}/campaigns/{id}",
        headers={'Authorization': GOPHISH_API_KEY}
    ).json()
    return render_template('campaign_details.html', campaign=campaign)

@app.route('/create_campaign', methods=['GET', 'POST'])
def create_campaign_form():
    if request.method == 'POST':
        campaign_data = request.form.to_dict()
        response = requests.post(
            f"{GOPHISH_API_URL}/campaigns/",
            headers={'Authorization': GOPHISH_API_KEY},
            json=campaign_data
        )
        if response.status_code == 201:
            return redirect(url_for('campaigns'))
        else:
            return render_template('create_campaign.html', error="Failed to create campaign")
    return render_template('create_campaign.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
