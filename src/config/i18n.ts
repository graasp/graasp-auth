import { initReactI18next, useTranslation } from 'react-i18next';

import buildI18n, { namespaces } from '@graasp/translations';

import ar from '../langs/ar.json';
import de from '../langs/de.json';
import en from '../langs/en.json';
import fr from '../langs/fr.json';
import it from '../langs/it.json';

const i18n = buildI18n().use(initReactI18next);
i18n.use(initReactI18next);

const AUTH_NAMESPACE = 'auth';

i18n.addResourceBundle('en', AUTH_NAMESPACE, en);
i18n.addResourceBundle('fr', AUTH_NAMESPACE, fr);
i18n.addResourceBundle('de', AUTH_NAMESPACE, de);
i18n.addResourceBundle('it', AUTH_NAMESPACE, it);
i18n.addResourceBundle('ar', AUTH_NAMESPACE, ar);

export const useAuthTranslation = () => useTranslation(AUTH_NAMESPACE);
export const useBuilderTranslation = () => useTranslation(namespaces.builder);
export const useCommonTranslation = () => useTranslation(namespaces.common);
export const useMessagesTranslation = () => useTranslation(namespaces.messages);

export default i18n;
