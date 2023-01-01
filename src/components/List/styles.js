import { theme } from 'styles'

const styles = {
	wrapper: {
		flex: '0 1 100%',
		display: 'flex',
		flexFlow: 'column nowrap',
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},

	list: {
		flex: '0 1 auto',
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'center',
		alignItems: 'stretch',
		gap: '15px',
		overflowY: 'auto',
		padding: '20px',
	},
};

export default styles;
