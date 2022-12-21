import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';
import { MESSAGES_EN } from './messages/messages-en';

import { SWAGGER_CONFIG, SWAGGER_NAME } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup(SWAGGER_NAME, app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(MESSAGES_EN.start.local(port), 'Bootstrap');
}
bootstrap();
