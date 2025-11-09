import React, { useState } from 'react';
import styles from './Promise.module.css';
import { MyPromise } from '../../utils/Promise';

type TPromiseStatus = 'pending' | 'fulfilled' | 'rejected';

interface PromiseBlock {
  id: number;
  value?: any;
  status: TPromiseStatus;
}

export const PromiseComponent: React.FC = () => {
  const [blocks, setBlocks] = useState<PromiseBlock[]>([]);

  const createBlocks = (count: number): PromiseBlock[] =>
    Array.from({ length: count }, (_, i) => ({ id: i, status: 'pending' }));

  const fetchPost = (id: number) =>
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
      if (!res.ok) throw new Error(`Ошибка загрузки поста ${id}`);
      return res.json();
    });

  const runPromises = () => {
    const promiseCount = 5;
    const newBlocks = createBlocks(promiseCount);
    setBlocks(newBlocks);

    const promises = [
      fetchPost(1),
      fetchPost(2),
      fetchPost(123456),
      fetchPost(3),
      fetchPost(999999),
    ];

    MyPromise.allSettled(promises).then((results) => {
      setBlocks(
        results.map((res, idx) => {
          if (res.status === 'fulfilled') {
            return { ...newBlocks[idx], value: `Post ${res.value.id}`, status: 'fulfilled' };
          } else {
            return {
              ...newBlocks[idx],
              value: res.reason || 'Ошибка',
              status: 'rejected',
            };
          }
        })
      );
    });
  };

  return (
    <div className={styles.container}>
      <h1>MyPromise - демонстрация с реальным API</h1>
      <section className={styles.section}>
        <h2>Описание</h2>
        <p>
          Показана работа реализованного метода <code>MyPromise.allSettled</code>
        </p>
        <ul>
          <li>⏳ Pending — ожидание</li>
          <li>✅ Fulfilled — успешно выполнен</li>
          <li>❌ Rejected — ошибка выполнения</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Запустить промисы</h2>
        <button onClick={runPromises}>Выполнить все</button>
        <div className={styles.blocks_container}>
          {blocks.map((b) => (
            <div
              key={b.id}
              className={`${styles.promise_block} ${styles[b.status]}`}
              title={b.value?.toString()}
            >
              {b.status === 'pending' && '⏳'}
              {b.status === 'fulfilled' && `✅ ${b.value}`}
              {b.status === 'rejected' && `❌ ${b.value}`}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
