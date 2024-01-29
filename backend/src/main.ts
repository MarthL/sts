import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

//import 'dotenv/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
//require('dotenv').config();


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;

  app.enableCors({
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('Manege')
    .setDescription('The Manege API description. ')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Projects', 'Method related to the Projects of the API')
    .addTag('Users', 'Method related to the Projects of the API')
    .addTag('Job', 'Method related to the Jobs of the API')
    .addTag('Auth', 'Authentication features')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
