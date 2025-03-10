import { cache } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};
export default async function page() {
  const response = await fetch("http://localhost:3000/api/tasks",{cache:"no-store"}
  );
  const tasks:Task[] = await response.json()
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
