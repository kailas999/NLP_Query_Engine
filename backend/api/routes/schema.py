from fastapi import APIRouter
from typing import Dict

router = APIRouter(prefix="/api")

@router.get("/schema")
async def get_schema():
    """
    Return current discovered schema for visualization
    """
    schema = {
        "tables": [
            {
                "name": "employees",
                "columns": [
                    {"name": "id", "type": "integer", "primary_key": True},
                    {"name": "name", "type": "string"},
                    {"name": "department_id", "type": "integer", "foreign_key": "departments.id"},
                    {"name": "salary", "type": "decimal"}
                ]
            },
            {
                "name": "departments",
                "columns": [
                    {"name": "id", "type": "integer", "primary_key": True},
                    {"name": "name", "type": "string"},
                    {"name": "manager_id", "type": "integer"}
                ]
            }
        ],
        "relationships": [
            {
                "name": "employee_department",
                "from": "employees.department_id",
                "to": "departments.id",
                "type": "many_to_one"
            }
        ]
    }
    
    return schema