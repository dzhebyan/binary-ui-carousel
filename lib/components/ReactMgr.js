'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactMgr = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScrolling = require('react-scrolling');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
  orientation: _reactScrolling.Orientation.Horizontal
};

var propTypes = {
  id: _react2.default.PropTypes.string.isRequired,
  orientation: _reactScrolling.Scroller.enumType(_reactScrolling.Orientation),
  size: _react2.default.PropTypes.shape({
    page: _react2.default.PropTypes.number,
    margin: _react2.default.PropTypes.number,
    containerWidth: _react2.default.PropTypes.number,
    containerHeight: _react2.default.PropTypes.number
  }).isRequired,
  children: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node)
};

var ReactMgr = exports.ReactMgr = function (_React$Component) {
  _inherits(ReactMgr, _React$Component);

  function ReactMgr() {
    _classCallCheck(this, ReactMgr);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactMgr).apply(this, arguments));
  }

  _createClass(ReactMgr, [{
    key: 'getItemPosition',
    value: function getItemPosition(scrollerPosition, item) {
      var size = this.props.size;
      var page = size.page;
      var margin = size.margin;

      return item * (page + margin) + margin + scrollerPosition;
    }
  }, {
    key: 'getCarouselItemPosition',
    value: function getCarouselItemPosition(scrollerPosition, item, count) {
      var size = this.props.size;

      var pos = this.getItemPosition(scrollerPosition, item);
      if (pos < -size.page) {
        pos = this.getItemPosition(scrollerPosition, count + item);
      }
      return pos;
    }
  }, {
    key: 'getCoordinatesByOrientation',
    value: function getCoordinatesByOrientation(position) {
      var orientation = this.props.orientation;

      return orientation === _reactScrolling.Orientation.Horizontal ? {
        x: position,
        y: 0
      } : {
        x: 0,
        y: position
      };
    }
  }, {
    key: 'getContainerScrollableSize',
    value: function getContainerScrollableSize() {
      var _props = this.props;
      var size = _props.size;
      var orientation = _props.orientation;

      return orientation === _reactScrolling.Orientation.Horizontal ? size.containerWidth : size.containerHeight;
    }
  }, {
    key: 'getPageSize',
    value: function getPageSize() {
      var _props2 = this.props;
      var size = _props2.size;
      var orientation = _props2.orientation;

      return orientation === _reactScrolling.Orientation.Horizontal ? {
        width: size.page + 'px',
        height: '100%'
      } : {
        width: '100%',
        height: size.page + 'px'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props;
      var size = _props3.size;
      var children = _props3.children;

      if (children.length === 2) {
        children.push(children[0]);
        children.push(children[1]);
      }
      var containerScrollableSize = this.getContainerScrollableSize();
      var scrollerSize = {
        container: containerScrollableSize,
        content: children.length * (size.page + size.margin)
      };
      var scrollerPage = {
        size: size.page,
        margin: size.margin
      };
      var carouselStyle = {
        position: 'relative',
        width: size.containerWidth,
        height: size.containerHeight,
        overflow: 'hidden'
      };
      var pageSize = this.getPageSize();
      var isLoop = children.length > 1;
      if (!isLoop) {
        scrollerSize.content += size.margin;
      }
      return _react2.default.createElement(
        'div',
        { style: carouselStyle },
        _react2.default.createElement(
          _reactScrolling.Scroller,
          {
            id: 'carousel',
            orientation: this.props.orientation,
            size: scrollerSize,
            pagination: _reactScrolling.Pagination.Single,
            page: scrollerPage,
            loop: isLoop,
            center: true
          },
          function (scrollerPosition) {
            return children.map(function (child, i) {
              var position = _this2.getCarouselItemPosition(scrollerPosition, i, children.length);
              var coordinates = _this2.getCoordinatesByOrientation(position);
              var carouselPageStyle = Object.assign({}, pageSize, {
                position: 'absolute',
                transform: 'translate3d(' + coordinates.x + 'px, ' + coordinates.y + 'px, 0px)'
              });
              return _react2.default.createElement(
                'div',
                { key: i, style: carouselPageStyle },
                child
              );
            });
          }
        )
      );
    }
  }]);

  return ReactMgr;
}(_react2.default.Component);

ReactMgr.defaultProps = defaultProps;
ReactMgr.propTypes = propTypes;