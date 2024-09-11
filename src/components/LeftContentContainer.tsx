import { Stack } from '@mui/material';

import APIChecker from './APIChecker';
import Footer from './Footer';
import { AnalyticsContent } from './leftContent/AnalyticsContent';
import { BuilderContent } from './leftContent/BuilderContent';
import { LibraryContent } from './leftContent/LibraryContent';
import { PlayerContent } from './leftContent/PlayerContent';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const PLATFORMS = [
  { content: <BuilderContent /> },
  { content: <PlayerContent /> },
  { content: <LibraryContent /> },
  { content: <AnalyticsContent /> },
];

const LeftContentContainer = ({ children }: Props): JSX.Element => {
  const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];

  return (
    <Stack direction="row" margin="auto" minHeight="100svh">
      <Stack
        display={{
          xs: 'none',
          sm: 'none',
          md: 'flex',
        }}
        width="100%"
        justifyContent="center"
        alignItems="center"
        py={4}
        sx={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23f2f2ff' fill-opacity='0.82' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      >
        <APIChecker />
        {platform.content}
      </Stack>
      <Stack
        flexGrow={1}
        justifyContent="space-between"
        alignItems="flex-end"
        width={{ xs: '100%', sm: 'inherit' }}
        bgcolor="white"
        border="1px solid #eaeaf7"
        px={{ xs: 2, sm: 8 }}
        py={{ xs: 2, sm: 2 }}
        boxShadow="0px 0px 20px 5px rgba(44, 47, 240, 0.08)"
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          {children}
        </Stack>
        <Footer />
      </Stack>
    </Stack>
  );
};

export default LeftContentContainer;