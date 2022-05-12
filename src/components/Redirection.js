import Qs from 'qs';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { GRAASP_COMPOSE_HOST } from '../config/constants';
import { hooks } from '../config/queryClient';

function Redirection({ children }) {
  const { data: member } = hooks.useCurrentMember();
  const location = useLocation();

  useEffect(() => {
    if (member?.get('id')) {
      const queryString = Qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      window.location.href = queryString?.to || GRAASP_COMPOSE_HOST;
    }
  }, [member]);
  return children;
}

export default Redirection;
