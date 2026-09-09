// Toggle collapsible sidebar on the left wall to maximize main work area
window.toggleSidebar = function() {
    const sidebar = document.getElementById('left-sidebar');
    const expandBtn = document.getElementById('sidebar-expand-btn');
    
    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        expandBtn.style.display = 'flex';
    } else {
        expandBtn.style.display = 'none';
    }
};

// Switch top banner pages
window.switchPage = function(pageId, event) {
    event.preventDefault();
    
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
    
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    event.target.classList.add('active');
};

// Toggle collapsible sublists in the sidebar
window.toggleUnit = function(element) {
    const parentItem = element.parentElement;
    parentItem.classList.toggle('active');
};

// Switch main view content when clicking unit sub-links and auto-switch to home page
window.showSection = function(sectionId, event) {
    event.preventDefault();
    
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active-page'));
    document.getElementById('home-page').classList.add('active-page');
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById('nav-home').classList.add('active');
    
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active-content'));
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active-content');
    }
    
    const subLinks = document.querySelectorAll('.section-sublist a');
    subLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
};

// Toggle accordions for unit tests and quizzes
window.toggleAccordion = function(header) {
    const item = header.parentElement;
    item.classList.toggle('open');
};

// Check interactive quiz answer
window.checkQuiz = function(btn, expectedValue) {
    const body = btn.parentElement;
    const selected = body.querySelector('input[type="radio"]:checked');
    const feedback = body.querySelector('.feedback');
    
    if (!selected) {
        feedback.style.color = '#856404';
        feedback.textContent = 'Please select an answer first!';
        return;
    }
    
    if (selected.value === expectedValue) {
        feedback.style.color = '#155724';
        feedback.textContent = 'Correct! Great job.';
    } else {
        feedback.style.color = '#721c24';
        feedback.textContent = 'Incorrect. Try again!';
    }
    window.loadExtract = function(unitNumber) {
    const containerId = `extract-unit${unitNumber}`;
    const targetContainer = document.getElementById(containerId);
    
    // Skip if already loaded to save bandwidth
    if (targetContainer && targetContainer.dataset.loaded === "true") return;

    fetch(`extracts/unit${unitNumber}.html`)
        .then(response => {
            if (!response.ok) throw new Error("Extract not found");
            return response.text();
        })
        .then(htmlContent => {
            if (targetContainer) {
                targetContainer.innerHTML = htmlContent;
                targetContainer.dataset.loaded = "true";
            }
        })
        .catch(error => {
            if (targetContainer) {
                targetContainer.innerHTML = `<p style="color: #721c24;">Extract content coming soon.</p>`;
            }
        });
};
