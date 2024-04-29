import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HandlerService {
    constructor(){}

    public handleData() {
        return {"Header": "HELLO"}
    }
}