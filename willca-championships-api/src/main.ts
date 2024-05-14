import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigKey, ConfigService } from '@config/index';
import { HttpExceptionFilter, ExceptionInterceptor } from '@commons/index';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ExceptionInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.listen(app.get(ConfigService)['envConfig'][ConfigKey.PORT_API]);
}
bootstrap();