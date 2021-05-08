import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { emailValidation } from '../util/emailValidation';

@Controller('mail')
class EmailController {
  @Post('validation/v1')
  public async validationV1(req: Request, res: Response) {
    const { email_address, domain } = req.body;

    const result = emailValidation(email_address, domain);

    return res.status(200).send({
      status: 'OK',
      code: res.statusCode,
      results: [...result],
    });
  }
}

export { EmailController };
