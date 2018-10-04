import { h } from "hyperapp";
import ItemFrame from "./ItemFrame";

const speeds = [250, 500, 750];

function AnimationControl({
  play,
  stop,
  setSpeed,
  running,
  speed
}: {
  play: () => void;
  stop: () => void;
  setSpeed: (ms: number) => void;
  running: boolean;
  speed: number;
}) {
  const handleChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    const ms = parseInt(select.options[select.selectedIndex].value, 10);
    setSpeed(ms);
  };
  return (
    <div class="animation__control">
      <button onclick={running ? stop : play} class="button">
        {running ? "❚❚" : "►"} <kbd>SPACE</kbd>
      </button>
      <div class="select">
        <select onchange={handleChange} disabled={running}>
          {speeds.map(ms => (
            <option value={ms} selected={ms === speed}>
              {ms}
              ms
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function AnimationView({
  animation,
  animationActions,
  currentItem,
  currentItemActions
}: {
  animation: Animation;
  animationActions: AnimationActions;
  currentItem: Item;
  currentItemActions: CurrentItemActions;
}) {
  return (
    <div class="animation">
      <h2 class="animation__headline">Animation Frames </h2>
      {!currentItem.animation
        ? null
        : [
            <ul class="animation__strip strip">
              {currentItem.frames.map((frame, i) => (
                <li
                  class={`strip__item ${
                    i === currentItem.currentFrame ? "strip__item--active" : ""
                  }`}
                >
                  <ItemFrame
                    frame={frame}
                    onclick={() => currentItemActions.changeFrame(i)}
                  />
                  <button
                    class="strip__item__add button is-rounded is-small"
                    onclick={() => currentItemActions.addFrame(i)}
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>,
            <button class="button" onclick={currentItemActions.prevFrame}>
              prev <kbd>◄</kbd>
            </button>,
            <button class="button" onclick={currentItemActions.nextFrame}>
              next <kbd>►</kbd>
            </button>
          ]}
      <div>
        <button
          class="button"
          onclick={() => currentItemActions.addFrame(undefined)}
        >
          add frame <kbd>+</kbd>
        </button>
        {currentItem.animation &&
          currentItem.currentFrame !== 0 && (
            <button
              class="button"
              onclick={currentItemActions.removeCurrentFrame}
            >
              delete frame <kbd>-</kbd>
            </button>
          )}
      </div>
      {currentItem.animation && (
        <AnimationControl {...animationActions} {...animation} />
      )}
    </div>
  );
}
