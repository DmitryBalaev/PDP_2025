import { lazy, Suspense, type ComponentType, type JSX, type PropsWithRef } from 'react';
import { Loading } from '../components/Loading/Loading';

type RemoveDefault<M extends Module> = {
  [K in keyof M as K extends 'default' ? never : K]: M[K];
};

type RemoveNonComponentType<M extends Module> = {
  [K in keyof M as M[K] extends ComponentType ? K : never]: M[K];
};

type Resolver<M extends Module, P = any> = (
  module: RemoveNonComponentType<RemoveDefault<M>>
) => ComponentType<P>;

type Module = object;

export const withLazy = <M extends Module, R extends Resolver<M>>(
  loader: () => Promise<M>,
  resolver: R
): ReturnType<R> => {
  const LazyComponent = lazy(() => loader().then((m) => ({ default: resolver(m) })));

  const Component = (props: JSX.IntrinsicAttributes & PropsWithRef<unknown>) => {
    return (
      <Suspense fallback={<Loading />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return Component as ReturnType<R>;
};
