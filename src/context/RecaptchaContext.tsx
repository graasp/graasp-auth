import { createContext, useContext } from 'react';

import { RECAPTCHA_SITE_KEY } from '../config/env';

declare global {
  interface Window {
    grecaptcha: {
      ready?: (callback: () => void) => void;
      execute: (
        siteKey: string,
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
  const executeCaptcha = (action: string): Promise<string> => {
    return new Promise<string>((resolve) => {
      if (!window.grecaptcha) {
        resolve(undefined);
      } else {
        window.grecaptcha.ready(async () => {
          const token = await window.grecaptcha.execute(siteKey, { action });
          resolve(token);
        });
      }
    });
  };

  const value = { executeCaptcha };
  return (
    <RecaptchaContext.Provider value={value}>
      {children}
    </RecaptchaContext.Provider>
  );
};

export const useRecaptcha = () => useContext(RecaptchaContext);

export const RecaptchaComponent = () => {
  return (
    <div
      className="g-recaptcha"
      data-sitekey={RECAPTCHA_SITE_KEY}
      // eslint-disable-next-line no-console
      data-callback={(token) => console.log('got token', token)}
      data-size="invisible"
    >
      hello
    </div>
  );
};
