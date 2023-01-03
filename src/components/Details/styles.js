import { theme } from 'styles'

const styles = {
	wrapper: {
		flex: '0 0 340px',
		padding: '20px',
		background: theme.extraLightBackground,
		borderLeft: theme.lightBorder,
		overflowY: 'auto',
		position: 'relative',

		// Section headings
		'& h2': {
			fontSize: '1rem',
			fontWeight: 600,
			textTransform: 'uppercase',
			padding: 0,
			margin: '20px 0 7px',
		},
	},

	closeIcon: {
		background: theme.mediumBackground,
		border: theme.mediumBorder,
		borderRadius: '50%',
		fontSize: '16px',
		textAlign: 'center',
		lineHeight: '30px',
		width: '30px',
		height: '30px',
		position: 'absolute',
		top: '5px',
		right: '5px',
		zIndex: 1,
		cursor: 'pointer',

		'&:hover': {
			background: '#F6F6FF',
			borderColor: '#00C',
			color: '#00C',
		},
	},

	imageWrapper: {
		height: '340px',
		background: theme.lightBackground,
		border: theme.lightBorder,
		borderRadius: '8px',

		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'center',
		alignItems: 'center',
		perspective: '300px', // Enables the 3D rotation effect

		'& > img': {
			transform: 'scale(3)',
			transition: 'transform 0.3s',
			transformStyle: 'preserve-3d;',
			maxHeight: '100px', // scales to a max 200px display
			maxWidth: '100px', // ditto
		},
		'&:hover > img': {
			transform: 'scale(3) rotateY(180deg)',
		},
	},

	title: {
		fontSize: '1.5rem',
		fontWeight: 500,
		// textAlign: 'center',
		margin: '30px 0 20px',
		padding: 0,
	},

	info: {
		flex: '0 0 auto',
		padding: '0 5px',
		margin: '7px 0',
		fontSize: '1rem',
		fontWeight: 600,
		color: '#666',

		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	typeList: {
		flex: '0 0 auto',
		listStyle: 'none',
		padding: 0,
		margin: '10px 0',
		minHeight: '22px',

		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		gap: '15px',

		'& > li': {
			flex: '0 1 100%',
			display: 'inline-block',
			// minWidth: '40px',
			padding: '3px 10px 5px',
			margin: 0,
			borderRadius: '8px',
			textAlign: 'center',
			fontWeight: 400,
			color: 'white',
		},
	},

	bulletList: {
		flex: '0 0 auto',
		listStyle: 'square',
		padding: '0 0 0 20px',
		margin: '7px 0 15px',

		'& > li': {
			padding: '1px 0 3px',
			margin: 0,
		},
	},

	statsGrid: {
		display: 'grid',
		justifyContent: 'stretch',
		justifyItems: 'start start stretch',
		gridTemplateColumns: 'auto auto 1fr',
		alignItems: 'center',
		gridTemplateRows: 'auto',
		columnGap: '10px',
		rowGap: '7px',
		marginTop: '10px',

		'& > div': {},
		'& > div:nth-child(3n+1)': {
			fontWeight: 600,
			textAlign: 'right',
		},
		'& > div:nth-child(3n+2)': {
			paddingRight: '5px',
			whiteSpace: 'nowrap',
		},
		'& > div:nth-child(3n+3)': {},
	},
};

export default styles;
