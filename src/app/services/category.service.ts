import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Category } from '../models/app-common-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db
      .list<Category>('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map((categories) =>
          categories.map((category) => {
            return {
              key: category.key,
              name: category.payload.val().name,
            };
          })
        )
      );
  }
}
