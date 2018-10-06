import { h } from "hyperapp";
import "./app.sass";
import { EMPTY_MATRIX } from "./constants";
import {
  cloneAnimation,
  cloneCatalog,
  cloneItem,
  cloneMatrix
} from "./utils/clone";
import { itemFromString, itemToString } from "./utils/serialize";
import AnimationView from "./view/AnimationView";
import CatalogView from "./view/CatalogView";
import EditorView from "./view/EditorView";

const inspirations = [
  "🖍",
  "🤣",
  "🌟",
  "🚀",
  "😀",
  "📦",
  "💀",
  "👾",
  "👁",
  "🕺🏻",
  "🎩",
  "🦊",
  "🦁",
  "🦑",
  "🐲",
  "🚕",
  "⛱",
  "🦖",
  "🐳",
  "📞",
  "🍰",
  "☕️",
  "🍔",
  "🎧",
  "🏠",
  "🎟",
  "⚽️",
  "☀️",
  "🌳",
  "🐛",
  "👑",
  "❤️",
  "💥",
  "❄️"
];

const saveCurrentItem = (item: Item): void => {
  const str = itemToString(item);
  window.localStorage.currentItem = str;
  window.location.hash = str;
};

export const initialState: State = {
  animation: { running: false, speed: 500 },
  catalog: { items: [], scope: "mine" },
  currentItem: itemFromString(window.localStorage.currentItem || EMPTY_MATRIX),
  inspiration: ""
};

export const actions: Actions = {
  animation: {
    play: () => state => {
      const animation = cloneAnimation(state);
      animation.running = true;
      window.animationRunner.start(state.speed);
      return animation;
    },
    setSpeed: ms => state => {
      const animation = cloneAnimation(state);
      animation.speed = ms;
      return animation;
    },
    stop: () => state => {
      const animation = cloneAnimation(state);
      animation.running = false;
      window.animationRunner.stop();
      return animation;
    },
    toggle: () => (state, actions) => {
      return state.running ? actions.stop() : actions.play();
    }
  },
  catalog: {
    reload: () => (catalog, actions) => {
      window.store.loadItems(catalog.scope).then(actions.setItems);
    },
    remove: () => state => {
      const catalog = cloneCatalog(state);
      /*
      catalog.items.splice(index, 1);
      saveCatalog(catalog);
      */
      return catalog;
    },
    save: (item: Item) => (_, actions) => {
      const newItem = cloneItem(item);
      window.store.saveItem(itemToString(newItem)).then(actions.reload);
    },
    setItems: (items: Item[]) => () => {
      return { items };
    },
    setScope: (scope: string) => (_, actions) => {
      setTimeout(actions.reload, 0);
      return { scope };
    }
  },
  currentItem: {
    addFrame: index => state => {
      const item = cloneItem(state);
      const newMatrix = cloneMatrix(item.frames[item.currentFrame]);

      const i = index === undefined ? item.frames.length : index + 1;

      item.frames.splice(i, 0, newMatrix);
      item.currentFrame = i;
      item.animation = true;
      // side effects
      saveCurrentItem(item);
      window.renderFlipDot(item);
      return item;
    },
    changeFrame: index => state => {
      const item = cloneItem(state);
      item.currentFrame = index;
      // side effects
      window.renderFlipDot(item);
      return item;
    },
    clear: () => () => {
      const item = itemFromString(EMPTY_MATRIX);
      // side effects
      saveCurrentItem(item);
      window.renderFlipDot(item);
      return item;
    },
    invert: () => state => {
      const item = cloneItem(state);
      const currentFrame = item.frames[item.currentFrame];
      item.frames[item.currentFrame] = currentFrame.map(
        bit => (bit === 0 ? 1 : 0)
      );
      // side effects
      saveCurrentItem(item);
      window.renderFlipDot(item);
      return item;
    },
    load: item => () => {
      const newItem = cloneItem(item);
      newItem.currentFrame = 0;
      // side effects
      saveCurrentItem(newItem);
      window.renderFlipDot(newItem);
      return newItem;
    },
    loadFromString: s => (state: Item) => {
      if (s === itemToString(state)) {
        return;
      }
      const newItem = itemFromString(s);
      // side effects
      saveCurrentItem(newItem);
      window.renderFlipDot(newItem);
      return newItem;
    },
    nextFrame: () => state => {
      const item = cloneItem(state);
      const isLastFrame = item.currentFrame === item.frames.length - 1;
      item.currentFrame = isLastFrame ? 0 : item.currentFrame + 1;
      // side effects
      window.renderFlipDot(item);
      return item;
    },
    prevFrame: () => state => {
      const item = cloneItem(state);
      const lastFrame = item.frames.length - 1;
      const isFirstFrame = item.currentFrame === 0;
      item.currentFrame = isFirstFrame ? lastFrame : item.currentFrame - 1;
      // side effects
      window.renderFlipDot(item);
      return item;
    },
    removeCurrentFrame: () => (state, actions) => {
      if (state.currentFrame > 0) {
        actions.removeFrame(state.currentFrame);
      }
    },
    removeFrame: index => state => {
      const item = cloneItem(state);
      item.frames.splice(index, 1);
      item.currentFrame = 0;
      item.animation = item.frames.length > 1;
      // side effects
      saveCurrentItem(item);
      window.renderFlipDot(item);
      return item;
    },
    toggle: index => state => {
      const item = cloneItem(state);
      const currentFrame = item.frames[item.currentFrame];
      currentFrame[index] = currentFrame[index] === 0 ? 1 : 0;
      // side effects
      saveCurrentItem(item);
      window.renderFlipDot(item);
      return item;
    }
  },
  newInspiration: () => {
    const inspiration =
      inspirations[Math.floor(Math.random() * inspirations.length)];
    return { inspiration };
  },
  saveCurrentItem: () => (state, actions) => {
    actions.catalog.save(state.currentItem);
  }
};

export const view = (
  { currentItem, animation, catalog, inspiration }: State,
  {
    currentItem: currentItemActions,
    catalog: catalogActions,
    animation: animationActions,
    newInspiration: inspirationAction
  }: Actions
) => {
  return (
    <div>
      <h1 id="title">7x7.ninja</h1>
      <main class="container">
        <div class="columns is-tablet is-multiline">
          <div class="column is-half">
            <EditorView
              catalogActions={catalogActions}
              currentItem={currentItem}
              inspiration={inspiration}
              currentItemActions={currentItemActions}
              inspirationAction={inspirationAction}
            />
          </div>
          <div class="column is-half">
            <AnimationView
              animation={animation}
              animationActions={animationActions}
              currentItem={currentItem}
              currentItemActions={currentItemActions}
            />
          </div>
          <div class="column">
            <CatalogView
              catalog={catalog}
              reload={catalogActions.reload}
              load={currentItemActions.load}
              setScope={catalogActions.setScope}
            />
          </div>
        </div>
        <p class="column has-text-centered">
          <small>
            <a
              class="has-text-grey "
              href="https://github.com/naltatis/7x7ninja"
            >
              visit the GitHub project
            </a>
          </small>
        </p>
      </main>
    </div>
  );
};
