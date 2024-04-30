import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';
import { AddressInfo, Server } from 'net';
import { compression } from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PKG = require('../package.json')
const PATH_STATIC_PKG_ROUTE = `/pkg/${PKG.version}/web`
const PATH_ASSETS_ROUTE = '/'
const DOCUMENT_ROOT = join(
    __dirname,
    'development',
    'external',
    'browser',
    'index.html'
)

async function bootstrap() {
    const app = await NestFactory.create(ServerModule);
    //app.use(compression())
    await app.listen(8080);
    const httpServer = await app.getHttpServer()
    console.log(`App running on: ${await app.getUrl()}`)
    return httpServer;
}

export const server = bootstrap().catch((err) => {
    console.error(err.stack);
})