import React from 'react';

import { MUTATION_KEYS } from '@graasp/query-client';
import { Button, UserSwitch } from '@graasp/ui';
import { getStoredSessions } from '@graasp/utils';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { DOMAIN } from '../config/constants';
import { useAuthTranslation } from '../config/i18n';
import { hooks, useMutation } from '../config/queryClient';
import { USER_SWITCH_ID, buildMemberMenuItemId } from '../config/selectors';

const MyUserSwitch = () => {
  const { t } = useAuthTranslation();
  const sessions = getStoredSessions();
  const { data: members } = hooks.useMembers(sessions.map(({ id }) => id));
  const { mutate: switchUser } = useMutation(MUTATION_KEYS.SWITCH_MEMBER);

  // hide if no stored session
  if (!sessions.length) {
    return null;
  }

  const onMemberClick = (memberId) => () => {
    switchUser({ memberId, domain: DOMAIN });
  };

  const ButtonContent = (
    <Button
      id={USER_SWITCH_ID}
      variant="outlined"
      startIcon={<AccountCircleIcon />}
    >
      {t('Switch to a previous account')}
    </Button>
  );

  return (
    <UserSwitch
      useAvatar={hooks.useAvatar}
      members={members?.toJS()}
      onMemberClick={onMemberClick}
      signedOutTooltipText={t('You are not signed in.')}
      ButtonContent={ButtonContent}
      buildMemberMenuItemId={buildMemberMenuItemId}
    />
  );
};

export default MyUserSwitch;
