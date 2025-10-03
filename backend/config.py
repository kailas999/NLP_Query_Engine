import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Database configuration
    DATABASE_POOL_SIZE = 10
    
    # Embeddings configuration
    EMBEDDINGS_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
    EMBEDDINGS_BATCH_SIZE = 32
    
    # Cache configuration
    CACHE_TTL_SECONDS = 300
    CACHE_MAX_SIZE = 1000
    
    # API Keys
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    
    # Server configuration
    HOST = "0.0.0.0"
    PORT = 8000