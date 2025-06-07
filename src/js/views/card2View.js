import View from './View.js';

class Card2View extends View {
  _parentElement = document.querySelector('.card-container');

  addHandlerBtnClick(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  handlebtnClick(e, handler) {
    const backOfCard = document.querySelector(`.${this._parentElement.dataset.back}`);

    const precautionBtn = e.target.closest('.card-2__precaution-btn');
    const rankingsBtn = e.target.closest('.card-2__rankings-btn');
    const backBtn = e.target.closest('.card-2-back__btn--back');

    if (precautionBtn || backBtn) return backOfCard.classList.toggle('card-2-back--active');
    if (rankingsBtn) return handler();
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _generateMarkup() {
    return `
      <div class="card-2">
        <div class="card-2__wrapper">
          <div class="card-2__title">
            <span class="card-2__total">total</span>
          </div>
          <ul class="card-2__list">
            <li class="card-2__item">
              <svg class="card-2__icon card-2__icon--cases" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                <g>
                  <path
                    d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  <path d="M1 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1H1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6z" />
                </g>
              </svg>
              <span class="card-2__label">Cases:</span>
              <span class="card-2__number">${this._numFmt.format(this._data.cases)}</span>
            </li>
            <li class="card-2__item">
              <svg class="card-2__icon card-2__icon--deaths" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                viewBox="0 0 640 512">
                <path
                  d="M272 191.91c-17.6 0-32 14.4-32 32v80c0 8.84-7.16 16-16 16s-16-7.16-16-16v-76.55c0-17.39 4.72-34.47 13.69-49.39l77.75-129.59c9.09-15.16 4.19-34.81-10.97-43.91c-14.45-8.67-32.72-4.3-42.3 9.21c-.2.23-.62.21-.79.48l-117.26 175.9C117.56 205.9 112 224.31 112 243.29v80.23l-90.12 30.04A31.974 31.974 0 0 0 0 383.91v96c0 10.82 8.52 32 32 32c2.69 0 5.41-.34 8.06-1.03l179.19-46.62C269.16 449.99 304 403.8 304 351.91v-128c0-17.6-14.4-32-32-32zm346.12 161.73L528 323.6v-80.23c0-18.98-5.56-37.39-16.12-53.23L394.62 14.25c-.18-.27-.59-.24-.79-.48c-9.58-13.51-27.85-17.88-42.3-9.21c-15.16 9.09-20.06 28.75-10.97 43.91l77.75 129.59c8.97 14.92 13.69 32 13.69 49.39V304c0 8.84-7.16 16-16 16s-16-7.16-16-16v-80c0-17.6-14.4-32-32-32s-32 14.4-32 32v128c0 51.89 34.84 98.08 84.75 112.34l179.19 46.62c2.66.69 5.38 1.03 8.06 1.03c23.48 0 32-21.18 32-32v-96c0-13.77-8.81-25.99-21.88-30.35z" />
              </svg>
              <span class="card-2__label">Deaths:</span>
              <span class="card-2__number">${this._numFmt.format(this._data.deaths)}</span>
            </li>
            <li class="card-2__item">
              <svg class="card-2__icon card-2__icon--recovered" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                viewBox="0 0 576 512">
                <path
                  d="M159.88 175.82h64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16h-64v-64a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v64h-64a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16zm408.19 160.31a39.91 39.91 0 0 0-55.93-8.47l-119.67 88.18H271.86a16 16 0 0 1 0-32h78.24c16 0 30.75-10.87 33.37-26.61a32.06 32.06 0 0 0-31.62-37.38h-160a117.7 117.7 0 0 0-74.12 26.25l-46.5 37.74H15.87a16.11 16.11 0 0 0-16 16v96a16.11 16.11 0 0 0 16 16h347a104.8 104.8 0 0 0 61.7-20.27L559.6 392a40 40 0 0 0 8.47-55.87z" />
              </svg>
              <span class="card-2__label">Recovered:</span>
              <span class="card-2__number">${this._numFmt.format(this._data.recovered)}</span>
            </li>
            <li class="card-2__item">
              <svg class="card-2__icon card-2__icon--active" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36">
                <path
                  d="M34.6 29.21L20.71 3.65a3.22 3.22 0 0 0-5.66 0L1.17 29.21A3.22 3.22 0 0 0 4 34h27.77a3.22 3.22 0 0 0 2.83-4.75zM16.6 10a1.4 1.4 0 0 1 2.8 0v12a1.4 1.4 0 0 1-2.8 0zM18 29.85a1.8 1.8 0 1 1 1.8-1.8a1.8 1.8 0 0 1-1.8 1.8z" />
              </svg>
              <span class="card-2__label">Active:</span>
              <span class="card-2__number">${this._numFmt.format(this._data.active)}</span>
            </li>
            <li class="card-2__item">
              <svg class="card-2__icon card-2__icon--critical" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M14.9 3H9.1c-.53 0-1.04.21-1.42.59l-4.1 4.1C3.21 8.06 3 8.57 3 9.1v5.8c0 .53.21 1.04.59 1.41l4.1 4.1c.37.38.88.59 1.41.59h5.8c.53 0 1.04-.21 1.41-.59l4.1-4.1c.38-.37.59-.88.59-1.41V9.1c0-.53-.21-1.04-.59-1.41l-4.1-4.1c-.37-.38-.88-.59-1.41-.59zm.64 12.54a.996.996 0 0 1-1.41 0L12 13.41l-2.12 2.12a.996.996 0 1 1-1.41-1.41L10.59 12L8.46 9.88a.996.996 0 1 1 1.41-1.41L12 10.59l2.12-2.12a.996.996 0 1 1 1.41 1.41L13.41 12l2.12 2.12c.4.39.4 1.03.01 1.42z"/></svg>
              <span class="card-2__label">Critical:</span>
              <span class="card-2__number">${this._numFmt.format(this._data.critical)}</span>
            </li>
            <li class="card-2__item">
              <svg class="card-2__icon card-2__icon--tests" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  d="M7 2v2h1v14a4 4 0 0 0 4 4a4 4 0 0 0 4-4V4h1V2H7m4 14c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m2-4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m1-5h-4V4h4v3z" />
              </svg>
              <span class="card-2__label">Tests:</span>
              <span class="card-2__number">${this._numFmt.format(this._data.tests)}</span>
            </li>
          </ul>
          <div class="card-2__btn-container">
            <button class="card-2__rankings-btn">View rankings</button>
            <button class="card-2__precaution-btn" data-back="card-2-back">Precautions</button>
          </div>
        </div>
        <div class="card-2-back">
          <div class="card-2-back__title-container">
            <span class="card-2-back__title">Precautions</span>
          </div>
          <ul class="card-2-back__list">
            <li class="card-2-back__item">
              <div class="card-2-back__icon-container">
                <svg class="card-2-back__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                  viewBox="0 0 36 36">
                  <path d="M18 11a7 7 0 1 1-7 7a7 7 0 0 1 7-7" />
                  <path d="M18 34a16 16 0 1 1 16-16a16 16 0 0 1-16 16zm0-30a14 14 0 1 0 14 14A14 14 0 0 0 18 4z" />
                </svg>
              </div>
              <span class="card-2-back__text">Try to stay at least 2 metres away from anyone you do not live
                with.</span>
            </li>
            <li class="card-2-back__item">
              <div class="card-2-back__icon-container">
                <svg class="card-2-back__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                  viewBox="0 0 36 36">
                  <path d="M18 11a7 7 0 1 1-7 7a7 7 0 0 1 7-7" />
                  <path d="M18 34a16 16 0 1 1 16-16a16 16 0 0 1-16 16zm0-30a14 14 0 1 0 14 14A14 14 0 0 0 18 4z" />
                </svg>
              </div>
              <span class="card-2-back__text">Use hand sanitizer gel if soap and water are not available.</span>
            </li>
            <li class="card-2-back__item">
              <div class="card-2-back__icon-container">
                <svg class="card-2-back__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                  viewBox="0 0 36 36">
                  <path d="M18 11a7 7 0 1 1-7 7a7 7 0 0 1 7-7" />
                  <path d="M18 34a16 16 0 1 1 16-16a16 16 0 0 1-16 16zm0-30a14 14 0 1 0 14 14A14 14 0 0 0 18 4z" />
                </svg>
              </div>
              <span class="card-2-back__text">Cover your mouth and nose with a tissue or your sleeve.</span>
            </li>
            <li class="card-2-back__item">
              <div class="card-2-back__icon-container">
                <svg class="card-2-back__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                  viewBox="0 0 36 36">
                  <path d="M18 11a7 7 0 1 1-7 7a7 7 0 0 1 7-7" />
                  <path d="M18 34a16 16 0 1 1 16-16a16 16 0 0 1-16 16zm0-30a14 14 0 1 0 14 14A14 14 0 0 0 18 4z" />
                </svg>
              </div>
              <span class="card-2-back__text">Wear a mask in public places.</span>
            </li>
          </ul>
          <div class="card-2-back__buttons">
            <button class="card-2-back__btn card-2-back__btn--back">
              <svg class="card-2-back__btn-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                viewBox="0 0 24 24">
                <g fill="none">
                  <path d="M11 5l-7 7l7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4 12h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
              <span class="card-2-back__btn-text">Back</span>
            </button>
            <button class="card-2-back__btn--info">
              <a target="_blank" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" class="card-2-back__link">More info</a>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

export default new Card2View();