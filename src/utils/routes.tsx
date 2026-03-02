import { Navigate, useRoutes } from 'react-router';
import { Home } from '../Pages/Home/Home';
import {
  ROOT_PATH,
  PROMISE_PATH,
  LAZY_PATH,
  FEATURE_PATH,
  FEATURE_SERVICE_PATH,
  FEATURE_PROFILE_STORE_PATH,
  FEATURE_HOW_IT_WORK_PATH,
  STORE_PATH,
} from './path';
import { withLazy } from './withLazy';
import {
  FeatureService,
  HowItWork,
  ProfileStore,
} from '../Pages/Feature/DescriptionComponent/DescriptionComponent';

const WithLazyLoader = withLazy(
  () => import('../Pages/WithLazyLoader/WithLazyLoader'),
  (m) => m.WithLazyLoader
);

const Feature = withLazy(
  () => import('../Pages/Feature/Feature'),
  (m) => m.Feature
);

const PromisePage = withLazy(
  () => import('../Pages/Promise/Promise'),
  (m) => m.PromiseComponent
);

const StorePage = withLazy(
  () => import('../Pages/Store/Store'),
  (m) => m.Store
);

const routesConfig = [
  {
    path: ROOT_PATH,
    element: <Home />,
  },
  {
    path: PROMISE_PATH,
    element: <PromisePage />,
  },
  {
    path: LAZY_PATH,
    element: <WithLazyLoader />,
  },
  {
    path: FEATURE_PATH,
    element: <Feature />,
    children: [
      {
        index: true,
        element: <Navigate to={FEATURE_SERVICE_PATH} replace />,
      },
      {
        path: FEATURE_SERVICE_PATH,
        element: <FeatureService />,
      },
      {
        path: FEATURE_PROFILE_STORE_PATH,
        element: <ProfileStore />,
      },
      {
        path: FEATURE_HOW_IT_WORK_PATH,
        element: <HowItWork />,
      },
    ],
  },
  {
    path: STORE_PATH,
    element: <StorePage />,
  },
];

export const AppRoutes = () => {
  return useRoutes(routesConfig);
};
