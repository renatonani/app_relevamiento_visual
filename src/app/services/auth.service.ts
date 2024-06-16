import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {     
  }

  public async logIn(email : string, password : string)
  {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }
  
  public async logOut()
  {
    return await this.afAuth.signOut();
  }

  public async getUserUid()
  {
    return new Promise<string | null>((resolve, reject) => 
    {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null); 
        }
      });
    });
  }

  
}
