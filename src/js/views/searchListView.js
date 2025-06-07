import View from './View.js'

class SearchListView extends View {
  _parentElement = document.querySelector('.search-list');

  addHandlerSearchList(handler) {
    this._parentElement.addEventListener('mousedown', function (e) {
      const listItem = e.target.closest('.search-list__item');
      if (!listItem) return;

      const countryName = listItem.querySelector('.search-list__country').textContent;
      handler(countryName);
    });
  }

  addSearchListHeight() {
    this._parentElement.classList.add('search-list--height');
  }

  removeSearchListHeight() {
    this._parentElement.classList.remove('search-list--height');
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupList).join('');
  }

  _generateMarkupList(country) {
    return `
      <div class="search-list__item">
        <svg class="search-list__search-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
          viewBox="0 0 24 24">
          <g>
            <path
              d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083l-4.745-4.743A7.5 7.5 0 1 1 10 2.5zm0 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11z" />
          </g>
        </svg>
        <span class="search-list__country">${country.name}</span>
        <span class="search-list__abbr">${country.iso2}</span>
      </div>
    `;
  }
}

export default new SearchListView();