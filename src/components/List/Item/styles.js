import { theme } from 'styles'

const styles = {
	cardLink: {
		flex: '0 0 140px',
		display: 'inline-block',
		color: 'inherit',
		textDecoration: 'none',
		outline: 'none !important',

		'&:hover, &:visited, &:active': {
			textDecoration: 'none',
		},

		'& ul': {
			filter: 'grayscale(0.5)',
			opacity: 0.5,
	},

		'&:hover > div, &.active > div': {
			background: '#F6F6FF',
			borderColor: '#CCC', // When tabbing through cards
			color: '#00C',
			'& ul': {
				filter: 'none',
				opacity: 1,
			},
		},
		'&:focus > div': {
			// Focus styles for tabbing through cards
			borderColor: '#999',
			'& ul': {
				filter: 'none',
				opacity: 1,
			},
		},

		// 'active' class is added by RR <NavLink>
		'&.active > div': {
			borderColor: '#00C',
			cursor: 'default',
			'& ul': {
				filter: 'grayscale(1)',
				opacity: 1,
			},
		},
	},

	card: {
		borderRadius: '8px',
		border: theme.lightBorder,
		background: theme.lightBackground,
		padding: '0',

		display: 'flex',
		flexFlow: 'column nowrap',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},

	imageWrapper: {
		flex: '0 0 120px',
		height: '120px',
		borderRadius: '8px 8px 0 0',
		// background: theme.lightBackground,
		// borderBottom: theme.lightBorder,

		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'center',
		alignItems: 'center',
		perspective: '100px', // Enables the 3D rotation effect

		'& > img': {
			maxHeight: '100px',
			maxWidth: '100px',
			transition: 'transform 0.3s',
			transformStyle: 'preserve-3d;',
		},
		'&:hover > img': {
			transform: 'rotateY(180deg)',
		},
	},

	name: {
		flex: '0 0 auto',
		minHeight: '3em',
		padding: '0px 7px',
		margin: 0,
		fontSize: '1.1rem',
		fontWeight: 600,
		textAlign: 'center',
		// background: theme.lightBackground,
		// borderBottom: theme.lightBorder,
	},

	typeList: {
		flex: '0 0 auto',
		listStyle: 'none',
		padding: 0,
		margin: '7px 7px 0',
		minHeight: '25px',

		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		gap: '4px',

		'& > li': {
			flex: '1 1 auto',
			display: 'inline-block',
			// minWidth: '40px',
			padding: '0px 5px 3px',
			margin: 0,
			borderRadius: '7px',
			textAlign: 'center',
			fontWeight: 400,
			color: 'white',
		},
	},

	info: {
		flex: '0 0 1rem',
		padding: '4px 10px',
		fontSize: '0.8rem',
		fontWeight: 600,
		color: '#999',

		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
};

export default styles;
