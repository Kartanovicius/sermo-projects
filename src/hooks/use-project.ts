import { useState, useEffect } from 'react';
import { getProjectByCode } from '../services/firebase';
import { IProject } from '../types';

export default function useProject(code: number) {
  const [currentProject, setCurrentProject] = useState<IProject | undefined>()

  useEffect(() => {
    async function GetProjectByCode(code: number) {
      const project = await getProjectByCode(code);
      setCurrentProject(project);
    }

    if (code) {
      GetProjectByCode(code);
    }
  }, [code]);

  return { project: currentProject, setProject: setCurrentProject };
}