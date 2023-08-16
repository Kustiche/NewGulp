const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.menu__link');

function activetionMobileMenu() {
	burger.classList.toggle('active');
	nav.classList.toggle('active');
}

function closeMobileMenu() {
	burger.classList.remove('active');
	nav.classList.remove('active');
}

burger.addEventListener('click', () => {
	activetionMobileMenu();
});

links.forEach((link) => {
	link.addEventListener('click', () => {
		closeMobileMenu();
	});
});
