import { ServerHandlerService } from "./server/serverhandler.service";
import { All, Get, Post, Header, Controller } from '@nestjs/common'
import { Request, Response } from "express";
import { readFileSync } from 'fs';
import { join } from 'path';
 
@Controller()
export class ServerController {
    constructor(private readonly handlerService: ServerHandlerService) {}

    @Get('healthcheck')
    healthcheck() {
        return
    }

    @Get('apicall')
    async makeApiCall(req: Request, res: Response) {
        return this.handlerService.handler(req);
    }

    @All('*')
    @Header('Content-Type', 'text/html')
    root(req: Request, res: Response) {
        res.send(
            readFileSync(
                join(
                    __dirname,
                    'development',
                    'external',
                    'browser',
                    'index.html'
                ),
                {
                    encoding: 'utf8',
                },
            )
        )
    }
}