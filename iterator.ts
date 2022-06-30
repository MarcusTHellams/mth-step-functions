import { Handler } from 'aws-lambda';
import S3 from 'aws-sdk/clients/s3';
import voca from 'voca';

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

const { BUCKET, KEY } = process.env;

const s3 = new S3();

export const handler: Handler = async (event) => {
	console.log(
		'🚀 ~ file: iterator.ts ~ line 17 ~ consthandler:Handler= ~ event',
		JSON.stringify(event, null, 2)
	);
	let firstTimeRan: boolean = true;
	if (event.firstTimeRan) {
		firstTimeRan = event.firstTimeRan;
	}

	const obj: {
		continue: boolean;
		response: string;
		start: number;
		end: number;
		firstTimeRan: boolean;
	} = {
		continue: false,
		response: '',
		firstTimeRan,
		start: event?.start || 0,
		end: event?.end || 20,
	};
	try {
		if (BUCKET && KEY) {
			const { Body } = await s3
				.getObject({
					Bucket: BUCKET,
					Key: KEY,
				})
				.promise();
			if (Body) {
				const posts: Post[] = JSON.parse(Body.toString());
				const postToProcess = posts.splice(0, 20);
				if (postToProcess) {
					postToProcess.forEach((post) => {
						post.title = voca.titleCase(post.title);
					});
					obj.response = `Updated titles to ${postToProcess
						.map(({ title }) => title)
						.join(', ')}`;
				}
				if (posts.length) {
					obj.continue = true;
				}
				await s3
					.putObject({
						Bucket: BUCKET,
						Key: KEY,
						Body: JSON.stringify(posts),
					})
					.promise();
				console.log('posts: line 45', posts.length);
			}
		}
	} catch (error) {
		console.log(
			'🚀 ~ file: iterator.ts ~ line 49 ~ consthandler:Handler= ~ error',
			error
		);

		throw error;
	}
	obj.start = obj.end;
	obj.end = obj.end + 20;
	obj.firstTimeRan = false;
	return obj;
};
