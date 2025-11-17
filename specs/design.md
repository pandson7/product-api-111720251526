# Technical Design Document

## Architecture Overview

The Product API is a serverless REST API built on AWS using API Gateway, Lambda functions, and DynamoDB. The system follows a simple three-tier architecture optimized for scalability and cost-effectiveness.

## System Components

### API Layer
- **AWS API Gateway**: REST API endpoint management
- **CORS Configuration**: Enable cross-origin requests for web clients
- **Request/Response Transformation**: JSON formatting and validation

### Business Logic Layer
- **AWS Lambda Functions**: Node.js runtime for API handlers
- **Function Structure**:
  - `getProducts`: Retrieve all products with optional pagination
  - `getProductById`: Retrieve specific product by ID
- **Error Handling**: Standardized error responses with appropriate HTTP status codes

### Data Layer
- **Amazon DynamoDB**: NoSQL database for product storage
- **Table Schema**:
  - Primary Key: `productId` (String)
  - Attributes: `name`, `category`, `brand`, `description`, `price`, `specifications` (flexible JSON)
- **Sample Data**: Pre-populated with diverse product examples

## API Design

### Endpoints

#### GET /products
- **Purpose**: Retrieve all products
- **Response**: Array of product objects
- **Status Codes**: 200 (success), 500 (server error)

#### GET /products/{id}
- **Purpose**: Retrieve specific product
- **Parameters**: `id` - Product identifier
- **Response**: Single product object
- **Status Codes**: 200 (success), 404 (not found), 500 (server error)

### Response Format
```json
{
  "productId": "string",
  "name": "string",
  "category": "string", 
  "brand": "string",
  "description": "string",
  "price": "number",
  "specifications": {
    "flexible": "json object"
  }
}
```

## Infrastructure

### AWS CDK Stack
- **API Gateway**: REST API with Lambda integration
- **Lambda Functions**: Node.js 18.x runtime
- **DynamoDB Table**: On-demand billing mode
- **IAM Roles**: Least privilege access for Lambda to DynamoDB

### Deployment
- **CDK Application**: TypeScript-based infrastructure as code
- **Environment**: Single environment deployment
- **Region**: Configurable AWS region

## Data Model

### Product Entity
```json
{
  "productId": "PROD-001",
  "name": "Wireless Headphones",
  "category": "Electronics",
  "brand": "TechBrand",
  "description": "High-quality wireless headphones",
  "price": 199.99,
  "specifications": {
    "batteryLife": "30 hours",
    "connectivity": "Bluetooth 5.0",
    "weight": "250g"
  }
}
```

### Sample Data Categories
- Electronics (headphones, smartphones, laptops)
- Clothing (shirts, shoes, accessories)
- Home & Garden (furniture, tools, decor)

## Security Considerations
- **API Gateway**: Built-in DDoS protection
- **Lambda**: Isolated execution environment
- **DynamoDB**: Encryption at rest enabled
- **IAM**: Function-specific permissions

## Performance Optimization
- **DynamoDB**: On-demand scaling for variable workloads
- **Lambda**: Provisioned concurrency for consistent performance
- **API Gateway**: Built-in caching capabilities

## Monitoring and Logging
- **CloudWatch Logs**: Lambda function execution logs
- **CloudWatch Metrics**: API Gateway and Lambda performance metrics
- **Error Tracking**: Structured error logging for debugging
