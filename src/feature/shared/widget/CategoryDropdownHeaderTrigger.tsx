// src/feature/shared/widget/CategoryDropdownHeaderTrigger.tsx

import { Button } from '../ui/Button';
import { CategoryIcon } from '../ui/Icon';

export const CategoryDropdownHeaderTrigger = () => {
  return (
    <Button variant='secondary' fullWidth={false}>
      <CategoryIcon />
    </Button>
  );
};
