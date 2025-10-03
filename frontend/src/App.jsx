import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [connectionString, setConnectionString] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [schema, setSchema] = useState(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [documents, setDocuments] = useState([])
  const [documentResults, setDocumentResults] = useState(null)
  const [activeTab, setActiveTab] = useState('connect')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [notification, setNotification] = useState(null)

  // Load saved connection string from localStorage
  useEffect(() => {
    const savedConnectionString = localStorage.getItem('connectionString')
    if (savedConnectionString) {
      setConnectionString(savedConnectionString)
    }
  }, [])

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Simulate progress for loading states
  const simulateProgress = (message, duration = 2000) => {
    setLoadingMessage(message)
    setIsLoading(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, duration / 10)
    
    return interval
  }

  const handleConnect = async () => {
    if (!connectionString.trim()) {
      showNotification('Please enter a connection string', 'error')
      return
    }

    const progressInterval = simulateProgress('Connecting to database...', 3000)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const response = await fetch('/api/ingest/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `connection_string=${encodeURIComponent(connectionString)}`
      })
      
      const data = await response.json()
      if (data.schema) {
        setIsConnected(true)
        setSchema(data.schema)
        localStorage.setItem('connectionString', connectionString)
        showNotification('Database connected successfully!')
        setActiveTab('query')
      } else {
        showNotification('Connection failed. Please check your connection string.', 'error')
      }
    } catch (error) {
      console.error('Connection failed:', error)
      showNotification('Connection failed. Please try again.', 'error')
    } finally {
      clearInterval(progressInterval)
      setIsLoading(false)
      setProgress(0)
      setLoadingMessage('')
    }
  }

  const handleQuery = async () => {
    if (!query.trim()) {
      showNotification('Please enter a query', 'error')
      return
    }

    const progressInterval = simulateProgress('Processing your natural language query...', 2500)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `query=${encodeURIComponent(query)}`
      })
      
      const data = await response.json()
      setResults(data)
      showNotification('Query executed successfully!')
    } catch (error) {
      console.error('Query failed:', error)
      showNotification('Query failed. Please try again.', 'error')
    } finally {
      clearInterval(progressInterval)
      setIsLoading(false)
      setProgress(0)
      setLoadingMessage('')
    }
  }

  const handleDocumentUpload = async (event) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    const progressInterval = simulateProgress(`Uploading ${files.length} document(s)...`, 4000)
    
    // Simulate upload progress
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    try {
      const formData = new FormData()
      
      files.forEach((file) => {
        formData.append('files', file)
      })
      
      const response = await fetch('/api/ingest/documents', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      setDocuments(prev => [...prev, ...data.files])
      showNotification(`${files.length} document(s) uploaded successfully!`)
    } catch (error) {
      console.error('Document upload failed:', error)
      showNotification('Document upload failed. Please try again.', 'error')
    } finally {
      clearInterval(progressInterval)
      setIsLoading(false)
      setProgress(0)
      setLoadingMessage('')
    }
  }

  const handleDocumentQuery = async () => {
    if (!query.trim()) {
      showNotification('Please enter a query', 'error')
      return
    }

    const progressInterval = simulateProgress('Searching documents...', 2000)
    
    // Simulate search progress
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      // For demo purposes, we'll just show a mock result
      setDocumentResults({
        query: query,
        documents: [
          { id: 1, title: "Employee Resume - John Doe", content: "Experienced Python developer with 5 years of experience in web development and data analysis...", score: 0.95 },
          { id: 2, title: "Performance Review - Jane Smith", content: "Outstanding performance in Python projects and team collaboration. Exceeded quarterly targets...", score: 0.87 },
          { id: 3, title: "Project Report - AI Implementation", content: "Detailed analysis of machine learning models applied to employee productivity metrics...", score: 0.78 }
        ]
      })
      showNotification('Document search completed!')
    } catch (error) {
      console.error('Document search failed:', error)
      showNotification('Document search failed. Please try again.', 'error')
    } finally {
      clearInterval(progressInterval)
      setIsLoading(false)
      setProgress(0)
      setLoadingMessage('')
    }
  }

  // Dynamic Schema Visualization Component
  const SchemaVisualization = ({ schema }) => {
    if (!schema || !schema.tables || schema.tables.length === 0) return null

    return (
      <div className="schema-graph">
        {schema.tables.map((table, index) => (
          <div key={table.name} className="table-node" style={{ animationDelay: `${index * 0.2}s` }}>
            <h3>{table.name}</h3>
            <ul>
              {table.columns.map((col, colIndex) => (
                <li key={colIndex}>
                  <span className="column-name">{col.name}</span>
                  <span className="column-type">{col.type}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {schema.relationships && schema.relationships.length > 0 && (
          <div className="relationship">⇄</div>
        )}
      </div>
    )
  }

  // Enhanced Results Display Component
  const ResultsDisplay = ({ results }) => {
    if (!results) return null;

    return (
      <div className="results-display">
        <div className="results-header">
          <h3>📊 Query Results</h3>
          <div className="result-actions">
            <button className="icon-button">📋 Copy</button>
            <button className="icon-button">💾 Save</button>
            <button className="icon-button">📤 Export</button>
          </div>
        </div>
        
        <div className="query-summary">
          <div className="summary-item">
            <span className="summary-label">Query:</span>
            <span className="summary-value">{results.original_query}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">SQL Generated:</span>
            <span className="summary-value sql-query">{results.sql_query}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Query Type:</span>
            <span className="summary-value type-{results.query_type}">{results.query_type}</span>
          </div>
        </div>
        
        <div className="result-content">
          <div className="result-stats">
            <div className="stat-card">
              <div className="stat-value">✅</div>
              <div className="stat-label">Status</div>
              <div className="stat-desc">Query Successful</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{results.performance_metrics?.execution_time || 'N/A'}ms</div>
              <div className="stat-label">Execution Time</div>
              <div className="stat-desc">Database Response</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">📊</div>
              <div className="stat-label">Result Type</div>
              <div className="stat-desc">Tabular Data</div>
            </div>
          </div>
          
          <div className="result-preview">
            <h4>Preview (Sample Data)</h4>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Engineering</td>
                    <td>$85,000</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>Marketing</td>
                    <td>$72,000</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Robert Johnson</td>
                    <td>Sales</td>
                    <td>$68,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Document Results Component
  const DocumentResultsDisplay = ({ documentResults }) => {
    if (!documentResults) return null;

    return (
      <div className="document-results-display">
        <div className="results-header">
          <h3>📄 Document Search Results</h3>
          <div className="result-actions">
            <span className="result-count">{documentResults.documents.length} documents found</span>
          </div>
        </div>
        
        <div className="query-summary">
          <div className="summary-item">
            <span className="summary-label">Search Query:</span>
            <span className="summary-value">{documentResults.query}</span>
          </div>
        </div>
        
        <div className="document-results">
          {documentResults.documents.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="document-header">
                <h4>{doc.title}</h4>
                <div className="document-meta">
                  <span className="document-type">PDF</span>
                  <span className="document-size">2.4 MB</span>
                </div>
              </div>
              <p>{doc.content}</p>
              <div className="document-footer">
                <div className="score">Relevance: {(doc.score * 100).toFixed(1)}%</div>
                <div className="document-actions">
                  <button className="icon-button small">👁️ View</button>
                  <button className="icon-button small">⬇️ Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Progress Bar Component
  const ProgressBar = ({ progress }) => (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="progress-text">{progress}%</div>
    </div>
  );

  // Loading Spinner Component with Progress
  const LoadingSpinner = () => (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{loadingMessage}</p>
      <ProgressBar progress={progress} />
      <p className="loading-tip">💡 Tip: Try queries like "Show me all employees in the engineering department"</p>
    </div>
  )

  // Notification Component
  const Notification = ({ notification }) => {
    if (!notification) return null

    return (
      <div className={`notification ${notification.type}`}>
        <p>{notification.message}</p>
      </div>
    )
  }

  return (
    <div className="App">
      {/* Notification */}
      <Notification notification={notification} />
      
      <header className="App-header">
        <h1>NLP Query Engine For Employee Data</h1>
        <p>Transform natural language into powerful database queries and document searches</p>
      </header>
      
      <main>
        {/* Tab Navigation */}
        <div className="tabs">
          <button 
            className={activeTab === 'connect' ? 'active' : ''}
            onClick={() => setActiveTab('connect')}
          >
            Connect Data
          </button>
          <button 
            className={activeTab === 'query' ? 'active' : ''}
            onClick={() => setActiveTab('query')}
            disabled={!isConnected}
          >
            Query Data
          </button>
        </div>
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <LoadingSpinner />
          </div>
        )}
        
        {/* Connect Data Tab */}
        {activeTab === 'connect' && (
          <div className="tab-content">
            <section className="connection-panel">
              <h2>🔌 Database Connection</h2>
              <div className="input-group">
                <input
                  type="text"
                  value={connectionString}
                  onChange={(e) => setConnectionString(e.target.value)}
                  placeholder="Enter database connection string (e.g., postgresql://user:pass@localhost/company_db)"
                  disabled={isConnected}
                />
                <button onClick={handleConnect} disabled={isConnected || isLoading}>
                  {isConnected ? '✅ Connected' : 'Connect & Analyze'}
                </button>
              </div>
              
              {schema && (
                <div className="schema-display">
                  <h3>📊 Discovered Schema</h3>
                  <div className="schema-info">
                    <p>Tables: {schema.tables.length}</p>
                    <p>Relationships: {schema.relationships?.length || 0}</p>
                  </div>
                  <details>
                    <summary>View Schema Details</summary>
                    <pre>{JSON.stringify(schema, null, 2)}</pre>
                  </details>
                </div>
              )}
            </section>
            
            <section className="document-panel">
              <h2>📁 Document Upload</h2>
              <div className="upload-area">
                <label className="file-upload-label">
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleDocumentUpload}
                    accept=".pdf,.docx,.txt,.csv"
                    disabled={isLoading}
                  />
                  <div className="upload-prompt">
                    <p>⬆️ Drag & drop files here or click to browse</p>
                    <p className="file-types">Supports PDF, DOCX, TXT, CSV</p>
                  </div>
                </label>
              </div>
              
              {documents.length > 0 && (
                <div className="uploaded-documents">
                  <h3>📄 Uploaded Documents ({documents.length})</h3>
                  <ul>
                    {documents.map((doc, index) => (
                      <li key={index}>
                        <span className="filename">{doc.filename}</span>
                        <span className="filetype">({doc.content_type})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>
        )}
        
        {/* Query Data Tab */}
        {activeTab === 'query' && isConnected && (
          <div className="tab-content">
            <section className="query-panel">
              <h2>🔍 Query Interface</h2>
              <div className="input-group">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your natural language query (e.g., 'Show me all Python developers')"
                />
                <button onClick={handleQuery} disabled={isLoading}>Query Database</button>
                <button onClick={handleDocumentQuery} disabled={isLoading}>Search Documents</button>
              </div>
              
              {results && <ResultsDisplay results={results} />}
              {documentResults && <DocumentResultsDisplay documentResults={documentResults} />}
            </section>
            
            <section className="schema-visualization">
              <h2>📈 Schema Visualization</h2>
              {schema ? (
                <SchemaVisualization schema={schema} />
              ) : (
                <p>No schema data available. Please connect to a database first.</p>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default App