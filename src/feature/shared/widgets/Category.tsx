import { Button } from '../ui/Button';
import { CategoryIcon } from '../ui/Icons';
import { Typography } from '../ui/Typography';

export const Category = () => {
  return (
    <Button variant='secondary' className=''>
      <CategoryIcon />
      <Typography as='span' className='hidden sm:inline'>Category</Typography>
    </Button>
  );
};
