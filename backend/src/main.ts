import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('Manege')
    .setDescription('The Manege API description. ')
    .setVersion('1.0')
    .addTag('Swagger')
    .addTag('Projects', 'Method related to the Projects of the API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen('4000');
}
bootstrap();
