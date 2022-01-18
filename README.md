# react-dang

###### React basic application and lightweight production server.

> ℹ README for branch v0.0.x
___

## Index of Contents

- [react-dang commands & flags](#react-dang-commands--flags)
- [Once Installed](#once-installed)
  - [Description](#description)
  - [The serve library](#the-serve-library)
- [Usage](#usage)

___

### react-dang commands & flags

- #### install [ i ]

The `install` command will instantiate a React project based on [@react-dang/app](https://github.com/simonedelpopolo/react-dang-app/)

  - available flags  
    - --name [ -n ] &lt;string&gt; - Sets the project-name. It will be the property name of the package.json.  
    - --directory [ -d ] &lt;string&gt; - Sets directory name where the project is deployed.  
    - --replace [ -r ] &lt;null&gt; - This flag doesn't have a value. Instantiates the project in the current working directory.  
      - ⚠ the --replace flag will overwrite everything in the current working directory
  - road map for flags
    - [ ] --blank [ -b ] &lt;null&gt; - Instantiates a React project without any components. A blank project.
    - [ ] --author [ -a ] &lt;string&gt; - Sets the author name [package.json].  
    - [ ] --license [ -l ] &lt;string&gt; - Sets the licence [package.json].  
    - [ ] --description [ -s ] &lt;string&gt; - Sets the description [package.json].  
    - [ ] --git [ -g ] &lt;null&gt; - Initializes the local git repository.  
    - [ ] --url-repository [ -u ] &lt;string&gt; - Sets the git repository url [package.json].
    - [ ] --dependency [ -i ] &lt;json&gt; - Sets extra-dependencies [package.json].
    - [ ] --devDependency [ -id ] &lt;json&gt; - Sets extra-devDependencies [package.json].
    - [ ] --scripts [ -s ] &lt;json&gt; - Sets extra-scripts [package.json].

___

- #### version [ v ]

the `version` command shows the installed version of react-dang.
___

- #### help 

the `help` command shows the help.
___

### Usage

```shell

npx react-dang install --name='my-react-app' --directory='my-react-app'

```

> ℹ react-dang deletes the module @react-dang/app completely from the hard drive.

```shell

cd my-react-app
npm run build-dev 
# this will watch for file changes and it will compile once saved.

# ℹ open another terminal
npm run serve-dev
# ℹ open the browser at http://localhost:3000
```

> ℹ The simplest usage `npx react-dang i`  
> _It will generate the project-name and the directory_
___

### Once Installed

- #### Description

The ReactDang Application is a npmjs package that will initialize a Basic React Web Application having two default pages to start working with.  
Home page and a Contacts page.

It uses:
- Babel under the hood to compile the React Application.  
- eslint for linting.  
- It spins up webpack with two default configurations:

  - Development -> It builds the javascript specifically for webpack devServer.
  - Production -> It builds the app with some performance improvements.

Available Components:

- Header -> Handles the header shared between the web application pages.
- Links -> Handles the available links of the web application. It is imported in the Header.
- Index -> Handles the Home Page.
- Contacts -> Handles the Contacts Page.
- ContactForm -> Basic contact form. It is imported in the Contacts.  
  - ⚠ Necessary from the developer to project the business logic of it, in particular DB and server side.  
- Footer -> Handles the footer shared between the web application pages.

___

- #### The serve library

This is a personal experimental server to serve the React generated code.  
I have noticed a much better resource consumption, in terms of CPU and RAM by using a self-created library instead of using webpack serve function.  
In certain cases I saw a 70% less resource usage.  
> ⚠ Consider this ABSOLUTELY not ready for production environment but try it out for testing and profiling.

> ℹ use it with production compiled React because it lacks of the socket connection to handle the hot and live reload provided by webpack devServer

  - Spin up the alpha server library.
```shell 
npm run build-serve.server-alpha 
# this script will compile the production and launch the serve library`

# OR
npm run build-prod # ℹ CTRL+c to stop watching

node ./lib/serve.js # if you like it ;)

# ℹ open the browser at http://localhost:3000

```

```javascript
// ℹ to modify the port of the serve library
// file ./lib/index.js
// around line 52 you can modify port and address if needed

server.listen( 3001, '0.0.0.0', null,
    () => {
        console.log( server.address() )
        console.log( `http://${ server.address().address }:${ server.address().port }` )
    } 
)
```

___
