import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getProjectByCode, updateProjectByCode } from '../../../services/firebase'
import { IProject } from './project.types'

export const updateProject = createAsyncThunk(
  'project/update',
  async (params: { code: number, fields: {
    note?: IProject['note'], 
    recurringTasks?: IProject['recurringTasks'],
  } }) => {
    const { code, fields } = params
    return await updateProjectByCode(code, fields)
  }
)

export const fetchProject = createAsyncThunk(
  'project/fetch',
  async (code: number) => {
    return await getProjectByCode(code)
  }
)

export interface ProjectState {
  project?: IProject
}

const initialState: ProjectState = {
  project: undefined
}

const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({type}) => type.startsWith('project') && type.endsWith('/fulfilled'),
        (state, action: PayloadAction<IProject | undefined>) => { 
          if (action.payload) {
            state.project = action.payload 
          }
        }
      )
  }
})


export default ProjectSlice.reducer