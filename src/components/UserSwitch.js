import React from 'react';

import { MUTATION_KEYS } from '@graasp/query-client';
import { getStoredSessions } from '@graasp/sdk';
import { AUTH } from '@graasp/translations';
import { Button, UserSwitch as GraaspUserSwitch } from '@graasp/ui';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { DOMAIN } from '../config/constants';
import { useAuthTranslation } from '../config/i18n';
import { hooks, useMutation } from '../config/queryClient';
import { USER_SWITCH_ID, buildMemberMenuItemId } from '../config/selectors';

const UserSwitch = () => {
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
      {t(AUTH.SWITCH_ACCOUNT_TEXT)}
    </Button>
  );

  return (
    <GraaspUserSwitch
      useAvatar={hooks.useAvatar}
      members={members}
      onMemberClick={onMemberClick}
      signedOutTooltipText={t(AUTH.NOT_SIGNED_IN_TOOLTIP)}
      ButtonContent={ButtonContent}
      buildMemberMenuItemId={buildMemberMenuItemId}
    />
  );
};

export default UserSwitch;
