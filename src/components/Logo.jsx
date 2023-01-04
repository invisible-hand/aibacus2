import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../utils/constants/Route';

const Logo = () => {
  return (
    <Link to={ROUTE.INDEX}>
      <Image h={8} src='grid-outline.svg' alt='logo of Aibacus' />
    </Link>
  );
};

export default Logo;
