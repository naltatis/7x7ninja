import { app } from "hyperapp";
import { actions, initialState, view } from "./app";
import { BIT_SEPARATOR, FRAME_MATCHER } from "./constants";
import animationRunner from "./utils/animationRunner";
import keyboadShortcuts from "./utils/keyboadShortcuts";
import { loadItems, saveItem } from "./utils/store";

const devtools =
  process.env.NODE_ENV !== "production"
    ? require("hyperapp-redux-devtools")
    : null;

declare global {
  interface Window {
    animationRunner: any;
    renderFlipDot: any;
    store: any;
  }
}

window.renderFlipDot = (item: Item) => {
  /*
  const frame = item.frames[item.currentFrame];
  fetch(
    `http://katatonie.local/api/display/${frame.join(BIT_SEPARATOR)}?clear=true`
  );
  */
};

window.store = { saveItem, loadItems };

const devApp = devtools ? devtools(app) : app;

const main = devApp(
  initialState,
  actions,
  view,
  document.getElementById("app")
);

window.addEventListener("keyup", keyboadShortcuts(main as Actions));

main.catalog.reload();

window.animationRunner = animationRunner(main.currentItem.nextFrame);

// listening to url changes
function hashChanged() {
  if (window.location.hash.match(FRAME_MATCHER)) {
    main.currentItem.loadFromString(window.location.hash.substring(1));
  }
}
window.addEventListener("hashchange", hashChanged);
hashChanged();
