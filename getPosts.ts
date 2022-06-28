import { Handler } from 'aws-lambda';
import axios from 'axios';
import S3 from 'aws-sdk/clients/s3';

const { BUCKET, KEY } = process.env;

const s3 = new S3();

export const handler: Handler = async () => {
	const { data } = await axios.get(
		'https://jsonplaceholder.typicode.com/posts'
	);
	try {
		if (BUCKET && KEY) {
			await s3
				.putObject({ Bucket: BUCKET, Body: JSON.stringify(data), Key: KEY })
				.promise();
			console.info(
				'🚀 ~ file: getPosts.ts ~ line 20 ~ consthandler:Handler',
				`Successfully uploaded to ${BUCKET} at key of ${KEY}`
			);
		}
	} catch (error) {
		console.error(
			'🚀 ~ file: getPosts.ts ~ line 20 ~ consthandler:Handler= ~ error',
			error
		);
		throw error;
	}
	return `Successfully uploaded to ${BUCKET} at key of ${KEY}`;
};
