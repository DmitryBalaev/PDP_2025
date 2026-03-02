import React, { useState } from 'react';
import styles from './Graphql.module.css';

const GRAPHQL_ENDPOINT = 'https://rickandmortyapi.com/graphql';

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface CharactersQueryData {
  characters: {
    results: Character[];
  };
}

interface MutationPreviewData {
  createCharacter?: {
    id: string;
    name: string;
  };
}

export const Graphql: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isQueryLoading, setIsQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState('');

  const [characterName, setCharacterName] = useState('New Character');
  const [isMutationLoading, setIsMutationLoading] = useState(false);
  const [mutationResponse, setMutationResponse] = useState('');
  const [mutationError, setMutationError] = useState('');

  const loadCharacters = async () => {
    setIsQueryLoading(true);
    setQueryError('');

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetCharacters($page: Int!) {
              characters(page: $page) {
                results {
                  id
                  name
                  status
                  species
                  image
                }
              }
            }
          `,
          variables: { page: 1 },
        }),
      });

      const body = (await response.json()) as GraphQLResponse<CharactersQueryData>;

      if (body.errors?.length) {
        throw new Error(body.errors[0].message);
      }

      setCharacters(body.data?.characters.results ?? []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка запроса';
      setQueryError(message);
      setCharacters([]);
    } finally {
      setIsQueryLoading(false);
    }
  };

  const runMutationExample = async () => {
    setIsMutationLoading(true);
    setMutationError('');
    setMutationResponse('');

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation CreateCharacter($name: String!) {
              createCharacter(name: $name) {
                id
                name
              }
            }
          `,
          variables: { name: characterName },
        }),
      });

      const body = (await response.json()) as GraphQLResponse<MutationPreviewData>;

      if (body.errors?.length) {
        throw new Error(body.errors[0].message);
      }

      setMutationResponse(JSON.stringify(body.data, null, 2));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка мутации';
      setMutationError(message);
    } finally {
      setIsMutationLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>GraphQL + fetch</h1>
      <p className={styles.note}>Демонстрация работы GraphQL через fetch с API Rick and Morty.</p>
      <section className={styles.section}>
        <h2>Query: получить персонажей</h2>
        <button onClick={loadCharacters} disabled={isQueryLoading}>
          {isQueryLoading ? 'Загрузка...' : 'Выполнить query'}
        </button>
        {queryError && <p className={styles.error}>Ошибка: {queryError}</p>}

        <div className={styles.grid}>
          {characters.map((character) => (
            <article key={character.id} className={styles.card}>
              <img src={character.image} alt={character.name} />
              <div>
                <h3>{character.name}</h3>
                <p>
                  {character.species} | {character.status}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Mutation: демонстрация отправки</h2>
        <p className={styles.note}>
          В Rick and Morty API нет публичных мутаций. Ниже показано, как отправить mutation и
          обработать ошибку сервера.
        </p>
        <div className={styles.mutationControls}>
          <input value={characterName} onChange={(event) => setCharacterName(event.target.value)} />
          <button onClick={runMutationExample} disabled={isMutationLoading}>
            {isMutationLoading ? 'Отправка...' : 'Выполнить mutation'}
          </button>
        </div>
        {mutationError && <p className={styles.error}>Ошибка: {mutationError}</p>}
        {mutationResponse && <pre className={styles.response}>{mutationResponse}</pre>}
      </section>
    </div>
  );
};
