import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2
class addRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe succesfully uploaded';

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    
    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    // this function need to init when button redered that mean we will call it in contructor instead of call it in controller
    // _addHandlerShowWindow(){
    //     this._btnOpen.addEventListener('click', function(){
    //         //Remove hidden class
    //         // this keyword will not point to the correct hiden variable because of this._btnOpen is a parent for this statement/
    //         // we should create new function and call it to interact with this variable of class
    //         // this._overlay.classList.toggle('hidden');
    //         // this._window.classList.toggle('hidden');
    //     });
    // }

    
    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();

            const dataArray = [...new FormData(this)]; // Return all field and value in FormData
            const data = Object.fromEntries(dataArray);
            handler(data);
        });
    }

    _generateMarkup(){
        
    };
}

export default new addRecipeView();