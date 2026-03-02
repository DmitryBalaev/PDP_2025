import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { ROOT_PATH, LAZY_PATH, FEATURE_PATH, PROMISE_PATH, STORE_PATH } from './utils/path';

import { Navigation } from './components/Navigation/Navigation';
import { AppRoutes } from './utils/routes';

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
          <AppRoutes />
        </Layout.Body>
      </BrowserRouter>
    </Layout>
  );
}
