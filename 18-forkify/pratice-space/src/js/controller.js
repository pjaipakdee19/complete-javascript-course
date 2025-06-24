import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
// const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// console.log("test");

//for hot reload from parcel
if( module.hot ){
  module.hot.accept()
}

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
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try {
    resultsView.renderSpinner();
    //console.log(resultsView);
    // 1) get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load searchr results
    await model.loadSearchResults(query);
    
    // 3) Render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    
    // 4) Render pagination buttons
    paginationView.render(model.state.search);

  } catch (error) {
    recipeView.renderError();
  }
};
// showRecipe();
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// we can merge 2 above functions into 1 below function
// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));


const controlPagination = function(gotoPage){
  console.log('Page control');
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();