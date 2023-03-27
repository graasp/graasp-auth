import { createContext, useContext } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
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
  executeCaptcha: () => Promise.resolve(''),
});

type Props = {
  children: JSX.Element;
  siteKey: string;
};

export const RecaptchaProvider = ({ children, siteKey }: Props) => {
  // const [isReady, setIsReady] = useState(false);

  const executeCaptcha = (action: string): Promise<string> => {
    return new Promise<string>((resolve) => {
      window.grecaptcha.ready(async () => {
        const token = await window.grecaptcha.execute(siteKey, { action });
        resolve(token);
      });
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
