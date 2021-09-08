export const debounce = (func, wait) => {
	let timeout;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			func();
        }, wait);
	}
}