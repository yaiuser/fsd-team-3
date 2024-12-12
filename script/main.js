const tabMenu = document.querySelector(".tab-menu");

let activeDrag = false;

tabMenu.addEventListener("mousemove", (drag) => {
    if(!activeDrag) return;
    tabMenu.scrollLeft -= drag.movementX;
    tabMenu.classList.add("dragging");
});

tabMenu.addEventListener("mouseup", () => {
    activeDrag = true;
    tabMenu.classList.remove("dragging");

});

tabMenu.addEventListener("mousedown", () => {
    activeDrag = true;
});

// Change Tab contents

const tabs = document.querySelectorAll(".tab-content");
const tabBtns = document.querySelectorAll(".tab-btn");

const tab_Nav = function(tabBtnClick){
    tabBtns.forEach((tabBtn) => {
        tabBtn.classList.remove("active");
    });
    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });

    tabBtns[tabBtnClick].classList.add("active");
    tabs[tabBtnClick].classList.add("active");
}

tabBtns.forEach((tabBtn, i) => {
    tabBtn.addEventListener("click", () => {
        tab_Nav(i);
    })
})


