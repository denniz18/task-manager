import tasks from '../reducer';
import {
  fetchTasksStart,
  setTasks,
  addTask,
  setRemoveSubtask,
  setRemoveTask,
} from '../actions';
import { stateTest, taskB, twoTasks, taskAfterRemoveSubtask } from './helpers';

describe('getTaskValue', () => {
  test('fetchTasksStart', () => {
    expect(tasks({ data: [], isPending: false }, fetchTasksStart())).toEqual({
      data: [],
      isPending: true,
    });
  });

  test('setTasks', () => {
    expect(
      tasks({ data: [], isPending: true }, setTasks(stateTest.filled.data))
    ).toEqual({
      data: stateTest.filled.data,
      isPending: false,
    });
  });

  test('addTask', () => {
    expect(
      tasks({ data: stateTest.filled.data, isPending: false }, addTask(taskB))
    ).toEqual({
      data: twoTasks,
      isPending: false,
    });
  });

  test('setRemoveSubtask', () => {
    expect(
      tasks(
        { data: stateTest.filled.data, isPending: false },
        setRemoveSubtask({
          id: '46490d19-aa0f-4581-81f8-6c8c02d3fef8',
          taskId: '3fe2b600-a7f4-4db2-b447-e071a7453401',
        })
      )
    ).toEqual({
      data: [taskAfterRemoveSubtask],
      isPending: false,
    });
  });

  test('setRemoveTask', () => {
    expect(
      tasks(
        { data: twoTasks, isPending: false },
        setRemoveTask('78250355-60b0-43a1-aad6-ce9026d3ba44')
      )
    ).toEqual({
      data: stateTest.filled.data,
      isPending: false,
    });
  });
});
