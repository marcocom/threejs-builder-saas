# [WorldBuilderSaaS](https://mappalabs.com)

World Builder enables users to collaborate to create 3D worlds.

This is a fork of mapp-builder that focuses on server-side persistence and netcode between active users.  This code is behind the dependency updates and refactors to Three.js code at https://github.com/MappaLabs/mapp-builder/tree/upgrade-threejs-159 and will be merged later.

Updates to this code base focus on UI and server-code and should avoid all 3D world code.

`npm install --legacy-peer-deps`
`npm run server:setup`
`npm run server:start`
`npm run dev`

To publish for deployment:
`npm run prod`

For Redis and Heroku development:
`brew tap heroku/brew && brew install heroku`

`brew tap redis-stack/redis-stack`
`brew install --cask redis-stack`

Docker management:
`docker pull redis`

start with persistent storage
`docker run --name some-redis -d redis redis-server --save 60 1 --loglevel warning`
