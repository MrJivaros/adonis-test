import { CreateTask, TaskModal } from "./task.input";
import Task from "./task.model";

export default class TaskService {
  private readonly taskRepository = Task

  public async findAll(): Promise<TaskModal[]> {
    const tasks = await this.taskRepository.all();

    return tasks.map(item => (
      {
        id: item.id,
        done: item.done,
        description: item.description,
        title: item.title,
      })
    )
  }

  public async create(payload: CreateTask): Promise<TaskModal> {
    const { id, description, done, title } = await this.taskRepository.create(payload)
    return {
      id, title, description, done
    }
  }

  private async getTask(taskId: number) {
    const task = await this.taskRepository.findBy('id', taskId)
    if (!task) throw new Error(`can't find task ${taskId} `)
    return task
  }
  public async findOne(taskId: number): Promise<TaskModal> {
    const { id, description, done, title } = await this.getTask(taskId)
    return { id, description, done, title }
  }

  public async delete(taskId: number): Promise<number> {
    const task = await this.getTask(taskId)
    await task.delete()
    return task.id
  }

  public async update({ id: taskId, ...payload }: TaskModal): Promise<TaskModal> {
    const task = await this.getTask(taskId)
    task.title = payload.title
    task.description = payload.description
    task.done = payload.done

    const { id, title, description, done } = await task.save()
    return { id, title, description, done }
  }
}