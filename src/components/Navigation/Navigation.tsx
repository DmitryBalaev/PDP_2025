import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import type { MenuItem } from '../../App';

export const Navigation: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  console.log(location);

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.menu_list}>
        {items.map((item, index) => (
          <li key={index} className={styles.menu_item}>
            <Link
              to={item.path}
              className={`${styles.menu_link} ${currentPath === item.path || currentPath.startsWith(item.path + '/') ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
