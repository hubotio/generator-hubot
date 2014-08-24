'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var npmName = require('npm-name');


var hubotSay = function() {
  return  '                     _____________________________  ' + "\n" +
          ' _____              /                             \\ ' + "\n" +
          ' \\    \\             | Soliciting input to initiate |' + "\n" +
          ' |    |    '+chalk.yellow('_____')+'    |   self-replication process   |' + "\n" +
          ' |__'+chalk.cyan('\\\\')+'|   '+chalk.yellow('/')+chalk.cyan('_____')+chalk.yellow('\\')+'   \\                             / ' + "\n" +
          '   '+chalk.cyan('|//') + chalk.yellow('+  |')+chalk.cyan('[^_/\\_]')+chalk.yellow('|')+'   /----------------------------  ' + "\n" +
          '  '+chalk.yellow('|   | _|___')+'@@'+chalk.yellow('__|__')+'                                ' + "\n" +
          '  '+chalk.yellow('+===+/  ///     ')+chalk.cyan('\\_\\')+'                               ' + "\n" +
          '   '+chalk.cyan('| |_')+chalk.yellow('\\ /// HUBOT/')+chalk.cyan('\\\\')+'                             ' + "\n" +
          '   '+chalk.cyan('|___/')+chalk.yellow('\\//      /')+chalk.cyan('  \\\\')+'                            ' + "\n" +
          '         '+chalk.yellow('\\      /   +---+')+'                            ' + "\n" +
          '          '+chalk.yellow('\\____/    |   |')+'                            ' + "\n" +
          '           '+chalk.cyan('| //|')+'    '+chalk.yellow('+===+')+'                            ' + "\n" +
          '            '+chalk.cyan('\\//')+'      |xx|                            ' +
          "\n";
};

var HubotGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: {
    askFor: function () {
      var done = this.async();
      var userName = this.user.git.name();
      var userEmail = this.user.git.email();

      var prompts = [{
        name: 'botOwner',
        message: 'Owner',
        default: userName+' <'+userEmail+'>'
      }];

      this.log(hubotSay());

      this.prompt(prompts, function (props) {
        this.botOwner = props.botOwner;

        done();
      }.bind(this));
    },

    askForBotNameAndDescription: function() {
      var done = this.async();
      var botName = this._.slugify(this.appname);

      var prompts = [{
        name: 'botName',
        message: 'Bot name',
        default: botName
      },
      {
        name: 'botDescription',
        message: 'Description',
        default: 'A simple helpful robot for your Company'
      }];

      this.prompt(prompts, function (props) {
        this.botName = props.botName;
        this.botDescription = props.botDescription;

        done();
      }.bind(this));
    },

    askForBotAdapter: function() {
      var done = this.async();
      var prompts = [{
        name: 'botAdapter',
        message: 'Bot adapter',
        default: 'campfire',
        validate: function (botAdapter) {
          var done = this.async();

          if (botAdapter == 'campfire') {
            done(true);
            return
          }

          var name = 'hubot-' + botAdapter;
          npmName(name, function (err, available) {
            console.log("got back " + available);
            if (available) {
              done("Can't that adapter on NPM, try again?");
              return;
            }

            done(true);
          });
        }
      }];

      this.prompt(prompts, function (props) {
        this.botAdapter = props.botAdapter;

        done();
      }.bind(this));
    }
  },

  writing: {
    app: function () {
      this.mkdir('bin');
      this.copy('bin/hubot', 'bin/hubot');
      this.copy('bin/hubot.cmd', 'bin/hubot.cmd');

      this.template('Procfile', 'Procfile');
      this.copy('README.md', 'README.md');
      this.copy('external-scripts.json', 'external-scripts.json');
      this.copy('hubot-scripts.json', 'hubot-scripts.json');

      this.copy('gitignore', '.gitignore');
      this.template('_package.json', 'package.json');

      this.directory('scripts', 'scripts');
    },

    projectfiles: function () {
      this.copy('editorconfig', '.editorconfig');
    }
  },

  end: function () {
    this.npmInstall(['hubot', 'hubot-scripts'], {'save': true});
    if (this.botAdapter != 'campfire') {
      this.npmInstall(['hubot-' + this.botAdapter], {'save': true});
    }
  }
});

module.exports = HubotGenerator;
