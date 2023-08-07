import { createContext, useContext } from 'react';

import { useTheme } from '@graasp/ui';

declare global {
  interface Window {
    grecaptcha: {
      ready?: (callback: () => void) => void;
      render: (
        name: string,
        args: { sitekey: string; badge?: string; size?: string },
      ) => number;
      execute: (
        clientId: number,
        { action }: { action: string },
      ) => Promise<string>;
    };
  }
}

type RecaptchaContextType = {
  executeCaptcha: (action: string) => Promise<string>;
};

const RecaptchaContext = createContext<RecaptchaContextType>({
  executeCaptcha: () => Promise.reject('No Recaptcha context provider found'),
});

type Props = {
  children: JSX.Element;
  siteKey: string;
};

export const RecaptchaProvider = ({ children, siteKey }: Props) => {
  const { direction } = useTheme();
  const executeCaptcha = (action: string): Promise<string> => {
    return new Promise<string>((resolve) => {
      if (!window.grecaptcha) {
        resolve(undefined);
      } else {
        const clientId = window.grecaptcha.render('inline-badge', {
          sitekey: siteKey,
          badge: direction === 'rtl' ? 'bottomleft' : 'bottomright',
          size: 'invisible',
        });
        window.grecaptcha.ready(async () => {
          const token = await window.grecaptcha.execute(clientId, { action });
          resolve(token);
        });
      }
    });
  };

  const value = { executeCaptcha };
  return (
    <RecaptchaContext.Provider value={value}>
      <div id="inline-badge" />
      {children}
    </RecaptchaContext.Provider>
  );
};

export const useRecaptcha = () => useContext(RecaptchaContext);
