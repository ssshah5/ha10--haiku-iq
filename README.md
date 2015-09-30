# Hack Academy Node Starter Project [![Build Status](http://drone.rtp.raleigh.ibm.com/api/badge/github.ibm.com/FED/ha--node-starter/status.svg?branch=master)](http://drone.rtp.raleigh.ibm.com/github.ibm.com/FED/ha--node-starter)

Welcome to Hack Academy!

This repository will be the starting place for your work through Hack Academy. Following the instructions below will get you set up and ready to start working. Many items may seem new at first, but as you progress through Hack Academy, everything should become more familiar. We encourage you to make this codebase your own!

## Pre Setup

Before we get started, the following items need to be installed on our computers:

[Git](http://git-scm.com/downloads) - Check to see if it's installed by running `git --help` in your terminal

If you are on an **Apple Computer**:

1. [Homebrew](http://brew.sh/) - Check to see if it's installed by running `brew -h` in your terminal
2. [NVM](https://github.com/creationix/nvm) - Install by running `brew install nvm` in your terminal.
3. Run `touch ~/.bash_profile`, then `open ~/.bash_profile`. This will create and open a file that allows your terminal to be set up. If you know you are running a different terminal, open that terminal's profile file (for instance, ZSH's file is `~/.zshrc`).
4. Add the following to your `~/.bash_profile` file: `export NVM_DIR=~/.nvm` `source $(brew --prefix nvm)/nvm.sh`, each on separate lines. Save the file, close your terminal, and restart it.
5. [Node.js](https://nodejs.org/) - Install by running `nvm install v0.12` in your terminal.
6. Add `nvm use v0.12` on a new line to the same file you edited in Step 3. Save, close, and re-open your terminal
7. [Bower](http://bower.io/) - Check to see if it's installed by running `bower -h`

If you are on a **Windows Computer**

1. [NVM for Windows](https://github.com/hakobera/nvmw)
2. [Node.js](https://nodejs.org/) - Install by running `nvm install v0.12` in your terminal.
3. Add `nvm use v0.12` to the same file you edited in Step 2. Save, close, and re-open your terminal
4. [Bower](http://bower.io/) - Check to see if it's installed by running `bower -h`

If you are on a **Linux Computer**

1. [NVM](https://github.com/creationix/nvm) - Check to see if it's installed by running `nvm -h`
2. Run `touch ~/.bash_profile`, then `open ~/.bash_profile`. This will create and open a file that allows your terminal to be set up. If you know you are running a different terminal, open that terminal's profile file (for instance, ZSH's file is `~/.zshrc`).
3. Add the following to your `~/.bash_profile` file: `export NVM_DIR=~/.nvm` `source $(brew --prefix nvm)/nvm.sh`, each on separate lines. Save the file, close your terminal, and restart it.
4. [Node.js](https://nodejs.org/) - Install by running `nvm install v0.12` in your terminal.
5. Add `nvm use v0.12` on a new line to the same file you edited in Step 2. Save, close, and re-open your terminal
6. [Bower](http://bower.io/) - Check to see if it's installed by running `bower -h`

## Getting Started

The following steps should be done by a single member of each team.

### A Copy Of Your Own

The first thing you'll need to do is [fork](https://guides.github.com/activities/forking/) this repository to your own account. This will give you an exact copy of this repo that you can start working from! Once you've forked the repo, [add an SSH key](https://github.ibm.com/settings/ssh) to your account. After you've added an SSH key, go back to your fork and copy the **SSH clone URL** (it should look like `git@github.ibm.com:FED/ha--node-starter.git` with your username instead of `FED`), and clone the repository to your computer! If you are using command-line Git, that will look something like this:

```bash
$ git clone git@github.ibm.com:FED/ha--node-starter.git
```

#### Adding your Team

Each member of your team should follow the **add an SSH key** and **clone** steps above. The person who forked the repo should go to, from their fork **Settings->Collaborators** and add their team members to the repo.

### Moar Account Setup

In addition to GitHub Enterprise and a local clone of your project, there are two other accounts that you will need to set up: Bluemix and Travis.

If you have not already, go to [Bluemix](https://console.ng.bluemix.net/) and sign up for an account. Once logged in, add a Space and give it a name _without spaces in it_. Remember this, you'll need it in a moment.

Once signed up for Bluemix, go to [Travis](https://travis.innovate.ibm.com/repositories) and log in with your GitHub Enterprise account. Once there, hit **Browse All**, find your forked repo, and add it. Once added, go to the project's **Settings** on Travis and add the following **environment variables**:

```yaml
CF_USERNAME
CF_PASSWORD
CF_ORGANIZATION
CF_SPACE
```

**CF_USERNAME** is your Bluemix username (probably an email address), **CF_PASSWORD** is your Bluemix password in plain text (I know, CloudFoundry requires your password :sob:), **CF_SPACE** is the space you've made for your project, and **CF_ORGANIZATION** is the organization you are in in Bluemix (if its your email address, change it to a single word). Once you've added all of these things, copy the **Status Badge** code and replace the code in this README with your code!

#### Updating your App

There are two additional files you need to update; `.travis.yml` and `manifest.yml`. These are both [YAML](http://yaml.org/) files; syntax highlighters should be available for your favorite code editor.

Open up `manifest.yml` and change the `host` value to include your team name, something like `ha--{{team name}}` replacing `{{team name}}` with your team's name. No spaces allowed. You can change the `name` value too there, if you'd like.

Commit all of the changes in, and push to `master`! This will trigger Travis to start a build of your project and deploy it to Bluemix once done!

## Installation

After following the [Getting Started](#getting-started) guide, everyone on your team should now have a locally cloned copy of the codebase. Run these two commands from the root of your cloned codebase, and you'll be good to go:

* `npm install`
* `npm run install:bower`

The first will install all of your Node dependencies, the second will install all of your [Bower](http://bower.io/) dependencies. Bower can be run via `npm run bower` followed by the command you'd like to use Bower.Alternatively, you can install Bower globally (`npm install -g bower`) and simply run `bower {{command}}`.

## Running

Running your project for development is a single command:

```bash
npm run gulp
```

This will run [Gulp](http://gulpjs.com/), starting your Node server, wrapping it in a proxy server that will be accessible on multiple devices and live reload your assets, and watch your Node file for changes, stopping and starting the Node server on changes. It will also lint all of your JavaScript and Sass, compile your Sass, Uglify your JavaScript, and optimize your Images (yay Task Runners!).

## Testing and Deploying to Bluemix

Testing and deploying to Bluemix is all done through Travis, which you should already have set up. Whenever a commit comes in to any branch of your repository, Travis will start up and run `npm gulp test`. If it finds any errors, it'll be angry :rage: and you'll need to go fix them. Once all of your tests pass, Travis will be happy again :green_heart:. If you want to add tests to run, add some Gulp tasks and make sure they're run during the `test` Gulp task.

If a commit comes in to the `master` branch and all of the tests pass, Travis will use CloudFoundry to create a deployable app from your source code and go deploy it on Bluemix! Then, head over to your URL to see it live!

You can see the main repo's deployed website [live on Bluemix](http://ha--node-starter.mybluemix.net/).
