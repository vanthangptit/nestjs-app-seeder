import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';

const prefixApi = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
  });
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(prefixApi);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Oxychain')
    .setDescription('The Oxychain API')
    .setVersion('1.0.0')
    .addTag('Users')
    .addTag('Auth')
    .addBearerAuth(
      {
        type: 'apiKey',
        scheme: 'string',
        bearerFormat: 'JWT',
        name: 'authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // app.enableCors();
  await app.listen(process.env.PORT || 8080, () => {
    console.log(`Attaca run port: ${process.env.PORT}/${prefixApi}`);
  });
}
bootstrap();
