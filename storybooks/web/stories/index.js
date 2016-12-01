import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Example from './Example';

storiesOf('components', module)
  .add('example', () => (
    <Example />
  ));
