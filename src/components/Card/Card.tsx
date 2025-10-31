import { type IconType } from 'react-icons';
import styles from './Card.module.css';
import { useNavigate } from 'react-router';

export const Card: React.FC<{
  Icon: IconType;
  title: string;
  description: string;
  path?: string;
}> = ({ Icon, description, title, path }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.card} ${path && styles.pointer}`}
      onClick={() => {
        if (path) {
          navigate(path);
        }
      }}
    >
      <div>
        <Icon className={styles.icon} color="#333" />
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
};
