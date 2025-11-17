# Product API Architecture Diagrams

## Generated Diagrams

### 1. Basic Architecture Diagram
**File:** `product-api-architecture.png`
**Location:** `/home/pandson/echo-architect-artifacts/product-api-111720251526/generated-diagrams/generated-diagrams/product-api-architecture.png`

This diagram shows the core three-tier architecture:
- **Client Layer:** Web client making API requests
- **API Layer:** AWS API Gateway handling REST endpoints (/products, /products/{id})
- **Business Logic Layer:** Two Lambda functions (getProducts, getProductById)
- **Data Layer:** DynamoDB table for product storage
- **Monitoring:** CloudWatch for logs and metrics

### 2. Detailed Architecture Diagram
**File:** `product-api-detailed-architecture.png`
**Location:** `/home/pandson/echo-architect-artifacts/product-api-111720251526/generated-diagrams/generated-diagrams/product-api-detailed-architecture.png`

This comprehensive diagram includes:
- **Security Layer:** IAM roles for Lambda execution permissions
- **API Layer:** API Gateway with CORS configuration
- **Compute Layer:** Lambda functions with Node.js 18.x runtime
- **Data Layer:** DynamoDB with productId as primary key
- **Infrastructure:** AWS CDK for infrastructure as code deployment
- **Monitoring:** Separate CloudWatch Logs and Metrics components

## Architecture Components

### API Gateway
- REST API endpoints
- CORS enabled for web clients
- Request/response transformation
- Built-in DDoS protection

### Lambda Functions
- **getProducts:** Retrieves all products with pagination support
- **getProductById:** Retrieves specific product by ID
- Node.js 18.x runtime
- Standardized error handling

### DynamoDB
- NoSQL database for product storage
- Primary key: productId (String)
- On-demand billing mode
- Encryption at rest enabled

### Security
- IAM roles with least privilege access
- Lambda execution permissions for DynamoDB access
- API Gateway built-in security features

### Infrastructure as Code
- AWS CDK TypeScript application
- Automated deployment and configuration
- Version-controlled infrastructure

### Monitoring
- CloudWatch Logs for Lambda execution logs
- CloudWatch Metrics for performance monitoring
- Structured error logging for debugging

## Data Model
Products stored with the following structure:
- productId (Primary Key)
- name, category, brand, description
- price (number)
- specifications (flexible JSON object)

## API Endpoints
- `GET /products` - Retrieve all products
- `GET /products/{id}` - Retrieve specific product by ID

Both diagrams accurately represent the serverless, scalable architecture described in the technical design document.
