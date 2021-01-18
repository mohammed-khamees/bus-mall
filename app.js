'use strict';

const products = [
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

const logoContainer = document.querySelector('.logo-container');
const images = document.querySelector('.images');
const imgContainer = document.querySelector('.img-container');
const generateBtn = document.querySelector('.generate-btn');
const roundsNum = document.getElementById('rounds');
const roundsBtn = document.querySelector('.rounds-btn');
const roundsContanier = document.querySelector('.rounds-num-container');
const results = document.querySelector('.results');
const resultList = document.querySelector('.result-list');
const warnText = document.querySelector('.warn-text');
const chart = document.getElementById('myChart').getContext('2d');
const myChart = document.getElementById('myChart');
const again = document.querySelector('.again');

let viewedNum = 25;
let viewTimes = 0;
let imagesViewed = [];

const randomImage = () => {
	return Math.floor(Math.random() * products.length);
};

const listItem = () => {
	for (let i = 0; i < products.length; i++) {
		if (i % 2 === 0) {
			resultList.innerHTML += `<li class="list-item even">${products[i].name}: ${products[i].clicked} votes, views ${products[i].shownTimes} times. </li>`;
		} else {
			resultList.innerHTML += `<li class="list-item odd">${products[i].name}: ${products[i].clicked} votes, views ${products[i].shownTimes} times. </li>`;
		}
	}
};

const imageShown = () => {
	if (viewTimes < viewedNum) {
		viewTimes++;
		let index = [];
		let image = randomImage();
		while (index.length < 3) {
			while (imagesViewed.includes(image)) {
				image = randomImage();
			}
			if (!index.includes(image)) index.push(image);
			image = randomImage();
		}
		imagesViewed = [...index];

		for (let i = 0; i < index.length; i++) {
			products[index[i]].shownTimes++;
			imgContainer.innerHTML += `<div class='single-img'>
							<h4 class='product-name'>${products[index[i]].name}</h4>
							<img src=${products[index[i]].src} alt=${
				products[index[i]].name
			} class='product-img'>
							<button class='btn' data-id=${
								products[index[i]].id
							}><i class="far fa-heart"></i> Vote</button>
						</div>`;
		}

		const voteBtns = document.querySelectorAll('.btn');
		voteBtns.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const id = e.currentTarget.dataset.id;
				products[id - 1].clicked++;
				imgContainer.innerHTML = '';
				imgContainer.classList.add('up');
				imageShown();
				resultList.innerHTML = '';
				listItem();
			});
		});
	} else {
		images.classList.add('hide');
		generateBtn.classList.add('hide');
		roundsContanier.classList.add('hide');
		myChart.classList.remove('hide');
		again.classList.remove('hide');
		results.classList.add('results-show');
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
	}
};

window.addEventListener('DOMContentLoaded', () => {
	imagesViewed = [];
	imageShown();
});

generateBtn.addEventListener('click', (e) => {
	e.preventDefault();
	imgContainer.innerHTML = '';
	imageShown();
	resultList.innerHTML = '';
	imgContainer.classList.add('up');
	listItem();
});

roundsBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const rounds = roundsNum.value;
	if (rounds > 25) {
		warnText.textContent = 'please your number must be between 0 - 25.';
	} else {
		warnText.textContent = '';
		viewedNum = rounds;
	}
});

again.addEventListener('click', () => {
	location.reload();
});

setInterval(() => {
	logoContainer.style.opacity = 1;
	imgContainer.classList.remove('up');
}, 3900);

setInterval(() => {
	imgContainer.classList.remove('up');
}, 1300);
