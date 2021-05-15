import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ProductModel } from '../models/app-common-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list<ProductModel>('/products')
      .snapshotChanges()
      .pipe(
        map((products) =>
          products.map((product) => {
            return { key: product.key, payload: product.payload.val() };
          })
        )
      );
  }

  get(productId) {
    return this.db
      .object<ProductModel>('/products/' + productId)
      .valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
