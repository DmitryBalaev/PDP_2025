import { WithLazyLoader } from './components/WithLazyLoader/WithLazyLoader';
import Layout from './components/Layout/Layout';

export function App() {
  return (
    <Layout>
      <Layout.Sidebar>
        <ul>
          <li>Promise</li>
          <li>Lazy</li>
          <li>Access</li>
        </ul>
      </Layout.Sidebar>
      <Layout.Body>
        <WithLazyLoader />
      </Layout.Body>
    </Layout>
  );
}
