import { FC } from 'react';

import { ThumbnailSize } from '@graasp/sdk';
import { COMMON } from '@graasp/translations';
import { Avatar } from '@graasp/ui';

import { AVATAR_ICON_HEIGHT } from '../config/constants';
import { useCommonTranslation } from '../config/i18n';
import { hooks } from '../config/queryClient';

type Props = {
  id?: string;
};

const MemberAvatar: FC<Props> = ({ id }) => {
  const { t } = useCommonTranslation();
  const { data: member, isLoading, isFetching } = hooks.useMember(id);
  const {
    data: url,
    isLoading: isLoadingAvatar,
    isFetching: isFetchingAvatar,
  } = hooks.useAvatarUrl({
    id,
    size: ThumbnailSize.Small,
  });

  return (
    <Avatar
      isLoading={isLoading || isLoadingAvatar || isFetchingAvatar || isFetching}
      alt={member?.name || t(COMMON.AVATAR_DEFAULT_ALT)}
      component="avatar"
      maxWidth={AVATAR_ICON_HEIGHT}
      maxHeight={AVATAR_ICON_HEIGHT}
      url={url}
      sx={{ mx: 1 }}
    />
  );
};

export default MemberAvatar;
