// src/feature/shared/widget/CategoryDropdownTrigger.tsx

import { Button } from '../ui/Button';
import { CategoryIcon } from '../ui/Icon';

export const CategoryDropdownTrigger = () => {
  return (
    <Button variant='secondary' fullWidth={false}>
      <CategoryIcon />
    </Button>
  );
};
