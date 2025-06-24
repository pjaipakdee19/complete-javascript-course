import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2
class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _errorMessage = `No recipes found for your query! Please try again !`;
    _message = '';

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            e.preventDefault();
            const btn = e.target.closest('.btn--inline');
            // console.log(btn);
            if(!btn) return;
            const gotoPage = btn.dataset.goto;
            // console.log("goto", gotoPage);
            
            handler(gotoPage);
        })
    }

    _generateBtnMarkup(type, page){
        const arrow = (type == 'next')?'right':'left';
        return `
        <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
            ${(type === 'next')?`<span>Page ${page}</span>`:''}
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrow}"></use>
            ${(type === 'prev')?`<span>Page ${page}</span>`:''}
            </svg>
        </button>
        `
    }
    _generateMarkup(){
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const curPage = parseInt(this._data.page);
        //console.log(numPages);
        // Page 1 and there are other pages
        if(curPage === 1 && numPages > 1){
            //return 'page 1 , others';
            // return `
            // <button class="btn--inline pagination__btn--next">
            //     <span>Page ${curPage + 1}</span>
            //     <svg class="search__icon">
            //     <use href="${icons}#icon-arrow-right"></use>
            //     </svg>
            // </button>
            // `;
            return this._generateBtnMarkup('next',curPage+1);
        }
        
        // Last page
        if(curPage === numPages && numPages > 1){
            // return 'Last page';
            // return `
            // <button class="btn--inline pagination__btn--prev">
            //     <svg class="search__icon">
            //         <use href="${icons}#icon-arrow-left"></use>
            //     </svg>
            //     <span>Page ${curPage - 1}</span>
            // </button>
            // `;
            return this._generateBtnMarkup('prev',curPage-1);
        }
        // Other page
        if(curPage < numPages){
            //return 'other page';
            // return `
            // <button class="btn--inline pagination__btn--prev">
            //     <svg class="search__icon">
            //         <use href="${icons}#icon-arrow-left"></use>
            //     </svg>
            //     <span>Page ${curPage - 1}</span>
            // </button>
            //  <button class="btn--inline pagination__btn--next">
            //     <span>Page ${curPage + 1}</span>
            //     <svg class="search__icon">
            //     <use href="${icons}#icon-arrow-right"></use>
            //     </svg>
            // </button>
            // `;
            return `
            ${this._generateBtnMarkup('prev',curPage-1)}
            ${this._generateBtnMarkup('next',curPage+1)}
            `;
        }
        
        // Page 1 and there are no other pages
        return '';
    }
}

export default new PaginationView();