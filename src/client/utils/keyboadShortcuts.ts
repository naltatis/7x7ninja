export default function keyboadShortcuts(actions: Actions) {
  return (ev: KeyboardEvent) => {
    switch (ev.key) {
      case "ArrowLeft":
        actions.currentItem.prevFrame();
        break;
      case "ArrowRight":
        actions.currentItem.nextFrame();
        break;
      case "+":
        actions.currentItem.addFrame(1);
        break;
      case "-":
        actions.currentItem.removeCurrentFrame();
        break;
      case "i":
        actions.currentItem.invert();
        break;
      case "s":
        actions.saveCurrentItem();
        break;
      case "c":
        actions.currentItem.clear();
        break;
      case " ":
        actions.animation.toggle();
        break;
      default:
        return;
    }
  };
}
