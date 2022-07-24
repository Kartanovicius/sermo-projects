import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getProjectsByKeyword, getUserProjects } from '../../../services/firebase'
import { IProject } from './project.types'

export const fetchUserProjects = createAsyncThunk(
  'projects/fetch',
  async (user_uid: string) => {
    return await getUserProjects(user_uid)
  }
)

export const fetchSearchedProjects = createAsyncThunk(
  'projects/fetch',
  async (keyword: string) => {
    return await getProjectsByKeyword(keyword)
  }
)

export interface ProjectsState {
  projects?: IProject[]
}

const initialState: ProjectsState = {
  projects: undefined
}

const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({type}) => type.startsWith('projects') && type.endsWith('/fulfilled'),
        (state, action: PayloadAction<IProject[] | undefined>) => { 
          state.projects = action.payload 
        }
      )
  }
})


export default ProjectsSlice.reducer