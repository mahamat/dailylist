import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import { ITodo } from "../../models/todo.interface";
import { ICategory } from "../../models/category.interface";
import { AuthServiceProvider } from "../auth-service/auth-service";

@Injectable()
export class FirestoreServiceProvider {
  private readonly COLLECTION_PATH = "todos";
  private readonly CATEGORY_PATH = "categories";

  constructor(
    private afs: AngularFirestore,
    private authService: AuthServiceProvider
  ) {}

  document$(ref: string): Observable<any> {
    return this.afs
      .doc(ref)
      .snapshotChanges()
      .map(doc => {
        return doc.payload.data();
      });
  }

  collection$(ref: string, queryFn?): Observable<any[]> {
    return this.afs
      .collection(ref, queryFn)
      .snapshotChanges()
      .map(docs => {
        return docs.map(a => {
          const data = a.payload.doc.data();
          const ref = a.payload.doc.ref.path;
          const id = a.payload.doc.id;
          return { id, ref, ...data };
        });
      });
  }

  get categories$(): Observable<ICategory[]> {
    return this.collection$(this.CATEGORY_PATH);
  }

  get todos$(): Observable<ITodo[]> {
    return this.authService.authenticated$.switchMap(loggedIn => {
      return this.collection$(this.COLLECTION_PATH, ref => ref.where('userId', '==', this.authService.currentUserId));
    });
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  add(data: any) {
    const timestamp = this.timestamp;
    return this.afs.collection(this.COLLECTION_PATH).add({
      ...data,
      userId: this.authService.currentUserId,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }

  update(data: any) {
    const { id } = data;
    return this.afs.doc(this.COLLECTION_PATH + "/" + id).update({
      ...data,
      completed: true,
      updatedAt: this.timestamp
    });
  }

  delete(id: string) {
    const ref = this.COLLECTION_PATH + "/" + id;
    return this.afs.doc(ref).delete();
  }
}
