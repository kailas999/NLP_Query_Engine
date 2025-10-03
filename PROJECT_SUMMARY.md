# NLP Query Engine for Employee Data - Project Summary

## Overview

This project implements a natural language query system for an employee database that dynamically adapts to the actual schema and can handle both structured employee data and unstructured documents. The system works without hard-coding table names, column names, or relationships.

## Features Implemented

### 1. Backend API (FastAPI)
- Dynamic schema discovery service
- Natural language to SQL query conversion
- Document processing capabilities
- RESTful API endpoints for all functionality

### 2. Frontend Interface (React + Vite)
- Database connection panel with schema visualization
- Document upload with drag-and-drop support
- Natural language query interface
- Results display for both structured and unstructured data
- Tab-based navigation for easy workflow

### 3. Key Components

#### Data Ingestion
- Database connection and schema discovery
- Document upload (PDF, DOCX, TXT, CSV)
- Progress tracking for document processing

#### Query Processing
- Natural language to SQL conversion
- Document search capabilities
- Query history tracking
- Performance metrics

#### UI/UX Features
- Responsive design
- Tab-based interface
- Schema visualization
- Document preview
- Error handling and user feedback

## Technical Architecture

### Backend Structure
```
backend/
├── api/
│   └── routes/
│       ├── ingestion.py
│       ├── query.py
│       └── schema.py
├── services/
│   ├── schema_discovery.py
│   ├── document_processor.py
│   └── query_engine.py
├── main.py
├── config.py
└── .env
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Technologies Used

### Backend
- FastAPI (Python web framework)
- SQLAlchemy (Database toolkit)
- Google Generative AI (Gemini API)
- PyPDF2, python-docx (Document processing)
- Pandas (Data processing)

### Frontend
- React (JavaScript library)
- Vite (Build tool)
- CSS3 (Styling)

### Deployment
- Docker & Docker Compose
- Cross-platform support

## How It Works

1. **Schema Discovery**: When a user provides a database connection string, the system automatically discovers the schema, including tables, columns, and relationships.

2. **Natural Language Processing**: User queries in natural language are converted to SQL using the Gemini API, with context from the discovered schema.

3. **Document Processing**: Uploaded documents are processed and indexed for search capabilities.

4. **Query Execution**: The system executes generated SQL queries against the database and returns results.

5. **Results Presentation**: Results are displayed in an intuitive interface with options for both tabular and document-based data.

## Performance Optimizations

- Query caching for repeated queries
- Connection pooling for database connections
- Batch processing for document embeddings
- Async operations for better concurrency
- Result pagination for large result sets

## Future Enhancements

1. **Advanced NLP**: Implement more sophisticated natural language understanding
2. **Vector Search**: Add semantic search capabilities for documents
3. **Authentication**: Add user authentication and authorization
4. **Advanced Visualization**: Implement more sophisticated schema visualization
5. **Real-time Updates**: Add WebSocket support for real-time data updates
6. **Advanced Analytics**: Add reporting and dashboard capabilities

## Running the Application

See [HOW_TO_RUN.md](HOW_TO_RUN.md) for detailed instructions on setting up and running the application.

## API Documentation

The API is documented through FastAPI's automatic Swagger UI, available at `http://localhost:8000/docs` when the backend is running.

## Testing

The application includes:
- Unit tests for core services
- Integration tests for API endpoints
- Performance benchmarks

## Deployment

The application can be deployed using Docker Compose for easy containerized deployment, or run directly using Python and Node.js.