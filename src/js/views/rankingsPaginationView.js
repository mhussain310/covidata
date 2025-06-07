import View from './View.js';

class RankingsPaginationView extends View {
  _parentElement;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  addActiveClass(removeClass = false) {
    const btn = document.querySelector('.pagination__btn');
    if (!btn) return;
    const currentBtn = document.querySelector(`button[data-goto="${this._data.pagination.page}"]`);
    removeClass ? currentBtn.classList.remove('pagination__btn--active') : currentBtn.classList.add('pagination__btn--active');
  }

  _generateMarkup() {
    this._parentElement = document.querySelector('.pagination');
    const pageNum = this._data.pagination.page;
    const numPages = this._data.pagination.numPages;

    const btnArr = [];
    for (let page = this._data.pagination.maxLeft; page <= this._data.pagination.maxRight; page++) {
      btnArr.push(`<button data-goto="${page}" class="pagination__btn pagination__btn--num">${page}</button>`);
    }
    const btns = btnArr.join('');

    if (pageNum === 1) return `${btns}<button data-goto="${numPages}" class="pagination__btn pagination__btn--text">End</button>`;

    if (pageNum === numPages) return `<button data-goto="${1}" class="pagination__btn pagination__btn--text">Start</button>${btns}`;

    if (pageNum !== 1 || pageNum !== numPages) {
      return `
        <button data-goto="${1}" class="pagination__btn pagination__btn--text">Start</button>
        ${btns}
        <button data-goto="${numPages}" class="pagination__btn pagination__btn--text">End</button>
      `;
    }
  }
}

export default new RankingsPaginationView();