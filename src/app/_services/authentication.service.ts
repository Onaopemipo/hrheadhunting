import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User, UserClass } from '../_models/user';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';




@Injectable()
export class  AuthenticationService {
    main_id = 0;
    user: User;
    users: User[] = [];
    public globalUser = new BehaviorSubject<User>({});

    constructor(private router: Router) { }

    getuser() {
        this.users = [];
        return new Promise((resolve) => {
          this.users = JSON.parse(localStorage.getItem('user'));
            if (this.users) {
                if (this.users.length > 0) {
                this.globalUser.next(this.users[0]);
           } }
            resolve(this.users);

        });


    }


    addUser(user) {
        this.users = [];
        this.users.push(user);
        localStorage.setItem('user', JSON.stringify(this.users));
    }

    updateuser(user) {
        this.users = [];
        this.users.push(user);
        localStorage.setItem('user', JSON.stringify(this.users));

    }

    clearusers() {
        this.users = [];
        localStorage.removeItem('user');
    }

}
