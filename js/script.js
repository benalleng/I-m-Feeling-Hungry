// constants
const RECIPE_URL = 'https://api.edamam.com/api/recipes/v2?type=public';
const API_ID = '102baf10';
const API_KEY = '4f61dc9d759dcaa5d4579250c1e2e3d9';
const $input = $('input[type="text"]');
const $main = $('main')

// states
let hungers = [];
let excluded = [];
let healths = [];
let cuisines = [];

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
$(document).on('click', '#refresh', function() {
  location.reload();
});


// functions
function handleEnterPress(event) {
  if (event.keyCode === 13) {
    handleTextInput(event);
  }
}
      
function handleTextInput(event) {
  event && event.preventDefault();
  let want = $input.val();     
  if(!want) return;     
  $input.focus();              
  hungers.push($input.val());
  if (hungers.length <= 3) {
    $('ul').append(`<li class="wantList">${$input.val()}</li>`)
  } else {
    $('ul').append(`<li class="notWantList">${$input.val()}</li>`)
  }
  $input.val('');
  inputChanger();
}
                
function inputChanger() {
  let $submitButton = $('<input type="button" id="submit" value="Get Recipe" />');
  let $skipButton = $('<input type="button" id="skip" value="Skip" />');
    if (hungers.length == 0) {
      $('input:text').attr('placeholder','Hungry');
    } else if (hungers.length == 1) {
      $('input:text').attr('placeholder','Italian');
      $('br').appendTo($("main"));
      $skipButton.appendTo($("main"));
    } else if (hungers.length == 2) {
      $('input:text').attr('placeholder','Vegetarian');
    } else if (hungers.length == 3) {
      $('input:text').attr('placeholder','Brussel Sprouts YUCK!');
      $('span').text('Not ')
      $submitButton.appendTo($("main"));
      $("main").find('#skip').remove();
    } else {
      return;
    }
}

function AJAXPush() {
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
    promise.then(
    (data) => {
        // console.log(data);
        render(data);
        },
    (error) => {
      // console.log('bad request: ', error);
      alert(`Oops! Looks like the Kitchen is all out! 
Try another combination.`);
      location.reload();
      $input.val('');
    });
}

function render(recipeData) {
  let arraylen = recipeData.hits.length;
  let $refreshButton = $('<input type="button" id="refresh" value="New Recipe" />');
  const R = ~~(Math.random() * (recipeData.hits.length - 1));
  if(arraylen == 0) {
    alert(`Oops! Looks like the Kitchen is all out! 
Try another combination.`);
    location.reload();
  } else {
    $main.html(`
  <h3 class="recipeLabel">${recipeData.hits[R].recipe.label}</h3>
  <img src="${recipeData.hits[R].recipe.image}">
  <p>Ingredients: <br>
  - ${recipeData.hits[R].recipe.ingredientLines.join(`<br> -
  `)}</p>
  <p>Source: <a href="${recipeData.hits[R].recipe.url}" target="blank">${recipeData.hits[R].recipe.label}</a></p>
  `);
  $refreshButton.appendTo($("main"))
  }
}






