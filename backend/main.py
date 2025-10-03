import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from backend.api.routes import ingestion, query, schema

app = FastAPI(title="NLP Query Engine for Employee Data")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(ingestion.router)
app.include_router(query.router)
app.include_router(schema.router)

@app.get("/")
async def root():
    return {"message": "NLP Query Engine for Employee Data API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)