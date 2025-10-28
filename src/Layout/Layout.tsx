import type { PropsWithChildren } from 'react';
import style from './Layout.module.css';

const LayoutBase: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.layout}>{children}</div>;
};

const Body: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className={style.body}>{children}</main>;
};

const Sidebar: React.FC<PropsWithChildren> = ({ children }) => {
  return <aside className={style.sidebar}>{children}</aside>;
};

const Footer: React.FC<PropsWithChildren> = ({ children }) => {
  return <footer className={style.footer}>{children}</footer>;
};

export const Layout = Object.assign(LayoutBase, {
  Body,
  Sidebar,
  Footer,
});

export default Layout;
