import React from 'react';
import styles from './WithLazyLoader.module.css';

export const WithLazyLoader: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1>withLazyLoader - ленивая загрузка компонентов</h1>
      <section>
        <h2>Что делает HOC</h2>
        <p>
          <code>withLazyLoader</code> - это HOC, которай позволяет лениво загружать React-компоненты
          при помощи <code>React.lazy</code> и <code>Suspense</code>. Он помогает уменьшить размер
          основного бандла, подгружая компоненты только тогда, когда они реально нужны.
        </p>
      </section>
      <section>
        <h2>Как используется</h2>
        <p>Есть два способа:</p>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`1. Классовый компонент (export default)
const LazySettings = withLazyLoader(() => import("./Settings"));

2. Функциональный компонент (именованный export)
const LazyDashboard = withLazyLoader(
  () => import("./Dashboard"),
  (m) => m.Dashboard
);`}</code>
          </pre>
        </div>
        <p>
          Разница заключается в том, что классовые компоненты обычно экспортируются по умолчанию (
          <code>export default</code>), а функциональные - по имени (<code>export&nbsp;const</code>
          ), поэтому для них нужен <strong>resolver</strong>.
        </p>
      </section>
      <section>
        <h2>Как это работает внутри</h2>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`export function withLazyLoader(loader, resolver?) {
  const LazyComponent = lazy(() =>
    loader().then((m) => ({
      default: resolver ? resolver(m) : m.default!,
    }))
  );

  const Component = (props) => (
    <SystemLoaderProvider>
      <Suspense>
        <LazyComponent {...props} />
      </Suspense>
    </SystemLoaderProvider>
  );

  return Component;
}`}</code>
          </pre>
        </div>
        <ul>
          <li>
            <code>loader</code> - функция, возвращающая <code>import()</code>;
          </li>
          <li>
            <code>resolver</code> - указывает, какой компонент взять из модуля, если нет&nbsp;
            <code>default</code>;
          </li>
          <li>
            <code>Suspense</code> показывает состояние загрузки, пока компонент не готов;
          </li>
          <li>
            <code>SystemLoaderProvider</code> отвечает за глобальные индикаторы загрузки.
          </li>
        </ul>
      </section>
      <section>
        <h2>Когда нужен resolver</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Тип компонента</th>
              <th>Экспорт</th>
              <th>Вызываем</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Классовый</td>
              <td>
                <code>export default class Component ...</code>
              </td>
              <td>
                <code>withLazyLoader(() =&gt; import("./Component"))</code>
              </td>
            </tr>
            <tr>
              <td>Функциональный</td>
              <td>
                <code>export const Component = ...</code>
              </td>
              <td>
                <code>withLazyLoader(() =&gt; import("./Component"), m =&gt; m.Component)</code>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>Преимущества</h2>
        <ul>
          <li>Оптимизация размера бандла (code splitting)</li>
          <li>Гибкость - можно выбрать любой экспорт из модуля</li>
          <li>Повторное использование - работает для всех типов компонентов</li>
        </ul>
      </section>
      <section>
        <h2>Пример в маршрутизации</h2>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`import { withLazyLoader } from "@/utils/withLazyLoader";

const LazyPage404 = withLazyLoader(
  () => import("@/pages/Page404/Page404"),
  (m) => m.Page404
);

<Route path="*" element={<LazyPage404 />} />;`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};
