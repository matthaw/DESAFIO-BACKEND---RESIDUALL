import { Pool } from 'pg';

export default new Pool({
  database: 'desafio-backend-residuall',
  user: 'username',
  password: 'password',
  idleTimeoutMillis: 30000,
});
