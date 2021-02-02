// 2021-01-24  Juhani Välimäki
// ES5,6,7,(8,9) task prepping for the exam and the project
// Create a JS program, where you just use as many of the first exam features as you 
// can = learn them for the exam

// The business value of the app can be 0, as such, although some parts might become
// useful in th project.
// Create a UI if wish, or just play behind the scenes and print to 
// console and use debugger to see what happens in the memory

// First adhoc object, later maybe ES6 etc. class syntax
// e.g. class HealthStats later

// Pieces of info are markings, that might exist daily, or just for every 2-7 days
// With this info (Starting from most important, then more to allow more features/stats)

// * date - e.g. Date ,  with maybe no use for the hours in this case
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date - Maybe only day part
//   Good question: String in UI, Date in Front-end, What kind of String(?) in JSON, Date(?) in future Back-end, DATE(?) in RDB  

// * weight - Number, with one decimal, e.g. 96.4   (kg)   (0.1 kg accuracy)

// * waist - Number, maybe one decimal, e.g. 100.5   (cm)  (Half a centimeter accuracy)

// * kCal - Number, no decimal, e.g. 512     (kCal), amount of energy spent in exercise/sports

// * slept - Boolean,  true or fals,   meaning if the nightly sleep before the day was good/okay or not

// (Not here, but could be e.g. rest heart rate beats per minute - BPM )

// Now what could be information that is allowed to be missing is a "design decision", that 
// naturally affects the statistical analysis. E.g. clearly date cannot be missing. But kCal
// could be (then assuming no sports that day). Possibly also slept value (maybe assuming
// good sleep if not marked?).  
// Well, no anwers here, but good fuel for your design brain in general. Cases are never 100% straight forward
// For processing, if we decide so, the missing data could be assumed or interpolated there

const personalInfo = { name:"Mike", height:175, dob:new Date(1989, 0, 31), 
                       maxBpm: 188, weightGoal:85.0, waistGoal:95.5, goalDate:new Date(2021,6,1) };

const stats = [  
                    {date:new Date(2021, 0, 25), weight:96.4, waist:106.5, kCal:0,     slept:true,  },
                    {date:new Date(2021, 0, 27), weight:97.2, waist:105.0, kCal:512,                },
                    {date:new Date(2021, 1, 1),  weight:99.1, waist:108.0, kCal:1150,  slept:false, },
                    {date:new Date(2021, 1, 2),  weight:99.0, waist:107.5,             slept:true,  },
                    {date:new Date(2021, 1, 4),                            kCal:666                 },
                    {date:new Date(2021, 1, 5),  weight:98.9, waist:107.0,             slept:false, },
                ];

console.log(stats);

// Tasks: 

