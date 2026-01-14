import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { withLazy } from './utils/withLazy';
import { Home } from './Pages/Home/Home';
import {
  ROOT_PATH,
  LAZY_PATH,
  FEATURE_PATH,
  FEATURE_SERVICE_PATH,
  FEATURE_PROFILE_STORE_PATH,
  FEATURE_HOW_IT_WORK_PATH,
  PROMISE_PATH,
  STORE_PATH,
} from './utils/path';
import {
  FeatureService,
  HowItWork,
  ProfileStore,
} from './Pages/Feature/DescriptionComponent/DescriptionComponent';
import { Navigation } from './components/Navigation/Navigation';

const WithLazyLoader = withLazy(
  () => import('./Pages/WithLazyLoader/WithLazyLoader'),
  (m) => m.WithLazyLoader
);
const Feature = withLazy(
  () => import('./Pages/Feature/Feature'),
  (m) => m.Feature
);
const Promise = withLazy(
  () => import('./Pages/Promise/Promise'),
  (m) => m.PromiseComponent
);
const Store = withLazy(
  () => import('./Pages/Store/Store'),
  (m) => m.Store
);
export interface MenuItem {
  label: string;
  path: string;
}

const menuItems = [
  { label: 'Домашняя', path: ROOT_PATH },
  { label: 'Promise', path: PROMISE_PATH },
  { label: 'Роутинг - Проект. withLazyLoader', path: LAZY_PATH },
  { label: 'Доступы - Проект', path: FEATURE_PATH },
  { label: 'Сторы', path: STORE_PATH },
];
export function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Layout.Sidebar>
          <Navigation items={menuItems} />
        </Layout.Sidebar>
        <Layout.Body>
          <Routes>
            <Route path={ROOT_PATH} Component={Home} />
            <Route path={PROMISE_PATH} Component={Promise} />
            <Route path={LAZY_PATH} Component={WithLazyLoader} />
            <Route path={FEATURE_PATH} element={<Feature />}>
              <Route index element={<Navigate to={FEATURE_SERVICE_PATH} replace />} />
              <Route index path={FEATURE_SERVICE_PATH} element={<FeatureService />} />
              <Route path={FEATURE_PROFILE_STORE_PATH} element={<ProfileStore />} />
              <Route path={FEATURE_HOW_IT_WORK_PATH} element={<HowItWork />} />
            </Route>
            <Route path={STORE_PATH} Component={Store} />
          </Routes>
        </Layout.Body>
      </BrowserRouter>
    </Layout>
  );
}
