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

var ReactMgr = exports.ReactMgr = function (_React$Component) {
	_inherits(ReactMgr, _React$Component);

	function ReactMgr() {
		_classCallCheck(this, ReactMgr);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactMgr).apply(this, arguments));
	}

	_createClass(ReactMgr, [{
		key: 'itemPosition',
		value: function itemPosition(scrollerPosition, item) {
			return item * (this.props.size.page + this.props.size.margin) + this.props.size.margin + scrollerPosition;
		}
	}, {
		key: 'carouselItemPosition',
		value: function carouselItemPosition(scrollerPosition, item, count) {
			var pos = this.itemPosition(scrollerPosition, item);
			if (pos < -this.props.size.page) {
				pos = this.itemPosition(scrollerPosition, count + item);
			}
			return pos;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var size = {
				container: this.props.size.container,
				content: this.props.children.length * (this.props.size.page + this.props.size.margin)
			};
			var page = {
				size: this.props.size.page,
				margin: this.props.size.margin
			};

			return React.createElement(
				'div',
				{ style: {
						position: 'relative',
						width: this.props.size.container,
						height: this.props.size.container,
						overflow: 'hidden'
					}
				},
				React.createElement(
					_reactScrolling.Scroller,
					{ id: 'carousel',
						orientation: this.props.orientation,
						size: size,
						pagination: _reactScrolling.Pagination.Single,
						page: page,
						loop: true
					},
					function (scrollerPosition) {
						return _this2.props.children.map(function (child, i) {
							var coordinates = { x: 0, y: 0 };
							var position = _this2.carouselItemPosition(scrollerPosition, i, _this2.props.children.length);
							if (_this2.props.orientation === _reactScrolling.Orientation.Horizontal) {
								coordinates.x = position;
							} else {
								coordinates.y = position;
							}
							return React.createElement(
								'div',
								{ key: i, style: {
										position: 'absolute',
										transform: 'translate3d(' + coordinates.x + 'px, ' + coordinates.y + 'px, 0px)'
									}
								},
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

ReactMgr.defaultProps = {
	orientation: _reactScrolling.Orientation.Horizontal
};

ReactMgr.propTypes = {
	id: React.PropTypes.string.isRequired,
	orientation: _reactScrolling.Scroller.enumType(_reactScrolling.Orientation),
	size: React.PropTypes.shape({
		page: React.PropTypes.number,
		margin: React.PropTypes.number,
		container: React.PropTypes.number
	}).isRequired,
	children: React.PropTypes.arrayOf(React.PropTypes.node)
};