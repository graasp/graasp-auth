import { useState } from 'react';

export type UseEnableAnalyticsForm = {
  enableSaveActions: boolean;
  updateSaveActions: (enable: boolean) => void;
};

export const useEnableAnalyticsForm = (): UseEnableAnalyticsForm => {
  const [enableSaveActions, setEnableSaveActions] = useState<boolean>(true);

  const updateSaveActions = (enable: boolean) => {
    setEnableSaveActions(enable);
  };

  return {
    enableSaveActions,
    updateSaveActions,
  };
};
