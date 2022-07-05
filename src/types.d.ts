export interface IProject {
  owner: string,
  code: number | null,
  client: string,
  name: string,
  note?: string,
  recurringTasks?: [],
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