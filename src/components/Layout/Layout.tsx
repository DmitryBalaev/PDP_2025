import { useState, type PropsWithChildren } from 'react';
import style from './Layout.module.css';
import { FaArrowRight } from 'react-icons/fa';

const LayoutBase: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.layout}>{children}</div>;
};

const Body: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={style.body}>
      <div className={style.body_wrapper}>{children}</div>
    </main>
  );
};

const Sidebar: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <aside className={style.sidebar}>
      <main className={`${style.sidebar_body} ${!open ? style.sidebar__hidden : undefined}`}>
        {children}
      </main>
      <FaArrowRight
        onClick={() => {
          setOpen((state) => !state);
        }}
        className={`${style.sidebar_icon} ${style[`sidebar_icon__${open ? 'left' : 'right'}`]}`}
      />
    </aside>
  );
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
