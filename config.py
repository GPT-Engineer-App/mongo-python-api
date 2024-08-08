import os

class Config:
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
    MONGO_DB = os.getenv('MONGO_DB', 'mydatabase')
    MONGO_COLLECTION = os.getenv('MONGO_COLLECTION', 'mycollection')
    GOPHISH_API_URL = os.getenv('GOPHISH_API_URL', 'https://safeurl.dk/api')
    GOPHISH_API_KEY = os.getenv('GOPHISH_API_KEY', '2956b7480392191b9ab24b159548719c305a8ad5ccf16ceb8f1d933d489228b0')
