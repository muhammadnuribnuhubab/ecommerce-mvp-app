// src/components/CartItemsSection.tsx

import { Button } from '@/feature/shared/ui/Button';
import { Checkbox } from '@/feature/shared/ui/Checkbox';
import { TrashIcon } from '@/feature/shared/ui/Icon';
import { Typography } from '@/feature/shared/ui/Typography';
import { OrderItem } from '@/feature/shared/widget/OrderItem';
import { CartItem } from '@/types/cart';

type CartItemsSectionProps = {
  isAllSelected: boolean;
  isAnySelected: boolean;
  toggleSelectAll: () => void;
  removeSelectedFromCart: () => void;
  cartItems: CartItem[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
  onSelect: (id: number) => void;
  onChangeQuantity: (id: number, quantity: number) => void; // ✅ Tambahkan prop ini
};

export const CartItemsSection = ({
  isAllSelected,
  isAnySelected,
  toggleSelectAll,
  removeSelectedFromCart,
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
  onSelect,
  onChangeQuantity, // ✅ Tambahkan di sini juga
}: CartItemsSectionProps) => {
  return (
    <div className='flex flex-col lg:w-3/5 border-3 rounded-2xl p-4 border-neutral-300 h-fit'>
      {/* Cart Header Section */}
      <div className='flex items-center justify-between mb-4'>
        <Typography as='h1' size='xl' weight='bold'>
          Shopping Cart
        </Typography>
        <div className='flex items-center gap-2'>
          <Button
            variant='secondary'
            fullWidth={false}
            onClick={removeSelectedFromCart}
            disabled={!isAnySelected}
            className='!p-2.5 sm:!p-2'
          >
            <TrashIcon className='text-black' />
          </Button>
          <Button
            variant='secondary'
            fullWidth={false}
            onClick={toggleSelectAll}
            className='sm:!min-h-[42px] sm:!min-w-[42px] !p-2.5 sm:!p-2'
          >
            <Checkbox checked={isAllSelected} onChange={toggleSelectAll} />
          </Button>
        </div>
      </div>

      {/* Cart Items List */}
      {cartItems.map((item) => (
        <OrderItem
          key={item.id}
          {...item}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
          onSelect={onSelect}
          onChangeQuantity={onChangeQuantity} // ✅ Tambahkan prop ini
          mode='cart'
        />
      ))}
    </div>
  );
};
