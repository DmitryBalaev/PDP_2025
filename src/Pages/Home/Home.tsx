import React from 'react';
import styles from './Home.module.css';
import { directions } from '../../utils/directions';
import { Card } from '../../components/Card/Card';

export const Home: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.intro}>
        <h1 className={styles.title}>Проект развития Frontend-навыков</h1>
        <p className={styles.subtitle}>
          Этот проект создан в рамках индивидуального плана развития (ИПР) — для структурного
          изучения и практического применения современных инструментов фронтенд-разработки.
        </p>
      </section>

      <section>
        <h2>Цель проекта</h2>
        <p className={styles.subtitle}>
          Системно улучшить профессиональные навыки в области JavaScript, React и сопутствующих
          технологий, закрепив теорию через практику в рабочих и pet-проектах.
        </p>
      </section>

      <section>
        <h2>Основные направления ИПР</h2>

        <div className={styles.grid}>
          {directions.map((props, index) => (
            <Card key={index} {...props} />
          ))}
        </div>
      </section>

      <section className={styles.conclusion}>
        <h2>Результат</h2>
        <p className={styles.subtitle}>
          По завершении работы над ИПР планируется достижение более глубокого понимания архитектуры
          современных React-приложений, повышение эффективности и качества кода, а также развитие
          инженерного мышления через практику.
        </p>
      </section>
    </div>
  );
};
