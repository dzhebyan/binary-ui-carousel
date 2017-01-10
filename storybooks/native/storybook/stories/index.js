import React from 'react';
import { storiesOf } from '@kadira/react-native-storybook';
import Example from './Example';

storiesOf('components', module)
  .add('example', () => (
    <Example />
  ));
