import { test } from "@japa/runner";
import { CreateTask, TaskModal } from "App/task/task.input";

test.group("[TASK TESTS]", () => {
  test('find all tasks', async ({ client, assert }) => {
    const response = await client.get('/api/tasks')
    assert.equal(response.status(), 200)
    assert.equal(Array.isArray(response.body()), true)
  })

  test('create task', async ({ client, assert }) => {
    const payload: CreateTask = {
      title: "Test create task",
      description: "Test description",
      done: false
    }
    const response = await client.post('/api/tasks').json(payload)
    const body: TaskModal = response.body()
    assert.equal(response.status(), 200)
    assert.equal(body.title, payload.title)
    assert.equal(body.description, payload.description)
    assert.equal(body.done, payload.done)
  })
})