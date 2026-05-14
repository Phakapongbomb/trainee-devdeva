import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './layout'
import { ChartPage } from './features/charts';
import { DashboardPage } from './features/dashboard';
import { SettingPage } from './features/setting';
import { Provider } from 'react-redux';
import { store } from './store';

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
      {
        path: '/setting',
        element: <SettingPage />
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)