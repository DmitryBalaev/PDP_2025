import { FaSpinner } from 'react-icons/fa';
import styles from './Loading.module.css';

export const Loading = () => {
  return (
    <div className={styles.container}>
      <FaSpinner className={styles.spinner} />
      <p className={styles.text}>Загрузка...</p>
    </div>
  );
};
