import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './layout'
import ChartPage from './components/chart/ChartPage';
import DashboardPage from './components/dashboard/DashboardPage';
import { TaskProvider } from './context/TaskContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />
      },
      {
        path: '/chart',
        element: <ChartPage title="Daily Graph" />
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </StrictMode>,
)