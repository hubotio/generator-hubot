0.3.1
=====

* [app] don't include youtube by default since the API is deprecated, and the new API requires an API key https://github.com/github/generator-hubot/pull/43
* [app] fix copy when can't find something on npm https://github.com/github/generator-hubot/pull/39
* [app] update README to fix deprecated xargs argument https://github.com/github/generator-hubot/pull/41

0.3.0
=====

* [app] update example.coffee to use `res` instead of `msg` https://github.com/github/generator-hubot/pull/36
* [script] update generator to work better out of the box
  - Update dependencies
    - Add missing grunt and grunt-cli packages
    - Re-add chai and sinon to be npm 3.x compliant
    - Lock coffee-script to the same as hubot
  - Update travis config
    - Use new container architecture
    - Cache node_modules (faster test runs)
    - Switch from node 0.11 to 0.12 for testing
    - Add iojs to test matrix
  - Update Gruntfile
    - Add src directory to watch list
    - Load additional grunt tasks in consistent manor
    - Remove superfluous watch log message

0.2.1
=====

* [script] Fix generated index.coffee to load synchronously, so help commands are available in time https://github.com/github/generator-hubot/pull/19

0.2.0
=====

* Start tracking changes in CHANGELOG.md
* [app] Fix generated gitignore to correctly ignore .hubot_history https://github.com/github/generator-hubot/pull/17
* [app] Add generator command line options to prevent user prompts, and add --defaults to accept defaults without prompting https://github.com/github/generator-hubot/pull/14
