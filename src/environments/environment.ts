// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// import { Secrets } from './../../secrets/secrets';
// let secrets = new Secrets();

export const environment = {
  production: false,
  apiUrl: "https://138.68.109.98:1337",
  authCallback: "http://localhost/callback"
};
