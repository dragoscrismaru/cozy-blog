import React from 'react'
import { LuxAbout } from './about'
import { LuxArchive } from './archive'
import { LuxDashboard } from './dashboard'
import { LuxHome } from './home'
import { LuxPost } from './post'
import { LuxShell, LuxuryProvider, useLux } from './shell'

const LuxuryRoutes = () => {
  const { page } = useLux()

  if (page.name === 'archive') return <LuxArchive />
  if (page.name === 'about') return <LuxAbout />
  if (page.name === 'dashboard') return <LuxDashboard />
  if (page.name === 'post') return <LuxPost />
  return <LuxHome />
}

export const LuxuryApp = () => (
  <LuxuryProvider>
    <LuxShell>
      <LuxuryRoutes />
    </LuxShell>
  </LuxuryProvider>
)

