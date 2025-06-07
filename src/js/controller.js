import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model/model.js";
import searchListView from "./views/searchListView.js";
import searchView from "./views/searchView.js";
import card1View from "./views/card1View.js";
import { async } from "regenerator-runtime/runtime";
import card2View from "./views/card2View.js";
import card3View from "./views/card3View.js";
import rankingsView from "./views/rankingsView.js";
import rankingsSelectionView from "./views/rankingsSelectionView.js";
import rankingsListView from "./views/rankingsListView.js";
import rankingsPaginationView from "./views/rankingsPaginationView.js";

const controlFocus = (ev) =>
  ev === "focusin"
    ? searchListView.addSearchListHeight()
    : searchListView.removeSearchListHeight();

const controlInputResults = function () {
  const query = searchView.getQuery();
  model.loadCountryNames(query);
  searchListView.render(model.state.filtCountryList);
};

const resetInput = function (blur = false) {
  searchView.setQuery();
  controlInputResults();
  searchView.controlFocus(blur);
};

const controlSearchListClick = async function (countryName) {
  try {
    searchView.setQuery(countryName);
    await controlSearchResults();
  } catch (err) {
    card1View.renderError();
  }
};

const controlSearchResults = async function (rankingsQuery) {
  try {
    searchListView.removeSearchListHeight();
    searchView.controlFocus();
    rankingsView.clear();

    const query = rankingsQuery || searchView.getQuery().toLowerCase();
    if (!query) return;

    card1View.renderSpinner("Loading country data");

    await model.loadCountryData(query);

    card1View.render(model.state.covidData);
    card2View.render(model.state.covidData.total);
    card3View.render(model.state.covidData.hist);
  } catch (err) {
    card1View.renderError(err.message);
  }
};

const controlCard2BtnClick = function (e) {
  card2View.handlebtnClick(e, showRankings);
};

const showRankings = async function () {
  try {
    card1View.clear();
    rankingsView.renderSpinner("Loading rankings");
    resetInput(true);

    await model.loadRankings();

    rankingsView.render();

    rankingsSelectionView.render(model.state.rankings.selectionList);
    rankingsSelectionView.displaySelected(model.loadRankedSelected());
    rankingsSelectionView.addHandlerOpenSelection();
    rankingsSelectionView.addHandlerSelectOption(controlSelectOption);

    controlRankingsPagination();
    rankingsPaginationView.addHandlerClick(controlRankingsPagination);
  } catch (err) {
    rankingsView.renderError(err.message);
  }
};

const controlSelectOption = async function (e) {
  try {
    const selected = rankingsSelectionView.selectOption(e).toLowerCase();

    rankingsSelectionView.displaySelected(model.loadRankedSelected(selected));

    await model.loadRankings();

    controlRankingsPagination();
  } catch (err) {
    rankingsView.renderError(err.message);
  }
};

const controlRankingsPagination = function (goToPage = 1) {
  // Remove active class from previous button
  rankingsPaginationView.addActiveClass(true);

  model.getSearchResultsPage(goToPage);
  rankingsListView.render(model.state.rankings.pagination);
  rankingsListView.addHandlerClick(controlSearchResults);

  rankingsPaginationView.render(model.state.rankings);
  // Add active class to new button
  rankingsPaginationView.addActiveClass();

  window.scrollTo(0, 0);
};

const init = function () {
  searchView.addHandlerFocus(controlFocus);
  searchView.addHandlerInput(controlInputResults);
  searchView.addHandlerReset(resetInput);
  searchView.addHandlerSubmit(controlSearchResults);
  searchView.addHandlerSearchClick(controlSearchResults);
  searchListView.addHandlerSearchList(controlSearchListClick);
  card2View.addHandlerBtnClick(controlCard2BtnClick);
};
init();
