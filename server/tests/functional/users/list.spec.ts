import { test } from '@japa/runner'
import Task from "App/Models/Task"

test.group('Task list', () => {
  test("Retrieve the task list", async ({ client }) => {
    const payload = {
      title: "Faire des achats",
      description: "Description de la tache"
    }
    await Task.create(payload)
    const response = await client.get('/api/tasks')
    response.assertStatus(200)
    response.assertBodyContains([payload])
  })
})
