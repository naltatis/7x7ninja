import { h } from "hyperapp";
import ItemFrame from "./ItemFrame";

function CatalogItems({
  catalog,
  load
}: {
  catalog: Catalog;
  load: (item: Item) => void;
}) {
  return catalog.items.length === 0 ? (
    <div class="catalog_empty">
      <p>you haven't saved anything yet</p>
    </div>
  ) : (
    <div class="catalog__items">
      {catalog.items.map((item: Item) => (
        <div class="catalog__item">
          <ItemFrame frame={item.frames[0]} onclick={() => load(item)} />
        </div>
      ))}
    </div>
  );
}

export default function CatalogView({
  catalog,
  load,
  reload,
  setScope
}: {
  catalog: Catalog;
  load: (item: Item) => void;
  reload: (state: Catalog, actions: CatalogActions) => void;
  setScope: (scope: string) => void;
}) {
  return (
    <aside class="catalog">
      <h2 class="catalog__headline">
        {catalog.scope === "mine"
          ? [
              <span>Your Artworks</span>,
              <button onclick={() => setScope("all")}>
                show everyones artwork
              </button>
            ]
          : [
              <span>All Artwork</span>,
              <button onclick={() => setScope("mine")}>
                only your artworks
              </button>,
              <button onclick={reload}>reload</button>
            ]}
      </h2>
      <CatalogItems catalog={catalog} load={load} />
    </aside>
  );
}
