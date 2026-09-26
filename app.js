const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterStatus = document.querySelector(".filter-status");
const projectDialog = document.querySelector(".project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogCategory = document.querySelector(".dialog-category");
const dialogTools = document.querySelector(".dialog-tools");

const projectDetails = {
  "Campus Course Planner": {
    category: "JAVA / STUDENT LIFE",
    description: "A practice project for planning a weekly course schedule. It explores organizing course data and presenting a clear overview of study sessions.",
    tools: ["Java", "Collections", "OOP"]
  },
  "Everyday Expense Tracker": {
    category: "PYTHON / PERSONAL TOOLS",
    description: "A command-line exercise for recording everyday expenses, grouping them by category, and reviewing totals over time.",
    tools: ["Python", "Data handling", "CLI"]
  },
  "Library Database Explorer": {
    category: "SQL / DATA",
    description: "A small library database exercise for practicing table relationships and writing queries to find available books.",
    tools: ["SQL", "Queries", "Relational data"]
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const isVisible = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.hidden = !isVisible;
      visibleCount += Number(isVisible);
    });

    filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} shown`;
  });
});

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.querySelector(".project-title").textContent;
    const details = projectDetails[title];

    dialogTitle.textContent = title;
    dialogDescription.textContent = details.description;
    dialogCategory.textContent = details.category;
    dialogTools.replaceChildren(...details.tools.map((tool) => {
      const tag = document.createElement("span");
      tag.textContent = tool;
      return tag;
    }));

    projectDialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => {
  projectDialog.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectDialog.open) {
    projectDialog.close();
  }
});

projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    projectDialog.close();
  }
});