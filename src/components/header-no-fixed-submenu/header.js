const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.menu__link');
const subLinks = document.querySelectorAll('.menu__sub-link');
let items = '';

const windowWidth = window.outerWidth;
let menuIndex = 0;

function activetionMobileMenu() {
	burger.classList.toggle('active');
	nav.classList.toggle('active');
}

function closeMobileMenu() {
	burger.classList.remove('active');
	nav.classList.remove('active');
}

function openSubMenuMobile(e) {
	items = document.querySelectorAll('.menu__item');
	menuIndex = 0;

	items.forEach((item) => {
		const isItemLink =
			e.target.closest('.menu__item') === item &&
			e.target.className !== 'menu__link link-reset';

		if (isItemLink) {
			if (item.classList.contains('active')) {
				item.classList.remove('active');
			} else {
				item.classList.add('active');
			}
		} else {
			++menuIndex;
			item.classList.remove('active');
		}
	});
}

function openSubMenu(e) {
	items = document.querySelectorAll('.menu__item');
	menuIndex = 0;

	items.forEach((item) => {
		if (e.target.closest('.menu__item') === item) {
			item.classList.toggle('active');
		} else {
			++menuIndex;
			item.classList.remove('active');
		}
	});
}

function closeSubMenu() {
	items.forEach((item) => {
		item.classList.remove('active');
	});
}

burger.addEventListener('click', () => {
	activetionMobileMenu();
});

if (windowWidth <= 768) {
	nav.addEventListener('click', (e) => {
		openSubMenuMobile(e);
	});
} else {
	nav.addEventListener('mouseover', (e) => {
		openSubMenu(e);
	});

	nav.addEventListener('mouseout', () => {
		closeSubMenu();
	});
}

links.forEach((link) => {
	link.addEventListener('click', () => {
		closeMobileMenu();
	});
});

subLinks.forEach((link) => {
	link.addEventListener('click', () => {
		closeMobileMenu();
	});
});
