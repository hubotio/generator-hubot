FROM chatopshpe/hubot-enterprise

ADD . /integration

RUN npm install --save /integration && npm install --save hubot-slack
RUN UPDATED_EXTERNAL=`cat external-scripts.json | jq '. + ["<%= appname %>"]'` && \
    echo $UPDATED_EXTERNAL > external-scripts.json

CMD ["./bin/hubot", "--adapter", "slack"]
