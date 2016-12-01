import React from 'react';
import { storiesOf } from '@kadira/react-native-storybook';
import Welcome from './Welcome';

storiesOf('components', module)
  .add('example', () => (
    <Welcome />
  ));
