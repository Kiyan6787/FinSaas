import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL!,
  connectionTimeoutMillis: 5000, // 5 seconds timeout
});

console.log('Attempting to connect to database...');

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to database successfully');
    release();
  }
});

export const db = drizzle(pool);

// Error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});