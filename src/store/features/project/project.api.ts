import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { DocumentData } from 'firebase/firestore'
import { getProjectByCode, getProjectsByKeyword, getUserProjects } from '../../../services/firebase'
import { IProject } from './project.types'

export const projectApi = createApi({
  reducerPath: 'api/projectApi',
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getProjectsByUser: build.query({
      async queryFn(uid) {
        let result: DocumentData[] = []
        if (uid) {
          result = await getUserProjects(uid)
        }
        return { data: result }
      },
    }),
    getProjectsByKeyword: build.query({
      async queryFn(keyword) {
        let result = await getProjectsByKeyword(keyword)
        return { data: result }
      },
    }),
    getProject: build.query({
      async queryFn(code) {
        let result = await getProjectByCode(code)
        return { data: result }
      },
    }),
  })
})

export const { useGetProjectsByUserQuery, useGetProjectsByKeywordQuery, useGetProjectQuery } = projectApi