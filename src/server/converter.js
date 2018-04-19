const Hashids = require("hashids");

const hashids = new Hashids("7x7", 8);

const FRAME_SEPARATOR = "-";

function itemForDB(item) {
  const id = item.id ? hashids.decode(item.id) : null;
  const { author } = item;
  const pixel = item.frames.join(FRAME_SEPARATOR);
  return { id, author, pixel };
}

function itemFromDB(item) {
  const id = hashids.encode(item.id);
  const frames = item.pixel.split(FRAME_SEPARATOR);
  const animation = frames.length > 1;
  return { id, frames, animation };
}

function listFromDB(list = []) {
  return list.map(itemFromDB);
}

module.exports = {
  itemForDB,
  listFromDB
};
