import React from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const propTypes = {
  children: React.PropTypes.arrayOf(
    React.PropTypes.node
  ),
  isVertical: React.PropTypes.bool,
  size: React.PropTypes.shape({
    page: React.PropTypes.number,
    margin: React.PropTypes.number,
    containerWidth: React.PropTypes.number,
    containerHeight: React.PropTypes.number,
  }).isRequired,
  selectedIndex: React.PropTypes.number,
  onPageChange: React.PropTypes.func,
};

const defaultProps = {
  isVertical: false,
  selectedIndex: 0,
};

// TODO: add looping
// TODO: implement isVertical
export default class ReactMgr extends React.Component {

  constructor(props) {
    super(props);
    if (props.children.length < 1) {
      throw new Error('Should be more than one children');
    }
    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.setScrollViewRef = this.setScrollViewRef.bind(this);
  }

  componentDidMount() {
    const { children, selectedIndex } = this.props;
    if (children && selectedIndex > 0 && selectedIndex < children.length) {
      this.goToPage(selectedIndex);
    }
  }

  onScrollEnd(e) {
    const { size } = this.props;
    const pageOffset = size.page + size.margin;
    // select page based on the position of the middle of the screen.
    const currentPosition = e.nativeEvent.contentOffset.x + (pageOffset / 2);
    const currentPage = ~~(currentPosition / pageOffset);
    this.scrollViewRef.scrollTo({ y: 0, x: currentPage * pageOffset });
    this.onPageChange(currentPage);
  }

  onPageChange(position) {
    if (this.props.onPageChange) {
      const currentElement = this.props.children[position];
      this.props.onPageChange(position, currentElement);
    }
  }

  setScrollViewRef(scrollViewRef) {
    this.scrollViewRef = scrollViewRef;
  }

  goToPage(position) {
    const { size } = this.props;
    const pagePosition = position * (size.page + size.margin);
    this.scrollViewRef.scrollTo({ y: 0, x: pagePosition }, true);
    this.onPageChange(position);
  }

  renderBody() {
    const { size } = this.props;
    const computedStyles = StyleSheet.create({
      page: {
        width: size.page,
        justifyContent: 'center',
        marginLeft: size.margin / 2,
        marginRight: size.margin / 2,
      },
    });
    const styles = StyleSheet.create({
      page: {
        flex: 1,
      },
    });
    return this.props.children.map((child, index) => (
      <TouchableWithoutFeedback key={index} onPress={() => this.goToPage(index)} >
        <View style={[styles.page, computedStyles.page, { height: size.containerHeight }]} >
          {child}
        </View>
      </TouchableWithoutFeedback>
    ));
  }

  render() {
    const { size } = this.props;
    const sneak = (size.containerWidth - size.page - size.margin) / 2;
    const computedStyles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
      },
      scrollView: {
        paddingLeft: sneak,
        paddingRight: sneak,
      },
    });
    return (
      <View style={computedStyles.container} >
        <ScrollView
          automaticallyAdjustContentInsets={false}
          bounces
          contentContainerStyle={[computedStyles.scrollView]}
          decelerationRate={0.9}
          horizontal
          onScrollEndDrag={this.onScrollEnd}
          ref={this.setScrollViewRef}
          showsHorizontalScrollIndicator={false}
        >
          {this.renderBody()}
        </ScrollView>
      </View>
    );
  }
}

ReactMgr.propTypes = propTypes;
ReactMgr.defaultProps = defaultProps;
