import { addAuthor } from './actionCreators';

export const useAuthorApi = () => {
	const createAuthorApi = (author, token) => (dispatch) => {
		fetch('http://localhost:4000/authors/add', {
			method: 'POST',
			body: JSON.stringify(author),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.successful) {
					dispatch(addAuthor(data.result));
				}
			});
	};
	return { createAuthorApi };
};
