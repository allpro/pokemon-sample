import AppLayout from 'components/AppLayout';
import Details from 'components/Details';

const sitemap = [
	{
		path: '/*',
		element: <AppLayout />,

		children: [
			{
				path: ':name',
				element: <Details />,
			},
		],
	}
];

export default sitemap;
