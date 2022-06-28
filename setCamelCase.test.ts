import { setCamelCase } from './setCamelCase';
import { expect, test } from 'vitest';

const resultData = {
	id: '1',
	name: 'leanneGraham',
	username: 'bret',
	email: 'sincereAprilBiz',
	address: {
		street: 'kulasLight',
		suite: 'apt556',
		city: 'gwenborough',
		zipcode: '929983874',
		geo: {
			lat: '373159',
			lng: '811496',
		},
	},
	phone: '17707368031X56442',
	website: 'hildegardOrg',
	company: {
		name: 'romagueraCrona',
		catchPhrase: 'multiLayeredClientServerNeuralNet',
		bs: 'harnessRealTimeEMarkets',
	},
};
const mockData = {
	id: 1,
	name: 'Leanne Graham',
	username: 'Bret',
	email: 'Sincere@april.biz',
	address: {
		street: 'Kulas Light',
		suite: 'Apt. 556',
		city: 'Gwenborough',
		zipcode: '92998-3874',
		geo: {
			lat: '-37.3159',
			lng: '81.1496',
		},
	},
	phone: '1-770-736-8031 x56442',
	website: 'hildegard.org',
	company: {
		name: 'Romaguera-Crona',
		catchPhrase: 'Multi-layered client-server neural-net',
		bs: 'harness real-time e-markets',
	},
};

test(' returns the right result', () => {
	expect(setCamelCase(mockData)).toEqual(resultData);
});
