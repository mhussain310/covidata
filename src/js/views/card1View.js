import View from './View.js';

class Card1View extends View {
  _parentElement = document.querySelector('.card-container');
  _errorMessage = 'Data for this country could not be found. Please try another.';
  _options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  };
  _dateFmt = new Intl.DateTimeFormat(navigator.language, this._options);

  _calcLastUpdadted(timestamp) {
    const date = new Date(timestamp);
    return this._dateFmt.format(date);
  }

  _calcPercentages(todayDaily, ydayData) {
    const histStatsArr = Object.values(ydayData);
    const ydayDaily = histStatsArr[histStatsArr.length - 1] - histStatsArr[histStatsArr.length - 2];
    if (!ydayDaily) return 100;

    const percentage = (todayDaily - ydayDaily) / ydayDaily * 100;
    const formatPercentage = this._numFmt.format(Math.abs(percentage.toFixed(1)));

    if (percentage === -100 || percentage === 100) return Math.abs(percentage);
    else if (percentage < 0) return `-${formatPercentage}%`;
    else if (percentage === 0) return `${formatPercentage}%`;
    else return `+${formatPercentage}%`;
  }

  _generateMarkup() {
    return `
      <div class="card-1">
        <div class="card-1__wrapper">
          <div class="card-1__image-wrapper">
            <img class="card-1__image" src="${this._data.country.flag}" alt="Country Flag">
          </div>
          <div class="card-1__title">
            <span class="card-1__country">${this._data.country.name}</span>
            <span class="card-1__abbr">(${this._data.country.abbr})</span>
          </div>
          <ul class="card-1__list">
            <li class="card-1__item">
              <svg class="card-1__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g>
                  <path
                    d="M8.904 16.5h3.618c-.014.165-.022.332-.022.5c0 1.201.457 2.361 1.272 3.488c-.54.959-1.157 1.511-1.772 1.511c-1.197 0-2.4-2.094-3.038-5.204l-.058-.294z" />
                  <path
                    d="M8.674 15h4.2a5.52 5.52 0 0 1 2.627-2.901v-.098c0-.686-.026-1.355-.076-2h-6.85l-.033.488A25.987 25.987 0 0 0 8.674 15z" />
                  <path
                    d="M18 11.5c1.543 0 2.937.635 3.935 1.658A10.095 10.095 0 0 0 21.802 10h-4.87l.038.657c.015.308.024.62.029.934c.324-.06.66-.091 1.001-.091z" />
                  <path
                    d="M3.066 16.501h4.306c.364 2.082.983 3.854 1.792 5.093a10.029 10.029 0 0 1-5.952-4.814l-.146-.279z" />
                  <path d="M2.199 10h4.87a28.211 28.211 0 0 0 .033 4.42l.057.58H2.456a10.047 10.047 0 0 1-.258-5z" />
                  <path
                    d="M14.944 2.577l-.108-.17A10.027 10.027 0 0 1 21.372 8.5h-4.59c-.316-2.416-.957-4.492-1.838-5.923z" />
                  <path
                    d="M9.042 2.444l.122-.037C8.283 3.757 7.628 5.736 7.28 8.06l-.062.44H2.63a10.028 10.028 0 0 1 6.413-6.057z" />
                  <path
                    d="M12 2.002c1.319 0 2.646 2.542 3.214 6.183l.047.315H8.739C9.28 4.691 10.644 2.002 12 2.002z" />
                  <path
                    d="M22.5 17a4.5 4.5 0 0 0-9 0c0 1.863 1.42 3.815 4.2 5.9a.5.5 0 0 0 .6 0c2.78-2.085 4.2-4.037 4.2-5.9zm-6 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z" />
                </g>
              </svg>
              <span class="card-1__label">Continent:</span>
              <span class="card-1__number">${this._data.country.continent}</span>
            </li>
            <li class="card-1__item">
              <svg class="card-1__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                <g>
                  <path d="M7 14s-1 0-1-1s1-4 5-4s5 3 5 4s-1 1-1 1H7zm4-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6z" />
                  <path
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5z" />
                </g>
              </svg>
              <span class="card-1__label">Population:</span>
              <span class="card-1__number">${this._numFmt.format(this._data.country.population)}</span>
            </li>
          </ul>
        </div>
        <div class="daily-title">
          <span class="daily-title__name">Daily</span>
          <div class="daily-title__date-wrapper">
            <span class="daily-title__date-label">LAST UPDATED:</span>
            <span class="daily-title__date">${this._calcLastUpdadted(this._data.lastUpdated)}</span>
          </div>
        </div>
        <div class="daily">
          <div class="daily__block daily__block--cases">
            <div class="daily__value-container">
              <span class="daily__value">${this._numFmt.format(this._data.daily.cases)}</span>
              <span class="daily__percentage--${this._calcPercentages(this._data.daily.cases, this._data.hist.cases) === 100 ? 'hidden' : 'shown'} daily__percentage--${this._calcPercentages(this._data.daily.cases, this._data.hist.cases)[0] === '+' ? 'red' : 'green'}">${this._calcPercentages(this._data.daily.cases, this._data.hist.cases)}</span>
            </div>
            <p class="daily__label">cases</p>
          </div>
          <div class="daily__block daily__block--deaths">
            <div class="daily__value-container">
              <span class="daily__value">${this._numFmt.format(this._data.daily.deaths)}</span>
              <span class="daily__percentage--${this._calcPercentages(this._data.daily.deaths, this._data.hist.deaths) === 100 ? 'hidden' : 'shown'} daily__percentage--${this._calcPercentages(this._data.daily.deaths, this._data.hist.deaths)[0] === '+' ? 'red' : 'green'}">${this._calcPercentages(this._data.daily.deaths, this._data.hist.deaths)}</span>
            </div>
            <p class="daily__label">deaths</p>
          </div>
          <div class="daily__block rankings__block--recovered">
            <div class="daily__value-container">
              <span class="daily__value">${this._numFmt.format(this._data.daily.recovered)}</span>
              <span class="daily__percentage--${this._calcPercentages(this._data.daily.recovered, this._data.hist.recovered) === 100 ? 'hidden' : 'shown'} daily__percentage--${this._calcPercentages(this._data.daily.recovered, this._data.hist.recovered)[0] === '-' ? 'red' : 'green'}">${this._calcPercentages(this._data.daily.recovered, this._data.hist.recovered)}</span>
            </div>
            <p class="daily__label">recovered</p>
          </div>
        </div>
      </div>
    `;
  }
}

export default new Card1View();