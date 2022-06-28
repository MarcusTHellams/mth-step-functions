import axios from 'axios';
import { type Handler } from 'aws-lambda';

export const handler: Handler = async () => {
	const { data } = await axios.get(
		'https://jsonplaceholder.typicode.com/users'
	);
	return data;
};
