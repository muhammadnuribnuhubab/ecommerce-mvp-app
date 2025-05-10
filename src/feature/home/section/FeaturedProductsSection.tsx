import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { Button } from '@/feature/shared/ui/Button'; // asumsi kamu punya komponen Button

type FeaturedProductsSectionProps = {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
};

export const FeaturedProductsSection = ({
  products,
}: FeaturedProductsSectionProps) => {
  return (
    <section className='space-y-6'>
      <ProductListSection title='Featured Products' products={products} />

      <div className='flex justify-center'>
        <Button variant='secondary' fullWidth={false} className='!px-16'>Load More</Button>
      </div>
    </section>
  );
};
