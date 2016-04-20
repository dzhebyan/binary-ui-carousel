import * as React from 'react';

export const ReactMgr = (props) => (
	<div>
		{ props.children }
	</div>
);

ReactMgr.defaultProps = {
	children: undefined,
};

ReactMgr.propTypes = {
	children: React.PropTypes.any,
};
