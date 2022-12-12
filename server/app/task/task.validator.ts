import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from "@ioc:Adonis/Core/Validator";

const messages = {
  required: 'The {{ field }} is required to create a task',
}

export class CreateTaskValidator {
  constructor({ }: HttpContextContract) {
  }

  public schema = schema.create({
    title: schema.string({ trim: true }),
    description: schema.string.nullable({ trim: true }),
  })

  public messages = messages
}

export class UpdateTaskValidator {
  constructor({ }: HttpContextContract) {
  }

  public schema = schema.create({
    id: schema.number(),
    title: schema.string({ trim: true }),
    done: schema.boolean(),
    description: schema.string.nullable({ trim: true })
  })

  public messages = messages
}

export class DeleteTaskValidator {
  constructor({ }: HttpContextContract) {
  }
  public schema = schema.create({
    id: schema.number(),
  })
  public messages = messages

}