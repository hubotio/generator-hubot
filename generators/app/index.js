'use strict'
import Generator from 'yeoman-generator'
import chalk from 'chalk'

function hubotStartSay () {
  return '                     _____________________________  ' + '\n' +
          '                    /                             \\ ' + '\n' +
          ' ' + chalk.cyan('  //\\') + '              |      Extracting input for    |' + '\n' +
          ' ' + chalk.cyan(' ////\\  ') + '  ' + chalk.yellow('_____') + '    |   self-replication process   |' + '\n' +
          ' ' + chalk.cyan('//////\\  ') + chalk.yellow('/') + chalk.cyan('_____') + chalk.yellow('\\') + '   \\                             / ' + '\n' +
          ' ' + chalk.cyan('=======') + chalk.yellow(' |') + chalk.cyan('[^_/\\_]') + chalk.yellow('|') + '   /----------------------------  ' + '\n' +
          '  ' + chalk.yellow('|   | _|___') + '@@' + chalk.yellow('__|__') + '                                ' + '\n' +
          '  ' + chalk.yellow('+===+/  ///     ') + chalk.cyan('\\_\\') + '                               ' + '\n' +
          '   ' + chalk.cyan('| |_') + chalk.yellow('\\ /// HUBOT/') + chalk.cyan('\\\\') + '                             ' + '\n' +
          '   ' + chalk.cyan('|___/') + chalk.yellow('\\//      /') + chalk.cyan('  \\\\') + '                            ' + '\n' +
          '         ' + chalk.yellow('\\      /   +---+') + '                            ' + '\n' +
          '          ' + chalk.yellow('\\____/    |   |') + '                            ' + '\n' +
          '           ' + chalk.cyan('| //|') + '    ' + chalk.yellow('+===+') + '                            ' + '\n' +
          '            ' + chalk.cyan('\\//') + '      |xx|                            ' +
          '\n'
}

function hubotEndSay () {
  return '                     _____________________________  ' + '\n' +
          ' _____              /                             \\ ' + '\n' +
          ' \\    \\             |   Self-replication process   |' + '\n' +
          ' |    |    ' + chalk.yellow('_____') + '    |          complete...         |' + '\n' +
          ' |__' + chalk.cyan('\\\\') + '|   ' + chalk.yellow('/') + chalk.cyan('_____') + chalk.yellow('\\') + '   \\     Good luck with that.    / ' + '\n' +
          '   ' + chalk.cyan('|//') + chalk.yellow('+  |') + chalk.cyan('[^_/\\_]') + chalk.yellow('|') + '   /----------------------------  ' + '\n' +
          '  ' + chalk.yellow('|   | _|___') + '@@' + chalk.yellow('__|__') + '                                ' + '\n' +
          '  ' + chalk.yellow('+===+/  ///     ') + chalk.cyan('\\_\\') + '                               ' + '\n' +
          '   ' + chalk.cyan('| |_') + chalk.yellow('\\ /// HUBOT/') + chalk.cyan('\\\\') + '                             ' + '\n' +
          '   ' + chalk.cyan('|___/') + chalk.yellow('\\//      /') + chalk.cyan('  \\\\') + '                            ' + '\n' +
          '         ' + chalk.yellow('\\      /   +---+') + '                            ' + '\n' +
          '          ' + chalk.yellow('\\____/    |   |') + '                            ' + '\n' +
          '           ' + chalk.cyan('| //|') + '    ' + chalk.yellow('+===+') + '                            ' + '\n' +
          '            ' + chalk.cyan('\\//') + '      |xx|                            ' +
          '\n'
}

class HubotGenerator extends Generator {
  constructor () {
    super(...arguments)
    this.defaultAdapter = 'shell'
    this.defaultDescription = 'A simple helpful robot for your Company'
    // FIXME add documentation to these
    this.option('owner', {
      desc: 'Name and email of the owner of new bot (ie Example <user@example.com>)',
      type: String
    })

    this.option('name', {
      desc: 'Name of new bot',
      type: String
    })

    this.option('description', {
      desc: 'Description of the new bot',
      type: String
    })

    this.option('adapter', {
      desc: 'Hubot adapter to use for new bot',
      type: String
    })

    this.option('defaults', {
      desc: "Accept defaults and don't prompt for user input",
      type: Boolean
    })

    if (this.options.defaults) {
      this.options.owner = this.options.owner || this.determineDefaultOwner()
      this.options.name = this.options.name || this.determineDefaultName()
      this.options.adapter = this.options.adapter || this.defaultAdapter
      this.options.description = this.options.description || this.defaultDescription
    }

    if (this.options.owner === true) {
      this.env.error('Missing owner. Make sure to specify it like --owner="<owner>"')
    }

    if (this.options.name === true) {
      this.env.error('Missing name. Make sure to specify it like --name="<name>"')
    }

    if (this.options.description === true) {
      this.env.error('Missing description. Make sure to specify it like --description="<description>"')
    }

    if (this.options.adapter === true) {
      this.env.error('Missing adapter name. Make sure to specify it like --adapter=<adapter>')
    }
  }

  async determineDefaultOwner () {
    const userName = await this.git.name()
    const userEmail = await this.git.email()

    if (userName && userEmail) {
      return userName + ' <' + userEmail + '>'
    } else {
      return 'User <user@example.com>'
    }
  }

  determineDefaultName () {
    return this.#slugify(this.appname)
  }

  #slugify (text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  initializing () {
    this.externalScripts = [
      'hubot-diagnostics',
      'hubot-help',
      'hubot-redis-brain',
      'hubot-rules'
    ]
  }

  async prompting () {
    const botOwner = await this.determineDefaultName()
    if (this.options.defaults) {
      this.props = {
        botOwner: this.options.owner,
        botName: this.options.name,
        botDescription: this.options.description,
        botAdapter: this.options.adapter
      }
    } else {
      this.props = await this.prompt([
        {
          type: 'input',
          name: 'botOwner',
          message: 'My Owner',
          default: botOwner
        },
        {
          type: 'input',
          name: 'botName',
          message: 'Bot name',
          default: 'mybot'
        },
        {
          type: 'input',
          name: 'botDescription',
          message: 'Description',
          default: 'A simple helpful robot for your Company'
        },
        {
          type: 'input',
          name: 'botAdapter',
          message: 'Bot adapter',
          default: 'shell'
        }
      ])
    }
    return this.props
  }

  writing () {
    this.log(hubotStartSay())
    this.fs.copyTpl(this.templatePath('bin/hubot.cmd'), this.destinationPath('bin/hubot.cmd'), this.props)
    this.fs.copyTpl(this.templatePath('bin/hubot'), this.destinationPath('bin/hubot'), this.props)
    this.copyTemplate('scripts/', 'scripts/', null, this.props)
    this.fs.copyTpl(this.templatePath('Procfile'), this.destinationPath('Procfile'), this.props)
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), this.props)
    this.writeDestinationJSON('external-scripts.json', this.externalScripts)
    this.copyTemplate('gitignore', '.gitignore', null, this.props)
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.props)
  }

  end () {
    this.log(hubotEndSay())
  }
}

export default HubotGenerator
