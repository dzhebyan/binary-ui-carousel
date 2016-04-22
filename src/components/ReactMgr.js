import * as React from 'react';
import { Scroller, Orientation, Pagination } from 'react-scrolling';

const defaultProps = {
	orientation: Orientation.Horizontal,
};

const propTypes = {
	id: React.PropTypes.string.isRequired,
	orientation: Scroller.enumType(Orientation),
	size: React.PropTypes.shape({
		page: React.PropTypes.number,
		margin: React.PropTypes.number,
		container: React.PropTypes.number,
	}).isRequired,
	children: React.PropTypes.arrayOf(
		React.PropTypes.node
	),
};

export class ReactMgr extends React.Component {

	getItemPosition(scrollerPosition, item) {
		const { size } = this.props;
		const { page, margin } = size;
		return item * (page + margin) + margin + scrollerPosition;
	}

	getCarouselItemPosition(scrollerPosition, item, count) {
		const { size } = this.props;
		let pos = this.getItemPosition(scrollerPosition, item);
		if (pos < -size.page) {
			pos = this.getItemPosition(scrollerPosition, count + item);
		}
		return pos;
	}

	getCoordinatesByOrientation(position) {
		return (this.props.orientation === Orientation.Horizontal)
			? {
				x: position,
				y: 0,
			} : {
				x: 0,
				y: position,
			};
	}

	render() {
		const { size, children } = this.props;
		const scrollerSize = {
			container: size.container,
			content: children.length * (size.page + size.margin),
		};
		const page = {
			size: size.page,
			margin: size.margin,
		};
		const carouselStyle = {
			position: 'relative',
			width: size.container,
			height: size.container,
			overflow: 'hidden',
		};
		return (
			<div style={ carouselStyle } >
				<Scroller
					id="carousel"
					orientation={ this.props.orientation }
					size={ scrollerSize }
					pagination={ Pagination.Single }
					page={ page }
					loop
				>
					{ (scrollerPosition) => children.map((child, i) => {
						const position = this.getCarouselItemPosition(
							scrollerPosition,
							i,
							children.length
						);
						const coordinates = this.getCoordinatesByOrientation(position);
						const carouselPageStyle = {
							position: 'absolute',
							transform: `translate3d(${coordinates.x}px, ${coordinates.y}px, 0px)`,
						};
						return (
							<div key={ i } style={ carouselPageStyle } >
								{ child }
							</div>
						);
					}) }
				</Scroller>
			</div>
		);
	}
}

ReactMgr.defaultProps = defaultProps;
ReactMgr.propTypes = propTypes;
