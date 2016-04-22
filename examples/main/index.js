import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactMgr, Orientation } from 'react-mgr';

const colors = ['red', 'green', 'blue', 'yellow'];
const carouselSizeV = {
	page: 240,
	margin: 10,
	containerWidth: 300,
	containerHeight: 300,
};
const carouselSizeH = {
	page: 240,
	margin: 10,
	containerWidth: 300,
	containerHeight: 200,
};

ReactDOM.render(
	<ReactMgr id="colors" size={ carouselSizeV } orientation={ Orientation.Vertiacal } >
		{ colors.map((color, index) => <div key={color}
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: color,
			}}
		>{ index }</div>) }
	</ReactMgr>,
	document.getElementById('ReactMgrV')
);

ReactDOM.render(
	<ReactMgr id="colors" size={ carouselSizeH } orientation={ Orientation.Horizontal } >
		{ colors.map((color, index) => <div key={color}
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: color,
			}}
		>{ index }</div>) }
	</ReactMgr>,
	document.getElementById('ReactMgrH')
);
