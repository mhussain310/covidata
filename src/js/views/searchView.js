class SearchView {
  _parentElement = document.querySelector(".search");
  _searchField = document.querySelector(".search__field");
  _searchBtn = document.querySelector(".search__btn");
  _searchClear = document.querySelector(".search__clear");

  addHandlerFocus(handler) {
    ["focusin", "focusout"].forEach((ev) =>
      this._searchField.addEventListener(ev, () => handler(ev))
    );
  }

  addHandlerInput(handler) {
    this._searchField.addEventListener("input", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerSearchClick(handler) {
    this._searchBtn.addEventListener("mousedown", () => handler());
  }

  addHandlerReset(handler) {
    this._searchClear.addEventListener("mousedown", function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._searchField.value;
    return query;
  }

  setQuery(newValue = "") {
    this._searchField.value = newValue;
  }

  controlFocus(blur = true) {
    blur ? this._searchField.blur() : this._searchField.focus();
  }
}

export default new SearchView();
