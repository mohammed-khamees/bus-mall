'use strict';

const imgId = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
];
const imgName = [
	'bag',
	'banana',
	'bathroom',
	'boots',
	'breakfast',
	'bubblegum',
	'chair',
	'cthulhu',
	'dog-duck',
	'dragon',
	'pen',
	'pet-sweep',
	'scissors',
	'shark',
	'sweep',
	'tauntaun',
	'unicorn',
	'usb',
	'water-can',
	'wine-glass',
];
const imgSrc = [
	'img/bag.jpg',
	'img/banana.jpg',
	'img/bathroom.jpg',
	'img/boots.jpg',
	'img/breakfast.jpg',
	'img/bubblegum.jpg',
	'img/chair.jpg',
	'img/cthulhu.jpg',
	'img/dog-duck.jpg',
	'img/dragon.jpg',
	'img/pen.jpg',
	'img/pet-sweep.jpg',
	'img/scissors.jpg',
	'img/shark.jpg',
	'img/sweep.png',
	'img/tauntaun.jpg',
	'img/unicorn.jpg',
	'img/usb.gif',
	'img/water-can.jpg',
	'img/wine-glass.jpg',
];
const imgViews = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const imgVotes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const products = [];

function Product(id, name, src, shownTimes, clicked) {
	this.id = id;
	this.name = name;
	this.src = src;
	this.shownTimes = shownTimes;
	this.clicked = clicked;
}

for (let i = 0; i < 20; i++) {
	const product = new Product(
		imgId[i],
		imgName[i],
		imgSrc[i],
		imgViews[i],
		imgVotes[i],
	);
	products.push(product);
}

const productsName = [];
const views = [];
const votes = [];

const logoContainer = document.querySelector('.logo-container');
const images = document.querySelector('.images');
const imgContainer = document.querySelector('.img-container');
const generateBtn = document.querySelector('.generate-btn');
const resultsBtnPrev = document.querySelector('.results-btn-prev');
const resultsBtnNew = document.querySelector('.results-btn-new');
const roundsNum = document.getElementById('rounds');
const roundsBtn = document.querySelector('.rounds-btn');
const roundsContanier = document.querySelector('.rounds-num-container');
const warnText = document.querySelector('.warn-text');
const again = document.querySelector('.again');

let viewedNum = 25;
let viewTimes = 0;
let imagesViewed = [];

const randomImage = () => {
	return Math.floor(Math.random() * products.length);
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
			});
		});
	} else {
		localStorage.setItem('products', JSON.stringify(products));
		for (let index = 0; index < products.length; index++) {
			productsName.push(products[index].name);
			views.push(products[index].shownTimes);
			votes.push(products[index].clicked);
		}
		imgContainer.classList.add('hide');
		generateBtn.classList.add('hide');
		resultsBtnPrev.classList.add('hide');
		resultsBtnNew.classList.remove('hide');
		again.classList.remove('hide');
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
	imgContainer.classList.add('up');
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
