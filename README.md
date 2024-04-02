# Graasp Auth

[![gitlocalized ](https://gitlocalize.com/repo/9425/whole_project/badge.svg)](https://gitlocalize.com/repo/9425?utm_source=badge)

Create an `.env.development` file with:

```sh
VITE_PORT=3001
VITE_API_HOST=http://localhost:3000
VITE_VERSION=latest
VITE_GRAASP_BUILDER_HOST=http://localhost:3111
VITE_SHOW_NOTIFICATIONS=true
VITE_GRAASP_AUT_HOST=http://localhost:3001
VITE_GRAASP_LANDING_PAGE_HOST=https://graasp.org

VITE_RECAPTCHA_SITE_KEY=
```

Generate your recaptcha key from [the reCAPTCHA admin console](https://www.google.com/recaptcha/admin/create)

For running tests locally create a `.env.test` file:

```sh
VITE_PORT=3002
VITE_API_HOST=http://localhost:3636
VITE_VERSION=latest
VITE_GRAASP_BUILDER_HOST=http://localhost:3111
VITE_SHOW_NOTIFICATIONS=true
VITE_GRAASP_AUT_HOST=http://localhost:3001

VITE_RECAPTCHA_SITE_KEY=
```
