const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function testConnection() {
  if (!uri) {
    console.error('MONGODB_URI is not set in the environment variables');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const db = client.db('wrestling_tournament');
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

testConnection();