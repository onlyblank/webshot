import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Webshot')
        .setDescription('Web page screenshot service')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    setupSwagger(app);

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
