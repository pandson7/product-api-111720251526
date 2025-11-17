import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class ProductApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = '111720251526';

    // DynamoDB Table
    const productsTable = new dynamodb.Table(this, `ProductsTable${suffix}`, {
      tableName: `products-table-${suffix}`,
      partitionKey: { name: 'productId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Enable auto scaling
    productsTable.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 10
    });

    productsTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 10
    });

    // Lambda Functions
    const getProductsFunction = new lambda.Function(this, `GetProductsFunction${suffix}`, {
      functionName: `get-products-${suffix}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const command = new ScanCommand({
      TableName: process.env.TABLE_NAME
    });
    
    const result = await docClient.send(command);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Items || [])
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
      `),
      environment: {
        TABLE_NAME: productsTable.tableName
      }
    });

    const getProductByIdFunction = new lambda.Function(this, `GetProductByIdFunction${suffix}`, {
      functionName: `get-product-by-id-${suffix}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const productId = event.pathParameters?.id;
    
    if (!productId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Product ID is required' })
      };
    }

    const command = new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: { productId }
    });
    
    const result = await docClient.send(command);
    
    if (!result.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Product not found' })
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
      `),
      environment: {
        TABLE_NAME: productsTable.tableName
      }
    });

    // Grant DynamoDB permissions
    productsTable.grantReadData(getProductsFunction);
    productsTable.grantReadData(getProductByIdFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, `ProductApi${suffix}`, {
      restApiName: `product-api-${suffix}`,
      description: 'Product API for accessing product specifications',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization']
      }
    });

    // API Resources and Methods
    const products = api.root.addResource('products');
    products.addMethod('GET', new apigateway.LambdaIntegration(getProductsFunction));

    const productById = products.addResource('{id}');
    productById.addMethod('GET', new apigateway.LambdaIntegration(getProductByIdFunction));

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'Product API URL'
    });

    new cdk.CfnOutput(this, 'TableName', {
      value: productsTable.tableName,
      description: 'DynamoDB Table Name'
    });
  }
}
