type Task = {
  id: number;
  title: string;
  completed: boolean;
};
type createTaskRequest = {
  title: string;
};
let tasks: Task[] = [
  { id: 1, title: "Learn Angular", completed: false },
  { id: 2, title: "Learn React", completed: false },
];
export async function GET() {
  return Response.json(tasks);
}
export async function POST(request: Request) {
  try {
    const body: createTaskRequest = await request.json();
    if (!body.title) {
      return Response.json({ message: "Title is required" }, { status: 400 });
    }
    const newTask: Task = {
      id: tasks.length + 1,
      title: body.title,
      completed: false,
    };
    tasks.push(newTask);
    return Response.json(newTask, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }
}
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");
    if (!id) {
      return Response.json({ message: "Invalid id" }, { status: 400 });
    }
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return Response.json({ message: "Task not found" }, { status: 404 });
    }
    tasks = tasks.filter(task => task.id !== id);
    return Response.json({ message: "Task deleted" });
  } catch (error) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }
}
