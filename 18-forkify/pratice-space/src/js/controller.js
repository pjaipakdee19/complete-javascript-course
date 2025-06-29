import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarkView.js';
// const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// console.log("test");

//for hot reload from parcel
// if( module.hot ){
//   module.hot.accept()
// }

const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0 Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // console.log(id);
    // 1. Loading Recipe
    await model.loadRecipe(id);

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
    //resultsView.update(model.getSearchResultsPage());
    // console.log(model.state.search.page = 1);
    // model.state.search.page = 1
    // 4) Render pagination buttons
    paginationView.render(model.state.search);
    controlServings();
  } catch (error) {
    recipeView.renderError();
    console.error(error);
  }
};

const controlServings = function(updateTo){
  //Update the recipe servings (in state)
  model.updateServings(updateTo);
  //Update the recipe view
  // Render will use more resource then we decide to use update dom data instead
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}
// showRecipe();
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// we can merge 2 above functions into 1 below function
// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));


const controlPagination = function(gotoPage){
  // console.log('Page control');
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
}

const controlAddBookmark = function(){
  // Add/remove bookmark
  console.log(model.state.recipe.bookmarked);
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe)
  }else{
    model.removeBookmark(model.state.recipe.id);
  }
  
  // update recipe view
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();