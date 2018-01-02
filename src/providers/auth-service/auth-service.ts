import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import "rxjs/add/operator/map";

@Injectable()
export class AuthServiceProvider {
  authenticated$: Observable<boolean>;
  authState: any = null;

  constructor(public afauth: AngularFireAuth) {
    this.authenticated$ = this.afauth.authState.map(user => !!user);
    this.afauth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : "";
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return "Guest";
    } else if (this.currentUserAnonymous) {
      return "Anonymous";
    } else {
      return this.authState["displayName"] || "User without a Name";
    }
  }

  login(email: string, password: string) {
    return this.afauth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.afauth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginAnonymously() {
    return this.afauth.auth.signInAnonymously();
  }

  logOut() {
    return this.afauth.auth.signOut();
  }
}
