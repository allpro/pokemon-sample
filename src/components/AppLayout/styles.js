const styles = {
	wrapper: {
		height: '100vh',
		width: '100vw',
		display: 'flex',
		flexFlow: 'column nowrap',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},

	header: {
		flex: '0 0 auto',
		padding: '16px 20px 14px',
		fontSize: '1.5rem',
		fontWeight: 600,
		color: 'white',
		background: 'linear-gradient(175deg, rgba(50, 58, 80, 1) 0%, rgba(50, 58, 80, 0.8) 100%)',
	},

	main: {
		flex: '0 1 100%',
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		minHeight: 0,
	},
};

export default styles;
