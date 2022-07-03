import React, { } from 'react'
// Material-ui
import { Outlet } from 'react-router-dom'

function ProjectContent() {
  return (
    <Outlet />
  )
}

export default function Project() {
  return <ProjectContent />
}