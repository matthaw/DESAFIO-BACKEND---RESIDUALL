import { Pool } from 'pg';
import { preparingQuery } from '../util/database';
import db from './db';

interface IEmailValidationV1 {
  email_address: string;
  domain: string;
  valid_syntax: boolean;
  created_at?: string;
}

interface IEmailV1Params extends Omit<IEmailValidationV1, 'valid_syntax'> {
  id_min: number;
  id_max: number;
  valid_syntax: string;
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

  public async find(params: IEmailV1Params): Promise<IEmailValidationV1[] | any> {
    const { sql, values } = preparingQuery('email_validation_v1', params);
    try {
      const { rows } = await this.database.query(sql, values);
      return rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
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
  created_at?: string;
}

interface IEmailV3Params
  extends Omit<
    IEmailValidationV3,
    'valid_syntax' | 'disposable' | 'webmail' | 'deliverable' | 'catch_all' | 'gibberish'
  > {
  id_min: number;
  id_max: number;
  valid_syntax: string;
  disposable: string;
  webmail: string;
  deliverable: string;
  catch_all: string;
  gibberish: string;
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

  public async find(params: IEmailV3Params): Promise<IEmailValidationV3[] | any> {
    const { sql, values } = preparingQuery('email_validation_v3', params);

    try {
      const { rows } = await this.database.query(sql, values);
      return rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

export { EmailValidationV1, IEmailValidationV1, EmailValidationV3, IEmailValidationV3 };
