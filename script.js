// Admin password (change this to your desired password)
const ADMIN_PASSWORD = "123456";

// Movie database - load from localStorage
let moviesDatabase = [];
let currentMovies = [];
let isAdminLoggedIn = false;

// Load movies from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadMoviesFromStorage();
    renderMovies(currentMovies);
    checkAdminStatus();
    
    // Enter key search
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchMovies();
        }
    });

    // Image URL preview
    document.getElementById('movieImageUrl').addEventListener('change', function() {
        if (this.value) {
            showImagePreview(this.value);
        }
    });
});

// Initialize sample movies
function initializeSampleMovies() {
    const sampleMovies = [
        {
            id: Date.now() + 1,
            title: "Inception",
            year: 2010,
            rating: "9.3/10",
            description: "A thief who steals secrets from people's dreams.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Inception"
        },
        {
            id: Date.now() + 2,
            title: "Interstellar",
            year: 2014,
            rating: "9.2/10",
            description: "Astronauts travel through a wormhole to save humanity.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Interstellar"
        },
        {
            id: Date.now() + 3,
            title: "The Matrix",
            year: 1999,
            rating: "8.7/10",
            description: "A programmer discovers the world is a simulated virtual reality.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Matrix"
        },
        {
            id: Date.now() + 4,
            title: "Farewell My Concubine",
            year: 1993,
            rating: "9.5/10",
            description: "Two Beijing opera artists' lives intertwined by passion.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Farewell"
        },
        {
            id: Date.now() + 5,
            title: "The Shawshank Redemption",
            year: 1994,
            rating: "9.6/10",
            description: "Two prison inmates develop a deep friendship and redemption.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Redemption"
        },
        {
            id: Date.now() + 6,
            title: "Titanic",
            year: 1997,
            rating: "8.9/10",
            description: "A love story between two passengers from different social classes.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Titanic"
        },
        {
            id: Date.now() + 7,
            title: "Avatar",
            year: 2009,
            rating: "8.8/10",
            description: "Humans invade Pandora and conflict with its inhabitants.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Avatar"
        },
        {
            id: Date.now() + 8,
            title: "Mad Max Fury Road",
            year: 2015,
            rating: "8.6/10",
            description: "An intense escape journey in a post-apocalyptic desert.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=MadMax"
        },
        {
            id: Date.now() + 9,
            title: "Fight Club",
            year: 1999,
            rating: "8.8/10",
            description: "A man joins a secret fighting organization.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=FightClub"
        },
        {
            id: Date.now() + 10,
            title: "The Curious Case of Benjamin Button",
            year: 2008,
            rating: "8.5/10",
            description: "A man who ages in reverse lives an extraordinary life.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Benjamin"
        },
        {
            id: Date.now() + 11,
            title: "Spirited Away",
            year: 2001,
            rating: "8.9/10",
            description: "A girl's adventure in a magical spirit world.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Spirited"
        },
        {
            id: Date.now() + 12,
            title: "Aquaman",
            year: 2018,
            rating: "8.2/10",
            description: "A half-human prince battles to save the ocean kingdom.",
            image: "https://via.placeholder.com/200x300/0a0e27/00d4ff?text=Aquaman"
        }
    ];
    return sampleMovies;
}

// Load movies from localStorage
function loadMoviesFromStorage() {
    const stored = localStorage.getItem('mhubMovies');
    if (stored) {
        moviesDatabase = JSON.parse(stored);
    } else {
        moviesDatabase = initializeSampleMovies();
        saveMoviesToStorage();
    }
    currentMovies = [...moviesDatabase];
}

// Save movies to localStorage
function saveMoviesToStorage() {
    localStorage.setItem('mhubMovies', JSON.stringify(moviesDatabase));
}

// Check admin login status
function checkAdminStatus() {
    isAdminLoggedIn = localStorage.getItem('mhubAdminLoggedIn') === 'true';
    updateAdminUI();
}

// Update admin UI based on login status
function updateAdminUI() {
    const adminBtn = document.getElementById('adminBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (isAdminLoggedIn) {
        adminBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        adminBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
}

// Toggle login modal
function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'flex';
        document.getElementById('loginForm').reset();
    } else {
        modal.style.display = 'none';
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        localStorage.setItem('mhubAdminLoggedIn', 'true');
        toggleLoginModal();
        updateAdminUI();
        alert('Login successful!');
        renderMovies(currentMovies);
    } else {
        alert('Incorrect password!');
        document.getElementById('adminPassword').value = '';
    }
}

// Logout
function logout() {
    isAdminLoggedIn = false;
    localStorage.setItem('mhubAdminLoggedIn', 'false');
    updateAdminUI();
    alert('Logged out!');
    renderMovies(currentMovies);
}

