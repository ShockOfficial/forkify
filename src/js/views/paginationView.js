import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.round(
      this._data.results.length / this._data.resultsPerPage
    );

    const nextBtnMakrup = `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;

    const prevBtnMarkup = `<button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;

    // Pagie 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return nextBtnMakrup;
    }
    // Pagie 1, and there are no other pages

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return prevBtnMarkup;
    }
    // Other page
    if (currentPage < numPages) {
      return prevBtnMarkup + nextBtnMakrup;
    }

    // Page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
