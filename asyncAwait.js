// ASYNC & AWAIT 

// CheatSheet
// https://www.codecademy.com/learn/asynchronous-javascript/modules/asynch-js/cheatsheet

// async functions always return a promise. This means we can use 
// traditional promise syntax, like .then() and .catch with our 
// async functions. An async function will return in one of three ways:

// 1. If there’s nothing returned from the function, it will return a 
// promise with a resolved value of undefined

// 2. If there’s a non-promise value returned from the function, it will 
// return a promise resolved to that value.

// 3. If a promise is returned from the function, it will simply return that promise

// EXAMPLE:
// async function fivePromise() { 
//   return 5;
// }

// fivePromise()
// .then(resolvedValue => {
//     console.log(resolvedValue);
//   })  // Prints 5





// ------- Async with Promises


function withConstructor(num) {
    return new Promise((resolve, reject) => {
        if (num === 0) {
            resolve('zero');
        } else {
            resolve('not zero');
        }
    })
}

withConstructor(0)
    .then((resolveValue) => {
        console.log(` withConstructor(0) returned a promise which resolved to: ${resolveValue}.`);
    })


//--------- WITH ASYNC, NO NEW PROMISE KEYWORD LIKE ABOVE
// Write your code below:
async function withAsync(num) {
    if (num === 0) {
        return 'zero';
    } else {
        return 'not zero';
    }
}

withAsync(100)
    .then((resolveValue) => {
        console.log(` withAsync(100) returned a promise which resolved to: ${resolveValue}.`);
    })


// OR


function nativePromiseDinner() {
    brainstormDinner().then((meal) => {
        console.log(`I'm going to make ${meal} for dinner.`);
    })
}


// async/await version:
async function announceDinner() {
    // Write your code below:
    await brainstormDinner()
    // runs this first, before finishing the function 
    // await keyword halts the execution of an async function until a promise is no longer pending
    brainstormDinner().then((meal) => {
        console.log(`I'm going to make ${meal} for dinner.`);
    })
}





// The await keyword can only be used inside an async function. 
// await is an operator: it returns the resolved value of a promise. 
// Since promises resolve in an indeterminate amount of time, await 
// halts, or pauses, the execution of our async function until a 
// given promise is resolved. 




//--------- Await vs No-Await

let myPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Yay, I resolved!')
        }, 1000);
    });
}

async function noAwait() {
    let value = myPromise();
    console.log(value);
}

async function yesAwait() {
    let value = await myPromise();
    console.log(value);
}

noAwait(); // Prints: Promise { <pending> }
yesAwait(); // Prints: Yay, I resolved!


// Chaining Awaits in Async versus Promises with then.

const { shopForBeans, soakTheBeans, cookTheBeans } = require('./library.js');

// Write your code below:

const makeBeans = async () => {
    const type = await shopForBeans()
    // Dependent on shopForBeans to finish
    const isSoft = await soakTheBeans(type)
    // Dependent on soakTheBeans function finishing first
    const dinner = await cookTheBeans(isSoft)
    // Dependent on cookTheBeans
    console.log(dinner)
    // If all completed it will console log

}
makeBeans()
// Invoked


//------------ Handling Errors


//This function returns true 50% of the time.
let randomSuccess = () => {
    let num = Math.random();
    if (num < .5) {
        return true;
    } else {
        return false;
    }
};

//This function returns a promise that resolves half of the time and rejects half of the time
let cookBeanSouffle = () => {
    return new Promise((resolve, reject) => {
        console.log('Fingers crossed... Putting the Bean Souffle in the oven');
        setTimeout(() => {
            let success = randomSuccess();
            if (success) {
                resolve('Bean Souffle');
            } else {
                reject('Dinner is ruined!');
            }
        }, 1000);
    })
};

module.exports = cookBeanSouffle;

const cookBeanSouffle = require('./library.js');

// Write your code below:

async function hostDinnerParty() {
    try {
        let value = await cookBeanSouffle()
        console.log(`${value} is served!`)
    }

    catch (error) {
        console.log(error)
        console.log('Ordering a pizza!')
    }
}
hostDinnerParty()



//  ---------- Handling Independent Promises


let { cookBeans, steamBroccoli, cookRice, bakeChicken } = require('./library.js')

// Write your code below:

async function serveDinner() {
    let vegetablePromise = steamBroccoli();
    let starchPromise = cookRice();
    let proteinPromise = bakeChicken();
    let sidePromise = cookBeans();
    console.log(
            `Dinner is served. We're having 
        ${await vegetablePromise}, 
        ${await starchPromise}, 
        ${await proteinPromise}
        , and 
        ${await sidePromise}.`
        // Better to declare await with the variable to be concurrent or use promise.all() below
    )
}

serveDinner()

// OR USE PROMISE.ALL()
// All instances are required but not dependent on each other


let { cookBeans, steamBroccoli, cookRice, bakeChicken } = require('./library.js')

// Write your code below:
async function serveDinnerAgain() {
    let foodArray = await Promise.all([steamBroccoli(), cookRice(), bakeChicken(), cookBeans()]);

    console.log(
        `Dinner is served. We're having 
        ${foodArray[0]}, 
        ${foodArray[1]}, 
        ${foodArray[2]}, 
        and 
        ${foodArray[3]}.`
    )
}

serveDinnerAgain()




