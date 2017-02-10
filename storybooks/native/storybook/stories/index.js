import React from 'react';
import { storiesOf } from '@kadira/react-native-storybook';
import BinaryUICarousel from './components/BinaryUICarousel';

storiesOf('binary-ui-carousel section', module)
  .add('example', () => (
    <BinaryUICarousel />
  ));
