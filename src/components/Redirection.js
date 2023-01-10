import PropTypes from 'prop-types';

import { getUrlForRedirection, redirectToSavedUrl } from '@graasp/sdk';
import { RedirectionContent } from '@graasp/ui';

import { GRAASP_COMPOSE_HOST } from '../config/constants';
import { hooks } from '../config/queryClient';

const Redirection = ({ children }) => {
  const { data: member } = hooks.useCurrentMember();

  if (member?.get('id')) {
    redirectToSavedUrl(GRAASP_COMPOSE_HOST);

    return <RedirectionContent link={getUrlForRedirection()} />;
  }

  return children;
};

Redirection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Redirection;
