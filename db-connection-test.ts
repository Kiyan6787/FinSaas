import { config } from "dotenv";
import { Pool } from '@neondatabase/serverless';

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;
console.log("Database URL:", databaseUrl ? databaseUrl.replace(/:[^:@]+@/, ':****@') : 'Not set');

const pool = new Pool({ 
  connectionString: databaseUrl,
  connectionTimeoutMillis: 10000, // 10 seconds timeout
});

async function testConnection() {
  console.log('Testing database connection...');
  try {
    const client = await pool.connect();
    console.log('Connected successfully!');
    const result = await client.query('SELECT NOW()');
    console.log('Current time from DB:', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Failed to connect:', err);
  } finally {
    await pool.end();
  }
}

testConnection();