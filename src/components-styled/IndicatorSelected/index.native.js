import { CARDS_BLUE_COLOR } from 'binary-ui-styles';
import styled from 'styled-components/native';
import { ANIMATION_DURATION } from '../../constants';

export default styled.View`
  background-color: ${CARDS_BLUE_COLOR};
  left: 0;
  position: absolute;
  top: 0;
  transition: transform ${ANIMATION_DURATION}s;
`;
