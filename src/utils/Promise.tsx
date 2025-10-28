type TPromiseIterable<T> = readonly (T | PromiseLike<T>)[];

export class MyPromise {
  public static all<T>(promises: TPromiseIterable<T>): Promise<T[]> {
    let resolveCount = 0;
    const result: Awaited<T[]> = [];

    if (promises.length === 0) {
      return Promise.resolve(result);
    }

    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((res) => {
            result[index] = res;
            resolveCount++;

            if (resolveCount === promises.length) {
              resolve(result);
            }
          })
          .catch(reject);
      });
    });
  }

  public static allSettled<T>(
    promises: TPromiseIterable<T>
  ): Promise<({ status: 'fulfilled'; value: T } | { status: 'rejected'; reason: unknown })[]> {
    return MyPromise.all(
      promises.map((promise) => {
        if (promise instanceof Promise) {
          return promise
            .then((value) => ({ status: 'fulfilled', value }) as const)
            .catch((reason) => ({ status: 'rejected', reason }) as const);
        } else {
          return Promise.resolve({ status: 'fulfilled', value: promise } as const);
        }
      })
    );
  }

  public static any<T>(promises: TPromiseIterable<T>): Promise<Awaited<T>> {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        return Promise.resolve(promises);
      }

      let rejectedCount = 0;
      const errors: unknown[] = [];

      promises.forEach((promise, i) => {
        Promise.resolve(promise)
          .then(resolve)
          .catch((e) => {
            errors[i] = e;
            rejectedCount--;

            if (rejectedCount === promises.length) {
              reject(new AggregateError(errors));
            }
          });
      });
    });
  }

  public static race<T>(promises: TPromiseIterable<T>): Promise<Awaited<T>> {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        return Promise.resolve(promises);
      }

      promises.forEach((promise) => Promise.resolve(promise).then(resolve).catch(reject));
    });
  }

  public static resolve<T>(value: T | PromiseLike<T>): Promise<T> {
    if (value && value instanceof Promise) {
      return value;
    }

    if (value && typeof (value as PromiseLike<T>).then === 'function') {
      return new Promise<T>((resolve, reject) => (value as PromiseLike<T>).then(resolve, reject));
    }

    return new Promise<T>((resolve) => resolve(value));
  }

  public static reject<T = never>(reason?: unknown): Promise<T> {
    return new Promise<T>((_, reject) => reject(reason));
  }
}
