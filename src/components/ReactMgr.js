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
		containerWidth: React.PropTypes.number,
		containerHeight: React.PropTypes.number,
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
		const { orientation } = this.props;
		return (orientation === Orientation.Horizontal)
			? {
				x: position,
				y: 0,
			} : {
				x: 0,
				y: position,
			};
	}

	getContainerScrollableSize() {
		const { size, orientation } = this.props;
		return (orientation === Orientation.Horizontal)
			? size.containerWidth
			: size.containerHeight;
	}

	getPageSize() {
		const { size, orientation } = this.props;
		return (orientation === Orientation.Horizontal)
			? {
				width: `${size.page}px`,
				height: '100%',
			} : {
				width: '100%',
				height: `${size.page}px`,
			};
	}

	render() {
		const { size, children } = this.props;
		const containerScrollableSize = this.getContainerScrollableSize();
		const scrollerSize = {
			container: containerScrollableSize,
			content: children.length * (size.page + size.margin),
		};
		const scrollerPage = {
			size: size.page,
			margin: size.margin,
		};
		const carouselStyle = {
			position: 'relative',
			width: size.containerWidth,
			height: size.containerHeight,
			overflow: 'hidden',
		};
		const pageSize = this.getPageSize();
		return (
			<div style={ carouselStyle } >
				<Scroller
					id="carousel"
					orientation={ this.props.orientation }
					size={ scrollerSize }
					pagination={ Pagination.Single }
					page={ scrollerPage }
					loop
				>
					{ (scrollerPosition) => children.map((child, i) => {
						const position = this.getCarouselItemPosition(
							scrollerPosition,
							i,
							children.length
						);
						const coordinates = this.getCoordinatesByOrientation(position);
						const carouselPageStyle = Object.assign({}, pageSize, {
							position: 'absolute',
							transform: `translate3d(${coordinates.x}px, ${coordinates.y}px, 0px)`,
						});
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
