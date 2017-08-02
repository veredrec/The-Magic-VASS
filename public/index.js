var form = document.querySelector('.form')
var cryptoInput = document.querySelector('.crypto')
var currencyInput = document.querySelector('.currency')
var result = document.querySelector('.result')

var makeRequest = function(url) {
	console.log(123);
	var XHR = new XMLHttpRequest();
	XHR.onreadystatechange = function () {
		if (XHR.readyState === 4 && XHR.status === 200 ) {
			console.log("Hey!");
			console.log(XHR.responseText);
			var xhrObj = JSON.parse(XHR.responseText)  //the response to the request as text
			showPrice(xhrObj)

		}
		else if (XHR.readyState === 4 && XHR.status !== 200) {
			result.innerText = "Fuck we fucked up"
		}
	}
	XHR.open('GET', url, true);
	XHR.send();
}



form.addEventListener('submit', function(event) {

	event.preventDefault(); // prevents page from reloading
	var crypto = cryptoInput.value;
	var currency = currencyInput.value;

	var url = '?cryptoCurrency=' + crypto + '&currency=' + currency //base url for the parameter in XHR.open
	makeRequest(url)
	form.reset();
})

function showPrice(xhrObj) {
	console.log(xhrObj);
	var currencyList = document.createElement('ul');
	currencyList.setAttribute('class', 'pricesUl')

	Object.keys(obj).forEach(function(key) {
		var currencyNode = document.createElement('li');
		currencyNode.setAttribute('class', 'pricesLi');
		currencyNode.innerText = key
		currencyList.appendChild(currencyNode)
	})

	// currencyNode.innerText = xhrObj.pricelast; // this could be wrong
}
