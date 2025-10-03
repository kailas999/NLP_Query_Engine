# How to Run the NLP Query Engine

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm (Node Package Manager)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the required dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```

3. Set up your environment variables:
   Create a `.env` file in the backend directory with your API keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the backend server:
   ```bash
   python main.py
   ```
   The backend will start on http://localhost:8000

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
   The frontend will start on http://localhost:3000

## Running with Docker (Alternative)

If you prefer to run the application using Docker:

1. Make sure Docker is installed on your system

2. Build and start the services:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Using the Application

1. Open your browser and go to http://localhost:3000

2. In the "Connect Data" tab:
   - Enter a database connection string (for demo purposes, you can enter any string)
   - Click "Connect & Analyze" to simulate schema discovery
   - Upload documents using the document upload area

3. Switch to the "Query Data" tab:
   - Enter natural language queries like:
     - "Show me all employees"
     - "List employees with their departments"
     - "Find employees with high salaries"
   - Click "Query Database" to execute the query
   - Click "Search Documents" to search in uploaded documents

## API Endpoints

### Data Ingestion
- `POST /api/ingest/database` - Connect to database and discover schema
- `POST /api/ingest/documents` - Upload documents (bulk upload supported)
- `GET /api/ingest/status` - Check ingestion progress

### Query Interface
- `POST /api/query` - Process natural language query
- `GET /api/query/history` - Get previous queries (for caching demo)
- `GET /api/schema` - Return current discovered schema for visualization

## Troubleshooting

### Common Issues

1. **Port already in use**: If you see an error about ports being in use, you can change the ports in the configuration:
   - Backend: Modify the port in `backend/main.py`
   - Frontend: Modify the port in `frontend/vite.config.js`

2. **Module not found errors**: Make sure all dependencies are installed:
   ```bash
   pip install -r requirements.txt
   cd frontend && npm install
   ```

3. **CORS errors**: The application is configured to allow all origins, but if you encounter CORS issues, check the FastAPI CORS middleware configuration in `backend/main.py`.

### Verifying the Setup

To verify that everything is working correctly:

1. Check that the backend is running:
   ```bash
   curl http://localhost:8000/
   ```
   You should receive a JSON response: `{"message": "NLP Query Engine for Employee Data API"}`

2. Check that the frontend is running:
   Open http://localhost:3000 in your browser. You should see the application interface.

## Development

### Backend Development

The backend is built with FastAPI and organized as follows:
- `main.py`: Entry point and application setup
- `api/routes/`: API endpoint definitions
- `services/`: Business logic implementations
- `models/`: Data models (to be implemented)

### Frontend Development

The frontend is built with React and Vite:
- `src/App.jsx`: Main application component
- `src/main.jsx`: Entry point
- `src/components/`: Reusable components (to be implemented)

### Adding New Features

1. Backend:
   - Add new routes in `api/routes/`
   - Implement business logic in `services/`
   - Add data models in `models/` if needed

2. Frontend:
   - Add new components in `src/components/`
   - Update `src/App.jsx` to include new functionality
   - Add new styles in CSS files as needed

## Testing

To run tests (when implemented):
```bash
# Backend tests
cd backend
python -m pytest tests/

# Frontend tests
cd frontend
npm test
```