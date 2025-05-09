import { StarIcon } from '../ui/Icon';
import { Typography } from '../ui/Typography';

type RatingProps = {
  value: number; // Nilai rating, misalnya 5.0
};

export const Rating = ({ value }: RatingProps) => {
  return (
    <div className='flex items-center gap-1'>
      {/* Ikon bintang */}
      <StarIcon className='text-[#FFAB0D]' />
      {/* Nilai rating */}
      <Typography>{value.toFixed(1)}</Typography>
    </div>
  );
};
