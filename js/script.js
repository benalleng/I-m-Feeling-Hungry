// constants
const RECIPE_URL = 'https://api.edamam.com/api/recipes/v2?type=public';
const API_ID = '102baf10';
const API_KEY = '4f61dc9d759dcaa5d4579250c1e2e3d9';
const $input = $('input[type="text"]');
let $button = $('button');
let hungers = [];
let excluded = [];
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
  excluded = hungers.slice(6);
  AJAXPush();
});


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
  if (hungers.length == 0) {
        $('input:text').attr('placeholder','Hungry');
    } else if (hungers.length == 1) {
        $('input:text').attr('placeholder','Italian');
    } else if (hungers.length == 2) {
        $('input:text').attr('placeholder','Vegan');
    } else if (hungers.length == 3) {
        $('input:text').attr('placeholder','Dinner');
    } else if (hungers.length == 4) {
        $('input:text').attr('placeholder','Main course');
    } else if (hungers.length == 5) {
        $('input:text').attr('placeholder','Brussel Sprouts YUCK!');
        let $input = $('<input type="button" id="submit" value="Get Recipe" />');
        $input.appendTo($("main"));
    } else {
    return;
  }
}

function AJAXPush() {
  // excludedJoin = 
  let shifter = excluded.map(function(gross) {
    return `&excluded=${gross}`;
  });

  let joiner = shifter.join('')
  
  let promise = $.ajax(`${RECIPE_URL}&q=${hungers[0]}&app_id=${API_ID}&app_key=${API_KEY}&diet=${hungers[1]}&health=${hungers[2]}&cuisineType=${hungers[3]}&mealType=${hungers[4]}&dishType=${hungers[5]}${joiner}&random=true`);
  // console.log(promise);
    promise.then(
    (data) => {
        console.log(data);
        },
    (error) => {
      console.log('bad request: ', error);
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