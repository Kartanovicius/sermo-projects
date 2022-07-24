export interface IRecurringTask { 
  task: string, time: number, done: boolean 
}

export interface IProject {
  owner: string,
  code: number | null,
  client: string,
  name: string,
  note: string,
  recurringTasks: Array<IRecurringTask>,
  dateCreated: number,
  keywords: Array<string>,
}

export interface ProjectState {
  value: IProject[]
}