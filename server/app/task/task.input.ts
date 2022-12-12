export interface CreateTask {
  title: string;
  description: string | null
  done: boolean
}

export type TaskModal = CreateTask & { id: number }