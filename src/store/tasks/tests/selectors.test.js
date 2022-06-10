import { selectTasks } from '../selectors';
import { stateTest } from './helpers';

describe('selectTasks', () => {
  test('work with empty state', () => {
    expect(
      selectTasks({
        tasks: stateTest.empty,
      })
    ).toStrictEqual(stateTest.empty);
  });

  test('work with filled state', () => {
    expect(
      selectTasks({
        tasks: stateTest.filled,
      })
    ).toStrictEqual(stateTest.filled);
  });
});
