cd backendimport requests
import time

def test_backend_api():
    """Test the backend API endpoints"""
    
    base_url = "http://localhost:8000"
    
    print("Testing NLP Query Engine API...")
    print("=" * 40)
    
    # Test the root endpoint
    try:
        response = requests.get(f"{base_url}/")
        print(f"Root endpoint test: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {response.json()}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Root endpoint test failed: {e}")
    
    print("-" * 40)
    
    # Test the schema endpoint
    try:
        response = requests.get(f"{base_url}/api/schema")
        print(f"Schema endpoint test: {response.status_code}")
        if response.status_code == 200:
            schema = response.json()
            print(f"Schema has {len(schema.get('tables', []))} tables")
            print(f"Schema has {len(schema.get('relationships', []))} relationships")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Schema endpoint test failed: {e}")
    
    print("-" * 40)
    
    # Test the ingestion database endpoint
    try:
        response = requests.post(
            f"{base_url}/api/ingest/database",
            data={"connection_string": "postgresql://test:test@localhost/test"}
        )
        print(f"Ingest database endpoint test: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Job ID: {data.get('job_id')}")
            print(f"Status: {data.get('status')}")
            if 'schema' in data:
                print(f"Schema discovered with {len(data['schema'].get('tables', []))} tables")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Ingest database endpoint test failed: {e}")
    
    print("-" * 40)
    
    # Test the query endpoint
    try:
        response = requests.post(
            f"{base_url}/api/query",
            data={"query": "Show me all employees"}
        )
        print(f"Query endpoint test: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Query ID: {data.get('query_id')}")
            print(f"SQL Query: {data.get('sql_query')}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Query endpoint test failed: {e}")

if __name__ == "__main__":
    test_backend_api()