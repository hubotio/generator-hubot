'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var npmName = require('npm-name');


var hubotStartSay = function() {
  return  '                     _____________________________  ' + "\n" +
          '                    /                             \\ ' + "\n" +
          ' '+chalk.cyan('  //\\')+'              |      Extracting input for    |' + "\n" +
          ' '+chalk.cyan(' ////\\  ')+'  '+chalk.yellow('_____')+'    |   script generation process  |' + "\n" +
          ' '+chalk.cyan('//////\\  ')+chalk.yellow('/')+chalk.cyan('_____')+chalk.yellow('\\')+'   \\                             / ' + "\n" +
          ' '+chalk.cyan('=======') + chalk.yellow(' |')+chalk.cyan('[^_/\\_]')+chalk.yellow('|')+'   /----------------------------  ' + "\n" +
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

var hubotEndSay = function() {
  return  '                     _____________________________  ' + "\n" +
          ' _____              /                             \\ ' + "\n" +
          ' \\    \\             |   Script generation process   |' + "\n" +
          ' |    |    '+chalk.yellow('_____')+'    |          complete...         |' + "\n" +
          ' |__'+chalk.cyan('\\\\')+'|   '+chalk.yellow('/')+chalk.cyan('_____')+chalk.yellow('\\')+'   \\     Good luck with that.    / ' + "\n" +
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

var extractScriptName = function (_, appname) {
  var slugged = _.slugify(appname),
    match = slugged.match(/^hubot-(.+)/);
  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }
  return slugged;
};

var HubotScriptGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');

  },

  prompting: {
    askFor: function () {
      var done = this.async();
      var userName = this.user.git.name();
      var userEmail = this.user.git.email();

      var prompts = [{
        name: 'scriptOwner',
        message: 'Owner',
        default: userName+' <'+userEmail+'>'
      }];

      this.log(hubotStartSay());

      this.prompt(prompts, function (props) {
        this.scriptOwner = props.scriptOwner;

        done();
      }.bind(this));
    },

    askForScriptNameAndDescription: function() {
      var done = this.async();
      var scriptName = extractScriptName(this._, this.appname);
      var orgName = 'HPSoftware';
      var companyName = 'Hewlett-Packard Development Company, L.P.';
      var yearName = new Date().getFullYear();
      var prompts = [{
        name: 'scriptName',
        message: 'Script name (hubot- prefix ommited)',
        default: scriptName
      },
	    {
        name: 'orgName',
        message: 'Github Organization name',
        default: orgName
      },
      {
        name: 'companyName',
        message: 'Company Full Name',
        default: companyName
      },
      {
        name: 'yearName',
        message: 'Year (for LICENSE)',
        default: yearName
      },
      {
        name: 'scriptDescription',
        message: 'Description',
        default: 'A hubot script that does the things'
      },
      {
        name: 'scriptKeywords',
        message: 'Keywords',
        default: 'hubot, hubot-scripts, hubot-enterprise'
      }];

      this.prompt(prompts, function (props) {
        this.scriptName = props.scriptName;
        this.scriptDescription = props.scriptDescription;
        this.scriptKeywords = props.scriptKeywords;
        this.orgName = props.orgName;
        this.companyName = props.companyName;
        // if user set script name to hubot- do not add hubot- prefix
        this.appname = (!this.scriptName.startsWith('hubot-') ?
          'hubot-' : '') + this.scriptName;
        this.yearName = props.yearName;
        done();
      }.bind(this));
    },
  },

  writing: {
    app: function () {
      this.mkdir('script');
      this.copy('script/bootstrap', 'script/bootstrap');
      this.copy('script/test', 'script/test');

      this.mkdir('src');
      this.template('src/template.coffee', 'src/' + this.scriptName + '.coffee');

      this.mkdir('test');
      this.template('test/template-test.coffee', 'test/' + this.scriptName + '-test.coffee');

      this.copy('gitignore', '.gitignore');
      this.copy('coffeelintignore', '.coffeelintignore');
      this.copy('Jenkinsfile', 'Jenkinsfile');
      this.copy('index.coffee', 'index.coffee');
      this.template('_package.json', 'package.json');
      this.template('_docker-compose.yml', 'docker-compose.yml');
      this.copy('README.md', 'README.md');
      this.template('LICENSE', 'LICENSE');
    },

    projectfiles: function () {
      this.copy('editorconfig', '.editorconfig');
    }
  },

  end: function () {
    this.npmInstall();

    this.log(hubotEndSay());

  }
});

module.exports = HubotScriptGenerator;
