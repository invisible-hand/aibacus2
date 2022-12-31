import { Link } from 'react-router-dom';
import { ROUTE } from '../constants/Route';

const Logo = () => {
  return (
    <div className='flex lg:min-w-0 lg:flex-1' aria-label='Global'>
      <Link to={ROUTE.INDEX} className='-m-1.5 p-1.5'>
        <span className='sr-only'>Aibacus</span>
        <img className='h-8' src='grid-outline.svg' alt='' />
      </Link>
    </div>
  );
};

export default Logo;
