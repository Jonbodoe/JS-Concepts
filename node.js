// NODE JS CONCEPTS

// REPLs are processes that read, evaluate, print, and repeat (loop), 
// and Node.js comes with its own REPL we can access in our terminal 
// with the node command.

// We can make our own instances of the EventEmitter class and we can 
// subscribe to listen for named events with the .on() method and emit 
// events with the .emit() method.

// Node uses an event loop which enables asynchronous actions to be 
// handled in a non-blocking way by adding callback functions to a 
// queue of tasks to be executed when the callstack is empty. 

// In order to handle errors during asynchronous operations, provided 
// callback functions are expected to have an error as their first parameter.

// Streams allow us to read or write data piece by piece instead of all at once



let events = require('events');

let listenerCallback = (data) => {
    console.log('Celebrate ' + data);
}
let myEmitter = new events.EventEmitter();

myEmitter.on('celebration', listenerCallback)

myEmitter.emit('celebration', 'Lily Pad')

// Used to register events in node.js


process.memoryUsage()
// Returns an object. ^^^

// Heap can mean different things in different contexts: a heap can refer to a specific data structure, but it can also refer to the a block of computer memory. process.memoryUsage().heapUsed will return a number representing how many bytes of memory the current process is using. 


// node myProgram.js testing several features
// - console.log(process.argv[3]); // Prints 'several'


// The process.argv property holds an array of command line values provided when the current process was initiated
// - The process.env property is an object which stores and controls information about the environment in which the process is currently running


console.log(`Your word is ${word}`)

// Create a new array
let wordArray = [];

// Loop 1000 times, pushing into the array each time 
for (let i = 0; i < 1000; i++) {
    wordArray.push(`${word} count: ${i}`)
}

console.log(
    `Starting memory usage: ${initialMemory}. \nCurrent memory usage: 
    ${process.memoryUsage().heapUsed}. \nAfter using the loop to add 
    elements to the array, the process is using 
    ${process.memoryUsage().heapUsed - initialMemory} more bytes of memory.
`)



// Core Modules and Local Modules

module.exports = class Cat {
    constructor(name, clawStrength) {
      this.name = name;
      this.clawStrength = clawStrength;
    }
  };

  module.exports = class Dog {
    constructor(name, toothStrength) {
      this.name = name;
      this.toothStrength = toothStrength;
    }
  };

  // Require modules in:
let Cat = require('./cat.js')
let Dog = require('./dog.js')

let fight = (dog, cat) => {
    if (dog.toothStrength > cat.clawStrength) {
        console.log(`${dog.name} wins!`);
    }
    else if (dog.toothStrength < cat.clawStrength) {
        console.log(`${cat.name} wins!`);
    }
    else {
        console.log(`${dog.name} and ${cat.name} are equally skilled fighters!`);

    }
}

const myDog = new Dog('Rex', Math.random());
const myCat = new Cat('Tabby', Math.random());

fight(myDog, myCat);




// ----- Listening to user input ----- 

let secretValue = Math.floor(1+Math.random()*10).toString();

let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// module.exports = {
  testNumber: (input) => {
   if (input === 'quit') {
    process.stdout.write('Ok. Bye!\n')
    process.exit();
  }
  if (!numbers.includes(input)) {
    process.stdout.write('Choose a number from 1 through 10!\nIs the number ... ')
  } else if (input === secretValue) {
    process.stdout.write('Woah you got it! Are you psychic? See you later!\n')
    process.exit();
  } else {
    process.stdout.write("Nope. Guess again!\nIs the number ... ");
  }
  }
// }

// let {testNumber} = require('./game.js');

process.stdout.write("I'm thinking of a number from 1 through 10. What do you think it is? \n(Write \"quit\" to give up.)\n\nIs the number ... ");

let playGame = (userInput) => {
  let input = userInput.toString().trim();
	testNumber(input);
};

process.stdin.on('data', playGame);
// The event listener





// ------ API HANDLING ---------

module.exports = {
  errorProneAsyncApi: (input, callback) => {
    console.log(`Running errorProneAsyncApi with input: ${input}...\n`)
    setTimeout(() => {
      let myErr;
      if (input === 'problematic input') {
        myErr = new Error('whoops')
        callback(myErr)
      } else {
        let responseData = `Received valid input "${input}"`
        callback(myErr, responseData)
      }
    }, 0)
  },
  
  naiveErrorProneAsyncFunction: (input, callback) => {
    console.log(`Running naiveErrorProneAsyncFunction with input: ${input}...\n`)
    setTimeout(() => {
      if (input === 'problematic input') {
        throw new Error('whoops')
      } else {
        let responseData = `Received valid input "${input}"`
        callback(responseData)
      }
    }, 0)
}
  
}

const api = require('./api.js');

// An error-first callback
let errorFirstCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong. ${err}\n`);
  } else {
    console.log(`Something went right. Data: ${data}\n`);
  }
};

api.errorProneAsyncApi('problematic input',errorFirstCallback)



// reading files using require('fs') filesystem 

const fs = require('fs');

let secretWord = null;

let readDataCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    console.log(`Provided file contained: ${data}`);
  }
};

//fs.readFile('./fileOne.txt', 'utf-8', readDataCallback);
//fs.readFile('./anotherFile.txt', 'utf-8', readDataCallback);
fs.readFile('./finalFile.txt', 'utf-8', readDataCallback);

secretWord = "cheeseburgerpizzabagels"




// -----------------


// Readable Streams


const readline = require('readline');
const fs = require('fs');

let settings = {
  input: fs.createReadStream('shoppingList.txt')
};

const myInterface = readline.createInterface(settings);

const printData = (data) => {
  console.log(`Item: ${data}`);
};

myInterface.on('line', printData);




// ----------------


// Setup server on localhost


const fs = require('fs');

module.exports = {
  requestListener: (req, res) => {
  fs.readFile('./myWebsite.html',  'utf-8', (err, data) => {
    if (err){
      res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`${err}`);
    res.end();
    } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end(); 
    }
  })
}
}

const http = require('http');
let {requestListener} = require('./callbackFile.js');
const PORT = process.env.PORT || 4001;

const server = http.createServer(requestListener);

server.listen(PORT)




