# <%= appname %>

<%= scriptDescription %>

See [`src/<%= scriptName %>.coffee`](src/<%= scriptName %>.coffee) for full documentation.

## Installation

In hubot project repo, run:

`npm install <%= appname %> --save`

Then add **<%= appname %>** to your `external-scripts.json`:

```json
[
  "<%= appname %>"
]
```

## Sample Interaction

```
user1>> hubot hello
hubot>> hello!
```

## NPM Module

https://www.npmjs.com/package/<%= appname %>
