[![Build App](https://github.com/mcking49/banking-app/actions/workflows/build.yml/badge.svg)](https://github.com/mcking49/banking-app/actions/workflows/build.yml)
[![Lint Check](https://github.com/mcking49/banking-app/actions/workflows/lint.yml/badge.svg)](https://github.com/mcking49/banking-app/actions/workflows/lint.yml)
[![Deploy to Prod](https://github.com/mcking49/banking-app/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/mcking49/banking-app/actions/workflows/firebase-hosting-merge.yml)

# ANZ Wholesale Engineering Sample Project (UI)

Developed by Miten Chauhan (2023)

https://miten-anz.web.app/

## Testing

You can clone the repo and test locally if you wish (this project uses node v16.18.0 and pnpm), or, visit the link above

### Login

The login page accepts only this combination of username and password:

```
username: johndoe
password: 121212
```

Any other combination will result in an error

### Create Account

Once an account is created, a stub account will appear with status pending. As this is a stubbed scenario, the new account has hardcoded values, and will not show with the values submitted in the form.

### Reset testing

To reset the testing state, logout of the app. This will clear all scenarios that have been stubbed (i.e. you will be able to see full flow of "create account" again)
