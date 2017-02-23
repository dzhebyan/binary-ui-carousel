import assert from 'assert';
import { mod } from '../src';

describe('check mod function', () => {
  it('is less than 0', () => {
    assert.equal(mod(-2, 5), 3);
  });
  it('is bigger than 0', () => {
    assert.equal(mod(3, 5), 3);
  });
  it('is 0', () => {
    assert.equal(mod(0, 5), 0);
  });
  it('is number of values', () => {
    assert.equal(mod(5, 5), 0);
  });
});
