import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import PreviewView from './previewView.js';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found for your query! Please try again !`;
    _message = '';

    _generateMarkup = function(){
        // console.log(this._data);
        
        // return this._data.map(this._generateMarkupPreview).join('');
        return this._data.map(result => PreviewView.render(result, false)).join('');
    };

    // _generateMarkupPreview(result){
    //     const id = window.location.hash.slice(1);

    //     return `
    //         <li class="preview">
    //             <a class="preview__link ${result.id === id ? 'preview__link--active':''}" href="#${result.id}">
    //             <figure class="preview__fig">
    //                 <img src="${result.image}" alt="${result.title}" />
    //             </figure>
    //             <div class="preview__data">
    //                 <h4 class="preview__title">${result.title}</h4>
    //                 <p class="preview__publisher">${result.publisher}</p>
    //             </div>
    //             </a>
    //         </li>
    //     `;
    // }
}

export default new ResultsView();