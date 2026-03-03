showTeacherArea();

let currentImageIndex = 0;
const images = [
    'highlight/1.jpg',
    'highlight/2.jpg',
    'highlight/3.jpg',
    'highlight/4.jpg',
    'highlight/5.jpg',
    'highlight/6.jpg',
    'highlight/7.jpg',
    'highlight/8.jpg',
    'highlight/9.jpg',
    'highlight/10.jpg',
    'highlight/11.jpg',
    'highlight/12.jpg',
    // ... add all image paths here ...
];

function setImage(index) {
    currentImageIndex = index;
    document.getElementById('modalImage').src = images[currentImageIndex];
}



function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Loop to last image
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Loop to first image
    }
    document.getElementById('modalImage').src = images[currentImageIndex];
}

const rows = document.querySelectorAll('.row.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Fade in
        } else {
            entry.target.classList.remove('visible'); // Fade out
        }
    });
}, { threshold: 0.1 }); // Adjust threshold as needed

rows.forEach(row => {
    observer.observe(row);
});

// Add event listener for keydown events
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        changeImage(-1); // Trigger changeImage for left arrow
    } else if (event.key === 'ArrowRight') {
        changeImage(1); // Trigger changeImage for right arrow
    }
});

// Reverse mapping: passcode to user ID
const passcodeToUser = {
    '001': '1',
    '002': '2',
    '003': '3',
    '004': '4',
    '005': '5',
    '006': '6',
    '007': '7',
    '008': '8',
    '009': '9',
    '010': '10',
    '011': '11',
    '012': '12',
    '013': '13',
    '014': '14',
    '015': '15',
    '016': '16',
    '017': '17',
    '018': '18',
    '019': '19',
    '020': '20',
    '021': '21'
};

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const passcode = document.getElementById('passcode').value.toUpperCase();
        const userId = passcodeToUser[passcode];

        if (userId) {
            // Store the user ID in localStorage
            localStorage.setItem('currentUserId', userId);

            // Hide the login button
            const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
            loginBtn.style.display = 'none';

            // Show logout button
            const logoutBtn = document.getElementById('logoutBtn');
            console.log('Current userId:', userId);
            if (logoutBtn && userId) {
                logoutBtn.style.display = 'block';
                console.log('Showing logout button');
            }

            // Add welcome message in place of the button
            const welcomeMsg = document.createElement('p');
            welcomeMsg.className = 'mt-5';
            welcomeMsg.innerHTML = `歡迎用戶 ID ${userId}`;
            loginBtn.parentNode.appendChild(welcomeMsg);


            // Show teacher area
            showTeacherArea();

        } else {
            alert('密碼錯誤！');
        }
    });
}

// Check login status when page loads
document.addEventListener('DOMContentLoaded', function () {
    const currentUserId = localStorage.getItem('currentUserId');
    console.log('Stored userId:', currentUserId);
    if (currentUserId) {
        // User is logged in, hide login button and show welcome message
        const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
        if (loginBtn) {
            loginBtn.style.display = 'none';

            const welcomeMsg = document.createElement('p');
            welcomeMsg.className = 'mt-5';
            welcomeMsg.innerHTML = `歡迎用戶 ID ${currentUserId}`;
            loginBtn.parentNode.appendChild(welcomeMsg);
        }

        // Show logout button
        const logoutBtn = document.getElementById('logoutBtn');
        const userIdDisplay = document.getElementById('userIdDisplay');
        if (logoutBtn && userIdDisplay) {
            userIdDisplay.classList.remove('d-none');
            userIdDisplay.textContent = `用戶: ${currentUserId}`;
            logoutBtn.style.display = 'block';
            console.log('Showing logout button on page load');
        }

    }
});

// Optional: Add a logout function
function logout() {
    localStorage.removeItem('currentUserId');
    location.reload(); // Refresh the page
}

// For classppt.html: change font size of focused or first visible textarea in the active lesson
function changeFontSize(delta) {
    const section = document.querySelector('.lesson-section[data-lesson-section]:not(.d-none)');
    if (!section) return;
    const active = document.activeElement;
    const textarea = (active && active.matches('textarea') && section.contains(active))
        ? active
        : section.querySelector('textarea.form-control');
    if (!textarea) return;
    const size = Math.max(12, Math.min(24, (parseInt(window.getComputedStyle(textarea).fontSize, 10) || 16) + delta));
    textarea.style.fontSize = size + 'px';
}

