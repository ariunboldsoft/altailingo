// js/quizzes.js
document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content-area");

    // Render Home/Units View by default
    renderHomeView();

    // Navigation Switcher Listener
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
            link.classList.add("active");
            
            const page = link.getAttribute("data-page");
            if (page === "home") renderHomeView();
            else if (page === "vocabulary") renderVocabularyView();
            else if (page === "tests") renderTestsView();
            else if (page === "quizzes") renderQuizzesView();
        });
    });

    function renderHomeView() {
        mainContent.innerHTML = `
            <section class="content-section active-content">
                <h2>${courseData.units[0].title}</h2>
                <p>${courseData.units[0].content}</p>
                <div class="note-box note-grammar">
                    <h4>Grammar Tip</h4>
                    <p>Use <strong>can + infinitive</strong> to express professional abilities.</p>
                </div>
            </section>
        `;
    }

    function renderVocabularyView() {
        let rows = courseData.vocabulary.map(v => `
            <tr><td>${v.term}</td><td>${v.unit}</td><td>${v.definition}</td></tr>
        `).join("");

        mainContent.innerHTML = `
            <h2>Course Vocabulary Glossary</h2>
            <p>Review key terms across your study modules.</p>
            <table class="vocab-table">
                <tr><th>Term</th><th>Unit</th><th>Definition</th></tr>
                ${rows}
            </table>
        `;
    }

    function renderTestsView() {
        mainContent.innerHTML = `
            <h2>Unit Tests</h2>
            <p>Standardized diagnostic and summative assessments.</p>
            <div class="accordion-item open">
                <div class="accordion-header"><span>Unit 1 Assessment</span></div>
                <div class="accordion-body"><p>Short answer and writing tasks for travel sector competency.</p></div>
            </div>
        `;
    }

    function renderQuizzesView() {
        mainContent.innerHTML = `
            <h2>Interactive Self-Check Quizzes</h2>
            <p>Test your knowledge with immediate feedback.</p>
            <div class="accordion-item open">
                <div class="accordion-header"><span>Unit 1 Quick Check</span></div>
                <div class="accordion-body">
                    <div class="quiz-question">What best defines tourism?</div>
                    <div class="quiz-options">
                        <label><input type="radio" name="q" value="wrong"> Moving permanently abroad.</label>
                        <label><input type="radio" name="q" value="right"> Short-term movement outside your normal home.</label>
                    </div>
                    <button class="check-btn" id="quiz-check">Check Answer</button>
                    <div class="feedback" id="quiz-feedback"></div>
                </div>
            </div>
        `;

        document.getElementById("quiz-check").addEventListener("click", () => {
            const selected = document.querySelector('input[type="radio"]:checked');
            const feedback = document.getElementById("quiz-feedback");
            if (!selected) {
                feedback.style.color = "#856404";
                feedback.textContent = "Please select an answer!";
                return;
            }
            if (selected.value === "right") {
                feedback.style.color = "#155724";
                feedback.textContent = "Correct! Great job.";
            } else {
                feedback.style.color = "#721c24";
                feedback.textContent = "Incorrect. Try again!";
            }
        });
    }
});
