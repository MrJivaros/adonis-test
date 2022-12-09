import { API_URL } from "../context";
import fetchJSON from "../helper/fetchJSON";
import { TodoAsItem, TodoToAdd } from "../types/types";

export class TodoQuery {
  static async findAll(): Promise<TodoAsItem[]> {
    return await fetchJSON({ url: `${API_URL}/tasks` })
  }

  static async create(payload: TodoToAdd) {
    const body = JSON.stringify(payload)
    return await fetchJSON({ url: `${API_URL}/tasks`, method: "POST", body })
  }

  static async update(payload: TodoAsItem) {
    const body = JSON.stringify(payload)
    return await fetchJSON({ url: `${API_URL}/tasks`, method: "PUT", body })
  }

  static async delete(payload: TodoAsItem) {
    const body = JSON.stringify(payload)
    return await fetchJSON({ url: `${API_URL}/tasks`, method: "DELETE", body })
  }
}