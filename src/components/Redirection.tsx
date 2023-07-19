import React, { FC } from 'react';

import { getUrlForRedirection, redirectToSavedUrl } from '@graasp/sdk';
import { RedirectionContent } from '@graasp/ui';

import { GRAASP_BUILDER_HOST } from '../config/env';
import { hooks } from '../config/queryClient';

type Props = {
  children: React.ReactElement;
};

const Redirection: FC<Props> = ({ children }) => {
  const { data: member } = hooks.useCurrentMember();

  if (member?.get('id')) {
    redirectToSavedUrl(GRAASP_BUILDER_HOST);

    return <RedirectionContent link={getUrlForRedirection() ?? ''} />;
  }

  return children;
};

export default Redirection;
