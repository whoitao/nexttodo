'use client';

import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  const router = useRouter();

  const toggleCompleted = async (id: number, completed: boolean) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    router.refresh();
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    router.refresh();
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-100 p-2 rounded"
        >
          <span
            className={`flex-1 ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {task.title}
          </span>
          <button
            className="text-blue-600 hover:underline mr-3"
            onClick={() => toggleCompleted(task.id, task.completed)}
          >
            {task.completed ? 'Undo' : 'Done'}
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
