import { getValueByDividingBy } from './utils.js';

test('getValueByDividingBy', () => {
  expect(getValueByDividingBy(2)(300)).toBe(150);
});
