import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found.exception-filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new EntityNotFoundExceptionFilter());

    const options = new DocumentBuilder()
        .setTitle('Nest.js API')
        .setDescription('Example of documentation')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
