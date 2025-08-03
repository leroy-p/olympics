import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../pages/error/not-found'
import Leaderboard from '../pages/leaderboard'
import Loading from '../pages/loading/loading'
import Trials from '../pages/trials'
import Page from './page'
import { RoutePath } from './router-config'

interface IRouteParams {
  component: React.ReactNode
  path: RoutePath
  pageKey?: string
}

const routes: IRouteParams[] = [
  {
    component: <Leaderboard />,
    path: RoutePath.LEADERBOARD,
    pageKey: 'leaderboard',
  },
  {
    component: <Trials />,
    path: RoutePath.TRIALS,
    pageKey: 'trials',
  },
]

export default function Router() {
  return (
    <Suspense fallback={Loading()}>
      <BrowserRouter>
        <Routes>
          {routes.map(({ component, path, pageKey }) => (
            <Route element={<Page children={component} pageKey={pageKey} />} key={path} path={path} />
          ))}
          <Route element={<Page children={<NotFound />} pageKey="not-found" />} path="*" />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}
