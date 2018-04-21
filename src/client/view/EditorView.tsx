import { h } from "hyperapp";

function CurrentItemView({
  matrix,
  toggle
}: {
  matrix: Matrix;
  toggle: (i: number) => void;
}) {
  return (
    <div class="currentItem">
      <div class="currentItem__square">
        <div class="currentItem__inner">
          {matrix.map((x, i) => (
            <button
              class={`dot dot--${x === 0 ? "off" : "on"}`}
              onclick={() => toggle(i)}
            >
              <div class="disc">
                <div class="disc__white" />
                <div class="disc__black" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EditorView({
  catalogActions,
  currentItem,
  currentItemActions,
  inspiration,
  inspirationAction
}: {
  catalogActions: CatalogActions;
  currentItem: Item;
  currentItemActions: CurrentItemActions;
  inspiration: string;
  inspirationAction: () => { inspiration: string };
}) {
  const handleNew = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("clear the image?")) {
      currentItemActions.clear();
    }
  };
  const handleSave = () => {
    catalogActions.save(currentItem);
  };
  return (
    <div class="editor">
      <h2 class="editor__headline">
        <span>The Editor</span>
        <div class="editor__inspiration" onclick={inspirationAction}>
          {inspiration}
        </div>
        <button class="editor__getinspiration" onclick={inspirationAction}>
          need drawing<br />inspiration?
        </button>
      </h2>
      <CurrentItemView
        matrix={currentItem.frames[currentItem.currentFrame]}
        toggle={currentItemActions.toggle}
      />
      <div class="editor__actions columns is-mobile is-multiline">
        <div class="column">
          <button onclick={currentItemActions.invert} class="button">
            invert <kbd>I</kbd>
          </button>
        </div>
        <div class="column">
          <button onclick={handleSave} class="button">
            save <kbd>S</kbd>
          </button>
        </div>
        <div class="column">
          <button onclick={handleNew} class="button">
            clear <kbd>C</kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
