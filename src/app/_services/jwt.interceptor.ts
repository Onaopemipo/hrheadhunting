import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User, UserClass } from '../_models/user';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    main_id = 0;
    user: User = {};
    authstatus: boolean = false;
    constructor(public authServ: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.authServ.globalUser.value) {
            const token = this.authServ.globalUser.value.token;
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(request);
    }
}
