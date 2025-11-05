"""
Company Service - Business logic for company management
"""

from bson import ObjectId
from datetime import datetime
import logging
from typing import Dict, List, Any, Optional

from database.connection import get_db

logger = logging.getLogger(__name__)

class CompanyService:
    """Service class for company operations"""
    
    def __init__(self):
        self.db = get_db()
        self.companies_collection = self.db.companies
    
    def get_all_companies(self) -> List[Dict[str, Any]]:
        """Get all companies"""
        try:
            companies = list(self.companies_collection.find({}))
            for company in companies:
                company['_id'] = str(company['_id'])
            return companies
        except Exception as e:
            logger.error(f"Error getting all companies: {str(e)}")
            raise
    
    def get_company_by_id(self, company_id: str) -> Optional[Dict[str, Any]]:
        """Get company by ID"""
        try:
            if not ObjectId.is_valid(company_id):
                raise ValueError("Invalid company ID format")
            
            company = self.companies_collection.find_one({'_id': ObjectId(company_id)})
            if company:
                company['_id'] = str(company['_id'])
            return company
        except Exception as e:
            logger.error(f"Error getting company by ID: {str(e)}")
            raise
    
    def create_company(self, company_data: Dict[str, Any]) -> str:
        """Create a new company"""
        try:
            company_data['created_at'] = datetime.utcnow()
            company_data['updated_at'] = datetime.utcnow()
            
            result = self.companies_collection.insert_one(company_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating company: {str(e)}")
            raise
    
    def update_company(self, company_id: str, update_data: Dict[str, Any]) -> bool:
        """Update a company"""
        try:
            if not ObjectId.is_valid(company_id):
                raise ValueError("Invalid company ID format")
            
            update_data['updated_at'] = datetime.utcnow()
            
            result = self.companies_collection.update_one(
                {'_id': ObjectId(company_id)},
                {'$set': update_data}
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error updating company: {str(e)}")
            raise
    
    def delete_company(self, company_id: str) -> bool:
        """Delete a company"""
        try:
            if not ObjectId.is_valid(company_id):
                raise ValueError("Invalid company ID format")
            
            result = self.companies_collection.delete_one({'_id': ObjectId(company_id)})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting company: {str(e)}")
            raise
    
    def search_companies(self, query: str) -> List[Dict[str, Any]]:
        """Search companies by name or description"""
        try:
            search_query = {
                '$or': [
                    {'name': {'$regex': query, '$options': 'i'}},
                    {'description': {'$regex': query, '$options': 'i'}},
                    {'industry_sectors': {'$regex': query, '$options': 'i'}}
                ]
            }
            
            companies = list(self.companies_collection.find(search_query))
            for company in companies:
                company['_id'] = str(company['_id'])
            return companies
        except Exception as e:
            logger.error(f"Error searching companies: {str(e)}")
            raise
    
    def get_companies_by_industry(self, industry: str) -> List[Dict[str, Any]]:
        """Get companies by industry sector"""
        try:
            companies = list(self.companies_collection.find({
                'industry_sectors': {'$regex': industry, '$options': 'i'}
            }))
            for company in companies:
                company['_id'] = str(company['_id'])
            return companies
        except Exception as e:
            logger.error(f"Error getting companies by industry: {str(e)}")
            raise
