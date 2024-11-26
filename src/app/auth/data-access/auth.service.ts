import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from '@angular/fire/auth';
export interface User {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private _auth = inject(Auth);

  singUp(user: User) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }

  singin(user:User){
    return signInWithEmailAndPassword(this._auth,
      user.email,
      user.password
    );
  }
}
