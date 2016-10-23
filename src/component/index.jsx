import React from 'react';
import { Scroller, Orientation, Pagination } from 'react-scrolling';

const enumType = (Enum) => (
  React.PropTypes.oneOf(
    Object.keys(Enum).map(key => Enum[key])
  )
);

const propTypes = {
  id: React.PropTypes.string.isRequired,
  isVertical: React.PropTypes.bool,
  size: React.PropTypes.shape({
    page: React.PropTypes.number,
    margin: React.PropTypes.number,
    containerWidth: React.PropTypes.number,
    containerHeight: React.PropTypes.number,
  }).isRequired,
  selectedIndex: React.PropTypes.number.isRequired,
  onPageChanged: React.PropTypes.func,
  children: React.PropTypes.arrayOf(
    React.PropTypes.node
  ),
};

const defaultProps = {
  isVertical: false,
};

export default class ReactMgr extends React.Component {

  constructor(props) {
    super(props);
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  onPageChanged(page) {
    const { onPageChanged, children } = this.props;
    if (onPageChanged) {
      const pageCount = children.length;
      let newPage = page % pageCount;
      if (newPage < 0) {
        newPage += pageCount;
      }
      onPageChanged(newPage);
    }
  }

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
    const { isVertical } = this.props;
    return (isVertical === false)
      ? {
        x: position,
        y: 0,
      } : {
        x: 0,
        y: position,
      };
  }

  getContainerScrollableSize() {
    const { size, isVertical } = this.props;
    return (isVertical === false)
      ? size.containerWidth
      : size.containerHeight;
  }

  getPageSize() {
    const { size, isVertical } = this.props;
    return (isVertical === false)
      ? {
        width: `${size.page}px`,
        height: '100%',
      } : {
        width: '100%',
        height: `${size.page}px`,
      };
  }

  isVisible(position) {
    const begin = position;
    const end = position + this.props.size.page;
    const size = this.getContainerScrollableSize();
    return (begin > 0 && begin < size) || (end > 0 && end < size);
  }

  render() {
    const { id, size } = this.props;
    const children = [...this.props.children];
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
    const isLoop = children.length > 1;
    if (!isLoop) {
      scrollerSize.content += size.margin;
    }
    if (children.length === 2) {
      children.push(children[0]);
      children.push(children[1]);
    }
    return (
      <Scroller
        id={id}
        orientation={this.props.isVertical ? Orientation.Vertiacal : Orientation.Horizontal}
        size={scrollerSize}
        pagination={Pagination.Single}
        page={scrollerPage}
        position={{
          page: this.props.selectedIndex,
        }}
        loop={isLoop}
        center
        onPageChanged={this.onPageChanged}
      >
        {scrollerPosition => (
          <div style={carouselStyle} >
            {children.map((child, i) => {
              const position = this.getCarouselItemPosition(
                scrollerPosition,
                i,
                children.length
              );
              if (!this.isVisible(position)) {
                return undefined;
              }
              const coordinates = this.getCoordinatesByOrientation(position);
              const carouselPageStyle = Object.assign({}, pageSize, {
                position: 'absolute',
                transform: `translate3d(${coordinates.x}px, ${coordinates.y}px, 0px)`,
              });
              return (
                <div key={i} style={carouselPageStyle} >
                  {child}
                </div>
              );
            })}
          </div>
        )}
      </Scroller>
    );
  }
}

ReactMgr.defaultProps = defaultProps;
ReactMgr.propTypes = propTypes;
