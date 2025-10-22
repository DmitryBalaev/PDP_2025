export class MyPromise {
  public static all<T>(promises: readonly (T | PromiseLike<T>)[]): Promise<T[]> {
    let counter = 0;
    const result: Awaited<T[]> = [];

    if (promises.length === 0) {
      return Promise.resolve(result);
    }

    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((res) => {
            result[index] = res;
            counter++;

            if (counter === promises.length) {
              resolve(result);
            }
          })
          .catch(reject);
      });
    });
  }

  public static allSettled<T>(
    promises: readonly (T | PromiseLike<T>)[]
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
}
