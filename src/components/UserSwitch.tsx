import { MUTATION_KEYS } from '@graasp/query-client';
import { getStoredSessions } from '@graasp/sdk';
import { MemberRecord } from '@graasp/sdk/dist/frontend/types';
import { BUILDER } from '@graasp/translations';
import { UserSwitchWrapper } from '@graasp/ui';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

import { DOMAIN, MEMBER_PROFILE_PATH, SIGN_IN_PATH } from '../config/constants';
import { useBuilderTranslation } from '../config/i18n';
import { hooks, useMutation } from '../config/queryClient';
import { USER_SWITCH_ID, buildMemberMenuItemId } from '../config/selectors';
import MemberAvatar from './MemberAvatar';

const UserSwitch = () => {
  const { t: translateBuilder } = useBuilderTranslation();
  const sessions = getStoredSessions();
  const { mutate: switchMember } = useMutation<
    unknown,
    unknown,
    { memberId: string; domain?: string }
  >(MUTATION_KEYS.SWITCH_MEMBER);
  const { mutateAsync: signOut } = useMutation<any, any, any>(
    MUTATION_KEYS.SIGN_OUT,
  );

  // hide if no stored session
  if (!sessions.length) {
    return null;
  }

  const renderAvatar = (m: MemberRecord) => <MemberAvatar id={m.id} />;

  const ButtonContent = (
    <Button
      variant="outlined"
      startIcon={<AccountCircleIcon />}
      sx={{ my: 1, mx: 'auto' }}
    >
      {translateBuilder(BUILDER.SWITCH_ACCOUNT_BUTTON_SIGNED_OUT)}
    </Button>
  );

  return (
    <UserSwitchWrapper
      buttonId={USER_SWITCH_ID}
      ButtonContent={ButtonContent}
      signOut={signOut}
      isCurrentMemberLoading={false}
      isCurrentMemberSuccess={false}
      // fix in query client
      switchMember={switchMember as any}
      seeProfileText={translateBuilder(BUILDER.USER_SWITCH_PROFILE_BUTTON)}
      signedOutTooltipText={translateBuilder(
        BUILDER.USER_SWITCH_SIGNED_OUT_TOOLTIP,
      )}
      signOutText={translateBuilder(BUILDER.USER_SWITCH_SIGN_OUT_BUTTON)}
      switchMemberText={translateBuilder(BUILDER.USER_SWITCH_SWITCH_USER_TEXT)}
      profilePath={MEMBER_PROFILE_PATH}
      domain={DOMAIN}
      redirectPath={SIGN_IN_PATH}
      useMembers={hooks.useMembers}
      renderAvatar={renderAvatar}
      buildMemberMenuItemId={buildMemberMenuItemId}
    />
  );
};

export default UserSwitch;
