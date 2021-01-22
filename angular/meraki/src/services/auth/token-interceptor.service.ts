import { Injectable } from '@angular/core';
import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer xx.yy.zz',
            },
        });
        return next.handle(tokenizedReq);
    }
}
