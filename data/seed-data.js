const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

const tableName = 'products-table-111720251526';

const sampleProducts = [
  {
    productId: 'PROD-001',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    brand: 'TechSound',
    description: 'Premium wireless headphones with noise cancellation',
    price: 199.99,
    specifications: {
      batteryLife: '30 hours',
      connectivity: 'Bluetooth 5.0',
      weight: '250g',
      color: 'Black',
      warranty: '2 years'
    }
  },
  {
    productId: 'PROD-002',
    name: 'Smartphone Pro Max',
    category: 'Electronics',
    brand: 'MobileTech',
    description: 'Latest flagship smartphone with advanced camera system',
    price: 999.99,
    specifications: {
      display: '6.7 inch OLED',
      storage: '256GB',
      camera: '108MP Triple Camera',
      battery: '4500mAh',
      os: 'Android 14'
    }
  },
  {
    productId: 'PROD-003',
    name: 'Gaming Laptop Ultra',
    category: 'Electronics',
    brand: 'GameForce',
    description: 'High-performance gaming laptop for enthusiasts',
    price: 1599.99,
    specifications: {
      processor: 'Intel i7-13700H',
      graphics: 'RTX 4070',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
      display: '15.6 inch 144Hz'
    }
  },
  {
    productId: 'PROD-004',
    name: 'Cotton Casual T-Shirt',
    category: 'Clothing',
    brand: 'ComfortWear',
    description: '100% organic cotton t-shirt for everyday comfort',
    price: 29.99,
    specifications: {
      material: '100% Organic Cotton',
      fit: 'Regular',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Navy', 'Gray'],
      care: 'Machine washable'
    }
  },
  {
    productId: 'PROD-005',
    name: 'Running Shoes Elite',
    category: 'Clothing',
    brand: 'SportMax',
    description: 'Professional running shoes with advanced cushioning',
    price: 149.99,
    specifications: {
      type: 'Running',
      cushioning: 'Air Max Technology',
      material: 'Mesh upper with synthetic overlays',
      sole: 'Rubber outsole',
      sizes: ['7', '8', '9', '10', '11', '12']
    }
  },
  {
    productId: 'PROD-006',
    name: 'Ergonomic Office Chair',
    category: 'Home & Garden',
    brand: 'OfficeComfort',
    description: 'Ergonomic office chair with lumbar support',
    price: 299.99,
    specifications: {
      material: 'Mesh back with fabric seat',
      adjustments: 'Height, armrests, lumbar support',
      weightCapacity: '300 lbs',
      warranty: '5 years',
      assembly: 'Required'
    }
  },
  {
    productId: 'PROD-007',
    name: 'Smart Garden Sprinkler',
    category: 'Home & Garden',
    brand: 'GreenTech',
    description: 'WiFi-enabled smart sprinkler system with weather monitoring',
    price: 199.99,
    specifications: {
      connectivity: 'WiFi 2.4GHz',
      zones: '8 zones',
      weatherIntegration: 'Yes',
      app: 'iOS and Android',
      installation: 'Professional recommended'
    }
  },
  {
    productId: 'PROD-008',
    name: 'Stainless Steel Cookware Set',
    category: 'Home & Garden',
    brand: 'ChefMaster',
    description: '10-piece professional stainless steel cookware set',
    price: 249.99,
    specifications: {
      pieces: '10 pieces',
      material: 'Tri-ply stainless steel',
      compatibility: 'All cooktops including induction',
      dishwasher: 'Safe',
      warranty: 'Lifetime'
    }
  }
];

async function seedData() {
  console.log('Starting to seed data...');
  
  for (const product of sampleProducts) {
    try {
      const command = new PutCommand({
        TableName: tableName,
        Item: product
      });
      
      await docClient.send(command);
      console.log(`✅ Added product: ${product.name}`);
    } catch (error) {
      console.error(`❌ Error adding product ${product.name}:`, error);
    }
  }
  
  console.log('Data seeding completed!');
}

seedData().catch(console.error);
