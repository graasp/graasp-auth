import { Trans, initReactI18next, useTranslation } from 'react-i18next';

import buildI18n from '@graasp/translations';

const i18n = buildI18n().use(initReactI18next);
i18n.use(initReactI18next);

export const useAuthTranslation = () => useTranslation('auth');

export { Trans };

export default i18n;
