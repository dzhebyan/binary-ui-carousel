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

class Example extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      test: 0,
    };

    this.onChangeState = this.onChangeState.bind(this);
  }

  onChangeState() {
    this.setState({
      test: this.state.test + 1,
    });
  }

  render() {
    return (
      <div>
        <div onClick={this.onChangeState} >Change State</div>
        <div id="ReactMgrH1">
          <ReactMgr id="colors" size={ carouselSizeH } orientation={ Orientation.Horizontal } >
            { colors1.map((color, index) => (
              <div key={color} style={getStyle(color)}>{ index }</div>
            )) }
          </ReactMgr>
        </div>
        <br />
        <div id="ReactMgrH2">
          <ReactMgr id="colors" size={ carouselSizeH } orientation={ Orientation.Horizontal } >
            { colors2.map((color, index) => (
              <div key={color} style={getStyle(color)}>{ index }</div>
            )) }
          </ReactMgr>
        </div>
        <br />
        <div id="ReactMgrH3">
          <ReactMgr id="colors" size={ carouselSizeH } orientation={ Orientation.Horizontal } >
            { colors.map((color, index) => (
              <div key={color} style={getStyle(color)}>{ index }</div>
            )) }
          </ReactMgr>
        </div>
        <br />
        <div id="ReactMgrV">
          <ReactMgr id="colors" size={ carouselSizeV } orientation={ Orientation.Vertiacal } >
            { colors.map((color, index) => (
              <div key={color} style={getStyle(color)}>{ index }</div>
            )) }
          </ReactMgr>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('ReactMgr')
);
