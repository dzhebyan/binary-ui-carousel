import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Example from './Example';

storiesOf('Components', module)
  .add('Example', () => (
    <Example />
  ));
