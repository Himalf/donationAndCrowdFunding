import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The Donation and CrowdFunding system API')
    .setDescription(
      'The donation and crowdfunding system that allows us to donate as a donot in various campaigns',
    )
    .setVersion('1.0')
    .addTag('Donations')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
