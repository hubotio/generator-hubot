'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var npmName = require('npm-name');
var url = require('url');

var hubotStartSay = function() {
  return  '                     _____________________________  ' + "\n" +
    '                    /                             \\ ' + "\n" +
    ' '+chalk.cyan('  //\\')+'              |      Extracting input for    |' + "\n" +
    ' '+chalk.cyan(' ////\\  ')+'  '+chalk.yellow('_____')+'    |   self-replication process   |' + "\n" +
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
    ' \\    \\             |   Self-replication process   |' + "\n" +
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

var HubotGenerator = yeoman.generators.Base.extend({

  determineDefaultOwner: function() {
    var userName;
    var userEmail;

    if (typeof(this.user.git.name) == 'function') {
      userName = this.user.git.name()
    } else {
      userName = this.user.git.name
    }

    if (typeof(this.user.git.email) == 'function') {
      userEmail = this.user.git.email()
    } else {
      userEmail = this.user.git.email
    }

    if (userName && userEmail) {
      return userName+' <'+userEmail+'>';
    } else {
      return "User <user@example.com>";
    }
  },

  determineDefaultName: function() {
    return this._.slugify(this.appname);
  },

  // defaults
  defaultAdapter: 'slack',
  defaultDescription: 'A simple helpful robot for your Company',
  defaultRepo: 'hubot-scripts',
  defaultHE: 'eedevops/hubot-enterprise',
  defaultIntegrations: null,

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // FIXME add documentation to these
    this.option('owner', {
      desc: "Name and email of the owner of new bot (ie Example <user@example.com>)",
      type: String
    });


    this.option('name', {
      desc: "Name of new bot",
      type: String
    });

    this.option('description', {
      desc: "Description of the new bot",
      type: String
    });

    this.option('adapter', {
      desc: "Hubot adapter to use for new bot",
      type: String
    });

    this.option('defaults', {
      desc: "Accept defaults and don't prompt for user input",
      type: Boolean
    });

    this.option('generateConfigs', {
      desc: "Scan all integrations configured in external-scripts.json for environment variables configuration",
      type: Boolean,
      defaults: true
    });

    this.option('integrations', {
      desc: "Integrations for hubot, npm package name or github url or location on disk sperated by commas",
      type: String,
      defaults: ""
    });

    // to enable installing HE from location on disk instead of web
    // default is from web
    this.option('location', {
      desc: "hubot-enterprise location to install from",
      type: Boolean,
      defaults: this.defaultHE,
      hide: true
    });

    this.log("Default integrations : " + this.options.integrations);

    if (this.options.defaults) {
      this.options.owner = this.options.owner || this.determineDefaultOwner();
      this.options.name = this.options.name || this.determineDefaultName();
      this.options.adapter = this.options.adapter || this.defaultAdapter;
      this.options.description = this.options.description || this.defaultDescription;
      //TODO: FIX accept integrations from arguments
      this.options.integrations = this.option.integrations!="" ? this.option.integrations : this.defaultIntegrations;
      this.options.generateConfigs = false;
    }

    if (this.options.owner == true) {
      this.env.error("Missing owner. Make sure to specify it like --owner=\"<owner>\"");
    }

    if (this.options.name == true) {
      this.env.error("Missing name. Make sure to specify it like --name=\"<name>\"");
    }

    if (this.options.description == true) {
      this.env.error("Missing description. Make sure to specify it like --description=\"<description>\"");
    }

    if (this.options.adapter == true) {
      this.env.error("Missing adapter name. Make sure to specify it like --adapter=<adapter>");
    }
  },

  initializing: function () {
    this.pkg = require('../../package.json');

    this.externalScripts = [
      'hubot-diagnostics',
      'hubot-help',
      'hubot-redis-brain',
    ];

    this.hubotScripts = [
    ];
  },

  prompting: {
    askFor: function () {
      var done = this.async();
      var botOwner = this.determineDefaultOwner();

      var prompts = [];
      if (! this.options.owner) {
        prompts.push({
          name: 'botOwner',
          message: 'Owner',
          default: botOwner
        });
      }

      this.log(hubotStartSay());
      this.prompt(prompts, function (props) {
        this.botOwner = this.options.owner || props.botOwner;

        done();
      }.bind(this));
    },

    askForBotNameAndDescription: function() {
      var done = this.async();
      var botName = this.determineDefaultName()

      var prompts = []

      if (! this.options.name) {
        prompts.push({
          name: 'botName',
          message: 'Bot name',
          default: botName
        });
      }

      if (!this.options.description) {
        prompts.push({
          name: 'botDescription',
          message: 'Description',
          default: this.defaultDescription
        });
      }

      this.prompt(prompts, function (props) {
        this.botName = this.options.name || props.botName;
        this.botDescription = this.options.description || props.botDescription;

        done();
      }.bind(this));
    },

    askForBotIntegrations: function() {
      var done = this.async();
      var prompts = [];

      // FIXME validate argument like we do when prompting
      if (this.options.integrations!=null) {
        prompts.push({
          name: 'botIntegrations',
          //TODO: provide suggestions?
          message: 'Bot Integrations (npm name or github url or path from local disk, separated by commas)',
          default: "",
          validate: function (botIntegrations) {
            var done = this.async();
            try {
              console.log(botIntegrations);
              if(botIntegrations!="") {
                console.log("Integrations entered:");
                botIntegrations.split(",").forEach(function (element, index, array) {

                  if (!element.includes("https:") && !element.includes("ssh:")) {
                    console.log(element);
                  } else {
                    var protocol = element.substr(0, element.indexOf("://") + 3);
                    var baseUrl = element.substr(element.indexOf("://") + 3);
                    var link = "git+" + protocol + "git@" + baseUrl;
                    var integrationFull = element.substr(element.lastIndexOf("/") + 1).replace(".git","");

                    console.log("Integration: " + integrationFull);
                    console.log("Repo url: " + link);
                  }
                });
              }

              done(null,true);
            }catch (e){
              console.log(e);
              done("Can't parse integrations input, try again?");
            }
          }
        });
      }

      this.prompt(prompts, function (props) {
        console.log("props : " + JSON.stringify(props));
        var integrationsStr = this.options.integrations || props.botIntegrations;

        if(integrationsStr==null || integrationsStr == undefined){
          done("No integrations configured.");
        }


        var integrationsStrArray = integrationsStr.split(",");
        this.integrations = [];
        this.integrationsScripts = [];
        var thiz = this;
        //TODO: eliminate duplicate code
        for(var i=0;i<integrationsStrArray.length;i++){
          var element = integrationsStrArray[i];
          if(element==="") continue;

          if (!element.includes("https:") && !element.includes("ssh:")) {
            this.integrationsScripts.push(path
              .basename(url.parse(element).pathname).replace(/@.*/, ''));
            this.integrations.push(element);
          } else {
            var protocol = element.substr(0, element.indexOf("://") + 3);
            var baseUrl = element.substr(element.indexOf("://") + 3);
            var link = "git+" + protocol + "git@" + baseUrl;
            var integrationFull = element.substr(element.lastIndexOf("/") + 1).replace(".git","");

            this.integrations.push(link);
          }
        }

        done();
      }.bind(this));

    },

    askForBotAdapter: function() {
      var done = this.async();

      var prompts = [];
      // FIXME validate argument like we do when prompting
      if (! this.options.adapter) {
        prompts.push({
          name: 'botAdapter',
          message: 'Bot adapter',
          default: this.defaultAdapter,
          validate: function (botAdapter) {
            var done = this.async();

            if (botAdapter == 'slack') {
              done(null, true);
              return
            }

            var name = 'hubot-' + botAdapter;
            npmName(name, function (err, unavailable) {
              if (unavailable) {
                done("Can't find that adapter on NPM, try again?");
                return;
              }

              done(null, true);
            });
          }
        });
      }

      this.prompt(prompts, function (props) {
        this.botAdapter = this.options.adapter || props.botAdapter;

        done();
      }.bind(this));
    }
  },

  writing: {
    app: function () {
      this.mkdir('bin');
      this.mkdir('configs');
      this.copy('bin/hubot', 'bin/hubot');
      this.copy('bin/hubot.cmd', 'bin/hubot.cmd');

      this.template('Procfile', 'Procfile');
      this.template('README.md', 'README.md');
      this.template('install-slackapp.coffee', 'install-slackapp.coffee');

      // HACK: not installing hubot-enterprise from npm registry
      this.write('external-scripts.json', JSON.stringify(['hubot-enterprise'].concat(this.integrationsScripts).concat(this.externalScripts), undefined, 2));

      this.copy('gitignore', '.gitignore');
      this.template('_package.json', 'package.json');
      this.template('_runhubot.bat','runhubot.bat');
      this.template('_runhubot.sh','runhubot.sh');

      this.directory('enterprise_scripts', 'enterprise_scripts');
    },

    projectfiles: function () {
      this.copy('editorconfig', '.editorconfig');
    }
  },

  end: function () {
    var packages = ['hubot', 'hubot-scripts', this.options.location, 'botkit', 'querystring', 'jfs', 'underscore','hubot-runner','hubot-config-generator'];
    packages = packages.concat(this.externalScripts);
    packages = packages.concat(this.integrations);

    if (this.botAdapter != 'campfire') {
      // HACK: not installing slack from npm registry but from github
      var botAdapter = this.botAdapter == 'slack' ? 'hubot-slack@4.2.1' : 'hubot-'+this.botAdapter;
      packages.push(botAdapter);
    }

    //first make npm install to bring all integrations, then scan for environment varibale configurations
    this.npmInstall(packages, {'save': true},function () {
      console.log("Generate config = " + this.options.generateConfigs);
      if(this.options.generateConfigs) {
        this.spawnCommand("./node_modules/.bin/hubot-config-generator");
      }
    }.bind(this));

    this.log(hubotEndSay());

  }
});

module.exports = HubotGenerator;
