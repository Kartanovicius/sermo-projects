import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { DocumentData } from 'firebase/firestore/lite'
import {
  createProject,
  getProjectByCode,
  getProjectsByKeyword,
  getUserProjects,
} from '../../../services/firebase'
import { IProject } from './project.types'

export const projectApi = createApi({
  reducerPath: 'api/projectApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getProjectsByUser: build.query({
      async queryFn(uid: string) {
        let result: DocumentData[] = []
        if (uid) {
          result = await getUserProjects(uid)
        }
        return { data: result }
      },
    }),
    getProjectsByKeyword: build.query({
      async queryFn(keyword) {
        const result = await getProjectsByKeyword(keyword)
        return { data: result }
      },
    }),
    getProject: build.query({
      async queryFn(code: number) {
        const result = await getProjectByCode(code)
        return { data: result }
      },
    }),
    createProject: build.mutation<IProject, IProject>({
      async queryFn(project) {
        await createProject(project)
        return { data: project }
      },
    }),
  }),
})

export const {
  useGetProjectsByUserQuery,
  useGetProjectsByKeywordQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
} = projectApi
