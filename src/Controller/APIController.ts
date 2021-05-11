import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { EmailValidationV1, EmailValidationV3, IEmailValidationV1 } from '../database';

@Controller('api')
class APIController {
  @Get('v1/:id_min?/:id_max?/:email_address?/:domain?/:valid_syntax?/:date?')
  public async v1(req: Request, res: Response) {
    const { id_min, id_max, email_address, domain, valid_syntax, date } = req.query;

    if (!(id_min || id_max || email_address || domain || valid_syntax || date)) {
      return res.status(404).send({});
    }

    const database = new EmailValidationV1();
    let result;

    try {
      result = await database.find({
        id_min: Number(id_min),
        id_max: Number(id_max),
        email_address: <string>email_address,
        domain: <string>domain,
        valid_syntax: <string>valid_syntax,
        created_at: <string>date,
      });
    } catch (err) {
      return res.status(404).send({});
    }

    if (result.length == 0) {
      return res.status(404).send({
        status: 'Not Found',
        code: res.statusCode,
        results: [{ message: 'Não ah nada por aqui!' }],
      });
    }

    return res.status(200).send({
      status: 'OK',
      code: res.statusCode,
      results: [...result],
    });
  }

  @Get(
    'v3/:id_min?/:id_max?/:email_address?/:domain?/:valid_syntax?/:disposable?/:webmail?/:deliverable?/:catch_all?/:gibberish?/:date?'
  )
  public async v3(req: Request, res: Response) {
    const {
      id_min,
      id_max,
      email_address,
      domain,
      valid_syntax,
      disposable,
      webmail,
      deliverable,
      catch_all,
      gibberish,
      date,
    } = req.query;

    if (
      !(
        id_min ||
        id_max ||
        email_address ||
        domain ||
        valid_syntax ||
        disposable ||
        webmail ||
        deliverable ||
        catch_all ||
        gibberish ||
        date
      )
    ) {
      return res.status(404).send({});
    }

    const database = new EmailValidationV3();
    let result;
    try {
      result = await database.find({
        id_min: Number(id_min),
        id_max: Number(id_max),
        email_address: <string>email_address,
        domain: <string>domain,
        valid_syntax: <string>valid_syntax,
        disposable: <string>disposable,
        webmail: <string>webmail,
        deliverable: <string>deliverable,
        catch_all: <string>catch_all,
        gibberish: <string>gibberish,
        created_at: <string>date,
      });
    } catch (err) {
      return res.status(404).send({});
    }

    if (result.length == 0) {
      return res.status(404).send({
        status: 'Not Found',
        code: res.statusCode,
        results: [{ message: 'Não ah nada por aqui!' }],
      });
    }

    return res.status(200).send({
      status: 'OK',
      code: res.statusCode,
      results: [...result],
    });
  }
}

export { APIController };
