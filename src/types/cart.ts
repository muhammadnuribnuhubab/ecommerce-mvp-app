import { ProductDetail } from './product';

export type CartItem = Pick<
  ProductDetail,
  'id' | 'imageUrl' | 'name' | 'category' | 'price'
> & {
  quantity: number;
  isSelected?: boolean;
};
