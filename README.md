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
6. Add `nvm use v4.2` on a new line to the same file you edited in Step 3. Save, close, and re-open your terminal
7. [Bower](http://bower.io/) - Check to see if it's installed by running `bower -h`

If you are on a **Windows Computer**

1. [NVM for Windows](https://github.com/hakobera/nvmw)
2. [Node.js](https://nodejs.org/) - Install by running `nvm install v0.12` in your terminal.
3. Add `nvm use v4.2` to the same file you edited in Step 2. Save, close, and re-open your terminal
4. [Bower](http://bower.io/) - Check to see if it's installed by running `bower -h`

If you are on a **Linux Computer**

1. [NVM](https://github.com/creationix/nvm) - Check to see if it's installed by running `nvm -h`
2. Run `touch ~/.bash_profile`, then `open ~/.bash_profile`. This will create and open a file that allows your terminal to be set up. If you know you are running a different terminal, open that terminal's profile file (for instance, ZSH's file is `~/.zshrc`).
3. Add the following to your `~/.bash_profile` file: `export NVM_DIR=~/.nvm` `source $(brew --prefix nvm)/nvm.sh`, each on separate lines. Save the file, close your terminal, and restart it.
4. [Node.js](https://nodejs.org/) - Install by running `nvm install v0.12` in your terminal.
5. Add `nvm use v4.2` on a new line to the same file you edited in Step 2. Save, close, and re-open your terminal
6. [Bower](http://bower.io/) - Check to see if it's installed by running `bower -h`

At the end, you should have command line Git, NVM, and Bower installed, as well as Node v4.2 and, if you're a Mac user, Homebrew. After installing Node, run the following command: `npm install -g yo generator-hackademy && brew tap cloudfoundry/tap && brew install cf-cli`. This will install [Yeoman](http://yeoman.io/), a Yeoman generator for Hackademy that we will be using, and the Cloud Foundry Command Line interface for pushing to Bluemix.

It is important these steps are followed as we want to ensure that Node is installed via NVM to easily switch versions and ensure it is available without root access. If you are on a Mac and installed Node from the installer instead of Homebrew/NVM, please follow [these instructions](http://benznext.com/completely-uninstall-node-js-from-mac-os-x/) to remove it before starting over.

## Creating Your Project

Run `yo hackademy` from the command line to start scaffolding out your application! It will ask you to log in to [Bluemix](bluemix.net) and guide you through the process of setting up your project, even doing an initial deploy for you.

Once you've set up your project and pushed it up to GitHub Enterprise, enable [Travis](https://travis.innovate.ibm.com/repositories) for your project. Once enabled, add a `BLUEMIX_PASSWORD` environment variable to your [project's settings](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings). It should be set to your Bluemix password. Travis is now all set up to run your tests and deploy to Bluemix for you when you push to your `master` branch!

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
