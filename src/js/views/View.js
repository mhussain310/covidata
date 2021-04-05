export default class View {
  _data;
  _numFmt = new Intl.NumberFormat(navigator.language);

  renderSpinner(message = '') {
    const markup = `
      <div class="spinner">
        <span class="spinner__circle"></span>
        <span class="spinner__message">${message}</span>
      </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <svg class="error__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12">
          <g>
            <path d="M5.25 8.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0z" />
            <path d="M5.508 3.41a.5.5 0 0 1 .984 0l.008.09V6l-.008.09a.5.5 0 0 1-.984 0L5.5 6V3.5l.008-.09z" />
            <path d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0zm-1 0a4 4 0 1 0-8 0a4 4 0 0 0 8 0z" />
          </g>
        </svg>
        <span class="error__message">${message}</span>
      </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }
}