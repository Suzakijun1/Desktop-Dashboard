const maxResBtn = document.getElementById("maxResBtn");
const mySidebar = document.getElementById("mySidebar");
const showHideMenusButton = document.getElementById("showHideMenus");

var isLeftMenuActive = true;

//// CLOSE APP
closeBtn.addEventListener("click", () => {
  electron.closeApp();
});
//// MINIMIZE APP
minimizeBtn.addEventListener("click", () => {
  electron.minimizeApp();
});

//// MAXIMIZE RESTORE APP
function changeMaxResBtn(isMaximizedApp) {
  if (isMaximizedApp) {
    maxResBtn.title = "Restore";
    maxResBtn.classList.remove("maximizeBtn");
    maxResBtn.classList.add("restoreBtn");
  } else {
    maxResBtn.title = "Maximize";
    maxResBtn.classList.remove("restoreBtn");
    maxResBtn.classList.add("maximizeBtn");
  }
}
maxResBtn.addEventListener("click", () => {
  electron.maximizeRestoreApp();
});
electron.onMaximized(() => {
  changeMaxResBtn(true);
});
electron.onRestored(() => {
  changeMaxResBtn(false);
});

//// TOGGLE MENU
// Expand and Retract
showHideMenus.addEventListener("click", () => {
  if (isLeftMenuActive) {
    mySidebar.style.width = "0px";
    isLeftMenuActive = false;
  } else {
    mySidebar.style.width = "280px";
    isLeftMenuActive = true;
  }
});
showHideMenusButton.addEventListener("click", function () {
  mySidebar.classList.toggle("sidebar-closed");
});
