import View from "./View.js";

class RankingsListView extends View {
  _parentElement;

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const country = e.target.closest(".rankings__country");
      if (!country) return;
      const countryName = country.querySelector("span").textContent;
      handler(countryName);
    });
  }

  _generateMarkup() {
    this._parentElement = document.querySelector(".rankings__list");

    return `
      ${this._data.slicedResults
        .map(this._generateMarkupList.bind(this))
        .join("")}
    `;
  }

  _generateMarkupList(country, rank) {
    return `
      <li class="rankings__item">
        <span class="rankings__info">${this._data.start + rank + 1}</span>
        <div class="rankings__country">
          <img class="rankings__flag" src="${country.countryInfo.flag}">
          <span>${country.country}</span>
        </div>
        <span class="rankings__info">${this._numFmt.format(
          country.cases
        )}</span>
        <span class="rankings__info">${this._numFmt.format(
          country.deaths
        )}</span>
        <span class="rankings__info">${this._numFmt.format(
          country.recovered
        )}</span>
      </li>
    `;
  }
}

export default new RankingsListView();
