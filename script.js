// Toggle collapsible sidebar on the left wall to maximize main work area
function toggleSidebar() {
    const sidebar = document.getElementById('left-sidebar');
    const expandBtn = document.getElementById('sidebar-expand-btn');
    
    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        expandBtn.style.display = 'flex';
    } else {
        expandBtn.style.display = 'none';
    }
}

// Switch top banner pages
function switchPage(pageId, event) {
    event.preventDefault();
    
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
    
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    event.target.classList.add('active');
}

// Toggle collapsible sublists in the sidebar
function toggleUnit(element) {
    const parentItem = element.parentElement;
    parentItem.classList.toggle('active');
}

// Switch main view content when clicking unit sub-links and auto-switch to home page
function showSection(sectionId, event) {
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
}

// Toggle accordions for unit tests and quizzes
function toggleAccordion(header) {
    const item = header.parentElement;
    item.classList.toggle('open');
}

// Check interactive quiz answer
function checkQuiz(btn, expectedValue) {
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
}
