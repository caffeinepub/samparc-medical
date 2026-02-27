import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet, redirect } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Medicines from './pages/Medicines';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: About,
});

const servicesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/services',
  component: Services,
});

const medicinesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/medicines',
  component: Medicines,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/contact',
  component: Contact,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLogin,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  beforeLoad: () => {
    const isAuth = localStorage.getItem('samparc_admin_auth') === 'true';
    if (!isAuth) {
      throw redirect({ to: '/admin' });
    }
  },
  component: Dashboard,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    aboutRoute,
    servicesRoute,
    medicinesRoute,
    contactRoute,
  ]),
  adminLoginRoute,
  adminDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
