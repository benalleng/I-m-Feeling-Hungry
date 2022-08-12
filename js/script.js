// constants
const RECIPE_URL = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken'
const API_ID = '102baf10'
const API_KEY = '4f61dc9d759dcaa5d4579250c1e2e3d9'
// states

// cached element references

// event listeners

// functions

const promise = $.ajax(`${RECIPE_URL}&app_id=${API_ID}&app_key=${API_KEY}&random=true`);
    
    promise.then(
      (data) => {
        console.log(data);
    },
    (error) => {
        console.log('bad request: ', error);
    }
    );