import View from './View.js';

class RankingsView extends View {
  _parentElement = document.querySelector('.rankings-container');

  _generateMarkup() {
    return `
      <div class="ranked">
        <span class="ranked__label">Ranked by:</span>
        <div class="ranked__select-box">
          <div class="ranked__options-container">
          </div>
          <div class="ranked__selected" data-parent="season" id="ranked-selected">
            <svg class="ranked__svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <g fill="none">
                <path d="M4 9l8 8l8-8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
            </svg>
            <label for="ranked-selected"></label>
          </div>
        </div>
      </div>
      <div class="rankings">
        <div class="rankings__label-container">
          <span class="rankings__label">rank</span>
          <span class="rankings__label rankings__label--country">country</span>
          <span class="rankings__label">cases</span>
          <span class="rankings__label">deaths</span>
          <span class="rankings__label">recovered</span>
        </div>
        <ul class="rankings__list">
        </ul>
      </div>
      <div class="pagination">
      </div>
    `;
  }
}

export default new RankingsView();