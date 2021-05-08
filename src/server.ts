import { Server } from '@overnightjs/core';
import express from 'express';
import { BaseController } from './Controller';

export class SetupServer extends Server {
  constructor(private port = 8080) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupController();
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupController(): void {
    const baseController = new BaseController();
    this.addControllers([baseController]);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info(`Server listening of port: ${this.port}`);
    });
  }
}
