import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('')
class BaseController {
  @Get('')
  public async default(req: Request, res: Response) {
    return res.status(200).send({
      status: 'OK',
      code: res.statusCode,
      results: [],
    });
  }

  @Get('health')
  public async health(req: Request, res: Response) {
    return res.status(200).send({
      status: 'OK',
      code: res.statusCode,
      results: [{ message: 'Servidor executando na porta 8080' }],
    });
  }
}

export { BaseController };
