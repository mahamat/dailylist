import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

const fakeAuthState = new BehaviorSubject(null);

const credentialsMock = {
  email: 'example@example.com',
  password: 'password'
};

const userMock = {
  uid: 'uid123456',
  email: credentialsMock.email
};

export const AngularFireAuthMock = {
  authState: fakeAuthState,
  auth: {
    createUserWithEmailAndPassword(email, password) {
      fakeAuthState.next(userMock);
      return Promise.resolve(userMock);
    },
    signInWithEmailAndPassword(email, password) {
      fakeAuthState.next(userMock);
      return Promise.resolve(userMock);
    }
  }
};
