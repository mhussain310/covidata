import { getJSON } from '../helper.js';
import countryNames from './countryNames.js';
import { COVID_DATA_URL, RES_PER_PAGE, RANKINGS_SELECTIONS } from '../config.js'
import { async } from 'regenerator-runtime';

export const state = {
  filtCountryList: [],
  query: '',
  covidData: {},
  rankings: {
    selectionList: RANKINGS_SELECTIONS,
    selected: RANKINGS_SELECTIONS[0],
    data: [],
    pagination: {
      page: 1,
      dataPerPage: RES_PER_PAGE,
      numPages: null,
      start: null,
      end: null,
      maxLeft: null,
      maxRight: null,
      btnCount: 5,
      slicedResults: []
    }
  }
};

export const loadCountryNames = function (query) {
  state.query = query;

  state.filtCountryList = countryNames.filter(country => {
    const regex = new RegExp(`^${state.query}`, 'gi');
    return country.name.match(regex) || country.iso2.match(regex) || country.iso3.match(regex);
  });

  if (state.query.length === 0) state.filtCountryList = [];
};

const createCovidDataObject = function (countryData, histData) {
  return {
    lastUpdated: countryData.updated,
    country: {
      name: countryNames.find(country => country.iso3 === countryData.countryInfo.iso3).name,
      abbr: countryData.countryInfo.iso3,
      continent: countryData.continent,
      population: countryData.population,
      flag: countryData.countryInfo.flag
    },
    daily: {
      cases: countryData.todayCases,
      deaths: countryData.todayDeaths,
      recovered: countryData.todayRecovered
    },
    total: {
      cases: countryData.cases,
      deaths: countryData.deaths,
      recovered: countryData.recovered,
      active: countryData.active,
      critical: countryData.critical,
      tests: countryData.tests
    },
    hist: {
      cases: histData.timeline.cases,
      deaths: histData.timeline.deaths,
      recovered: histData.timeline.recovered
    }
  };
};

export const loadCountryData = async function (query) {
  try {
    state.query = query;

    const [countryData, histData] = await Promise.all([
      getJSON(`${COVID_DATA_URL}countries/${state.query}?strict=false`),
      getJSON(`${COVID_DATA_URL}historical/${state.query}?lastdays=all`)
    ]);

    state.covidData = createCovidDataObject(countryData, histData);

  } catch (err) {
    throw err;
  }
};

export const loadRankings = async function () {
  try {
    const rankingData = await getJSON(`${COVID_DATA_URL}countries?sort=${state.rankings.selected}`);
    state.rankings.data = rankingData;
    state.rankings.pagination.numPages = Math.ceil(state.rankings.data.length / state.rankings.pagination.dataPerPage);
  } catch (err) {
    throw err;
  }
};

export const loadRankedSelected = function (selected = RANKINGS_SELECTIONS[0]) {
  state.rankings.selected = selected;
  return state.rankings.selected;
};

export const getSearchResultsPage = function (page = state.rankings.pagination.page) {
  state.rankings.pagination.page = page;
  state.rankings.pagination.maxLeft = state.rankings.pagination.page - Math.floor(state.rankings.pagination.btnCount / 2);
  state.rankings.pagination.maxRight = state.rankings.pagination.page + Math.floor(state.rankings.pagination.btnCount / 2);

  const numPages = state.rankings.pagination.numPages;
  const btnCount = state.rankings.pagination.btnCount;
  const { maxLeft, maxRight } = state.rankings.pagination;

  if (maxLeft < 1) {
    state.rankings.pagination.maxLeft = 1;
    state.rankings.pagination.maxRight = btnCount;
  }

  if (maxRight > numPages) {
    state.rankings.pagination.maxLeft = numPages - (btnCount - 1);
    state.rankings.pagination.maxRight = numPages;
  }

  if (maxRight > numPages && maxLeft < 1) state.rankings.pagination.maxLeft = 1;

  state.rankings.pagination.start = (page - 1) * state.rankings.pagination.dataPerPage;
  state.rankings.pagination.end = page * state.rankings.pagination.dataPerPage;

  state.rankings.pagination.slicedResults = state.rankings.data.slice(state.rankings.pagination.start, state.rankings.pagination.end);
};