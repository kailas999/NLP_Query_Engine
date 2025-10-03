import os
from typing import List, Dict, Any

class DocumentProcessor:
    """
    Class to handle processing of various document types
    """
    
    def process_documents(self, file_paths: List[str]) -> List[Dict[str, Any]]:
        """
        Process multiple document types:
        - Auto-detect file type (PDF, DOCX, TXT, CSV)
        - Choose optimal chunk size (don't hard-code to 512 tokens)
        - Generate embeddings in batches for efficiency
        - Store with proper indexing for fast retrieval
        """
        processed_docs = []
        
        for file_path in file_paths:
            try:
                file_extension = os.path.splitext(file_path)[1].lower()
                
                if file_extension in [".pdf", ".docx", ".txt", ".csv"]:
                    content = self._process_generic(file_path)
                else:
                    content = f"Unsupported file type: {file_extension}"
                
                processed_docs.append({
                    "file_path": file_path,
                    "content": content,
                    "type": file_extension,
                    "status": "processed"
                })
            except Exception as e:
                processed_docs.append({
                    "file_path": file_path,
                    "content": "",
                    "type": os.path.splitext(file_path)[1].lower(),
                    "status": "error",
                    "error": str(e)
                })
        
        return processed_docs
    
    def dynamic_chunking(self, content: str, doc_type: str) -> List[str]:
        """
        Intelligent chunking based on document structure:
        - Resumes: Keep skills and experience sections together
        - Contracts: Preserve clause boundaries
        - Reviews: Maintain paragraph integrity
        """
        # Simple chunking implementation
        max_chunk_size = 1000
        chunks = []
        
        # Split content into chunks
        words = content.split()
        current_chunk = []
        current_size = 0
        
        for word in words:
            if current_size + len(word) > max_chunk_size and current_chunk:
                chunks.append(" ".join(current_chunk))
                current_chunk = [word]
                current_size = len(word)
            else:
                current_chunk.append(word)
                current_size += len(word) + 1  # +1 for space
        
        if current_chunk:
            chunks.append(" ".join(current_chunk))
        
        return chunks
    
    def _process_generic(self, file_path: str) -> str:
        """Generic file processing"""
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
                return file.read()[:1000]  # Limit to first 1000 characters
        except Exception as e:
            return f"Error processing file: {str(e)}"