import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { emailValidation } from '../util/emailValidation';
import { EvaClient } from '../client/EvaClient';
import { EmailValidationV1, EmailValidationV3 } from '../database';

@Controller('mail')
class EmailController {
  @Post('validation/v1')
  public async validationV1(req: Request, res: Response) {
    const { email_address, domain } = req.body;

    const result = emailValidation(email_address, domain);

    const database = new EmailValidationV1();
    result.forEach((rows) => database.create(rows));

    return res.status(200).send({
      status: 'OK',
      code: res.statusCode,
      results: [...result],
    });
  }

  @Post('validation/v3')
  public async validationV3(req: Request, res: Response) {
    const { email_address } = req.body;

    const evaClient = new EvaClient();
    const response = await evaClient.fetchData(email_address);

    const database = new EmailValidationV3();
    response.forEach((rows) => database.create(rows.data));

    return res.status(200).send({
      status: 'OK',
      code: res.statusCode,
      results: [...response],
    });
  }
}

export { EmailController };
