const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const body = document.querySelector('body');
const links = document.querySelectorAll('.menu__link');

function activetionMobileMenu() {
	burger.classList.toggle('active');
	nav.classList.toggle('active');
	body.classList.toggle('lock');
}

function closeMobileMenu() {
	burger.classList.remove('active');
	nav.classList.remove('active');
	body.classList.remove('lock');
}

burger.addEventListener('click', () => {
	activetionMobileMenu();
});

links.forEach((link) => {
	link.addEventListener('click', () => {
		closeMobileMenu();
	});
});
