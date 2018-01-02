import { Pipe, PipeTransform } from "@angular/core";
import { FirestoreServiceProvider } from "../../providers/firestore-service/firestore-service";

@Pipe({
  name: "category"
})
export class CategoryPipe implements PipeTransform {

  constructor(private fsService: FirestoreServiceProvider) {}

  transform(value: string, ...args) {
    return this.fsService.document$(value);
  }
}
