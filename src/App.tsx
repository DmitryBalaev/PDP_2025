import { WithLazyLoader } from './components/WithLazyLoader/WithLazyLoader';
import { Layout } from './Layout/Layout';

export function App() {
  return (
    <Layout>
      <Layout.Body>
        <WithLazyLoader />
      </Layout.Body>
    </Layout>
  );
}
