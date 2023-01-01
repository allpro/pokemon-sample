import { theme } from 'styles'

const styles = {
	wrapper: {
		flex: '0 0 auto',
		background: theme.mediumBackground,
		borderBottom: theme.lightBorder,

		display: 'flex',
		flexFlow: 'column nowrap',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		padding: '12px 15px',
		gap: '12px',
	},

	row: {
		flex: '0 0 auto',

		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '50px', // Only the top row has multiple children: Search & Sort
	},
};

export default styles;