// Toggle movie modal
function toggleMovieModal() {
    const modal = document.getElementById('movieModal');
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'flex';
        document.getElementById('movieForm').reset();
        document.getElementById('movieId').value = '';
        document.getElementById('movieModalTitle').textContent = 'Add New Movie';
        document.getElementById('imagePreview').style.display = 'none';
    } else {
        modal.style.display = 'none';
    }
}

// Show image preview
function showImagePreview(imageSrc) {
    const preview = document.getElementById('imagePreview');
    const img = document.getElementById('previewImg');
    img.src = imageSrc;
    preview.style.display = 'block';
}

// Edit movie
function editMovie(movieId) {
    if (!isAdminLoggedIn) {
        alert('Please login first!');
        toggleLoginModal();
        return;
    }
    
    const movie = moviesDatabase.find(m => m.id === movieId);
    if (movie) {
        document.getElementById('movieId').value = movie.id;
        document.getElementById('movieTitle').value = movie.title;
        document.getElementById('movieYear').value = movie.year;
        document.getElementById('movieRating').value = movie.rating;
        document.getElementById('movieDescription').value = movie.description;
        document.getElementById('movieImageUrl').value = movie.image;
        document.getElementById('movieModalTitle').textContent = 'Edit Movie';
        
        if (movie.image) {
            showImagePreview(movie.image);
        }
        
        toggleMovieModal();
    }
}

// Save movie (add or edit)
function saveMovie(event) {
    event.preventDefault();
    
    if (!isAdminLoggedIn) {
        alert('Please login first!');
        return;
    }
    
    const movieId = document.getElementById('movieId').value;
    const title = document.getElementById('movieTitle').value;
    const year = parseInt(document.getElementById('movieYear').value);
    const rating = document.getElementById('movieRating').value;
    const description = document.getElementById('movieDescription').value;
    const imageUrl = document.getElementById('movieImageUrl').value;

    if (!title || !year || !rating || !description || !imageUrl) {
        alert('Please fill in all fields!');
        return;
    }

    if (movieId) {
        // Edit existing movie
        const movie = moviesDatabase.find(m => m.id == movieId);
        if (movie) {
            movie.title = title;
            movie.year = year;
            movie.rating = rating;
            movie.description = description;
            movie.image = imageUrl;
        }
    } else {
        // Add new movie
        const newMovie = {
            id: Date.now(),
            title: title,
            year: year,
            rating: rating,
            description: description,
            image: imageUrl
        };
        moviesDatabase.push(newMovie);
    }

    saveMoviesToStorage();
    alert('Movie saved successfully!');
    toggleMovieModal();
    
    currentMovies = [...moviesDatabase];
    renderMovies(currentMovies);
    document.getElementById('searchInput').value = '';
}

// Delete movie
function deleteMovie(movieId) {
    if (!isAdminLoggedIn) {
        alert('Please login first!');
        return;
    }
    
    if (confirm('Are you sure you want to delete this movie?')) {
        moviesDatabase = moviesDatabase.filter(m => m.id !== movieId);
        saveMoviesToStorage();
        searchMovies();
    }
}

// Render movie cards
function renderMovies(movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (movies.length === 0) {
        moviesGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    moviesGrid.innerHTML = movies.map(movie => {
        let actions = '';
        if (isAdminLoggedIn) {
            actions = `
                <div class="movie-actions">
                    <button class="edit-btn" onclick="editMovie(${movie.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteMovie(${movie.id})">Delete</button>
                </div>
            `;
        }
        
        return `
            <div class="movie-card" onclick="showMovieDetail(${movie.id})">
                <div class="movie-poster">
                    <img src="${movie.image}" alt="${movie.title}" onerror="this.style.display='none'">
                </div>
                <div class="movie-info">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-year">Year: ${movie.year}</div>
                    <div class="movie-rating">Rating: ${movie.rating}</div>
                    <div class="movie-description">${movie.description}</div>
                    ${actions}
                </div>
            </div>
        `;
    }).join('');
}

// Search movies
function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (searchTerm === '') {
        currentMovies = [...moviesDatabase];
    } else {
        currentMovies = moviesDatabase.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.description.toLowerCase().includes(searchTerm) ||
            movie.year.toString().includes(searchTerm)
        );
    }
    
    renderMovies(currentMovies);
}

// Show movie details
function showMovieDetail(movieId) {
    const movie = moviesDatabase.find(m => m.id === movieId);
    if (movie) {
        alert(`
Movie: ${movie.title}
Year: ${movie.year}
Rating: ${movie.rating}
Description: ${movie.description}
        `);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const movieModal = document.getElementById('movieModal');
    
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === movieModal) {
        movieModal.style.display = 'none';
    }
}

// Add button to show movie modal when logged in
document.addEventListener('DOMContentLoaded', function() {
    // This will be called after the admin status is checked
    // To add new movie button when admin is logged in
});
