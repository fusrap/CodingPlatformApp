# CodingPlatformApp

## Setup:

Project:
* Init: `ng new learning-portal-app`
* Run: `ng servce`

Prime Ng:
* Install: `npm install primeng primeicons primeflex`
* import css (`angular.json`):
                "styles": [
              "src/styles.css",
              "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
              "node_modules/primeng/resources/primeng.min.css",
              "node_modules/primeflex/primeflex.css"
            ],

## Routing


## Login

Init components:
* ng g c components/login
* ng g c components/register
* ng g c components/home
* ng g s services/auth
* ng g g guards/auth
* ng g i interfaces/auth