export const SkeletonCard = () => {
  return (
    <div className='w-full bg-white rounded-xl overflow-hidden shadow-lg'>
      <div className='w-full aspect-[173/173] md:aspect-[265/265] bg-neutral-200 animate-pulse' />
      <div className='p-3 sm:p-4 flex flex-col gap-2'>
        <div className='h-4 w-3/4 bg-neutral-200 rounded animate-pulse' />
        <div className='h-4 w-1/2 bg-neutral-200 rounded animate-pulse' />
        <div className='h-4 w-1/3 bg-neutral-200 rounded animate-pulse' />
      </div>
    </div>
  );
};
