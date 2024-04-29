import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';

async function bootstrap() {
    const app = await NestFactory.create(ServerModule);
    await app.listen(8080);
    console.log(`App running on: ${await app.getUrl()}`)
}