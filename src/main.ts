import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 3333;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`App running on port: ${PORT}`)
  
  // using pipelines for validation
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  
  // swagger instantiation
  const config = new DocumentBuilder()
    .setTitle('Service Orders API')
    .setDescription('Application to manage service orders')
    .setVersion('1.0')
    /* .addTag('service_orders') */
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(PORT);
}
bootstrap();
