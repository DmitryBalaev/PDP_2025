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
}
