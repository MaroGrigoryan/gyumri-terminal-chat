# Iterate Gyumri `node` Project

This is a project for the `iterate` hackerspace in Gyumri, Armenia.

# Getting the project ready.

To work on this project, you need to `fork` the project, see the
button in the top right that says fork. Then you will have your own
copy of the project. Once you have a copy of the project, you need to
`clone` the project. You can do that with: 

```
$ git clone https://github.com/YOUR_GITHUB_NAME/gyumri-terminal-chat.git
```

Notice that `YOUR_GITHUB_NAME` should be your github account name.

Once you clone the project, you can get all the dependencies of the
project with `npm`. Once in the project, do: 

```
$ npm install 
```

And that will create a `node_modules` directory with all the needed
libraries for this project. 

To see how to use the libraries, look up the `README`, use `npm`.
For example:

```
$ npm info commander
```

You can see all the libraries used in the `package.json` file under `dependencies`

**YOU ARE ONLY ALLOWED TO USE THE LIBRARIES THAT ARE LISTED IN THE
PACKAGE.JSON AND NODE CORE**

# Requirements

You should use the `index.js` as the entry point to start the program
and it should use the `commander` library for nice command line
parsing/argument handling. For example, we should be able to do this:

Here are running as client

```
$ node index.js --service=client --location=localhost --port=5000
```

And here we are running as server, the server basically just transmits
messages to connected clients.

```
$ node index.js --service=server --port=5000
```

# Example chat log

Once clients are connected, we should see a UI like this: 

```
(Yerevan)[Edgar]: blah blah
(Gyumri)[Rob]: glah glah 
(Stepanakert)[Hasmik]: plah plah
```

The location of City should come from a lookup using the `maxminddb`
library, it is listed in dependencies of this project. The UI will
need to be pretty, use `blessed-contrib` for that. Once the project is
stable and known to work locally, we will deploy it to a real server
so that we can use it all over Armenia. Features such as
authentication will need to be added later.

# Development flow

Once you do good work on your fork, you need to commit and push to
your fork. Then you open a pull request to the original repo on the
iteratehackerspace github organization where someone will review the
code.
