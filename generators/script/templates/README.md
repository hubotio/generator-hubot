# <%= appname %>

<%= scriptDescription %>

See [`src/<%= scriptName %>.coffee`](src/<%= scriptName %>.coffee) for full documentation.

## Run with docker

### RUN
  1. install [docker](https://docs.docker.com/engine/installation/)
  2. [Configure your chat platform](https://github.com/eedevops/hubot-enterprise/wiki/bootstrap#1-select-a-collaboration-platform)
  3. `docker pull <%= dockerName %>/<%= appname %>`
  4. run docker:

    ```bash
	  docker run \
       -p 8080:8080 \
       -e "http_proxy=$http_proxy" \
       -e "https_proxy=$https_proxy" \
       -e "no_proxy=$no_proxy" \
       -e "ADAPTER=slack" \
       -e "HUBOT_LOG_LEVEL=info" \
       -e "SLACK_APP_TOKEN=xxxxxxxxx" \
       -e "HUBOT_SLACK_TOKEN=xxxxxxxxxxx" \
	   <%= dockerName %>/<%= appname %>`
	```
  5. for more run options- [hubot-enterprise wiki](https://github.com/eedevops/hubot-enterprise/wiki/bootstrap#running-hubot-enterprise-via-docker)

## Installation - npm

In hubot project repo, run:

`npm install <%= appname %> --save`

Then add **<%= appname %>** to your `external-scripts.json`:

```json
[
  "<%= appname %>"
]
```

## Test and LINT
  1. to lint, run `npm run lint`.
  3. to test, run `npm test`.
  
## Run for development using docker compose
  1. install [docker](https://docs.docker.com/engine/installation/)
  2. install [docker-compose](https://docs.docker.com/compose/install/)
  3. update and edit variables in `docker-compose.yml`.
  4. run using `docker-compose up`.
  
## Hubot-enterprise guide and info

[hubot scripts Development](https://hubot.github.com/docs/scripting/)

[hubot-enterprise wiki](https://github.com/eedevops/hubot-enterprise/wiki)

[hubot-enterprise scripts Development](https://github.com/eedevops/hubot-enterprise/wiki/api)

## NPM Module

https://www.npmjs.com/package/<%= appname %>
