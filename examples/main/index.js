import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactMgr } from 'react-mgr';


const carouselSize = {
	page: 200,
	margin: 10,
	container: 300,
};
const colors = ['red', 'green', 'blue', 'yellow'];

ReactDOM.render(
	<ReactMgr id="colors" size={ carouselSize }>
		{colors.map(color => <div key={color}
			style={{
				width: carouselSize.page,
				height: carouselSize.page,
				backgroundColor: color,
			}}
		></div>)}
	</ReactMgr>,
	document.getElementById('ReactMgr')
);
