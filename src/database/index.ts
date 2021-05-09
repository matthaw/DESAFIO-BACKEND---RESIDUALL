import { Pool } from 'pg';
import db from './db';

interface IEmailValidationV1 {
  email_address: string;
  domain: string;
  valid_syntax: boolean;
}

class EmailValidationV1 {
  private database: Pool;

  constructor() {
    this.database = db;
  }

  public async create({ email_address, domain, valid_syntax }: IEmailValidationV1): Promise<void> {
    const sql = `insert into email_validation_v1(email_address, domain, valid_syntax) 
                  values ($1, $2, $3)`;
    await this.database.query(sql, [email_address, domain, valid_syntax]);
  }
}

export { EmailValidationV1, IEmailValidationV1 };
