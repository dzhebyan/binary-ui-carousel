import { ActionIcon } from 'binary-ui-components';
import { CardsIconArrowLeft, CardsIconArrowRight } from 'binary-ui-icons';
import React from 'react';
import ReactMgr from 'react-mgr';

const colors1 = ['#AA3939', '#AA6C39'];
const colors2 = ['#AA3939'];
const colors = ['#AA3939', '#AA6C39', '#226666', '#2D882D'];

function getStyle(color) {
  return {
    width: '100%',
    height: '100%',
    backgroundColor: color,
  };
}

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mgr1: 0,
      mgr2: 0,
      mgr3: 2,
    };
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div id="ReactMgrH1">
          <ReactMgr
            containerHeight={200}
            containerWidth={300}
            margin={10}
            pageWidth={240}
            renderButtonLeft={props => (
              <ActionIcon title="Left" IconComponent={CardsIconArrowLeft} {...props} />
            )}
            renderButtonRight={props => (
              <ActionIcon title="Left" IconComponent={CardsIconArrowRight} {...props} />
            )}
            selectedIndex={this.state.mgr1}
            onChangeIndex={(page) => { this.setState({ mgr1: page }); }}
          >
            {colors1.map((color, index) => (
              <div key={color} style={getStyle(color)}>{index}</div>
            ))}
          </ReactMgr>
        </div>
        <br />
        <div id="ReactMgrH2">
          <ReactMgr
            containerHeight={200}
            containerWidth={300}
            margin={10}
            pageWidth={240}
            renderButtonLeft={props => (
              <ActionIcon title="Left" IconComponent={CardsIconArrowLeft} {...props} />
            )}
            renderButtonRight={props => (
              <ActionIcon title="Left" IconComponent={CardsIconArrowRight} {...props} />
            )}
            selectedIndex={this.state.mgr2}
            onChangeIndex={(page) => { this.setState({ mgr2: page }); }}
          >
            {colors2.map((color, index) => (
              <div key={color} style={getStyle(color)}>{index}</div>
            ))}
          </ReactMgr>
        </div>
        <br />
        <div id="ReactMgrH3">
          <ReactMgr
            containerHeight={200}
            containerWidth={300}
            margin={10}
            pageWidth={240}
            renderButtonLeft={props => (
              <ActionIcon title="Left" IconComponent={CardsIconArrowLeft} {...props} />
            )}
            renderButtonRight={props => (
              <ActionIcon title="Left" IconComponent={CardsIconArrowRight} {...props} />
            )}
            selectedIndex={this.state.mgr3}
            onChangeIndex={(page) => { this.setState({ mgr3: page }); }}
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
