import Auth from './Auth';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { SUBJECT } from '../constants/Subject';

const subjects = Object.values(SUBJECT);

const NavBar = () => {
  return (
    <div className='px-6 pt-6'>
      <nav
        className='flex h-9 items-center gap-12'
        aria-label='Global'
      >
        <Logo />
        <div className='flex min-w-0 flex-1 gap-12 '>
          {subjects.map((gen) => (
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
