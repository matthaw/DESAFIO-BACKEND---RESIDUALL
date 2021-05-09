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

interface IEmailValidationV3 {
  email_address: string;
  domain: string;
  valid_syntax: boolean;
  disposable: boolean;
  webmail: boolean;
  deliverable: boolean;
  catch_all: boolean;
  gibberish: boolean;
}

class EmailValidationV3 {
  private database: Pool;

  constructor() {
    this.database = db;
  }

  public async create({
    email_address,
    domain,
    valid_syntax,
    disposable,
    webmail,
    deliverable,
    catch_all,
    gibberish,
  }: IEmailValidationV3): Promise<void> {
    const sql = `insert into email_validation_v3(email_address, domain, valid_syntax, disposable, webmail, deliverable, catch_all, gibberish) 
                  values ($1, $2, $3, $4, $5, $6, $7, $8)`;
    await this.database.query(sql, [
      email_address,
      domain,
      valid_syntax,
      disposable,
      webmail,
      deliverable,
      catch_all,
      gibberish,
    ]);
  }
}

export { EmailValidationV1, IEmailValidationV1, EmailValidationV3, IEmailValidationV3 };
