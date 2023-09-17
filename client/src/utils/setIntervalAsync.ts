export const setIntervalAsync = async (
  callback: (endLoop?: () => void) => Promise<void>,
  interval: number,
  maxTime: number,
  onTimeOut?: () => void
): Promise<void> => {
  const doSetIntervalAsync = async (
    resolve: (value: void | PromiseLike<void>) => void
  ) => {
    let isFinished = false;

    const endLoop = (): void => {
      isFinished = true;
      resolve();
    };

    const timeout = setTimeout(() => {
      endLoop();
      onTimeOut?.();
    }, maxTime);

    while (!isFinished) {
      try {
        await callback(() => {
          endLoop();
          clearTimeout(timeout);
        });
      } catch (e) {
        console.error(e);
      }
      await sleep(interval);
    }
  };
  return new Promise(doSetIntervalAsync);
};

export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
