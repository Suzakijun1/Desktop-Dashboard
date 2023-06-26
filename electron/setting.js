const Store = require("electron-store");
const storage = new Store();

function getWinSettings() {
  const default_bounds = [800, 600];
  const size = storage.get("win-size");

  if (size) return size;
  else {
    storage.set("win-size", default_bounds);
    return default_bounds;
  }
}
function getWinPosition() {
  const default_position = [0, 0];
  const position = storage.get("win-position");
  if (position) return position;
  else {
    storage.set("win-position", default_position);
    return default_position;
  }
}

function saveBounds(bounds) {
  storage.set("win-size", bounds);
  console.log("Bounds saved: ", bounds);
}

function savePosition(position) {
  storage.set("win-position", position);
  console.log("Position saved: ", position);
}

module.exports = {
  getWindowSettings: getWinSettings,
  getWindowPosition: getWinPosition,
  saveBounds: saveBounds,
  savePosition: savePosition,
};
