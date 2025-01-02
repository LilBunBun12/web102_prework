/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length;i++)
    {
        // create a new div element, which will become the game card
        let element = document.createElement('div');

        // add the class game-card to the list
        element.classList.add(`game-card`);
        // set the inner HTML using a template literal to display some info 
        // about each game
        element.innerHTML = `<h3>${games[i].name}</h3>
        <img src = "${games[i].img}" alt = "${games[i].img}" class = "game-img" />
        <p> ${games[i].description} </p>             
        `;
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.appendChild(element);
    }

}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total,game)=>{
    return total + game.backers;
},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

const contributionElement = document.getElementById("num-contributions");
contributionElement.innerHTML = `${totalContributions.toLocaleString('en-US')}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const totalRaised = GAMES_JSON.reduce((total,game) =>{
    return total + game.pledged;
},0);

// set inner HTML using template literal
const raisedElement = document.getElementById("total-raised");
raisedElement.innerHTML =`$${totalRaised.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const totalGames = GAMES_JSON.reduce((total,game) => {
    return total + 1;
},0);

const gamesElement = document.getElementById("num-games");
gamesElement.innerHTML = `${totalGames.toLocaleString('en-US')}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let list = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(list);
    console.log("Unfunded: " + list.length);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let list = GAMES_JSON.filter((game)=>{
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(list);
    console.log("Funded: " + list.length);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedCnt = GAMES_JSON.reduce((total,games) =>{
    if(games.goal > games.pledged)
        total += 1;
    return total;
},0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $100,000 has ben raised for 4 games. Currently, ${unfundedCnt} ${unfundedCnt == 1? "game": "games"} remain unfuned. We need
your help to fund these games!`;
// create a new DOM element containing the template string and append it to the description container
let element = document.createElement("p");
element.innerHTML = `${displayStr}`
descriptionContainer.appendChild(element);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [a,b] = sortedGames;
console.log(a);
console.log(b);
// create a new element to hold the name of the top pledge game, then append it to the correct element
element = document.getElementById("first-game");
let tempElement = document.createElement("p");
tempElement.innerHTML = `${a.name}`;
element.appendChild(tempElement);
// do the same for the runner up item
element = document.getElementById("second-game");
tempElement = document.createElement("p");
tempElement.innerHTML = `${b.name}`;
element.appendChild(tempElement);



//Search feature
// Checks if the search string is in the name
function match(str,name){
    for(let i = 0; i <= name.length - str.length;i++)
    {
        let temp = "";
        for(let j = i; j < i + str.length;j++)
        {
            temp += name[j];
        }
        if(str == temp)
        {
            return true;
        }
    }
    return false;
}


function search(str) {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let list = GAMES_JSON.filter((game)=>{
        console.log(game.name);
        return match(str.toLowerCase(),game.name.toLowerCase());
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(list);
    console.log("Search: " + list.length);
}

const searchInput = document.getElementById(`searchInput`);
searchInput.addEventListener(`input`,(event)=>{
    let searchstr = event.target.value;
    search(searchstr);
});

// let name = "Zoo Tycoon: The Board Game";
// let str = "The";

// for(let i = 0; i <= name.length - str.length;i++)
// {
//     let temp = "";
//     for(let j = i; j < i + str.length;j++)
//     {
//         temp += name[j]
//     }
//     console.log((str == temp) + temp + " " + str);
// }
// console.log(search("t"));



// Card Selection feature
let container = document.getElementById("SelectContainer");

for(let i = 0; i < 5; i++){
    element = document.createElement("div");
    element.classList.add("selectCard");
    element.classList.add("border");
    element.innerHTML = `${sortedGames[i].name}`;
    element.style = `background-image: url('${sortedGames[i].img}');`
    container.appendChild(element);
}


document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); 
            } else {
                entry.target.classList.remove("show"); 
            }
        });
    }, { threshold: 0.1 }); 

    fadeElements.forEach(element => observer.observe(element));
});

