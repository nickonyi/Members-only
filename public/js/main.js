const userBtn = document.getElementById("user-menu-btn");
const dropdown = document.getElementById("user-dropdown");
const modal = document.getElementById("join-modal");
const openBtn = document.getElementById("open-join-modal");
const closeBtn = document.getElementById("close-modal");

document.addEventListener("click", (e) => {
  if (userBtn?.contains(e.target)) {
    dropdown?.classList.toggle("hidden");
  } else if (!dropdown?.contains(e.target)) {
    dropdown?.classList.add("hidden");
  }
});

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
});
