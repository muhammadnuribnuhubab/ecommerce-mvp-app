// components/skeleton/ProductDetailSkeletonSection.tsx

export const ProductDetailSkeletonSection = () => {
  return (
    <div className='flex flex-col gap-10 animate-pulse'>
      {/* === Section Detail Produk === */}
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Gambar produk */}
        <div className='relative w-full lg:w-2/5 bg-neutral-200 rounded-xl aspect-square' />

        {/* Info dan aksi */}
        <div className='flex flex-col gap-4 w-full'>
          {/* Info Produk */}
          <div className='flex flex-col gap-2'>
            <div className='h-4 w-1/4 bg-neutral-200 rounded' />
            <div className='h-6 w-3/4 bg-neutral-200 rounded' />
            <div className='h-6 w-1/4 bg-neutral-200 rounded' />
            <div className='h-4 w-1/3 bg-neutral-200 rounded' />
          </div>

          {/* Deskripsi */}
          <div className='flex flex-col gap-2 border-y border-neutral-300 py-4'>
            <div className='h-4 w-1/4 bg-neutral-200 rounded' />
            <div className='h-4 w-full bg-neutral-200 rounded' />
            <div className='h-4 w-5/6 bg-neutral-200 rounded' />
            <div className='h-4 w-3/4 bg-neutral-200 rounded' />
          </div>

          {/* Quantity */}
          <div className='flex flex-col gap-2'>
            <div className='h-4 w-1/4 bg-neutral-200 rounded' />
            <div className='h-10 w-32 bg-neutral-200 rounded' />
          </div>

          {/* Tombol */}
          <div className='flex flex-col sm:flex-row gap-2'>
            <div className='h-10 sm:w-1/2 bg-neutral-200 rounded' />
            <div className='h-10 sm:w-1/2 bg-neutral-200 rounded' />
          </div>
        </div>
      </div>

      {/* === Section Related Products === */}
      <div className='flex flex-col gap-4 mt-4'>
        {/* Judul */}
        <div className='h-6 w-48 bg-neutral-200 rounded' />

        {/* Grid card */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='w-full bg-white rounded-xl shadow-2xl overflow-hidden'
            >
              {/* Skeleton image */}
              <div className='relative w-full h-64 bg-neutral-200 rounded-t-xl' />

              {/* Skeleton info */}
              <div className='p-3 sm:p-4 flex flex-col gap-2'>
                <div className='h-4 w-3/4 bg-neutral-200 rounded' />
                <div className='h-4 w-1/2 bg-neutral-200 rounded' />
                <div className='h-4 w-2/3 bg-neutral-200 rounded' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
