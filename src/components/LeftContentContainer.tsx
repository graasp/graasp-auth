import { Stack, Typography } from '@mui/material';

import APIChecker from './APIChecker';
import Footer from './Footer';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const LeftContentContainer = ({ children }: Props): JSX.Element => (
  <Stack
    direction="row"
    margin="auto"
    // bgcolor="#f6f7fb"
    minHeight="100svh"
    // sx={{
    //   backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23f2f2ff' fill-opacity='0.82' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    // }}
  >
    <Stack
      display={{
        xs: 'none',
        sm: 'flex',
      }}
      width="100%"
      justifyContent="center"
      alignItems="center"
      bgcolor="rgba(30,202,165,0.15)"
      // p={5}
    >
      <APIChecker />
      <Stack
        flexGrow={1}
        width="100%"
        direction="row"
        justifyContent="center"
        alignItems="center"
        p={5}
      >
        <svg
          fill="none"
          viewBox="0 0 1080 1080"
          width="150"
          data-astro-cid-zpomngsj=""
        >
          <path
            fill="#1ECAA5"
            d="M656.39 481.93H428.2c-30.88 0-56-25.12-56-56V250.47c0-30.88 25.12-56 56-56h228.19c30.88 0 56 25.12 56 56v175.46c0 30.88-25.12 56-56 56ZM428.2 245.6a4.87 4.87 0 0 0-4.87 4.87v175.46a4.87 4.87 0 0 0 4.87 4.87h228.19a4.87 4.87 0 0 0 4.87-4.87V250.47a4.87 4.87 0 0 0-4.87-4.87H428.2ZM845.1 805.78H616.91c-30.88 0-56-25.12-56-56V574.32c0-30.88 25.12-56 56-56H845.1c30.88 0 56 25.12 56 56v175.46c0 30.88-25.12 56-56 56ZM616.91 569.45a4.87 4.87 0 0 0-4.87 4.87v175.46a4.87 4.87 0 0 0 4.87 4.87H845.1a4.87 4.87 0 0 0 4.87-4.87V574.32a4.87 4.87 0 0 0-4.87-4.87H616.91ZM467.68 805.78h-228.2c-30.88 0-56-25.12-56-56V574.32c0-30.88 25.12-56 56-56h228.19c30.88 0 56 25.12 56 56v175.46c0 30.88-25.12 56-56 56h.01ZM239.49 569.45a4.87 4.87 0 0 0-4.87 4.87v175.46a4.87 4.87 0 0 0 4.87 4.87h228.19a4.87 4.87 0 0 0 4.87-4.87V574.32a4.87 4.87 0 0 0-4.87-4.87h-228.2.01Z"
          ></path>
        </svg>
        <Typography variant="h2" textAlign="left">
          Create your own learning activities with the Builder
        </Typography>
      </Stack>
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

export default LeftContentContainer;
