export class MyPromise {
  public static all(promises: unknown[]) {
    let counter = 0;
    const result: unknown[] = [];

    if (promises.length === 0) {
      return Promise.resolve([]);
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
