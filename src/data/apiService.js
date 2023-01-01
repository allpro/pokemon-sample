const api = 'https://pokeapi.co/api/v2';

const get = url => (
	fetch(url, { cache: 'force-cache' })
		.then(resp => (
			resp.ok
				? resp.json()
				: Promise.reject({ status: resp.status })
		))
);

export default { get }; // eslint-disable-line
export { api };
