from flask import Flask, request, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

# Load MongoDB configuration from environment variables
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
MONGO_DB = os.getenv('MONGO_DB', 'mydatabase')
MONGO_COLLECTION = os.getenv('MONGO_COLLECTION', 'mycollection')

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
collection = db[MONGO_COLLECTION]

@app.route('/create', methods=['POST'])
def create_document():
    data = request.json
    result = collection.insert_one(data)
    return jsonify({'inserted_id': str(result.inserted_id)}), 201

@app.route('/read/<id>', methods=['GET'])
def read_document(id):
    document = collection.find_one({'_id': id})
    if document:
        return jsonify(document), 200
    else:
        return jsonify({'error': 'Document not found'}), 404

@app.route('/update/<id>', methods=['PUT'])
def update_document(id):
    data = request.json
    result = collection.update_one({'_id': id}, {'$set': data})
    if result.matched_count:
        return jsonify({'message': 'Document updated'}), 200
    else:
        return jsonify({'error': 'Document not found'}), 404

@app.route('/delete/<id>', methods=['DELETE'])
def delete_document(id):
    result = collection.delete_one({'_id': id})
    if result.deleted_count:
        return jsonify({'message': 'Document deleted'}), 200
    else:
        return jsonify({'error': 'Document not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)