// Task 1: (atm only think) This kind of case would require a lot of test data that would be similar 
// to real life data. E.g. weight will not jump like 50.3 kg, 55.4 kg, 49.9, and so on.
// It's easy for the person measured over time to create natural stats like this. 
// But think how could you create similar test data, like five years of authentic looking data
// without typing all in manually?    
// That's about 5*200*4 = 4 000 logical interconnected data points 
// (Test data generation is a typical challenge in our customer projects)

    /* Logic: add a random weight value with "corresponding" waist increase/decrease. Create loops that randomly
    increase weight during december and july at a high rate (0,5-1,5 kg), decrease weight during spring at 
    a moderate rate ((-0,0)-(-1,0) kg) and maintain weight during autumn ((-0,5)-0,5 kg). Goal is to find a
    balance to where the data generated (fictive person) do not end up at 0 kg or 500 kg, but stays within 
    reasonable limits. Also, posting the results at random intervals, giving the "authentic" look of someone 
    who does not fill in the info every day.
    Trainings could be added in the same sense, few during december and july. More during autumn and spring. */

    // Here I'm just playing around trying to create some realistic looking data. 

    var date = new Date(2021, 1, 5);            // Starting date = last input in hardcoded data.

    var weight = 98.9;                          // Starting weight = last input in hardcoded data.

    var waist = 107.0;                          // Starting waist = last input in hardcoded data. 

    for(var i = 0; i < 10; i++) {               // Creates stats for x amount of days.

        const day = {};                         // This day's stats

        let randomNum = Math.floor(Math.random() * 5) + 1;

        var tomorrow = new Date(date.setDate(date.getDate() + 1));      // Increment date.
        day.date = tomorrow;

        if (randomNum < 5) {                    // 1 out of 5 days are not registered by the user. 
            
            // If randomNum = 1, add weight and waist value. If randomNum = 2 or 3 subtract value. 
            // The person wishes to loose weight and therefore there is a 2/3 chance he will loose weight.
            randomNum = Math.floor(Math.random() * 3) + 1;

            if(randomNum === 1) {       
                randomNum = Math.floor(Math.random() * 2) + 1;
                
                if(randomNum == 1) {
                    randomNum = Math.random();
                    weight = weight + randomNum;
                    day.weight = parseFloat(weight.toFixed(1));
                } else{
                    randomNum = Math.random();
                    weight = weight + randomNum;
                }
        
                if(randomNum == 1) {
                    randomNum = Math.random();
                    waist = waist + randomNum;
                    day.waist = parseFloat(waist.toFixed(1));
                } else{
                    randomNum = Math.random();
                    waist = waist + randomNum;
                }
            } else {
                randomNum = Math.floor(Math.random() * 2) + 1;

                if(randomNum == 1) {
                    randomNum = Math.random();
                    weight = weight - randomNum;
                    day.weight = parseFloat(weight.toFixed(1));
                } else{
                    randomNum = Math.random();
                    weight = weight - randomNum;
                }
                
                randomNum = Math.floor(Math.random() * 2) + 1;
                if(randomNum == 1) {
                    randomNum = Math.random();
                    waist = waist - randomNum;
                    day.waist = parseFloat(waist.toFixed(1));
                } else{
                    randomNum = Math.random();
                    waist = waist - randomNum;
                }
            }

            randomNum = Math.floor(Math.random() * 3) + 1;      // Exercises and inputs data 2/3 days.
            
            if(randomNum !== 1) {
                randomNum = Math.floor(Math.random() * 1201) + 200;     // Exercises vary between 200 - 1200 kCal. 
                day.kCal = randomNum;
            } 

            randomNum = Math.floor(Math.random() * 2) + 1;
            if (randomNum === 1) {
                randomNum = Math.floor(Math.random() * 3) + 1;  // 1/3 chance that the person slept bad. 
                if (randomNum === 1) {
                    slept = false;
                    day.slept = false;
                } else {
                    slept = true;
                    day.slept = true;
                }
            }
            
            stats.push(day);
        }
    }

    
    // Task 2: Then do whatever reports / analysis or so, with all the measurements you hard-coded above

//var hello = 'Hello!'              // Global scoped var (hello = 'Hello!'; === implicit global scope var)

/* ---------------------------------------------------------------------------------------------------------- */

const trainings = function () {
    let count = 0;                  // Function scoped let variable
    for (let i = 0; i < stats.length; i++) {
        if(stats[i].kCal > 0) {
            count++;
        }
    }
    console.log('You trained ' + count + ' times this period');
}
trainings();                        // Count trainings. A training is a day were more than 0 kCal is registred.

/* ---------------------------------------------------------------------------------------------------------- */

function avgWeight() {
    let totWeight = 0;
    let count = 0;
    for(let i = 0; i < stats.length; i++) {
        if (stats[i].weight != undefined) {
            totWeight = totWeight + stats[i].weight;
            count++;
        } 
    }

    const avgWeight = totWeight / count;

    console.log('Your logged average weight is: ' + avgWeight.toFixed(1)); 
}
avgWeight();                        // Shows the average LOGGED weight

/* ---------------------------------------------------------------------------------------------------------- */

function goal() {  
    for(let i = 0; i < stats.length; i++) {
        if (stats[i].weight <= personalInfo.weightGoal && stats[i].weight != null) {
            console.log('Congratz, you have reached your weight goal! ' + stats[i].date)
            break;
        } 
    }

    for(let i = 0; i < stats.length; i++) {
        if (stats[i].waist <= personalInfo.waistGoal && stats[i].waist != null) {
            console.log('Congratz, you have reached your waist goal! ' + stats[i].date)
            break;
        }
    }
}
goal();                             // Shows if and when the person reached their waist and/or weight goal

/* ---------------------------------------------------------------------------------------------------------- */

var wishedkCal = 500;               // Global var variable. 
function checkTrainings(calories) {
    var count = 0;

    for(let i = 0; i < stats.length; i++) {
        if(stats[i].kCal > calories) {
            count++
        }
    }

    console.log('You have ' + count + ' days where your training burned more than ' + calories + ' kilo-calories')
}
checkTrainings(wishedkCal);         // Check how many trainings burned more than 500 kCal. 

