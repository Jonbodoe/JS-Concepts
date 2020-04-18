// -------- CONCEPTS ABOUT ASYNC JAVASCRIPT FUNCTIONS --------
// Few Core Concepts : Pending, Furfilled, Rejected

// Async functions with Promises

const inventory = {
    sunglasses: 1900,
    pants: 1088,
    bags: 1344
  };
  
  // Write your code below:
  
  
  const myExecutor = (resolve, reject) => {
    if (inventory.sunglasses > 0) {
      resolve('Sunglasses order processed.')
    } else {
      reject('That item is sold out.')
    }
  }
  
  const orderSunglasses = () => new Promise(myExecutor)
  
  let orderPromise = orderSunglasses()
  
  console.log(orderPromise)


// Async Functions with setTimout()

console.log("This is the first line of code in app.js.");

const usingSTO = () => {
  console.log("lol")
}

setTimeout(usingSTO, 10)

console.log("This is the last line of code in app.js.");

// RESULT
// console.log("This is the first line of code in app.js.")
// console.log("This is the last line of code in app.js.")
// console.log("lol") <<<<< last despite time


// Fulfilled and Rejcted Functions

const inventory = {
    sunglasses: 1900,
    pants: 1088,
    bags: 1344
};

const checkInventory = (order) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let inStock = order.every(item => inventory[item[0]] >= item[1]);
            // Checks if every item between array item 0 & 1 is true if condition is met
            if (inStock) {
                resolve(`Thank you. Your order was successful.`);
            } else {
                reject(`We're sorry. Your order could not be completed because some items are sold out.`);
            }
        }, 1000);

    })
};
// Node Version of Exporting 
// module.exports = { checkInventory };

// Node Version of Importing
// const {checkInventory} = require('./library.js');

const order = [['sunglasses', 1], ['bags', 2]];

const handleSuccess = (resolved) => {
  console.log(resolved)
}

const handleFailure = (rejected) => {
  console.log(rejected)
}

checkInventory(order).then(handleSuccess, handleFailure)


// CHEATSHEET
// https://www.codecademy.com/learn/asynchronous-javascript/modules/javascript-promises/cheatsheet










// NESTING PROMISES AND .THEN()'s

const store = {
  sunglasses: {
    inventory: 817, 
    cost: 9.99
  },
  pants: {
    inventory: 236, 
    cost: 7.99
  },
  bags: {
    inventory: 17, 
    cost: 12.99
  }
};

const checkInventory = (order) => {
  return new Promise ((resolve, reject) => {
   setTimeout(()=> {  
   const itemsArr = order.items;  
   let inStock = itemsArr.every(item => store[item[0]].inventory >= item[1]);
   
   if (inStock){
     let total = 0;   
     itemsArr.forEach(item => {
       total += item[1] * store[item[0]].cost
     });
     console.log(`All of the items are in stock. The total cost of the order is ${total}.`);
     resolve([order, total]);
   } else {
     reject(`The order could not be completed because some items are sold out.`);
   }     
}, generateRandomDelay());
 });
};

const processPayment = (responseArray) => {
  const order = responseArray[0];
  const total = responseArray[1];
  return new Promise ((resolve, reject) => {
   setTimeout(()=> {  
   let hasEnoughMoney = order.giftcardBalance >= total;
   // For simplicity we've omited a lot of functionality
   // If we were making more realistic code, we would want to update the giftcardBalance and the inventory
   if (hasEnoughMoney) {
     console.log(`Payment processed with giftcard. Generating shipping label.`);
     let trackingNum = generateTrackingNumber();
     resolve([order, trackingNum]);
   } else {
     reject(`Cannot process order: giftcard balance was insufficient.`);
   }
   
}, generateRandomDelay());
 });
};


const shipOrder = (responseArray) => {
  const order = responseArray[0];
  const trackingNum = responseArray[1];
  return new Promise ((resolve, reject) => {
   setTimeout(()=> {  
     resolve(`The order has been shipped. The tracking number is: ${trackingNum}.`);
}, generateRandomDelay());
 });
};


// This function generates a random number to serve as a "tracking number" on the shipping label. In real life this wouldn't be a random number
function generateTrackingNumber() {
  return Math.floor(Math.random() * 1000000);
}

// This function generates a random number to serve as delay in a setTimeout() since real asynchrnous operations take variable amounts of time
function generateRandomDelay() {
  return Math.floor(Math.random() * 2000);
}



// THE ORDER



const order = {
  items: [['sunglasses', 1], ['bags', 2]],
  giftcardBalance: 79.82
};

// BEST PRACTICE, CHAIN THENS BUT RETURNS PROMISES 
checkInventory(order)
.then((resolvedValueArray) => {
  // Write the correct return statement here:

 return processPayment(resolvedValueArray);


})
.then((resolvedValueArray) => {
  // Write the correct return statement here:


  return shipOrder(resolvedValueArray);


})
.then((successMessage) => {
  console.log(successMessage);
})
.catch((errorMessage) => {
  console.log(errorMessage);
});




// Check all promises occuring all at once using Promise.all()

const checkAvailability = (itemName, distributorName) => {
  console.log(`Checking availability of ${itemName} at ${distributorName}...`);
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (restockSuccess()) {
              console.log(`${itemName} are in stock at ${distributorName}`)
              resolve(itemName);
          } else {
              reject(`Error: ${itemName} is unavailable from ${distributorName} at this time.`);
          }
      }, 1000);
  });
};



// This is a function that returns true 80% of the time
// We're using it to simulate a request to the distributor being successful this often
function restockSuccess() {
  return (Math.random() > .2);
}



const onFulfill = (itemsArray) => {
  console.log(`Items checked: ${itemsArray}`);
  console.log(`Every item was available from the distributor. Placing order now.`);
};

const onReject = (rejectionReason) => {
	console.log(rejectionReason);
};

// Write your code below:

const checkSunglasses = checkAvailability('sunglasses', 'Favorite Supply Co.')
const checkPants = checkAvailability('pants', 'Favorite Supply Co.')
const checkBags = checkAvailability('bags', 'Favorite Supply Co.')
// storing values of the returned promises

Promise.all([checkSunglasses, checkPants, checkBags]).then(onFulfill).catch(onReject)
// Used to run the entire listing of Promises