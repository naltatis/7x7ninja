let interval: number = null;

function animationRunner(nextFrame: () => void) {
  return {
    start: (ms: number) => {
      if (interval) {
        return;
      }
      interval = setInterval(nextFrame, ms);
    },
    stop: () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  };
}

export default animationRunner;
