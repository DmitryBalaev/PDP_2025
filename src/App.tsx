import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { withLazy } from './utils/withLazy';
import { Home } from './Pages/Home/Home';

const WithLazyLoader = withLazy(
  () => import('./Pages/WithLazyLoader/WithLazyLoader'),
  (m) => m.WithLazyLoader
);

export function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Layout.Sidebar>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lazy">Lazy</Link>
            </li>
          </ul>
        </Layout.Sidebar>

        <Layout.Body>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/lazy" Component={WithLazyLoader} />
          </Routes>
        </Layout.Body>

        <Layout.Footer />
      </BrowserRouter>
    </Layout>
  );
}
