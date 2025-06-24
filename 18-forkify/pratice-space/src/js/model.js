import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './views/helper';

export const state = {
    recipe: {},
    search: {
        query:'',
        results:[],
        resultsPerPage: RES_PER_PAGE,
        page:1,
    },
};

export const loadRecipe = async function(id) {
    try{
        const data = await getJSON(`${API_URL}/${id}`);
        const {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        // console.log(state.recipe);
        // not return anythings just update state obj
    } catch(err) {
        console.error(`${err} 💣💣`);
        throw err;
    }
};

export const loadSearchResults = async function(query){
    try{
        state.search.query = query;
        //https://forkify-api.jonas.io/api/v2/recipes?search=pizza
        const data = await getJSON(`${API_URL}?search=${query}`);
        // console.log(data);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            }
        });
        //console.log(state.search);
    }catch(err){
        console.error(`${err} 💣💣`);
        throw err;
    }
}

// loadSearchResults('pizza');

export const getSearchResultsPage = function(page = state.search.page){

    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage; //0;
    const end = (page * state.search.resultsPerPage); //9;

    return state.search.results.slice(start, end);
}