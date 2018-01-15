import {
  async,
  TestBed,
  inject,
  tick,
  fakeAsync,
  flushMicrotasks
} from '@angular/core/testing';
import { Subscription } from 'rxjs/Subscription';
import { AuthServiceProvider } from './auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireAuthMock } from '../../../test-config/mocks/angular-fire-auth.mock';

const credentialsMock = {
  email: 'example@example.com',
  password: 'password'
};

describe('Provider:  Auth Service', () => {
  let authService: AuthServiceProvider;
  let afAuth: AngularFireAuth;
  let isAuth$: Subscription;
  let isAuthRef: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthServiceProvider,
        { provide: AngularFireAuth, useValue: AngularFireAuthMock }
      ]
    });
    authService = TestBed.get(AuthServiceProvider);
    afAuth = TestBed.get(AngularFireAuth);
  });

  beforeEach(() => {
    isAuth$ = authService.authenticated$.subscribe(isAuth => {
      isAuthRef = isAuth;
    });
  });

  afterEach(() => {
    isAuth$.unsubscribe();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should not be initially authenticated', () => {
    expect(isAuthRef).toBe(false);
  });

  it('should be authenticated after register', done => {
    authService
      .signUp(credentialsMock.email, credentialsMock.password)
      .then(response => {
        expect(isAuthRef).toBe(true);
        expect(authService.authState.email).toEqual(credentialsMock.email);
        done();
      })
      .catch(err => console.log(err));
  });

  it('should be authenticated after logging in', done => {
    authService
      .login(credentialsMock.email, credentialsMock.password)
      .then(response => {
        expect(isAuthRef).toBeTruthy();
        expect(authService.authState.email).toEqual(credentialsMock.email);
        done();
      })
      .catch(err => console.log(err));
  });
});
