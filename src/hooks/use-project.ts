import { useState, useEffect } from 'react';
import { getProjectByCode } from '../services/firebase';
import { IProject } from '../types';

export default function useProject(code: number) {
  const [currentProject, setCurrentProject] = useState<IProject>({
    owner: '',
    code: null,
    client: '',
    name: '',
    dateCreated: 0
  })

  useEffect(() => {
    async function GetProjectByCode(code: number) {
      const user = await getProjectByCode(code);
      setCurrentProject(user);
    }

    if (code) {
      GetProjectByCode(code);
    }
  }, [code]);

  return { project: currentProject, setCurrentProject };
}