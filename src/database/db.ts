import { Pool } from 'pg';

export default new Pool({
  connectionString: 'postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>',
  idleTimeoutMillis: 30000,
});
