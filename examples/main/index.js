import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactMgr, Orientation } from 'react-mgr';

const colors1 = ['red', 'green'];
const colors2 = ['red'];
const colors = ['red', 'green', 'blue', 'yellow'];
const carouselSizeH = {
  page: 240,
  margin: 10,
  containerWidth: 300,
  containerHeight: 200,
};
const carouselSizeV = {
  page: 240,
  margin: 10,
  containerWidth: 300,
  containerHeight: 300,
};

function getStyle(color) {
  return {
    width: '100%',
    height: '100%',
    backgroundColor: color,
  };
}

ReactDOM.render(
  <ReactMgr id="colors" size={ carouselSizeH } orientation={ Orientation.Horizontal } >
    { colors1.map((color, index) => (
      <div key={color} style={getStyle(color)}>{ index }</div>
    )) }
  </ReactMgr>,
  document.getElementById('ReactMgrH1')
);

ReactDOM.render(
  <ReactMgr id="colors" size={ carouselSizeH } orientation={ Orientation.Horizontal } >
    { colors2.map((color, index) => (
      <div key={color} style={getStyle(color)}>{ index }</div>
    )) }
  </ReactMgr>,
  document.getElementById('ReactMgrH2')
);

ReactDOM.render(
  <ReactMgr id="colors" size={ carouselSizeH } orientation={ Orientation.Horizontal } >
    { colors.map((color, index) => (
      <div key={color} style={getStyle(color)}>{ index }</div>
    )) }
  </ReactMgr>,
  document.getElementById('ReactMgrH3')
);

ReactDOM.render(
  <ReactMgr id="colors" size={ carouselSizeV } orientation={ Orientation.Vertiacal } >
    { colors.map((color, index) => (
      <div key={color} style={getStyle(color)}>{ index }</div>
    )) }
  </ReactMgr>,
  document.getElementById('ReactMgrV')
);
