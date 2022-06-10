const taskA = {
  createTime: 1654777750341,
  id: '3fe2b600-a7f4-4db2-b447-e071a7453401',
  subtasks: [
    {
      id: 'a8c2cd91-97d6-4740-9036-5d30245ca10a',
      labels: ['sint', 'qui', 'saepe', 'hic'],
      taskId: '3fe2b600-a7f4-4db2-b447-e071a7453401',
      title: 'Dolorum doloribus nulla illo enim expedita ad molestias sunt.',
    },
    {
      id: '46490d19-aa0f-4581-81f8-6c8c02d3fef8',
      labels: ['fuga', 'est', 'saepe', 'sint'],
      taskId: '3fe2b600-a7f4-4db2-b447-e071a7453401',
      title: 'Sint deserunt qui nam corporis.',
    },
  ],
  title: 'Harum omnis et quod quasi facilis eius sed rerum.',
};

export const taskB = {
  createTime: 1654781622513,
  id: '78250355-60b0-43a1-aad6-ce9026d3ba44',
  subtasks: [
    {
      id: 'bfe8fc6f-f667-4e18-b0da-9782c631eda2',
      labels: ['est', 'rem', 'ratione', 'excepturi'],
      taskId: '78250355-60b0-43a1-aad6-ce9026d3ba44',
      title: 'Eligendi autem minus at soluta doloremque quisquam.',
    },
  ],
  title: 'Eveniet inventore ut est dolores autem iusto modi repellat.',
};

export const taskAfterRemoveSubtask = {
  createTime: 1654777750341,
  id: '3fe2b600-a7f4-4db2-b447-e071a7453401',
  subtasks: [
    {
      id: 'a8c2cd91-97d6-4740-9036-5d30245ca10a',
      labels: ['sint', 'qui', 'saepe', 'hic'],
      taskId: '3fe2b600-a7f4-4db2-b447-e071a7453401',
      title: 'Dolorum doloribus nulla illo enim expedita ad molestias sunt.',
    },
  ],
  title: 'Harum omnis et quod quasi facilis eius sed rerum.',
};

export const twoTasks = [taskA, taskB];

export const stateTest = {
  empty: {
    data: [],
    isPending: false,
  },
  filled: {
    data: [taskA],
    isPending: false,
  },
};
