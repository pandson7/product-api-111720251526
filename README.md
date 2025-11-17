# Product API - AWS Serverless Solution

A complete AWS serverless Product API solution that provides RESTful endpoints for accessing product specifications stored in DynamoDB.

## 🚀 Features

- **Serverless Architecture**: Built with AWS Lambda, API Gateway, and DynamoDB
- **RESTful API**: Clean endpoints for product data access
- **Flexible Schema**: JSON-based product specifications
- **Auto-scaling**: DynamoDB with automatic capacity scaling
- **CORS Enabled**: Ready for web client integration
- **Sample Data**: Pre-populated with 8 diverse product examples

## 📋 API Endpoints

### Base URL
```
https://tb6yw51og1.execute-api.us-east-1.amazonaws.com/prod/
```

### Endpoints

#### GET /products
Retrieve all products from the database.

**Response:**
```json
[
  {
    "productId": "PROD-001",
    "name": "Wireless Bluetooth Headphones",
    "category": "Electronics",
    "brand": "AudioTech",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 199.99,
    "specifications": {
      "batteryLife": "30 hours",
      "connectivity": "Bluetooth 5.0",
      "noiseCancellation": true,
      "weight": "250g"
    }
  }
]
```

#### GET /products/{id}
Retrieve a specific product by ID.

**Parameters:**
- `id` (path): Product ID (e.g., PROD-001)

**Response:**
```json
{
  "productId": "PROD-001",
  "name": "Wireless Bluetooth Headphones",
  "category": "Electronics",
  "brand": "AudioTech",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 199.99,
  "specifications": {
    "batteryLife": "30 hours",
    "connectivity": "Bluetooth 5.0",
    "noiseCancellation": true,
    "weight": "250g"
  }
}
```

## 🏗️ Architecture

### Components
- **API Gateway**: REST API with CORS configuration
- **Lambda Functions**: Business logic for product operations
- **DynamoDB**: NoSQL database for product storage
- **IAM Roles**: Secure access control

### Infrastructure as Code
Built using AWS CDK (TypeScript) for reproducible deployments.

## 📦 Project Structure

```
product-api-111720251526/
├── infrastructure/          # AWS CDK Infrastructure
│   ├── lib/
│   │   └── infrastructure-stack.ts
│   ├── bin/
│   │   └── infrastructure.ts
│   ├── test/
│   │   └── infrastructure.test.ts
│   └── package.json
├── data/                   # Data Management
│   ├── seed-data.js       # Sample data seeding
│   └── package.json
├── specs/                 # Documentation
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
├── generated-diagrams/    # Architecture Diagrams
├── pricing/              # Cost Analysis
└── README.md
```

## 🛠️ Deployment

### Prerequisites
- AWS CLI configured
- Node.js 18+ installed
- AWS CDK CLI installed

### Deploy Infrastructure
```bash
cd infrastructure
npm install
npm run build
cdk deploy
```

### Seed Sample Data
```bash
cd data
npm install
node seed-data.js
```

## 📊 Sample Data

The API includes 8 sample products across different categories:

- **Electronics**: Headphones, Smartphone, Gaming Laptop
- **Clothing**: T-Shirt, Running Shoes
- **Home & Garden**: Office Chair, Garden Sprinkler, Cookware Set

Each product includes flexible specifications tailored to its category.

## 🔧 Usage Examples

### cURL Examples

```bash
# Get all products
curl -X GET "https://tb6yw51og1.execute-api.us-east-1.amazonaws.com/prod/products"

# Get specific product
curl -X GET "https://tb6yw51og1.execute-api.us-east-1.amazonaws.com/prod/products/PROD-001"
```

### JavaScript/Fetch Example

```javascript
// Get all products
const response = await fetch('https://tb6yw51og1.execute-api.us-east-1.amazonaws.com/prod/products');
const products = await response.json();

// Get specific product
const productResponse = await fetch('https://tb6yw51og1.execute-api.us-east-1.amazonaws.com/prod/products/PROD-001');
const product = await productResponse.json();
```

## 🔒 Security Features

- **IAM Roles**: Least privilege access for Lambda functions
- **Encryption**: DynamoDB encryption at rest
- **CORS**: Properly configured for web access
- **API Gateway**: Built-in DDoS protection

## 📈 Performance & Scalability

- **Auto-scaling**: DynamoDB read/write capacity (1-10 units)
- **Serverless**: Automatic Lambda scaling
- **Caching**: API Gateway caching available
- **Response Times**: Sub-second performance

## 🔍 Monitoring

- **CloudWatch Logs**: Enabled for all Lambda functions
- **API Gateway Logging**: Request/response tracking
- **Error Handling**: Proper HTTP status codes
- **Metrics**: Available through AWS CloudWatch

## 💰 Cost Optimization

- **Provisioned Capacity**: DynamoDB with auto-scaling
- **Serverless**: Pay-per-request Lambda pricing
- **Efficient Queries**: Optimized DynamoDB operations

## 🧪 Testing

The solution has been thoroughly tested:

- ✅ End-to-end API functionality
- ✅ Error handling (404 for non-existent products)
- ✅ CORS configuration
- ✅ Performance benchmarks
- ✅ Sample data validation

## 📝 License

This project is part of the Echo Architect system and follows standard AWS best practices.

## 🤝 Contributing

This is a generated project from the Echo Architect system. For modifications, please refer to the original specifications in the `specs/` directory.

## 📞 Support

For questions about this implementation, refer to:
- `specs/requirements.md` - Original requirements
- `specs/design.md` - Technical design decisions
- `specs/tasks.md` - Implementation tasks
- `PROJECT_SUMMARY.md` - Detailed implementation summary
