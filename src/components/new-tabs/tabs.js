const tabs = document.querySelectorAll('.tabs');
let tabsIndex = 0;

tabs.forEach((item) => {
	item.addEventListener('click', (e) => {
		const targetTabs = e.target.closest('.tabs');
		const tabsPanelItems = targetTabs.querySelectorAll('.tabs__panel-item');
		const tabsContentItems = targetTabs.querySelectorAll('.tabs__content-item');

		if (e.target.className === 'tabs__panel-item btn-reset') {
			tabsIndex = 0;

			tabsContentItems.forEach((contentItem) => {
				contentItem.classList.add('hidden');
			});

			tabsPanelItems.forEach((panelItem) => {
				panelItem.classList.remove('active');

				if (panelItem === e.target) {
					tabsContentItems[tabsIndex].classList.remove('hidden');
					panelItem.classList.add('active');
				} else {
					++tabsIndex;
				}
			});
		}
	});
});
