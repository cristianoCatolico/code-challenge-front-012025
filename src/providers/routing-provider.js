
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router';
import Dashboard from '../components/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Dashboard />}>
    </Route>
  )
);

export function RoutingProvider() {
  return <RouterProvider router={router} />;
}