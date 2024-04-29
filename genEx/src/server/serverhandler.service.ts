import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class ServerHandlerService {
    constructor() {}

    async handler(req: Request) {
        return { "HELLO": "WORLD" }
    }
}