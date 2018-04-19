declare module "hyperapp";

type Matrix = Array<0 | 1>;
type Frames = Matrix[];

interface Item {
  id?: string;
  frames: Frames;
  currentFrame: number;
  animation: boolean;
}

interface ApiItem {
  id: string;
  author: string;
  frames: string[];
}

interface Animation {
  running: boolean;
  speed: number;
}

interface Catalog {
  items: Item[];
  scope: string;
}

interface State {
  currentItem: Item;
  inspiration: string;
  animation: Animation;
  catalog: Catalog;
}

interface AnimationActions {
  play: (speed?: number) => (state: Animation) => Animation;
  stop: () => (state: Animation) => Animation;
  setSpeed: (ms: number) => (state: Animation) => Animation;
  toggle: () => (state: Animation, actions: AnimationActions) => void;
}

interface CatalogActions {
  setItems: (items: Item[]) => (state: Catalog) => { items: Item[] };
  reload: () => (state: Catalog, actions: CatalogActions) => void;
  save: (item: Item) => (state: Catalog, actions: CatalogActions) => void;
  remove: (index: number) => (state: Catalog) => { items: Item[] };
  setScope: (
    scope: string
  ) => (state: Catalog, actions: CatalogActions) => { scope: string };
}

interface CurrentItemActions {
  toggle: (index: number) => (state: Item) => Item;
  invert: () => (state: Item) => Item;
  clear: () => (state: Item) => Item;
  load: (matrix: Item) => (state: Item) => Item;
  loadFromString: (str: string) => (state: Item) => Item;
  nextFrame: () => (state: Item) => Item;
  prevFrame: () => (state: Item) => Item;
  addFrame: (index: number) => (state: Item) => Item;
  changeFrame: (index: number) => (state: Item) => Item;
  removeFrame: (index: number) => (state: Item) => Item;
  removeCurrentFrame: () => (state: Item, actions: CurrentItemActions) => void;
}

interface Actions {
  catalog: CatalogActions;
  currentItem: CurrentItemActions;
  animation: AnimationActions;
  newInspiration: () => { inspiration: string };
  saveCurrentItem: () => (state: State, actions: Actions) => void;
}
