// constants
const RECIPE_URL = 'https://api.edamam.com/api/recipes/v2?type=public'
const API_ID = '102baf10'
const API_KEY = '4f61dc9d759dcaa5d4579250c1e2e3d9'
const $form = $('input');
const $input = $('input[type="text"]')
let hungers = [];
const promise = (`${RECIPE_URL}&q=${hungers[0]}&app_id${API_ID}&app_key${API_KEY}&diet=${hungers[1]}&health=${hungers[2]}&cuisineType=${hungers[3]}&mealType=${hungers[4]}&dishType=${hungers[5]}&excluded=${hungers[6]}`)
// states

// cached element references

// event listeners
$input.on('keydown', handleEnterPress);


// functions

// const promise = $.ajax(`${RECIPE_URL}&app_id=${API_ID}&app_key=${API_KEY}&random=true`);
    
//     promise.then(
//       (data) => {
//         console.log(data);
//     },
//     (error) => {
//         console.log('bad request: ', error);
//     }
//     );

function handleEnterPress(event) {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
}

function handleSubmit(event) {
  event && event.preventDefault();

  const want = $input.val();
  
  if(!want) return;

  $input.focus();
  console.log(want)
  
  // if(!want) return;
  
  
  hungers.push($input.val());
  
  $input.val('');
  
  console.log(hungers);
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
*/
