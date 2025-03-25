import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const allowedOrigin = process.env.CLIENT_ORIGIN;

  app.enableCors({
    origin: allowedOrigin,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('API documentation for the User Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  console.log(`User Service is running on: ${await app.getUrl()}`);
}
bootstrap();
