export interface TodoAsItem {
  id: number
  title: string;
  description?: string
  done: 0 | 1
  updated_at: string
}

export interface TodoToAdd {
  title: string;
  description?: string
}

