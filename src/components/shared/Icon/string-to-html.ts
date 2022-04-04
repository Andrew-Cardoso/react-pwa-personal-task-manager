export const stringToHtml = <T extends HTMLElement>(stringElement: string): T => {
	const container = document.createElement('div');
	const fragment = document.createDocumentFragment();
	container.innerHTML = stringElement;
	fragment.appendChild(container.firstElementChild!);
	container.remove();
	return fragment.firstElementChild! as T;
};
