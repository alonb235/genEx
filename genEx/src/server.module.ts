import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerHandlerService } from './server/serverhandler.service';

@Module({
    imports: [],
    controllers: [ServerController],
    providers: [
        ServerHandlerService
    ]
})
export class ServerModule {}