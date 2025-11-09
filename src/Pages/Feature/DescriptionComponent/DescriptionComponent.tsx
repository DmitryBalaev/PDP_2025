import {
  featureConfig,
  howItWorkConfig,
  profileStoreConfig,
  type FeatureRenderConfig,
} from './config';
import styles from './DescriptionComponent.module.css';

interface DescriptionProps {
  title: string;
  config: FeatureRenderConfig[];
}

const DescriptionComponent: React.FC<DescriptionProps> = ({ config, title }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      {config.map((section, index: number) => (
        <div key={index} className={styles.section}>
          {section.title && <h2>{section.title}</h2>}
          {section.description && (
            <p>
              {section.description.code && <code>{section.description.code}</code>}{' '}
              {section.description.text}
            </p>
          )}
          {section.items && (
            <ul>
              {section.items.map((item, idx) => (
                <li key={idx}>
                  {item?.code && <code>{item.code}</code>}
                  {item?.text && ` ${item.text}`}
                </li>
              ))}
            </ul>
          )}
          {section.code &&
            (Array.isArray(section.code) ? (
              section.code.map((item, idx) => {
                return (
                  <pre key={idx}>
                    <code>{item}</code>
                  </pre>
                );
              })
            ) : (
              <pre>
                <code>{section.code}</code>
              </pre>
            ))}
        </div>
      ))}
    </div>
  );
};

export const FeatureService: React.FC = () => (
  <DescriptionComponent config={featureConfig} title="Класс Feature" />
);

export const ProfileStore: React.FC = () => (
  <DescriptionComponent
    config={profileStoreConfig}
    title="ProfileStore - управление доступами пользователя"
  />
);

export const HowItWork: React.FC = () => (
  <DescriptionComponent config={howItWorkConfig} title="Схема работы системы доступов" />
);
