const chain = [
  {
    resolved: (a) => a + 2,
    rejected: undefined,
  },
  {
    resolved: (a) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(a + 3);
        }, 1000);
      });
    },
    rejected: undefined,
  },
  {
    resolved: (a) => a + 4,
    rejected: undefined,
  },
];

function mutiPromise(chain, prop) {
  // 因为 promise.then 会获得上一个promise的处理数据
  // Promise.resolve(prop) 相当于把 prop 作为第一个 Promise的结果，方便传给下一个

  let promise = Promise.resolve(prop);

  while (chain.length) {
    const { resolved, rejected } = chain.shift();
    promise = promise.then(resolved, rejected);
  }

  return promise;
}

const p = mutiPromise(chain, 1);

p.then((res) => {
  console.log(res);
});
