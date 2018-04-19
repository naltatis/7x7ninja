/* tslint:disable no-console */
import { FRAME_SEPARATOR } from "../constants";
import uuid from "./uuid";

function sessionId() {
  if (!window.localStorage.getItem("session_id")) {
    window.localStorage.setItem("session_id", uuid());
  }
  return window.localStorage.getItem("session_id");
}

const headers = new Headers({
  "Content-Type": "application/json"
});

export function saveItem(frames: string) {
  const author = sessionId();
  const data = { frames: frames.split(FRAME_SEPARATOR), author };
  return fetch("/api/images", {
    body: JSON.stringify(data),
    headers,
    method: "POST"
  }).then(res => {
    if (res.ok) {
      console.log("saved");
    } else {
      console.log("failed to save", res);
    }
  });
}

export function loadItems() {
  return fetch("/api/images", {
    headers,
    method: "GET"
  })
    .then(res => res.json())
    .then(items =>
      items.map((item: ApiItem): Item => {
        const frames = item.frames.map(frame =>
          frame.split("").map(char => (char === "1" ? 1 : 0))
        );
        const animation = frames.length > 1;
        return { frames, currentFrame: 0, animation };
      })
    );
}
