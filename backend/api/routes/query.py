from fastapi import APIRouter, Form
from typing import List, Dict
import uuid
from datetime import datetime
from backend.services.query_engine import QueryEngine
from backend.services.schema_discovery import SchemaDiscovery

router = APIRouter(prefix="/api/query")

# In-memory storage for demo purposes (would use database in production)
query_history = []

# Initialize services
query_engine = QueryEngine()
schema_discovery = SchemaDiscovery()

@router.post("/")
@router.post("")  # Also accept POST requests without trailing slash
async def process_query(query: str = Form(...)):
    """
    Process natural language query
    """
    query_id = str(uuid.uuid4())
    
    # For demo purposes, we'll use a simple schema
    schema = {
        "tables": [
            {
                "name": "employees",
                "columns": [
                    {"name": "id", "type": "integer"},
                    {"name": "name", "type": "string"},
                    {"name": "department", "type": "string"},
                    {"name": "salary", "type": "decimal"}
                ]
            }
        ]
    }
    
    # Process the query using our query engine
    result = query_engine.process_query(query, schema)
    
    # Add to history
    query_history.append({
        "query_id": query_id,
        "query": query,
        "timestamp": datetime.now()
    })
    
    return {
        "query_id": query_id,
        "original_query": query,
        "sql_query": result.get("sql", ""),
        "query_type": result.get("query_type", "unknown"),
        "performance_metrics": result.get("performance_metrics", {}),
        "sources": result.get("sources", [])
    }

@router.get("/history")
@router.get("/history/")  # Also accept GET requests with trailing slash
async def get_query_history():
    """
    Get previous queries (for caching demo)
    """
    return {"history": query_history}