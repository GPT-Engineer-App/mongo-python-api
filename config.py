import os

class Config:
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
    MONGO_DB = os.getenv('MONGO_DB', 'mydatabase')
    MONGO_COLLECTION = os.getenv('MONGO_COLLECTION', 'mycollection')