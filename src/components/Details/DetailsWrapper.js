import React from 'react';
import { useParams } from 'react-router-dom'

import Details from './Details';


/**
 * Simple wrapper to force Details to re-mount if 'name' in the URL changes.
 * This simplifies the onMount code inside Details.
 */
function DetailsWrapper() {
	const { name } = useParams();

	return (
		<Details key={name || 'none'} name={name || ''} />
	);
}

export default DetailsWrapper;
