import { h } from "hyperapp";
import ItemFrame from "./ItemFrame";

function CatalogItems({
  catalog,
  load
}: {
  catalog: Catalog;
  load: (item: Item) => void;
}) {
  return (
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
  load
}: {
  catalog: Catalog;
  load: (item: Item) => void;
}) {
  return (
    <aside class="catalog">
      <h2 class="catalog__headline">Your Saved Artworks</h2>
      <CatalogItems catalog={catalog} load={load} />
    </aside>
  );
}
