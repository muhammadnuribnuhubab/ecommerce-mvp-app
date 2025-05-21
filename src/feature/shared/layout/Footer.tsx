// src/feature/shared/layout/Footer.tsx

'use client';

import { Logo } from '@/feature/shared/ui/Logo';
import { Typography } from '../ui/Typography';
import Link from 'next/link';
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  WhatsAppIcon,
  MailIcon,
} from '../ui/Icon';

export const Footer = () => {
  return (
    <footer className='w-full py-8 px-4 border-t bg-white border-neutral-300 mt-10 lg:mt-20'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between gap-6'>
        <div className='flex flex-col gap-6 '>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
              <Logo />
              <Typography
                as='h2'
                size='xl'
                color='primary'
                weight='bold'
                className='inline xl:hidden'
              >
                commercell
              </Typography>
            </div>
            <Typography as='p' className='text-justify'>
              commercell is an MVP simulation of an e-commerce app that includes
              basic features like view detailed product information, filter and
              group products by category, product browsing, cart management, and
              checkout. It also includes account features such as login,
              register, and logout. It&apos;s built to test ideas and core flows
              quickly.
            </Typography>
          </div>

          <div className='flex flex-col gap-4'>
            <Typography as='h2' size='base' color='primary' weight='bold'>
              Follow on Social Media
            </Typography>
            <div className='flex gap-3 md:gap-4'>
              <Link
                href='https://github.com/muhammadnuribnuhubab'
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 border border-neutral-300 rounded-full hover:bg-neutral-300 transition'
              >
                <GitHubIcon className='size-5 text-primary-300' />
              </Link>
              <Link
                href='https://www.linkedin.com/in/nuribnuu/'
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 border border-neutral-300 rounded-full hover:bg-neutral-300 transition'
              >
                <LinkedInIcon className='size-5 text-primary-300' />
              </Link>
              <Link
                href='https://instagram.com/nuribnuu'
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 border border-neutral-300 rounded-full hover:bg-neutral-300 transition'
              >
                <InstagramIcon className='size-5 text-primary-300' />
              </Link>
              <Link
                href='https://wa.me/6282324687119'
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 border border-neutral-300 rounded-full hover:bg-neutral-300 transition'
              >
                <WhatsAppIcon className='size-5 text-primary-300' />
              </Link>
              <Link
                href='mailto:nuribnuu@gmail.com'
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 border border-neutral-300 rounded-full hover:bg-neutral-300 transition'
              >
                <MailIcon className='size-5 text-primary-300' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
