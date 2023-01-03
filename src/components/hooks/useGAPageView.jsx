import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useGAPageView = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: 'location.pathname + location.search',
    });
  }, [location]);
};

export default useGAPageView;
