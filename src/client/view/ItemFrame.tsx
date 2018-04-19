import { h } from "hyperapp";

export default function ItemFrame({
  frame,
  onclick
}: {
  frame: Matrix;
  onclick: () => void;
}) {
  return (
    <div class="frame">
      <ol onMouseEnter={onmouseenter} onclick={onclick} class="frame__matrix">
        {frame.map(x => (
          <li class={`frame__pixel frame__pixel--${x === 0 ? "off" : "on"}`} />
        ))}
      </ol>
    </div>
  );
}