/* ---------------------------------------------------------------------------------------------------------- */

var sleepTraining = function(sleep, calories) {
    stats.forEach(day => {                              // Using forEach to cycle through the stats. 
        if(day.slept = sleep && day.kCal > calories) {
            console.log(day.date.toDateString() + ': You slept well and burned ' + day.kCal + ' that day')
        }
    })
}
sleepTraining(true, wishedkCal);    // Shows days where you slept well and burned more than 500 kCal. 

/* ---------------------------------------------------------------------------------------------------------- */

(function (message){                // IIFE = Immediately Invoked Function Expression 
    console.log(message);
} ('Hello!'));

/* ---------------------------------------------------------------------------------------------------------- */

const ageCheck = function(name) {   // A function that define and returns a function. Both requiering a value.
    console.log('Your name is ' + name)
    return function(age) {
        if(age <= 15) {
            console.log('But you are too young to join this gym')
        } else {
            console.log('And you are welcome to join this gym')
        }
    }
}
//ageCheck('Marcus')(24);             // Calling two functions in one line.
var ageCheckB = ageCheck('Marcus');   // Calling two functions in two lines.
ageCheckB(12);

/* ---------------------------------------------------------------------------------------------------------- */

var calculator = function(a, b) {
    let c; 
    b = Number(b);

    if(Number.isNaN(b)) {
        c = a % 2;
    } else {
        c = (a + b) % 2;
    }

    console.log(c)
}
calculator(3, 6);                       // Random calculator function. Requires only one value, but can take two. 
calculator(8);

/* ---------------------------------------------------------------------------------------------------------- */

var calcWithDefaultValue = (a, b=4) => {    // Random arrow function with a default value (b=4).
    let c = a + b;                          // Requires only one value, but can take two.
    console.log(a + ' + ' + b + ' = ' + c);
}
calcWithDefaultValue(10);                   // Called with one value. b == 4 here. 
calcWithDefaultValue(19, 2);                // Called with two values. b == 2 here. 

/* ---------------------------------------------------------------------------------------------------------- */

const array1 = [1, 5, 10, 100];             // Mapping a new array, where each number is x3. 
const array2 = array1.map(x => x * 3);
console.log('Four random numbers: ', array1);
console.log('All numbers x3 = ', array2);

/* ---------------------------------------------------------------------------------------------------------- */

console.log(stats.filter(day => day.slept === true));   // Filtering and showing days where sleep was good. 

/* ---------------------------------------------------------------------------------------------------------- */

const randomNumbers = {a: 200, b: 123, c: 456}  // Testing the "destructing assignment"
const {
    a,
    b,
    c,
} = randomNumbers; 
console.log(a, b, c)

const {                         // Making my own version of the "destructing assignment"
    date: oneDate,              // As I already had defined variables by the name date, weight and so on,
    weight: oneWeight,          // I needed to use this syntacs. The value of date in stats[2], is now put 
    waist: oneWaist,            // to a constant with the name "oneDate" and so on. 
    kCal: onekCal,
    slept: oneSlept,
} = stats[2];
console.log(oneDate, oneWeight, oneWaist, onekCal, oneSlept);   // Printing the value of each individual const. 

/* ---------------------------------------------------------------------------------------------------------- */

let numberArray = [1, 2, 3]     // Random array
let numberArray2 = [...numberArray, ...numberArray, numberArray];   // Creating a "double copy" of numberArray
console.log(numberArray2);                                          // with a reference value at the end.

/* ---------------------------------------------------------------------------------------------------------- */

console.log(randomNumbers);    // randomNumbers is an object created above
const randomNumbers2 = {...randomNumbers, a: 666, c: 789};  // Creating a copy of randomNumbers,
console.log(randomNumbers2);                                // but changing a few values.

/* ---------------------------------------------------------------------------------------------------------- */


// Task 3: Turn the data into JSON and back and make sure it still is valid and same information

    const JSONstats = JSON.stringify(stats);
    console.log(JSONstats);

    const statsTwo = JSON.parse(JSONstats);
    console.log(stats);



// Task 4: If want to, start thinking how to generate data. JavaScript is not the best suited
// for that task, compared to e.g. Python. But if want, you can do with JavaScript as well. 