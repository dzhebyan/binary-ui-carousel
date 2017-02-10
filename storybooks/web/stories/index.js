import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryUICarousel1 from './components/BinaryUICarousel1';
import BinaryUICarousel2 from './components/BinaryUICarousel2';
import BinaryUICarousel4 from './components/BinaryUICarousel4';

storiesOf('binary-ui-carousel section', module)
  .add('1 component', () => (
    <BinaryUICarousel1 />
  ))
  .add('2 components', () => (
    <BinaryUICarousel2 />
  ))
  .add('4 components', () => (
    <BinaryUICarousel4 />
  ));
