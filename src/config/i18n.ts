import { initReactI18next, useTranslation } from 'react-i18next';

import buildI18n, { namespaces } from '@graasp/translations';

const i18n = buildI18n().use(initReactI18next);
i18n.use(initReactI18next);

export const useAuthTranslation = () => useTranslation(namespaces.auth);
export const useCommonTranslation = () => useTranslation(namespaces.common);
export const useMessagesTranslation = () => useTranslation(namespaces.messages);

export default i18n;
