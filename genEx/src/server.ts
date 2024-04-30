import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(8080);
    console.log(`Applicaiton is Running on: ${await app.getUrl()}`);
}

bootstrap();