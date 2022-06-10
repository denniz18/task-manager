import { tasksSelector } from '../selectors';
import { stateTest } from './helpers';

describe('tasksSelector', () => {
  test('work with empty state', () => {
    expect(
      tasksSelector({
        tasks: stateTest.empty,
      })
    ).toStrictEqual(stateTest.empty);
  });

  test('work with filled state', () => {
    expect(
      tasksSelector({
        tasks: stateTest.filled,
      })
    ).toStrictEqual(stateTest.filled);
  });
});
