import icons from 'url:../../img/icons.svg'; // Parcel 2
export default class View {
    _data;

    /**
     * Render the received object to the DOM
     * @param {Object | Object []} data The data to be rendered (e.g. recipe)
     * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM 
     * @returns {undefined| string} A markup string is returned if render=false
     * @this {Object} View instance
     * 
     */
    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) 
            return this.renderError();

        this._data = data;

        const markup = this._generateMarkup();

        if(!render) return markup; //For support previewView

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    update(data){
      // if (!data || (Array.isArray(data) && data.length === 0)) 
      //       return this.renderError();

      this._data = data;
      const newMarkup = this._generateMarkup();

      // Convert string to real DOM node obj
      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      // console.log(newElements);
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));
      // console.log(curElements);
      // console.log(newElements);
      // Compare arrays
      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];
        // console.log(curEl, newEl.isEqualNode(curEl));

        // Update element that need to change text
        if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
          // console.log('🫢', newEl.firstChild.nodeValue.trim());
          console.log('case1');
          curEl.textContent = newEl.textContent;
        }

        // Update element that need to change attributes
        if(!newEl.isEqualNode(curEl)){

          Array.from(newEl.attributes).forEach(attr => 
            curEl.setAttribute(attr.name, attr.value)
          );
        }
      })
    }

    renderSpinner = function () {
        const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
          `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    renderError = function (message = this._errorMessage) {
        const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage = function (message = this._message) {
        const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}