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

export const handler: Handler = async () => {
	const obj: { continue: boolean; response: string } = {
		continue: false,
		response: '',
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
				console.log('posts: line 28', posts.length);
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
	return obj;
};
