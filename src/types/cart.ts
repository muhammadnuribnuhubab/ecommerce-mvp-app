import { ProductDetail } from './product';

export type CartItem = Pick<
  ProductDetail,
  'id' | 'image' | 'title' | 'category' | 'price'
> & {
  quantity: number;
  isSelected: boolean;
  cartItemUuid: string; // UUID row Supabase
};

/** Untuk payload insert/update tanpa `isSelected` & `cartItemUuid` */
export type CartItemUpsert = Omit<CartItem, 'isSelected' | 'cartItemUuid'>;
