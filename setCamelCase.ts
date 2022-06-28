import camelCase from 'lodash/camelCase';
import isPlainObject from 'lodash/isPlainObject';

export const setCamelCase = <T extends Record<string, any>>(obj: T): T => {
	const result = <T>{};
	Object.keys(obj).forEach((key) => {
		if (isPlainObject(obj[key as keyof T])) {
			result[key as keyof T] = setCamelCase(obj[key as keyof T]);
		} else {
			result[key as keyof T] = camelCase(
				obj[key as keyof T] as unknown as string
			) as unknown as T[keyof T];
		}
	});

	return result;
};
