const BIT_SEPARATOR = "";
const FRAME_SEPARATOR = "-";

export function itemToString(item: Item): string {
  return item.frames.map(f => f.join(BIT_SEPARATOR)).join(FRAME_SEPARATOR);
}

export function itemFromString(s: string): Item {
  const frames = s
    .split(FRAME_SEPARATOR)
    .map(frame =>
      frame.split(BIT_SEPARATOR).map(char => (char === "1" ? 1 : 0))
    );
  const animation = frames.length > 1;
  return { currentFrame: 0, frames, animation };
}
