import { theme } from 'styles'

const styles = {
	footer: {
		flex: '0 0 auto',
		padding: '10px 10px 10px 20px',
		background: theme.lightBackground,
		borderTop: theme.lightBorder,
		fontSize: '0.9em',
		fontWeight: 600,

		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '20px',
	},

	count: {
		flex: '0 0 auto',
	},

	loader: {
		flex: '0 1 50%',
		maxWidth: '500px',
	},
};

export default styles;
