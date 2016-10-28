import React from 'react';
import { storiesOf } from '@kadira/react-native-storybook';
import Welcome from './Welcome';

storiesOf('Card design selector', module)
  .add('main', () => (
    <Welcome />
  ));
