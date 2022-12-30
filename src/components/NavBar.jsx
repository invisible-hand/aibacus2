import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth from './Auth';
import Logo from './Logo';

const generates = ['Arithmetics', 'Math', 'Writing'];

const NavBar = () => {
  return (
    <div className='px-6 pt-6 lg:px-8'>
      <nav
        className='flex h-9 items-center justify-between'
        aria-label='Global'
      >
        <Logo />
        <div className='hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12'>
          {generates.map((gen) => (
            <NavLink
              key={gen}
              to={`/${gen}`}
              className='font-semibold text-gray-900 hover:text-gray-400 mr-2'
            >
              {gen}
            </NavLink>
          ))}
        </div>
        <Auth />
      </nav>
    </div>
  );
};

export default NavBar;