import React, { type PropsWithChildren, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import style from './Layout.module.css';
import { useLocation } from 'react-router';

const LayoutBase: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.layout}>{children}</div>;
};

const Sidebar: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === '/') {
    return;
  }

  return (
    <aside className={style.sidebar}>
      <div className={`${style.sidebar_body} ${!open ? style.sidebar__hidden : ''}`}>
        {children}
      </div>

      <FaArrowRight
        onClick={() => setOpen((prev) => !prev)}
        className={`${style.sidebar_icon} ${style[`sidebar_icon__${open ? 'left' : 'right'}`]}`}
      />
    </aside>
  );
};

const Body: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={style.main}>
      <div className={style.content}>{children}</div>
    </main>
  );
};

const Footer: React.FC<PropsWithChildren> = ({ children }) => {
  return <footer className={style.footer}>Footer {children}</footer>;
};

export const Layout = Object.assign(LayoutBase, {
  Sidebar,
  Body,
  Footer,
});

export default Layout;
