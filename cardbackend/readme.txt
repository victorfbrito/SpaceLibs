# AdonisJS

	API REST for commitment schedule system

-------------------------------------------------------------------------------------------
## Node Installation & Dependencies

NodeJs: https://nodejs.org/en/download/ (follow your own operating system instructions)
	You can check your Node version by running in your cmd:
	 ```   
		node -v   

Adonis: 
	```npm install -g @adonisjs/cli

Server config
	
	redis:
		docker run --name redis -p 6379:6379 -d redis:alpine
	postgres:
		-port redirect 5432:5432
		-image kartoza/postgis
		-dialect postgres
		-username: docker
		-password: docker
	
	npm install moment
	npm i --save pg
	npm install -D eslint
	npx eslint --init
		ESLint will ask you to set some configs, so choose:
		1-Check syntax, find problems and enforce code style
		2-CommonJS(require/exports)
		3-If asked about using React, Vue.js or None of these, choose None of these
		4-Node
		5-Use a popular style guide
		6-Standard
		7-JSON format
		8-If asked to npm install the dependencies required, type Y
	
	If you're using a node version below 10.0, you'll need to run 
		```npm install crypto
	npm install raven
	npm install adonis-kue
	adonis kue:listen
	adonis install @adonisjs/mail
	adonis install @adonisjs/antl
	adonis install @adonisjs/redis
	then:
	adonis migration:run
##Usage 
	adonis serve --dev
	adonis kue:listen

## Insomnia

	Insomnia Core: https://insomnia.rest/download/ (follow your operating system instructions)
	A file containing Insomnia requests structure can be found in this folder to help you configure it.
	Environment variables must be:
	{
  	"base_url": "http://localhost:3000",
  	"token": Create a session and insert it's token here
	}

	A previously tested Insomnia workspace can be found in your folder
	
## MailTrap
		We're using this site to test e-mail sending
		http://mailtrap.io/
		When you've created an inbox, fill the mail settings in .env file with your inbox credentials

## Sentry 
	
	Exception handler, http://sentry.io
	
	Create a NodeJS Project and follow given installation instructions

	npm install @sentry/node@5.18.1
	