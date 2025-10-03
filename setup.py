# Setup script for the NLP Query Engine

import os
import sys
import subprocess
import platform

def setup_backend():
    """Setup the backend environment"""
    print("Setting up backend environment...")
    
    # Check if we're in the correct directory
    if not os.path.exists("backend") or not os.path.exists("requirements.txt"):
        print("Error: Please run this script from the project root directory")
        return False
    
    try:
        # Install backend dependencies
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                       check=True)
        print("Backend setup complete!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error installing backend dependencies: {e}")
        return False

def setup_frontend():
    """Setup the frontend environment"""
    print("Setting up frontend environment...")
    
    # Check if we're in the correct directory
    if not os.path.exists("frontend") or not os.path.exists("frontend/package.json"):
        print("Error: Please run this script from the project root directory")
        return False
    
    try:
        # Install frontend dependencies
        result = subprocess.run(["npm", "install"], cwd="frontend", check=True)
        print("Frontend setup complete!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error installing frontend dependencies: {e}")
        return False
    except FileNotFoundError:
        print("Error: npm not found. Please install Node.js and npm.")
        return False

def run_backend():
    """Run the backend server"""
    print("Starting backend server...")
    
    # Check if we're in the correct directory
    if not os.path.exists("backend/main.py"):
        print("Error: Please run this script from the project root directory")
        return
    
    try:
        subprocess.run([sys.executable, "backend/main.py"])
    except KeyboardInterrupt:
        print("\nBackend server stopped.")
    except Exception as e:
        print(f"Error running backend server: {e}")

def run_frontend():
    """Run the frontend development server"""
    print("Starting frontend development server...")
    
    # Check if we're in the correct directory
    if not os.path.exists("frontend"):
        print("Error: Please run this script from the project root directory")
        return
    
    try:
        subprocess.run(["npm", "run", "dev"], cwd="frontend")
    except KeyboardInterrupt:
        print("\nFrontend server stopped.")
    except Exception as e:
        print(f"Error running frontend server: {e}")

def run_tests():
    """Run API tests"""
    print("Running API tests...")
    
    try:
        subprocess.run([sys.executable, "test_api.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Tests failed: {e}")
    except Exception as e:
        print(f"Error running tests: {e}")

def show_help():
    """Show help information"""
    print("""
NLP Query Engine Setup Script

Usage: python setup.py [command]

Commands:
  setup-backend     Install backend dependencies
  setup-frontend    Install frontend dependencies
  run-backend       Start the backend server
  run-frontend      Start the frontend development server
  test             Run API tests
  help             Show this help message

Examples:
  python setup.py setup-backend
  python setup.py run-frontend
    """)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        show_help()
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "setup-backend":
        setup_backend()
    elif command == "setup-frontend":
        setup_frontend()
    elif command == "run-backend":
        run_backend()
    elif command == "run-frontend":
        run_frontend()
    elif command == "test":
        run_tests()
    elif command == "help":
        show_help()
    else:
        print(f"Unknown command: {command}")
        show_help()
        sys.exit(1)