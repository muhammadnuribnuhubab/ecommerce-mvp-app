// src/feature/shared/widget/UserActionDropdownList.tsx

'use client';

import { UserActionDropdownTrigger } from './UserActionDropdownTrigger';
import { ArrowCircleRightIcon } from '../ui/Icon';
import { DropdownWrapper } from './DropdownWrapper';
import { UserActionDropdownItem } from './UserActionDropdownItem';

export const UserActionDropdownList = () => {
  return (
    <DropdownWrapper
      trigger={({ isOpen }) => (
        <UserActionDropdownTrigger name='Ibnu' isOpen={isOpen} />
      )}
      align='right'
      menuClassName='w-full mt-3 bg-white rounded-full'
      className='w-full'
    >
      <UserActionDropdownItem
        icon={<ArrowCircleRightIcon />}
        labelAction='Logout'
        onClick={() => console.log('Logging out')}
        className='w-full rounded-full lg:rounded-b-lg lg:rounded-t-none lg:shadow-lg'
      />
    </DropdownWrapper>
  );
};
