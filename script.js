// Movies Data
const movies = [
    {
        id: 1,
        title: "Muhabbat Qotili",
        category: "drama",
        emoji: "💔",
        description: "Ota-ona sevgisining fojeasiga to'lgan qissasi va hayotning muhim darslari.",
        rating: 8.5,
        year: 2023,
        videoId: "dQw4w9WgXcQ"
    },
    {
        id: 2,
        title: "Javob Kuti",
        category: "drama",
        emoji: "🌧️",
        description: "Bitta oila ichidagi muammo va uni hal qilish uchun bo'lgan kurash.",
        rating: 8.2,
        year: 2022,
        videoId: "dQw4w9WgXcQ"
    },
    {
        id: 3,
        title: "Yer Kuni",
        category: "action",
        emoji: "💥",
        description: "Dunyoni qutqarish uchun jiyanlarning epik jangasi va jangovarlik.",
        rating: 8.8,
        year: 2024,
        videoId: "dQw4w9WgXcQ"
    },
    {
        id: 4,
        title: "Qaytilmas Misyon",
        category: "action",
        emoji: "🎯",
        description: "Jasur agent dunyoning eng xavfli teatrida o'zining oxirgi vazifasini bajaradi.",
        rating: 8.6,
        year: 2023,
        videoId: "dQw4w9WgXcQ"
    },
    {
        id: 5,
        title: "Xahqa Kulish",
        category: "comedy",
        emoji: "😂",
        description: "Ikkita do'st hayotni to'g'ri yo'lga qo'yish uchun ajab vaqiyalarni yasadi.",
        rating: 7.9,
        year: 2023,
        videoId: "dQw4w9WgXcQ"
    },
    {
        id: 6,
        title: "Baxti Tadbir",
        category: "comedy",
        emoji: "🎪",
        description: "Kichik shaharning eng baxtsiz oilasi hayotda eng katta o'zgaruvchilikni ko'radi.",
        rating: 8.1,
        year: 2024,
        videoId: "dQw4w9WgXcQ"
    }
];

// Initialize movies on page load
document.addEventListener('DOMContentLoaded', function() {
    displayMovies(movies);
});

// Display movies
function displayMovies(moviesToDisplay) {
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML = '';

    moviesToDisplay.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.dataset.category = movie.category;
        movieCard.style.cursor = 'pointer';
        movieCard.onclick = () => openMovieDetail(movie);
        movieCard.innerHTML = `
            <div class="movie-poster">
                ${movie.emoji}
                <div class="movie-overlay">
                    <button class="play-btn">▶</button>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <span class="movie-category">${getCategoryName(movie.category)}</span>
                <p class="movie-description">${movie.description}</p>
                <div class="movie-rating">
                    <span>⭐ ${movie.rating}</span>
                </div>
                <p class="movie-year">Yil: ${movie.year}</p>
            </div>
        `;
        moviesGrid.appendChild(movieCard);
    });
}

// Get category name in Uzbek
function getCategoryName(category) {
    const names = {
        'drama': 'Drama',
        'action': 'Jangari',
        'comedy': 'Komedia'
    };
    return names[category] || category;
}

// Filter movies by category
function filterMovies(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display movies
    if (category === 'all') {
        displayMovies(movies);
    } else {
        const filtered = movies.filter(movie => movie.category === category);
        displayMovies(filtered);
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        updateActiveNavLink(sectionId);
    }
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    
    // Show success message
    alert('Xabaring qabul qilindi! Tez orada biz sizga javob beramiz.');
    
    // Reset form
    form.reset();
}

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = ['home', 'movies', 'contact'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const rect = section.getBoundingClientRect();
        
        if (rect.top <= 100 && rect.bottom >= 100) {
            updateActiveNavLink(sectionId);
        }
    });
});

// Open movie detail modal
function openMovieDetail(movie) {
    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalCategory').textContent = getCategoryName(movie.category);
    document.getElementById('modalYear').textContent = 'Yil: ' + movie.year;
    document.getElementById('modalRating').textContent = '⭐ ' + movie.rating;
    document.getElementById('modalDescription').textContent = movie.description;
    
    const videoIframe = document.getElementById('movieVideo');
    videoIframe.src = `https://www.youtube.com/embed/${movie.videoId}?autoplay=1`;
    
    document.getElementById('movieModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    const videoIframe = document.getElementById('movieVideo');
    videoIframe.src = '';
}

// Play movie
function playMovie() {
    const videoIframe = document.getElementById('movieVideo');
    if (videoIframe.src) {
        videoIframe.src = videoIframe.src.replace('autoplay=0', 'autoplay=1');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('movieModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
