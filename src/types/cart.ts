import { ProductDetail } from './product';

export type CartItem = Pick<
  ProductDetail,
  'id' | 'image' | 'title' | 'category' | 'price'
> & {
  quantity: number;
  isSelected?: boolean;
};
