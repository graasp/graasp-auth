import { createContext, useContext } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      execute: (
        siteKey: string,
        { action }: { action: string },
      ) => Promise<string>;
    };
  }
}

// const RECAPTCHA_SCRIPT_ID = 'recaptcha-key';

type RecaptchaContextType = {
  executeCaptcha: (action: string) => Promise<string>;
  // isReady: boolean;
};

const RecaptchaContext = createContext<RecaptchaContextType>({
  executeCaptcha: () => Promise.resolve(''),
  // isReady: false,
});

type Props = {
  children: JSX.Element;
  siteKey: string;
};

export const RecaptchaProvider = ({ children, siteKey }: Props) => {
  // const [isReady, setIsReady] = useState(false);

  // /**
  //  * Extra security measure to check if the script has
  //  * already been included in the DOM
  //  */
  // const scriptAlreadyExists = () =>
  //   document.querySelector(`script#${RECAPTCHA_SCRIPT_ID}`) !== null;

  // /**
  //  * Append the script to the document.
  //  * Whenever the script has been loaded it will
  //  * set the isLoaded state to true.
  //  */
  // const addRecaptchaScript = () => {
  //   const script = document.createElement('script');
  //   script.id = RECAPTCHA_SCRIPT_ID;
  //   script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   script.defer = true;
  //   script.onload = () => setIsReady(true);
  //   document.body.append(script);
  // };

  // /**
  //  * Runs first time when component is mounted
  //  * and adds the script to the document.
  //  */
  // useEffect(
  //   () => {
  //     if (!scriptAlreadyExists()) {
  //       addRecaptchaScript();
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [],
  // );

  const executeCaptcha = (action: string) => {
    return window.grecaptcha.execute(siteKey, { action });
  };

  const value = { executeCaptcha };
  return (
    <RecaptchaContext.Provider value={value}>
      {children}
    </RecaptchaContext.Provider>
  );
};

export const useRecaptcha = () => useContext(RecaptchaContext);
