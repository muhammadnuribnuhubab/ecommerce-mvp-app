'use client';

import { CartItem } from '@/feature/cart/widget/CartItem';
import { OrderItem } from '@/feature/shared/widget/OrderItem';
import { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([
    {
      id: 1,
      imageUrl: '/sample-product.jpg',
      name: 'Sneakers Pro Max',
      category: 'Footwear',
      price: 129.99,
      quantity: 1,
      isSelected: false,
    },
    {
      id: 2,
      imageUrl: '/sample-product2.jpg',
      name: 'T-Shirt Oversized',
      category: 'Clothing',
      price: 29.99,
      quantity: 2,
      isSelected: true,
    },
  ]);

  const handleQuantityChange = (id: number, newQty: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleToggleSelect = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-4 bg-[#eaeaea]'>
      {items.map((item) => (
        <OrderItem
          key={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          category={item.category}
          price={item.price}
          quantity={item.quantity}
          isSelected={item.isSelected}
          onSelect={() => handleToggleSelect(item.id)}
          onIncrement={() => handleQuantityChange(item.id, item.quantity + 1)}
          onDecrement={() =>
            handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
          }
          onRemove={() => handleRemove(item.id)}
          mode={'checkout'}
        />
      ))}
    </div>
  );
}
