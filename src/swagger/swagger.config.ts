import { DocumentBuilder } from '@nestjs/swagger';
export const SWAGGER_NAME = 'swagger';
export const BEARER_AUTH_NAME = 'jwt-access-token';
export const SWAGGER_CONFIG = new DocumentBuilder()
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'JWT Authorization header using the Bearer scheme.',
      name: 'Authorization',
    },
    BEARER_AUTH_NAME,
  )
  .setTitle('Todo API')
  .setDescription('Task management app built with NestJS')
  .setVersion('1.0')
  .build();
