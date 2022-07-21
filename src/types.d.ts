export interface IRecurringTask { 
  task: string, time: number, done: boolean 
}


export interface IProject {
  owner: string,
  code: number | null,
  client: string,
  name: string,
  note?: string,
  recurringTasks?: Array<recurringTask>,
  dateCreated: number,
}

export interface IUser {
  uid: string,
  name: string,
  surname: string,
  emailAddress: string,
  projects: [],
  dateCreated: number,
}