import View from './View.js';
import Chart from 'chart.js';

class Card3View extends View {
  _parentElement = document.querySelector('.card-container');

  _showChart() {
    const ctx = document.querySelector('.card-3__chart').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'Poppins';
    Chart.defaults.global.defaultFontColor = 'rgb(180, 180, 180)';
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        // labels: Object.keys(this._data.cases),
        labels: Object.keys(this._data.cases).map(date => date.split('/').reverse().map((el, i) => i == 0 ? '20'.concat(el) : el.padStart(2, 0)))
          .map(arr => {
            [arr[1], arr[2]] = [arr[2], arr[1]]
            return arr.join('-');
          }),
        datasets: [{
          label: 'Cases',
          borderColor: 'rgb(0, 132, 255)',
          pointBackgroundColor: 'rgb(29, 148, 239)',
          data: Object.values(this._data.cases)
        }, {
          label: 'Deaths',
          borderColor: 'rgb(255, 53, 53)',
          pointBackgroundColor: 'rgb(255, 53, 53)',
          data: Object.values(this._data.deaths)
        }, {
          label: 'Recovered',
          borderColor: 'rgb(53, 255, 53)',
          pointBackgroundColor: 'rgb(53, 255, 53)',
          data: Object.values(this._data.recovered)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              autoSkip: true,
              maxTicksLimit: 6,
              callback: function (value, index, values) {
                return value / 1000000 + 'M';
              }
            }
          }],
          xAxes: [{
            ticks: {
              display: true,
              autoSkip: true,
            },
            type: 'time',
            time: {
              displayFormats: {
                month: 'MMM YYYY'
              }
            }
          }]
        },
        legend: {
          labels: {
            usePointStyle: true,
            padding: 15,
          }
        },
        tooltips: {
          titleMarginBottom: 8,
          titleAlign: 'center',
          bodySpacing: 8,
          xPadding: 10,
          yPadding: 10,
          mode: 'index',
          intersect: false,
          callbacks: {
            title: function (tooltipItem, data) {
              const xLabel = data.labels[tooltipItem[0].index];
              const newDate = new Date(xLabel);
              const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              };
              const formatter = new Intl.DateTimeFormat(navigator.language, options);
              return formatter.format(newDate);
            },
            label: function (tooltipItem, data) {
              const fmt = new Intl.NumberFormat(navigator.language);
              const label = data.datasets[tooltipItem.datasetIndex].label;
              const value = fmt.format(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
              return `${label}: ${value}`;
            }
          }
        },
        hover: {
          mode: 'index',
          intersect: false,
          animationDuration: 0
        }
      },
    });
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
    this._showChart();
  }

  _generateMarkup() {
    return `
      <div class="card-3">
        <canvas class="card-3__chart"></canvas>
      </div>
    `;
  }
}

export default new Card3View();