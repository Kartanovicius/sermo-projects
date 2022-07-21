import { useState, useEffect } from 'react';
import { getProjectByCode } from '../services/firebase';
import { IProject } from '../types';

export default function useProject(code: number) {
  const [reload, setReload] = useState(false)
  const [currentProject, setCurrentProject] = useState<IProject>({
    owner: '',
    code: null,
    client: '',
    name: '',
    recurringTasks: [],
    dateCreated: 0
  })

  useEffect(() => {
    async function GetProjectByCode(code: number) {
      const project = await getProjectByCode(code);
      setCurrentProject(project);
    }

    if (code) {
      GetProjectByCode(code);
    }
    setReload(false)
  }, [code, reload]);

  return { project: currentProject, setProject: setCurrentProject, setReload };
}