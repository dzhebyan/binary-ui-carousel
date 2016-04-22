'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ReactMgr = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactScrolling = require('react-scrolling');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
	orientation: _reactScrolling.Orientation.Horizontal
};

var propTypes = {
	id: React.PropTypes.string.isRequired,
	orientation: _reactScrolling.Scroller.enumType(_reactScrolling.Orientation),
	size: React.PropTypes.shape({
		page: React.PropTypes.number,
		margin: React.PropTypes.number,
		container: React.PropTypes.number
	}).isRequired,
	children: React.PropTypes.arrayOf(React.PropTypes.node)
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
			return this.props.orientation === _reactScrolling.Orientation.Horizontal ? {
				x: position,
				y: 0
			} : {
				x: 0,
				y: position
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var size = _props.size;
			var children = _props.children;

			var scrollerSize = {
				container: size.container,
				content: children.length * (size.page + size.margin)
			};
			var page = {
				size: size.page,
				margin: size.margin
			};
			var carouselStyle = {
				position: 'relative',
				width: size.container,
				height: size.container,
				overflow: 'hidden'
			};
			return React.createElement(
				'div',
				{ style: carouselStyle },
				React.createElement(
					_reactScrolling.Scroller,
					{
						id: 'carousel',
						orientation: this.props.orientation,
						size: scrollerSize,
						pagination: _reactScrolling.Pagination.Single,
						page: page,
						loop: true
					},
					function (scrollerPosition) {
						return children.map(function (child, i) {
							var position = _this2.getCarouselItemPosition(scrollerPosition, i, children.length);
							var coordinates = _this2.getCoordinatesByOrientation(position);
							var carouselPageStyle = {
								position: 'absolute',
								width: '100%',
								transform: 'translate3d(' + coordinates.x + 'px, ' + coordinates.y + 'px, 0px)'
							};
							return React.createElement(
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
}(React.Component);

ReactMgr.defaultProps = defaultProps;
ReactMgr.propTypes = propTypes;