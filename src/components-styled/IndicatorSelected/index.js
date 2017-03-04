import { BINARY_COLOR_GRAY_10 } from 'binary-ui-styles';
import styled from 'styled-components';
import { ANIMATION_DURATION } from '../../constants';

export default styled.div`
  background-color: ${BINARY_COLOR_GRAY_10};
  left: 0;
  position: absolute;
  top: 0;
  transition: transform ${ANIMATION_DURATION}s;
`;
