'use strict';

const products = JSON.parse(localStorage.getItem('products'));

const productsName = [];
const views = [];
const votes = [];

const results = document.querySelector('.results');
const resultList = document.querySelector('.result-list');
const chart = document.getElementById('myChartResults').getContext('2d');
const myChart = document.getElementById('myChartResults');

const listItem = () => {
	for (let i = 0; i < products.length; i++) {
		if (i % 2 === 0) {
			resultList.innerHTML += `<li class="list-item even">${products[i].name}: ${products[i].clicked} votes, views ${products[i].shownTimes} times.<span class='show-img'><img src=${products[i].src} alt=${products[i].name}></span> </li>`;
		} else {
			resultList.innerHTML += `<li class="list-item odd">${products[i].name}: ${products[i].clicked} votes, views ${products[i].shownTimes} times.<span class='show-img'><img src=${products[i].src} alt=${products[i].name}></span> </li>`;
		}
	}
};

const imageShown = () => {
	for (
		let index = 0;
		index < JSON.parse(localStorage.getItem('products')).length;
		index++
	) {
		productsName.push(JSON.parse(localStorage.getItem('products'))[index].name);
		views.push(JSON.parse(localStorage.getItem('products'))[index].shownTimes);
		votes.push(JSON.parse(localStorage.getItem('products'))[index].clicked);
	}

	let productChart = new Chart(chart, {
		type: 'bar',
		data: {
			labels: productsName,
			datasets: [
				{
					label: 'views',
					data: views,
					backgroundColor: '#00adb5',
					borderWidth: 2,
					borderColor: '#00adb5',
					hoverBorderColor: '#222831',
				},
				{
					label: 'votes',
					data: votes,
					backgroundColor: '#222831',
					borderWidth: 2,
					borderColor: '#222831',
					hoverBorderColor: '#00adb5',
				},
			],
		},
		options: {},
	});
};

window.addEventListener('DOMContentLoaded', () => {
	imageShown();
	listItem();
});

