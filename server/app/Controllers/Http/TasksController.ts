import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';


import TaskService from "App/task/task.service";
import { CreateTaskValidator, DeleteTaskValidator, UpdateTaskValidator } from "App/task/task.validator";

export default class TasksController {
  private readonly taskService = new TaskService()
  public async tasks() {
    return this.taskService.findAll()
  }


  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(CreateTaskValidator)
    const task = await this.taskService.create({ ...payload, done: false })
    return task
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateTaskValidator)
    return await this.taskService.update(payload)
  }

  public async delete({ request }: HttpContextContract) {
    const { id } = await request.validate(DeleteTaskValidator)
    return await this.taskService.delete(id)
  }
}
