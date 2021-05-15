import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../models/app-common-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db
      .list<CategoryModel>('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map((categories) =>
          categories.map((category) => {
            return {
              key: category.key,
              payload: category.payload.val(),
            };
          })
        )
      );
  }
}
