# graasp-auth

Create an `.env.development` file with:

```sh
VITE_PORT=3001
VITE_API_HOST=http://localhost:3000
VITE_VERSION=latest
VITE_APP_DOMAIN=localhost:3001
VITE_GRAASP_BUILDER_HOST=http://localhost:3111
VITE_SHOW_NOTIFICATIONS=true
VITE_GRAASP_AUT_HOST=http://localhost:3001

VITE_RECAPTCHA_SITE_KEY=
```

Generate your recaptcha key from [the reCAPTCHA admin console](https://www.google.com/recaptcha/admin/create)