// For classppt.html: test Firebase (stub if not using)
function testFirebaseConnection() {
    if (typeof window.fbDb !== 'undefined') {
        try {
            console.log('Firebase DB reference:', window.fbDb);
            alert('Firebase 已連接');
        } catch (err) {
            console.error(err);
            alert('Firebase 連接失敗');
        }
    } else {
        alert('Firebase 未載入');
    }
}

const currentUserId = localStorage.getItem('currentUserId');

// After successful login and user ID verification
function showTeacherArea() {
    const currentUserId = localStorage.getItem('currentUserId');
    console.log("it is working!");
    if (currentUserId != "") {
        const teacherArea = document.getElementById('teacherArea');
        if (teacherArea) {
            teacherArea.classList.remove('d-none'); // Remove the 'd-none' class
        }
    }
}

// === Slide Show for classppt.html (no enlarge modal) ===
(function () {
    const slideCount = 23;
    const slideImages = Array.from({ length: slideCount }, (_, i) => `images/slides_lesson1/${i + 1}.jpg`);
    const slideImagesLesson1 = Array.from({ length: slideCount }, (_, i) => `images/slides_lesson1/${i + 1}.jpg`);
    let currentSlide = 0;

    function getVisibleSection() {
        return document.querySelector('.lesson-section[data-lesson-section]:not(.d-none)');
    }

    function getSlideImages(section) {
        const sectionNum = section ? section.getAttribute('data-lesson-section') : '';
        return sectionNum === '1' ? slideImagesLesson1 : slideImages;
    }

    function updateSlideInSection(section, idx) {
        if (!section) return;
        const img = section.querySelector('.js-slide-img');
        const numEl = section.querySelector('.js-slide-num');
        const images = getSlideImages(section);
        if (img) img.src = images[idx];
        if (numEl) numEl.textContent = `${idx + 1} / ${slideCount}`;
    }

    function showSlideInVisibleSection(idx) {
        currentSlide = idx;
        const section = getVisibleSection();
        if (section) updateSlideInSection(section, idx);
    }

    document.addEventListener('click', function (e) {
        const section = getVisibleSection();
        if (!section) return;

        const prevBtn = e.target.closest('.js-slide-prev');
        const nextBtn = e.target.closest('.js-slide-next');

        if (prevBtn && section.contains(prevBtn)) {
            e.preventDefault();
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlideInSection(section, currentSlide);
        } else if (nextBtn && section.contains(nextBtn)) {
            e.preventDefault();
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlideInSection(section, currentSlide);
        }
    });

    document.addEventListener('keydown', function (e) {
        const section = getVisibleSection();
        if (!section) return;
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        } else {
            currentSlide = (currentSlide + 1) % slideCount;
        }
        updateSlideInSection(section, currentSlide);
    });

    const tabsContainer = document.getElementById('lessonTabs');
    if (tabsContainer) {
        const section = getVisibleSection();
        if (section) showSlideInVisibleSection(0);
        document.addEventListener('lessonChanged', function () {
            const sec = getVisibleSection();
            if (sec) updateSlideInSection(sec, currentSlide);
        });
    }
})();

// === Lesson tab switching for classppt.html ===
(function () {
    const tabsContainer = document.getElementById('lessonTabs');
    if (!tabsContainer) {
        return;
    }

    const lessonSections = document.querySelectorAll('.lesson-section[data-lesson-section]');
    const sectionTitleEl = document.getElementById('sectionTitle');

    const titleMap = {
        '1': '第一課: 創造故事內容',
        '2': '第二課: 設計繪本內容',
        '3': '第三課: 繪本編寫概念',
        '4': '第四及五課: 繪本創作與整合'
    };

    function showLesson(lesson) {
        lessonSections.forEach(sec => {
            const isActive = sec.getAttribute('data-lesson-section') === lesson;
            sec.classList.toggle('d-none', !isActive);
        });

        const tabs = tabsContainer.querySelectorAll('[data-lesson]');
        tabs.forEach(tab => {
            const isActive = tab.getAttribute('data-lesson') === lesson;
            tab.classList.toggle('active', isActive);
        });

        if (sectionTitleEl) {
            const text = titleMap[lesson] || sectionTitleEl.textContent;
            sectionTitleEl.textContent = text;
            sectionTitleEl.classList.remove('d-none');
        }

        document.dispatchEvent(new CustomEvent('lessonChanged'));
    }

    tabsContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-lesson]');
        if (!btn) return;
        const lesson = btn.getAttribute('data-lesson');
        showLesson(lesson);
    });

    // Default to lesson 1
    showLesson('1');
})();

