import {All, Controller, Get, Header, Req, Res, Post } from '@nestjs/common';
import { HandlerService } from './server/handler.service';
import {readFileSync} from 'fs';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller()
export class ServerController {
    constructor(private readonly handlerService: HandlerService) {
        console.log(handlerService.formatOpenAIPromt(""))
    }

    
}