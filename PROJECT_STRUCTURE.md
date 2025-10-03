# Project Structure

```
d:\Ekam\
├── backend\
│   ├── api\
│   │   ├── __init__.py
│   │   └── routes\
│   │       ├── __init__.py
│   │       ├── ingestion.py
│   │       ├── query.py
│   │       └── schema.py
│   ├── services\
│   │   ├── __init__.py
│   │   ├── document_processor.py
│   │   ├── query_engine.py
│   │   └── schema_discovery.py
│   ├── __init__.py
│   ├── .env
│   ├── config.py
│   ├── Dockerfile
│   ├── main.py
│   └── venv\
├── frontend\
│   ├── src\
│   │   ├── components\
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── node_modules\
├── docker-compose.yml
├── HOW_TO_RUN.md
├── PROJECT_SUMMARY.md
├── README.md
├── requirements.txt
├── run.bat
├── setup.py
└── test_api.py
```

## Key Files

### Backend
- `main.py`: FastAPI application entry point
- `config.py`: Configuration settings
- `.env`: Environment variables (including API keys)
- `api/routes/`: API endpoint definitions
- `services/`: Business logic implementations

### Frontend
- `src/App.jsx`: Main React application component
- `src/App.css`: Application styling
- `vite.config.js`: Vite build configuration
- `index.html`: Main HTML template

### Project Management
- `README.md`: Project overview and setup instructions
- `HOW_TO_RUN.md`: Detailed running instructions
- `PROJECT_SUMMARY.md`: Technical summary
- `requirements.txt`: Python dependencies
- `docker-compose.yml`: Docker deployment configuration
- `setup.py`: Setup and management script
- `run.bat`: Windows batch script to start both servers
- `test_api.py`: API testing script

## Development Workflow

1. Backend development: Modify files in `backend/`
2. Frontend development: Modify files in `frontend/src/`
3. Testing: Run `python test_api.py` to test backend APIs
4. Running: Use `run.bat` to start both servers on Windows