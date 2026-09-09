document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("left-sidebar");
    const expandBtn = document.getElementById("sidebar-expand-btn");
    const collapseBtn = document.getElementById("sidebar-collapse-btn");

    function toggleSidebar() {
        sidebar.classList.toggle("collapsed");
        expandBtn.style.display = sidebar.classList.contains("collapsed") ? "flex" : "none";
    }

    expandBtn.addEventListener("click", toggleSidebar);
    collapseBtn.addEventListener("click", toggleSidebar);

    // Render units dynamically from data.js
    const unitList = document.getElementById("dynamic-unit-list");
    courseData.units.forEach((unit, index) => {
        const li = document.createElement("li");
        li.className = `unit-item ${index === 0 ? 'active' : ''}`;
        li.innerHTML = `
            <div class="unit-title"><span>${unit.title}</span><span>▼</span></div>
        `;
        unitList.appendChild(li);
    });
});
