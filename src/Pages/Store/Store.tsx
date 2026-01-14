import React from 'react';
import styles from './Store.module.css';

export const Store: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>BaseStore & Store</h1>
      <section>
        <h2>Архитектура и цели</h2>
        <p>
          BaseStore является фундаментом: он предоставляет имя стора, хранит регистрацию всех сто́ров
          в рамках приложения и подключает механизм spy для автоматической отладки всех action MobX.
        </p>
        <p>
          Store расширяет BaseStore и реализует полный жизненный цикл получения данных:
          <ul className={styles.list}>
            <li>запросы на сервер и мутации;</li>
            <li>обработка ошибок;</li>
            <li>обработка подписок;</li>
            <li>получение моделей;</li>
            <li>кеширование через ApolloDataCache;</li>
            <li>подготовку данных;</li>
            <li>управление состояниями isLoading, isSubmitting, isDataLoaded;</li>
            <li>вычисляемые данные через computed.</li>
          </ul>
        </p>
        <p>
          Архитектура построена вокруг принципа предсказуемого и прозрачного data-flow, основанного
          на MobX.
        </p>
      </section>
      <section>
        <h2>Инициализация Store</h2>
        <p>В конструкторе Store происходит:</p>
        <ul className={styles.list}>
          <li>регистрация стора через BaseStore.registrationStores;</li>
          <li>
            инициализация всех приватных observable полей <code>_data</code>, <code>_loading</code>,{' '}
            <code>_model</code> и т.д.;
          </li>
          <li>создание actions и computed через makeObservable;</li>
          <li>
            инициализация сервисов:
            <ul className={styles.list}>
              <li>requestService (GraphQL-запросы);</li>
              <li>subscriptionService (GraphQL-подписки);</li>
              <li>dataCacheInstance (кеш Apollo);</li>
            </ul>
          </li>
          <li>
            передача вспомогательных параметров:
            <ul className={styles.list}>
              <li>dataPath — путь к данным внутри GraphQL ответа;</li>
              <li>getQueryParams — генератор параметров запроса;</li>
              <li>prepareData — функции предобработки данных;</li>
              <li>subscriptionConfig — конфигурация подписок.</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};
