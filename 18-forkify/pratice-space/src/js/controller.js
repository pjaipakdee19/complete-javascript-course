import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import recipeView from './views/recipeView.js';

// const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// console.log("test");

const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // console.log(id);
    // 1. Loading Recipe

    await model.loadRecipe(id);
    const { recipe } = model.state;
    //2. Render
    recipeView.render(model.state.recipe);

  } catch (err) {
    alert(err);
  }
};

// showRecipe();
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// we can merge 2 above functions into 1 below function
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));