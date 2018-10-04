export function cloneMatrix(matrix: Matrix): Matrix {
  return [...matrix];
}

export function cloneFrames(frames: Frames): Frames {
  return frames.map(matrix => cloneMatrix(matrix));
}

export function cloneItem(item: Item): Item {
  return { ...item, frames: cloneFrames(item.frames) };
}

export function cloneCatalog(catalog: Catalog): Catalog {
  return {
    items: catalog.items.map(item => cloneItem(item)),
    scope: catalog.scope
  };
}

export function cloneAnimation(animation: Animation): Animation {
  return { ...animation };
}
