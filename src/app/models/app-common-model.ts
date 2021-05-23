export interface Product {
  key?: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface Category {
  key?: string;
  name: string;
}

export class ItemInCart {
  key: string;
  category: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;

  constructor(init?: Partial<ItemInCart>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}

export class Cart {
  items: ItemInCart[] = [];
  constructor(private itemsMap: { [productId: string]: ItemInCart }) {
    this.itemsMap = itemsMap || {};

    for (const productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(
        new ItemInCart({
          ...item,
          key: productId,
        })
      );
    }
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    return this.items.reduce((acc, item) => (acc += item.totalPrice), 0);
  }

  get totalItemCount() {
    let count = 0;
    for (const productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
