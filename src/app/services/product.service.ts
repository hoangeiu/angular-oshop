import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models/app-common-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: Product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map((products) =>
          products.map((product) => {
            const { title, price, category, imageUrl } = product.payload.val();
            return { key: product.key, title, price, category, imageUrl };
          })
        )
      );
  }

  get(productId) {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
