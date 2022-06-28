import { type Handler } from 'aws-lambda';

export const handler: Handler<string, string> = (event) => {
	let name: string[] | string = event.split('');
	name[0] = name[0].toUpperCase();
	name = name.join('');
	return Promise.resolve(name);
};
