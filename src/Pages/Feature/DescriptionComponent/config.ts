export interface FeatureRenderConfig {
  description?: { code?: string; text?: string };
  items?: FeatureRenderConfig['description'][];
  title?: string;
  code?: string | string[];
}

export const featureConfig: FeatureRenderConfig[] = [
  {
    description: {
      code: 'Feature',
      text: '- это универсальный менеджер проверки функциональных возможностей и прав доступа. Он изолирован от бизнес-логики и отвечает только за:',
    },
    items: [
      { text: 'Хранение и выполнение функций проверки доступа' },
      { text: 'Генерацию кэш-ключей и хранение результатов' },
      { text: 'Возможность динамически менять контекст проверки (props)' },
      { text: 'Универсальность: класс не привязан к конкретной модели данных' },
    ],
  },
  {
    title: 'Основные принципы',
    items: [
      { text: 'Каждая фича имеет уникальный ключ `featureKey` и связанную с ним функцию-чекер.' },
      { text: 'Проверки возвращают булево значение `true/false` - разрешено или нет.' },
      { text: 'Все результаты кешируются, чтобы избежать повторных вычислений.' },
      { text: 'При изменении контекста `updateProps` кэш очищается.' },
    ],
  },
  {
    title: 'Ключевые методы API',
    items: [
      {
        code: 'constructor(checker, cacheKeyCreator)',
        text: ' - инициализация с функцией проверки и генератором ключей.',
      },
      {
        code: 'updateProps(props)',
        text: ' - обновляет контекст проверки (например, данные пользователя).',
      },
      {
        code: 'addCheck(key, checker)',
        text: ' - добавляет кастомную проверку для конкретной фичи.',
      },
      { code: 'removeCheck(key)', text: ' - удаляет зарегистрированную проверку.' },
      { code: 'isEnabled(key, additionalProps?)', text: ' - проверяет доступность фичи.' },
    ],
  },
  {
    title: 'Пример использования',
    code: `const defaultChecker = (key, props) => props.role === 'admin';
const cacheKeyCreator = (params) => JSON.stringify(params);

const feature = new Feature(defaultChecker, cacheKeyCreator);
feature.updateProps({ role: 'editor' });
feature.addCheck('canEdit', (key, props) => props.role === 'editor');

feature.isEnabled('canEdit'); // true
feature.isEnabled('canDelete'); // false`,
  },
];

export const profileStoreConfig: FeatureRenderConfig[] = [
  {
    description: {
      text: 'ProfileStore объединяет данные авторизованного пользователя и менеджеры проверки доступов feature и licenseFeature. Он обеспечивает централизованный доступ к проверкам фич и лицензий.',
    },
  },
  {
    title: 'Роль в системе',
    items: [
      { text: 'Хранит информацию о текущем пользователе и его привилегиях' },
      { text: 'Обновляет параметры менеджеров при изменении профиля или сессии' },
      { text: 'Предоставляет методы проверки доступов для компонентов' },
    ],
  },
  {
    title: 'Структура интеграции',
    code: [
      `public get featureChecker() {
  feature.updateProps({ rootModel: this.model });
  return (key, additionalProps?) => feature.isEnabled(key, additionalProps);
}`,
      `public get licenseFeatureChecker() {
  licenseFeature.updateProps({ rootModel: this.model });
  return (key) => licenseFeature.isLicenseFeatureEnabled(key);
}`,
    ],
  },
  {
    title: 'Пример использования',
    code: `const canEdit = profileStore.featureChecker?.('employee.edit');
const canExport = profileStore.licenseFeatureChecker?.('export_pdf');

return (
  <>
    <button disabled={!canEdit}>Редактировать</button>
    <button disabled={!canExport}>Экспорт PDF</button>
  </>
);`,
  },
  {
    title: 'Особенности',
    items: [
      { text: 'Чекеры недоступны до загрузки профиля (возвращают undefined).' },
      { text: 'Результаты проверок кешируются внутри менеджеров.' },
      { text: 'При смене пользователя или лицензии - кэш сбрасывается автоматически.' },
    ],
  },
];

export const howItWorkConfig: FeatureRenderConfig[] = [
  {
    description: {
      text: 'Система доступов основана на данных текущего пользователя из ProfileStore. Проверки выполняются через менеджер Feature, а результаты используются в UI для отображения доступных функций.',
    },
  },
  {
    title: 'Схема процесса',
    items: [
      { text: 'ProfileStore: хранит профиль пользователя, его привилегии и лицензии.' },
      {
        text: 'Feature Manager: получает данные профиля и выполняет проверки по ключам привилегий.',
      },
      {
        text: 'Проверка по ключу: сопоставление ключа фичи с правами пользователя и правилами проверки.',
      },
      { text: 'Кэширование: сохраняет результаты проверок для повторного использования.' },
      { text: 'UI / Компоненты: отображают доступные действия на основе проверок.' },
    ],
  },
  {
    title: 'Этапы работы системы',
    items: [
      { text: 'Авторизация: система получает данные пользователя, включая роли и привилегии.' },
      { text: 'Инициализация менеджеров: создаются экземпляры Feature и LicenseFeature.' },
      {
        text: 'Обновление параметров: при изменении профиля данные передаются в Feature через updateProps.',
      },
      { text: 'Проверка доступа: вызывается isEnabled(key, params) для конкретного действия.' },
      { text: 'Кэширование и результат: проверка сохраняется и используется в интерфейсе.' },
    ],
  },
  {
    title: 'Применение на уровне приложения',
    items: [
      {
        text: 'Роутинг: маршруты фильтруются по привилегиям через поля privileges и somePrivileges.',
      },
      {
        text: 'Формы и вкладки: параметры accessKeys и someAccessKeys определяют доступность форм и их полей.',
      },
      { text: 'Лицензии: дополнительные проверки выполняются через licenseFeatureChecker.' },
    ],
  },
];
