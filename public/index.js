var form = document.querySelector('.form');
var cryptoInput = document.querySelector('.crypto');
var currencyInput = document.querySelector('.currency');
var result = document.querySelector('.result');
var dataContainer = document.querySelector('.dataContainer');
var chart = document.querySelector('#lineChart');
var lineChart = new Chart(chart, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '',
      fill: false,
      data: [],
      backgroundColor: ['rgba(25,99,132,1)'],
      borderColor: ['rgba(255,99,132,1)'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    legend: {
      position: 'top',
    },
    hover: {
      mode: 'label'
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Price'
        },
        ticks: {
          // beginAtZero: true,
          steps: 10,
          stepValue: 5,
          min: 0,
        }
      }]
    },
  }
})

var makeRequest = function(url) {
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4 && XHR.status === 200) {
      var xhrObj = JSON.parse(XHR.responseText); //the response to the request as text
      showPrice(xhrObj);
      makeChart(xhrObj);
    } else if (XHR.readyState === 4 && XHR.status !== 200) {
      result.innerText = 'Error loading data :)';
    } else {
      result.innerText = 'Fetching Data.....';
    }
  }
  XHR.open('GET', url, true);
  XHR.send();
}

var timeVariable;

form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevents page from reloading
  var crypto = cryptoInput.value;
  var currency = currencyInput.value;
  var url = '?cryptoCurrency=' + crypto + '&currency=' + currency; //base url for the parameter in XHR.open

  if (timeVariable) {
    clearInterval(timeVariable);
    lineChart.data.labels=[];
    lineChart.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
    lineChart.options.scales.yAxes.forEach((yAxe) => {
      yAxe.ticks.max = '';
      yAxe.ticks.min = '';
    });
  }

  timeVariable = setInterval(priceTimer, 5000);

  function priceTimer() {
    makeRequest(url);
  }

  form.reset();
})

function showPrice(xhrObj) {
  var currencyList = document.createElement('ul');
  currencyList.setAttribute('class', 'pricesUl');
  var currencyTitle = document.createElement('h2');
  currencyTitle.setAttribute('class', 'currencyTitle');
  currencyTitle.innerText = xhrObj.title;
  dataContainer.replaceChild(currencyTitle, dataContainer.firstChild);

  Object.values(xhrObj).forEach(function(value, index) {
    if (index !== 0) {
      var currencyNode = document.createElement('li');
      currencyNode.setAttribute('class', 'pricesLi');
      currencyNode.innerText = Object.keys(xhrObj)[index] + ': ' + value;
      currencyList.appendChild(currencyNode);
    }
  })
  result.replaceChild(currencyList, result.firstChild);
}

function makeChart(xhrObj) {
  var time = new Date();
  var currentTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
  if (lineChart.data.labels.length>=19) {
    lineChart.data.labels.shift();
    lineChart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }
  lineChart.data.labels.push(currentTime);
  lineChart.data.datasets.forEach((dataset) => {
    dataset.data.push(xhrObj['Current Price']);
    dataset.label = xhrObj['title'];
  });
  lineChart.options.scales.yAxes.forEach((yAxe) => {
    yAxe.ticks.max = xhrObj['Today\'s Highest Price'];
    yAxe.ticks.min = xhrObj['Today\'s Lowest Price'];
  });
  lineChart.update();
}
