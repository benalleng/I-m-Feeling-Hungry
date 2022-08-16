// constants
const RECIPE_URL = 'https://api.edamam.com/api/recipes/v2?type=public';
const API_ID = '102baf10';
const API_KEY = '4f61dc9d759dcaa5d4579250c1e2e3d9';
const $input = $('input[type="text"]');
let $button = $('button');
let hungers = [];
let excluded = [];
let healths = [];
let cuisines = [];
// let q = '';
// let diet = '';
// let cuisineType = '';
// let mealType = '';
// let dishType = '';
// let excluded = [''];
// states

// cached element references

// event listeners
$input.on('keydown', handleEnterPress);

$(document).on('click', '#submit', function() {
  excluded = hungers.slice(3);
  cuisines = hungers.slice(1, 2);
  healths = hungers.slice(2, 3);
  AJAXPush();
});

$(document).on('click', '#skip', function() {
  hungers.push('');
  inputChanger();
})


// functions
      function handleEnterPress(event) {
        if (event.keyCode === 13) {
          handleTextInput(event);
        }
      }
      
      function handleTextInput(event) {
        event && event.preventDefault();
        
        const want = $input.val();
        
        if(!want) return;
        
        $input.focus();
        console.log(want);
                  
        hungers.push($input.val());
                  
        $input.val('');
                  
        console.log(hungers);
                  
        inputChanger();
      }
                
function inputChanger() {
  let $submitButton = $('<input type="button" id="submit" value="Get Recipe" />');
  let $skipButton = $('<input type="button" id="skip" value="Skip" />');
  
  if (hungers.length == 0) {
        $('input:text').attr('placeholder','Hungry');
    } else if (hungers.length == 1) {
        $('input:text').attr('placeholder','Italian');
        $skipButton.appendTo($("main"));
    } else if (hungers.length == 2) {
        $('input:text').attr('placeholder','Vegetarian');
    } else if (hungers.length == 3) {
        $('input:text').attr('placeholder','Brussel Sprouts YUCK!');
        $submitButton.appendTo($("main"));
        $("main").find('#skip').remove();
    } else {
    return;
  }
}

function AJAXPush() {
  // excludedJoin = 
  let cuisine = cuisines.map(function(location) {
    if (location == '') {
      return;
    } else {
      return `&cuisineType=${location}`;
    }
  });
  
  let health = healths.map(function(diet) {
    if(diet == '') {
      return;
    } else {
      return `&health=${diet}`;
    }
  });

  let notWant = excluded.map(function(gross) {
    return `&excluded=${gross}`;
  });

  let joiner = notWant.join('')
  
  let promise = $.ajax(`${RECIPE_URL}&q=${hungers[0]}&app_id=${API_ID}&app_key=${API_KEY}${cuisine}${health}${joiner}&random=true`);
  // console.log(promise);
    promise.then(
    (data) => {
        console.log(data);
        },
    (error) => {
      console.log('bad request: ', error);
      alert(`Oops! Looks like the Kitchen is all out! 
Try another combination.`);
      location.reload();
    }
  );
}


















/*
https://api.edamam.com/api/recipes/v2?type=public
&q=pasta
&app_id=102baf10
&app_key=4f61dc9d759dcaa5d4579250c1e2e3d9
&diet=balanced
&health=vegetarian
&cuisineType=Italian
&mealType=Dinner
&dishType=Main%20course
&imageSize=REGULAR

"https://api.edamam.com/api/recipes/v2?type=public&q=chicken&…dairy-free&cuisineType=italian&mealType=dinner&dishType=main%20course&excluded=zucchini"

https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id102baf10&app_key4f61dc9d759dcaa5d4579250c1e2e3d9&diet=high-protein&health=dairy-free&cuisineType=italian&mealType=dinner&dishType=main%20course&excluded=zucchini


https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=102baf10&app_key=4f61dc9d759dcaa5d4579250c1e2e3d9&diet=high-protein&health=dairy-free&cuisineType=italian&mealType=dinner&dishType=main%20course&excluded=zucchini

*/