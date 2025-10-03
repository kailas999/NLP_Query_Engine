# NLP Query Engine for Employee Data

A natural language query system for an employee database that dynamically adapts to the actual schema and can handle both structured employee data and unstructured documents.

## Features

- Dynamic schema discovery from database connections
- Natural language query processing
- Document processing for unstructured data
- Web interface for data ingestion and querying
- Performance optimization with caching

## Project Structure

```
project/
├── backend/
│   ├── api/
│   │   └── routes/
│   │       ├── ingestion.py
│   │       ├── query.py
│   │       └── schema.py
│   ├── services/
│   │   ├── schema_discovery.py
│   │   ├── document_processor.py
│   │   └── query_engine.py
│   ├── models/
│   ├── main.py
│   ├── config.py
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
├── requirements.txt
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up your environment variables:
   Create a `.env` file in the backend directory with your API keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

6. Run the backend server:
   ```bash
   python main.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Data Ingestion
- `POST /api/ingest/database` - Connect to database and discover schema
- `POST /api/ingest/documents` - Upload documents (bulk upload supported)
- `GET /api/ingest/status` - Check ingestion progress

### Query Interface
- `POST /api/query` - Process natural language query
- `GET /api/query/history` - Get previous queries (for caching demo)
- `GET /api/schema` - Return current discovered schema for visualization

## Usage

1. Start the backend server (runs on port 8000 by default)
2. Start the frontend development server (runs on port 3000 by default)
3. Open your browser to http://localhost:3000
4. Enter a database connection string and click "Connect & Analyze"
5. Enter natural language queries to search your employee data

## Supported Database Types

- PostgreSQL
- MySQL
- SQLite

## Supported Document Types

- PDF (.pdf)
- Word Documents (.docx)
- Text files (.txt)
- CSV files (.csv)

## Configuration

The application can be configured through environment variables in the `.env` file:

- `GEMINI_API_KEY` - Your Gemini API key for natural language processing
- Database connection strings are provided through the UI

## Performance Features

- Query caching for repeated queries
- Connection pooling for database connections
- Batch processing for document embeddings
- Async operations for better concurrency
- Result pagination for large result sets