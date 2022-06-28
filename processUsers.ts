import { type Handler } from 'aws-lambda';
import { setCamelCase } from './setCamelCase';

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
}

interface Company {
	name: string;
	catchPhrase: string;
	bs: string;
}

interface Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: Geo;
}

interface Geo {
	lat: string;
	lng: string;
}

export const handler: Handler<User, User> = (user) => {
	return Promise.resolve(setCamelCase<User>(user));
};
