const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.test' });

const uri = process.env.MONGODB_URI;

console.log('MongoDB URI:', uri); // Add this line to check the URI

async function seedTestDatabase() {
  if (!uri) {
    console.error('MONGODB_URI is not set in the environment variables');
    return;
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();

    // Clear existing data
    await db.collection('schools').deleteMany({});
    await db.collection('wrestler_data').deleteMany({});

    // Insert test data
    await db.collection('schools').insertMany([
      { "School Name": "Test School 1", Password: "password1" },
      { "School Name": "Test School 2", Password: "password2" }
    ]);

    console.log('Test database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedTestDatabase().catch(console.error);