/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
/ 
/ Semi 
/ 7/7/2022 : reviwing the code
/ 7/8/2022 : running the code in inspect
/            ! TODO #1 : added lines in Function displayPerson , tested & is workin to provide all person's info
             ! TODO #2 : Nevin helped with fixing bugs in findPersonFamily function and nested functions , tested & working.
             ! TODO #3 : Asked Nevin's feedback , doesn't  print the entire text.
             ! TODO #4 : add lines of codes and fucntions for single traits but not tested yet

 7/9/2022 : 
            ! TODO #3 : Asked Nevin's feedback , doesn't  print the entire text.

//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'or", yesNo).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;

        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);   // Semi : restart the app
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()




/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            // Semi : added lines in Function displayPerson , tested & is working
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;

        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            console.log(personFamily);
            alert(personFamily);
          
        
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            console.log(personDescendants);
            // alert(personDescendants);
            alert(person[0].firstName + " " + person[0].lastName + "'s descendants: \n\n" + displayPeople(findPersonDescendants(person[0], people)));
            break;


        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
// function displayPeople(people) {
//     alert(
//         people
//             .map(function (person) {
//                 return `${person.firstName} ${person.lastName}`;
//             })
//             .join("\n")
//     );
// }
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name:     ${person.lastName}\n`;

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    //
    // added by Semi 
    //
    personInfo += `Gender:        ${person.gender}\n`;
    personInfo += `DOB:           ${person.dob}\n`;
    personInfo += `Height:        ${person.height}\n`;
    personInfo += `Weight:        ${person.weight}\n`;
    personInfo += `EyeColor:      ${person.eyeColor}\n`;
    personInfo += `Occupation:   ${person.occupation}\n`;
    
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// added by Semi
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//! TODO #2: Declare a findPersonFamily function ////////////////////////////////////////// --> is it supposed to be one function?
//  findPersonFamily(person[0], people);
//   parents, siblings , spouse , Children



function findSiblings(person, people) {
  let newArray = people.filter(function (el) {
      if (person.id == el.id){
      return false;
    }
      if(person.parents.includes(el.parents[0]) || person.parents.includes(el.parents[1]) ) {
        return true;
  };
})
  return newArray;
}


function findSpouse(person, people) {
  let newArray = people.filter(function(el) {
    if (el.currentSpouse == person.id) {
      return true;
    }
  });
  return newArray;
}

function findParents(person, people) {
  let newArray = people.filter(function(el) {
      if((person.parents).includes(el.id)) {
        return true;
      }
  });
  return newArray;
}

function findPersonFamily (person, people) {
  let newArray = "";                         // HTML only understands string !
  let siblings = findSiblings(person, people);
  let spouse = findSpouse(person, people);
  let parents = findParents(person, people);

  if (siblings != null) {
    for(let i = 0; i < siblings.length; i ++){
      newArray += `sibling: ${siblings[i].firstName} ${siblings[i].lastName}\n`
    }
  }

  if (spouse != null) {
    for(let i = 0; i < spouse.length; i ++){
      newArray += `spouse: ${spouse[i].firstName} ${spouse[i].lastName}\n`
    }
  }

  if (parents != null) {
    for(let i = 0; i < parents.length; i ++) {
      newArray += `parents: ${parents[i].firstName} ${parents[i].lastName}\n`
    }
  }

  return newArray;
}

   //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
   //  findPersonDescendants(person[0], people);

   function findChildren(person, people) {
    let newArray = people.filter(function(el) {
      for (let i = 0; i < el.parents.length; i++)
        if(el.parents[i] == person.id ) {
          return true;
      }
    });
    return newArray;
  }

   function findPersonDescendants(person, people) {
    let descendants = findChildren(person, people);
    for(let i = 0; i < descendants.length; i++) {
      descendants = descendants.concat(findPersonDescendants(descendants[i], people));
    }
    return descendants;
  }

 

   function displayPeople(people){
    return people.map(function(person){
      return person.firstName + " " + person.lastName+"\n";
    }).join("\n");
  }







  //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
  //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
  // searchResults = searchByTraits(people);

 // single trait : gender , dob , height , weaigh , eye color , occupation ,age



 //Function : Integer validation 
function integers(input){ 
  if(parseInt(input)){
    return true;
  }
  else{
    return false;
  }
}
 
//Function : Gender validation
function validateGender(input){ 
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

//function : search for gender
function genderSearch(people){ 
  let userChoice = promptFor("Is the person male or female?", validateGender);
  let foundPeople = people.filter(function(el){
    if(el.gender === userChoice) {      
      return true;
    }});
    if(foundPeople === undefined|| foundPeople.length === 0){
      noResults();
      return app(people);
    }
   return foundPeople;
}

//Function : prompt no results if criteria doesnt match. 
function noResults(){
  alert("Could not find a trait match!");
}



//function : serach for height
function getHeight(people){  
  let userChoice = promptFor("What is the person's height in inches?",integers);
  let foundPeople = people.filter(function(el){
    if(el.height == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}

//function : serach for weight
function getWeight(people){ 
  let userChoice = promptFor("What is the person's weight?",integers);
  let foundPeople = people.filter(function(el){
    if(el.weight == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}

//sfunction: search for eye color
function getEyes(people){
  let userChoice = promptFor("What is the person's eye color?",chars);
  let foundPeople = people.filter(function(el){
    if(el.eyeColor == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}

//function : search for occupation 
function getOccupation(people){
  let userChoice = promptFor("What is the person's occupation?",chars);
  let foundPeople = people.filter(function(el){
    if(el.occupation == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}

//sfunction : search for age
function getAge(people){
  let userChoice = promptFor("What is the person's date of birth? \n Format: MM/DD/YYY",integers);
    userChoice = ageFinder(userChoice);
  let foundPeople = people.filter(function(el){
    if(ageFinder(el.dob) == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}

//function : converts DOB into age integer.
function ageFinder(dob){
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
    age--;
  }
  return age;
}







 //function : searchByTraits
function searchByTraits(people){    
  let input = promptFor("Which trait would you like to search by?\n1: Gender\n2: Height\n3: Weight\n4: Eye Color\n5: Occupation\n6: DOB\n7: IDK Restart?",integers);
  let foundPeople = [];
  switch(input){
    case"1"://gender           
        foundPeople = genderSearch(people);
        console.log(foundPeople)     
      break;
    case "2"://height      
        foundPeople = getHeight(people);      
      break;
    case "3"://weight     
        foundPeople = getWeight(people);      
      break;
    case "4"://eye color      
        foundPeople = getEyes(people);      
        break;
    case "5"://occupation      
        foundPeople = getOccupation(people);      
        break;
    case "6"://DOB      
        foundPeople = getAge(people);      
        break;
    case "7"://restart
        app(people); 
        break;
    default:
      alert("Enter valid selection.");
      return searchByTraits(people);
  }
    if (foundPeople.length > 1) {
      alert("Search Result :" + displayPeople(foundPeople));
      searchByTraits(foundPeople)
     } else if (foundPeople.length === 1) {
      let foundPerson = foundPeople[0];
      alert("oops! no result , try again");
       mainMenu(foundPerson, people);
     } else {
       app(people);
     }
}
