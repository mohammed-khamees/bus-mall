'use strict';

const products = JSON.parse(localStorage.getItem('products')) || [
	{ id: 1, name: 'bag', src: 'img/bag.jpg', shownTimes: 0, clicked: 0 },
	{ id: 2, name: 'banana', src: 'img/banana.jpg', shownTimes: 0, clicked: 0 },
	{
		id: 3,
		name: 'bathroom',
		src: 'img/bathroom.jpg',
		shownTimes: 0,
		clicked: 0,
	},
	{ id: 4, name: 'boots', src: 'img/boots.jpg', shownTimes: 0, clicked: 0 },
	{
		id: 5,
		name: 'breakfast',
		src: 'img/breakfast.jpg',
		shownTimes: 0,
		clicked: 0,
	},
	{
		id: 6,
		name: 'bubblegum',
		src: 'img/bubblegum.jpg',
		shownTimes: 0,
		clicked: 0,
	},
	{ id: 7, name: 'chair', src: 'img/chair.jpg', shownTimes: 0, clicked: 0 },
	{ id: 8, name: 'cthulhu', src: 'img/cthulhu.jpg', shownTimes: 0, clicked: 0 },
	{
		id: 9,
		name: 'dog-duck',
		src: 'img/dog-duck.jpg',
		shownTimes: 0,
		clicked: 0,
	},
	{ id: 10, name: 'dragon', src: 'img/dragon.jpg', shownTimes: 0, clicked: 0 },
	{ id: 11, name: 'pen', src: 'img/pen.jpg', shownTimes: 0, clicked: 0 },
	{
		id: 12,
		name: 'pet-sweep',
		src: 'img/pet-sweep.jpg',
		shownTimes: 0,
		clicked: 0,
	},
	{
		id: 13,
		name: 'scissors',
		src: 'img/scissors.jpg',
		shownTimes: 0,
		clicked: 0,
	},
	{ id: 14, name: 'shark', src: 'img/shark.jpg', shownTimes: 0, clicked: 0 },
	{ id: 15, name: 'sweep', src: 'img/sweep.png', shownTimes: 0, clicked: 0 },
	{
		id: 16,
		name: 'tauntaun',
		src: 'img/tauntaun.jpg',
		shownTimes: 0,
		clicked: 0,
	},
	{
		id: 17,
		name: 'unicorn',
		src: 'img/unicorn.jpg',
		shownTimes: 0,
		clicked: 0,
	},
	{ id: 18, name: 'usb', src: 'img/usb.gif', shownTimes: 0, clicked: 0 },
	{
		id: 19,
		name: 'water-can',
		src: 'img/water-can.jpg',
		shownTimes: 0,
		clicked: 0,
	},
	{
		id: 20,
		name: 'wine-glass',
		src: 'img/wine-glass.jpg',
		shownTimes: 0,
		clicked: 0,
	},
];

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
	for (let index = 0; index < products.length; index++) {
		productsName.push(products[index].name);
		views.push(products[index].shownTimes);
		votes.push(products[index].clicked);
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
