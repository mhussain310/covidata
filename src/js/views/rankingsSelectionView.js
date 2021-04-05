import View from './View.js';

class RankingsSelectionView extends View {
  _parentElement;
  _selected;

  addHandlerOpenSelection() {
    this._selected.addEventListener('click', this._openSelection.bind(this));
  }

  addHandlerSelectOption(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  _openSelection(e) {
    this._parentElement.classList.toggle('ranked__options-container--active');
  }

  displaySelected(selected) {
    this._selected = document.querySelector('.ranked__selected');
    this._selected.querySelector('label').textContent = selected;
  }

  selectOption(e) {
    const option = e.target.closest('.ranked__option');
    if (!option) return;

    this._parentElement.classList.remove('ranked__options-container--active');

    const label = option.querySelector('label').textContent;
    return label;
  }

  _generateMarkup() {
    this._parentElement = document.querySelector('.ranked__options-container');

    return `
      ${this._data.map(this._generateMarkupList.bind(this)).join('')}
    `;
  }

  _generateMarkupList(option) {
    return `
      <div class="ranked__option" id="${option}">
        <input type="radio" class="ranked__radio" name="category">
        <label for="${option}">${option}</label>
      </div>
    `;
  }
}

export default new RankingsSelectionView();