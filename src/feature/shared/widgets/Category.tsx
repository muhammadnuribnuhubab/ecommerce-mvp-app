// src/feature/shared/widgets/Category.tsx

import { Button } from '../ui/Button';
import { CategoryIcon } from '../ui/Icons';
import { Typography } from '../ui/Typography';

export const Category: React.FC = () => {
  return (
    <Button variant='secondary' fullWidth={false}>
      <CategoryIcon />
      <Typography as='span' className='hidden sm:inline'>
        Category
      </Typography>
    </Button>
  );
};
