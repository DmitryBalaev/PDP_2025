import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FEATURE_HOW_IT_WORK_PATH,
  FEATURE_PROFILE_STORE_PATH,
  FEATURE_SERVICE_PATH,
} from '../../utils/path';
import style from './Feature.module.css';

const tabs = [
  { name: 'Feature', path: FEATURE_SERVICE_PATH },
  { name: 'ProfileStore', path: FEATURE_PROFILE_STORE_PATH },
  { name: 'Схема работы', path: FEATURE_HOW_IT_WORK_PATH },
];

export const Feature: React.FC = () => {
  return (
    <section>
      <h1 className={style.title}>Доступы - Проект</h1>
      <nav className={style.nav}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={style.nav__item}
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : 'normal',
              background: isActive ? '#2563eb' : 'transparent',
            })}
          >
            {tab.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </section>
  );
};
