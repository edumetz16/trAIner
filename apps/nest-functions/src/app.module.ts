import { Module } from '@nestjs/common';
import { AppController } from './modules/app.controller';

@Module({ controllers: [AppController] })
export class AppModule {}
