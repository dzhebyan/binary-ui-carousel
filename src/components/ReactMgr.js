import * as React from 'react';
import { Scroller, Orientation, Pagination } from 'react-scrolling';

export class ReactMgr extends React.Component {

	itemPosition(scrollerPosition, item) {
		return item * (this.props.size.page + this.props.size.margin)
			+ this.props.size.margin + scrollerPosition;
	}

	carouselItemPosition(scrollerPosition, item, count) {
		let pos = this.itemPosition(scrollerPosition, item);
		if (pos < -this.props.size.page) {
			pos = this.itemPosition(scrollerPosition, count + item);
		}
		return pos;
	}

	render() {
		const size = {
			container: this.props.size.container,
			content: this.props.children.length * (this.props.size.page + this.props.size.margin),
		};
		const page = {
			size: this.props.size.page,
			margin: this.props.size.margin,
		};

		return (
			<div style={{
				position: 'relative',
				width: this.props.size.container,
				height: this.props.size.container,
				overflow: 'hidden',
			}}
			>
				<Scroller id="carousel"
					orientation={ this.props.orientation }
					size={ size }
					pagination={ Pagination.Single }
					page={ page }
					loop
				>
					{(scrollerPosition) => this.props.children.map((child, i) => {
						const coordinates = { x: 0, y: 0 };
						const position = this.carouselItemPosition(
							scrollerPosition,
							i,
							this.props.children.length
						);
						if (this.props.orientation === Orientation.Horizontal) {
							coordinates.x = position;
						} else {
							coordinates.y = position;
						}
						return (
							<div key={i} style={{
								position: 'absolute',
								transform: `translate3d(${coordinates.x}px, ${coordinates.y}px, 0px)`,
							}}
							>
								{child}
							</div>
						);
					})}
				</Scroller>
			</div>
		);
	}
}

ReactMgr.defaultProps = {
	orientation: Orientation.Horizontal,
};

ReactMgr.propTypes = {
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
