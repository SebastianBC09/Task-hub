import { useTasks } from './hooks/useTasks';
import { useCreateTask } from './hooks/useCreateTask';
import { useDeleteTask } from './hooks/useDeleteTask';
import { useUpdateTask } from './hooks/useUpdateTask';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import './App.css'

function App() {
  const { data: tasks, isLoading, isError } = useTasks();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  if (isLoading) return <p>Cargando tareas...</p>;
  if (isError) return <p>Error al cargar las tareas</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Gestor de Tareas</h1>
      <TaskForm onSubmit={createTask.mutate} />
      <TaskList tasks={tasks} onDelete={deleteTask.mutate} onUpdate={updateTask.mutate} />
    </div>
  );
}

export default App
