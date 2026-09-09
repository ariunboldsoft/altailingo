// Toggle collapsible sidebar on the left wall to maximize main work area
window.toggleSidebar = function() {
    const sidebar = document.getElementById('left-sidebar');
    const expandBtn = document.getElementById('sidebar-expand-btn');
    const wrapper = document.querySelector('.main-wrapper');
    
    if (wrapper) wrapper.classList.toggle('sidebar-collapsed');
    if (sidebar) sidebar.classList.toggle('collapsed');
    
    if (sidebar && sidebar.classList.contains('collapsed')) {
        if (expandBtn) expandBtn.style.display = 'flex';
    } else {
        if (expandBtn) expandBtn.style.display = 'none';
    }
};

// Switch top banner pages (Vocabulary, Unit Tests, Quizzes)
window.switchPage = function(pageId, event) {
    if (event) event.preventDefault();
    
    // Hide all page sections and unit content sections
    document.querySelectorAll('.page-section, .content-section').forEach(p => {
        p.classList.remove('active-page', 'active-content');
    });
    
    // Show target page
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active-page');
    }
    
    // Update active state on top navigation
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
};

// Toggle collapsible sublists in the sidebar
window.toggleUnit = function(element) {
    const parentItem = element.parentElement;
    parentItem.classList.toggle('active');
};

// Switch main view content when clicking unit sub-links
window.showSection = function(sectionId, event) {
    if (event) event.preventDefault();
    
    // Hide all page sections and content sections
    document.querySelectorAll('.page-section, .content-section').forEach(p => {
        p.classList.remove('active-page', 'active-content');
    });
    
    // Show target unit section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active-content');
    }
    
    // Clear top nav active states when viewing units
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    
    // Update active sub-link in sidebar
    document.querySelectorAll('.section-sublist a').forEach(link => link.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
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
};

// Load Unit Extract via Fetch (Properly isolated in the global scope)
window.loadExtract = function(unitNumber) {
    const containerId = `extract-unit${unitNumber}`;
    const targetContainer = document.getElementById(containerId);
    
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
                targetContainer.innerHTML = `<p style="color: #721c24; padding: 20px;">Extract content coming soon or make sure your local server is running.</p>`;
            }
        });
};

// Automatically load Unit 1 extract when the page opens
window.addEventListener('DOMContentLoaded', () => {
    loadExtract(1);
});
