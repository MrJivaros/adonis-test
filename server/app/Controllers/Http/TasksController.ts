import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';


import Task from "App/Models/Task";

export default class TasksController {

  public async tasks() {
    return Task.all();
  }


  public async create({ request }: HttpContextContract) {
    const taskSchema = schema.create({
      title: schema.string({ trim: true }),
      description: schema.string.optional({ trim: true })
    })

    const payload = await request.validate({
      schema: taskSchema, messages: {
        required: 'The {{ field }} is required to create a task',
      }
    })

    const task = await Task.create(payload)
    return task
  }

  public async update({ request }: HttpContextContract) {
    const updateSchame = schema.create({
      id: schema.number(),
      title: schema.string({ trim: true }),
      done: schema.boolean(),
      description: schema.string.optional({ trim: true })
    })

    const { id, title, done, description } = await request.validate({
      schema: updateSchame, messages: {
        required: 'The {{ field }} is required to create a task',
      }
    })

    const task = await Task.findBy('id', id);
    if (!task) throw new Error(`can't update task ${id}`);

    task.title = title;
    task.done = done;
    task.description = description
    return await task.save()
  }

  public async delete({ request }: HttpContextContract) {
    const deleteSchame = schema.create({
      id: schema.number(),

    })

    const { id } = await request.validate({
      schema: deleteSchame, messages: {
        required: 'The {{ field }} is required to create a task',
      }
    })

    const task = await Task.findBy('id', id);
    if (!task) throw new Error(`can't delete task ${id}`);
    await task.delete()
    return { id: task.id }

  }
}
