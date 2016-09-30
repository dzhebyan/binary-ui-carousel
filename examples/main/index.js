import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactMgr, Orientation } from 'react-mgr';

const colors1 = ['#AA3939', '#AA6C39'];
const colors2 = ['#AA3939'];
const colors = ['#AA3939', '#AA6C39', '#226666', '#2D882D'];
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
      mgr1: 0,
      mgr2: 0,
      mgr3: 2,
      mgr4: 0,
    };
    this.onChangeState = this.onChangeState.bind(this);
  }

  onChangeState() {
    this.setState({
      test: this.state.test + 1,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div onClick={this.onChangeState} >Change State</div>
        <div id="ReactMgrH1">
          <ReactMgr
            id="colors"
            size={carouselSizeH}
            orientation={Orientation.Horizontal}
            onPageChanged={(page) => { this.setState({ mgr1: page }); }}
            selectedIndex={this.state.mgr1}
          >
            {colors1.map((color, index) => (
              <div key={color} style={getStyle(color)}>{index}</div>
            ))}
          </ReactMgr>
        </div>
        <br />
        <div id="ReactMgrV">
          <ReactMgr
            id="colors"
            size={carouselSizeV}
            orientation={Orientation.Vertiacal}
            onPageChanged={(page) => { this.setState({ mgr4: page }); }}
            selectedIndex={this.state.mgr4}
          >
            { colors.map((color, index) => (
              <div key={color} style={getStyle(color)}>{ index }</div>
            )) }
          </ReactMgr>
        </div>
        <br />
        <div id="ReactMgrH2">
          <ReactMgr
            id="colors"
            size={carouselSizeH}
            orientation={Orientation.Horizontal} 
            onPageChanged={(page) => { this.setState({ mgr2: page }); }}
            selectedIndex={this.state.mgr2}
          >
            {colors2.map((color, index) => (
              <div key={color} style={getStyle(color)}>{index}</div>
            ))}
          </ReactMgr>
        </div>
        <br />
        <div id="ReactMgrH3">
          <ReactMgr
            id="colors"
            size={carouselSizeH}
            orientation={Orientation.Horizontal} 
            onPageChanged={(page) => { this.setState({ mgr3: page }); }}
            selectedIndex={this.state.mgr3}
          >
            {colors.map((color, index) => (
              <div key={color} style={getStyle(color)}>{index}</div>
            ))}
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
