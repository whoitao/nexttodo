import { PrismaClient } from '@prisma/client';
import CreateTaskForm from './components/CreateTaskForm';
import TaskList from './components/TaskList';

const prisma = new PrismaClient();

export default async function HomePage() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <CreateTaskForm />
      <TaskList tasks={tasks} />
    </main>
  );
}