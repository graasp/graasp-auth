import { ReactNode } from 'react';

import { getUrlForRedirection } from '@graasp/sdk';
import { RedirectionContent } from '@graasp/ui';

import { hooks } from '../config/queryClient';
import { useRedirection } from '../hooks/searchParams';

type Props = {
  children: ReactNode;
};

const Redirection = ({ children }: Props) => {
  const { data: member } = hooks.useCurrentMember();
  const redirect = useRedirection();

  if (member) {
    return (
      <RedirectionContent link={redirect.url ?? getUrlForRedirection() ?? ''} />
    );
  }

  return children;
};

export default Redirection;
