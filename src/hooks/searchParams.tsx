import { useSearchParams } from 'react-router-dom';

const enum SearchParams {
  REDIRECTION = 'url',
}

/**
 * Checks whether the redirection url search parameter is set, in which case the value should be passed to the back-end
 * endpoints such that the final authentication (/auth) redirects to this URL (after e.g. password or e-mail)
 *
 * @returns { url } the redirection url to be passed with any authentication method
 */
export const useRedirection = () => {
  const [searchParams] = useSearchParams();

  let url: string | undefined;
  try {
    const urlParam = searchParams.get(SearchParams.REDIRECTION) ?? undefined;
    url = urlParam ? decodeURIComponent(urlParam) : undefined;
  } catch (error) {
    console.error(
      'The redirection URL search parameter could not be parsed and has been ignored',
      error,
    );
  }

  return {
    url,
  };
};
