import { type IconType } from 'react-icons';
import { FaCode, FaProjectDiagram, FaNetworkWired, FaDatabase, FaReact } from 'react-icons/fa';
import { SiGraphql, SiMobx, SiTypescript } from 'react-icons/si';
import { GiTestTubes } from 'react-icons/gi';

export interface Direction {
  Icon: IconType;
  title: string;
  description: string;
  path?: string;
}

export const directions: Direction[] = [
  {
    Icon: FaCode,
    title: 'JavaScript: Promise',
    description: 'Изучение и реализация статических методов Promise',
    path: 'promise',
  },
  {
    Icon: FaProjectDiagram,
    title: 'Роутинг - Проект',
    description: 'Изучение реализации ленивой подгрузки компонентов с помощью HOCa withLazyLoader',
    path: 'lazy',
  },
  {
    Icon: FaNetworkWired,
    title: 'Доступы и привилегии',
    description:
      'Изучение архитектуры Feature, ProfileStore, HOC withFeature и системы доступа в проекте.',
  },
  {
    Icon: SiTypescript,
    title: 'TypeScript',
    description:
      'Изучение дженериков, типов any и unknown, применение типизации в реальных задачах.',
  },
  {
    Icon: SiMobx,
    title: 'MobX',
    description:
      'Изучение observable-состояний, computed-значений, action-методов и реактивных инструментов.',
  },
  {
    Icon: GiTestTubes,
    title: 'Тестирование',
    description:
      'Работа с Jest и React Testing Library. Изучение TDD-подхода для повышения надёжности кода.',
  },
  {
    Icon: SiGraphql,
    title: 'GraphQL',
    description:
      'Изучение запросов, директив, фрагментов, подписок. Создание pet-проекта с GraphQL API.',
  },
  {
    Icon: FaDatabase,
    title: 'Store и модели',
    description: 'Изучение механизмов хранения данных, кэширования моделей и принципов BaseStore.',
  },
  {
    Icon: FaReact,
    title: 'React-оптимизация',
    description:
      'Применение useMemo, useCallback, memo, Profiler. Улучшение производительности компонентов.',
  },
];
