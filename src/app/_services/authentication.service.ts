import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User, UserClass } from '../_models/user';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';




@Injectable()
export class  AuthenticationService {
    main_id = 0;
    user: User;
    myRole: string = '';
    users: User[] = [];
    public globalUser = new BehaviorSubject<User>({});
    public authStatus = new BehaviorSubject<Boolean>(false);
    public userPerm = '';
    appDash: boolean = false;
    empDash: boolean = false;
    consDash: boolean = false;
    // public isUserAuthenticated = new BehaviorSubject<Boolean>(false);

    constructor(private router: Router) { }

    getuser():Promise<any[]> {
        this.users = [];
        return new Promise((resolve) => {
          this.users = JSON.parse(localStorage.getItem('user'));
            if (this.users) {
                if (this.users.length > 0) {
                this.globalUser.next(this.users[0]);
                this.authStatus.next(true);
                console.log('See your user:', this.userPerm)
           } }
            resolve(this.users);

        });


    }

    async isAuthenticated(){
      let user = [];
     user = await this.getuser();
     if(user){
      return user.length > 0;
     } else return false;
    }

    async userRole(){
      let user = [];
      user = await this.getuser();
      if(user){
       this.myRole = user[0].lstPermissions[0];
       console.log('See your role', this.myRole)
       return this.myRole
      }
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
        console.log('user has been removed!')
        this.router.navigateByUrl('auth/login')
    }

    async getUserRole(){
      this.getuser().then(data => {
        this.userPerm = data[0].lstPermissions[0];
        console.log('logger', this.userPerm)
        switch(this.userPerm){
          case "APP": {
            this.appDash = true;
            break;
          }

          case "RSS": {
            this.empDash = true;
            break;
          }

          case "CSS": {
            this.consDash = true
          }
        }
      })
    }

}
