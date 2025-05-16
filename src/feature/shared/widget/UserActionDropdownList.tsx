'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useAuth } from '@/context/AuthContext';
import { UserActionDropdownTrigger } from './UserActionDropdownTrigger';
import { ArrowCircleRightIcon } from '../ui/Icon';
import { DropdownWrapper } from './DropdownWrapper';
import { UserActionDropdownItem } from './UserActionDropdownItem';

export const UserActionDropdownList = () => {
  const supabase = useSupabaseClient();
  const { profileName } = useAuth();

  const handleLogout = async () => {
    // Cek session dulu
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error getting session:', sessionError.message);
      return;
    }

    if (!session) {
      console.warn('Tidak ada session aktif, logout tidak perlu dilakukan.');
      window.location.href = '/';
      return;
    }

    // Proses logout
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Failed to logout:', error.message);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <DropdownWrapper
      trigger={({ isOpen }) => (
        <UserActionDropdownTrigger
          name={profileName ?? 'Guest'}
          isOpen={isOpen}
        />
      )}
      align='right'
      menuClassName='w-full mt-3 bg-white rounded-full'
      className='w-full'
    >
      <UserActionDropdownItem
        icon={<ArrowCircleRightIcon />}
        labelAction='Logout'
        onClick={handleLogout}
        className='w-full rounded-full lg:rounded-b-lg lg:rounded-t-none lg:shadow-lg'
      />
    </DropdownWrapper>
  );
};
