# I'm Feeling Hungry

- present the user with an input to ask them what kind of food they want to have to eat and then finally present them, with a singular recipe

- use sequenced inputs with different questions all starting with I'm Feeling 

- present each input back to the user to give them a visual representation of how the API will find their recipe

- inspired by the Google I'm Feeling Lucky button

____________ 

## Technologies Used

- Javascript, JQuery

- HTML, CSS

## Screenshots

### Initial Page
[Initial](assets/Screenshot_2022-08-18_13-55-37.png)

### Form Page
[Form](assets/Screenshot_2022-08-18_14-00-12.png)

### Final Page
[Final](assets/Screenshot_2022-08-18_13-58-18.png)

## Geting started

 - Type what kind of food you want to have then list the foods that you don't want to have!

## Future Enhancements

- Move the diet restrictions to tabs at the top of the page to give the user a clearer indication of what to type 

- Find a way to add previous searches to local storage to add a history function.

- Further expansion of the 

###### Pseudo-coding

- Present the user with an initial question of what food genre they want

- continue to ask  5-6 questions to narrow down the scope of what kind of food they want, each question getting more specific
    - Create an array and push the user's answers and then create a interpolated AJAX request

- Send a request to the API with the users answers and the present the user with a recipe that fits what the API returns
    - use an interpolated string with each user form completing the next part of the API request so that it can send a single request to the API
    - If there is more than one recipe after the questionaire, randomly select a recipe so that the user has some sense of variety if they answer the same questions multiple times

- Finally if the user refreshes the page list previous recipes on in local storage for the user to return to
    - make the entire image or recipe name clickable returning the user to the previously searched recipe

- BONUS: 
    - create an error code if not recipe exists or if more than one recipe exists present the user with more questions

