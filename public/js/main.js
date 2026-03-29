const userBtn = document.getElementById("user-menu-btn");
const dropdown = document.getElementById("user-dropdown");

document.addEventListener("click", (e) => {
  if (userBtn?.contains(e.target)) {
    dropdown?.classList.toggle("hidden");
  } else if (!dropdown?.contains(e.target)) {
    dropdown?.classList.add("hidden");
  }
});
