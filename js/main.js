// Main application functionality

// Load featured bikes on homepage
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('featuredBikes')) {
        loadFeaturedBikes();
    }
    
    // Check if user is logged in
    updateAuthState();
});

// Load 3 random featured bikes
function loadFeaturedBikes() {
    fetch('data/bikes.json')
        .then(response => response.json())
        .then(data => {
            // Get 3 random bikes
            const featured = [];
            const bikes = [...data];
            
            for (let i = 0; i < 3 && bikes.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * bikes.length);
                featured.push(bikes[randomIndex]);
                bikes.splice(randomIndex, 1);
            }
            
            // Display featured bikes
            const container = document.getElementById('featuredBikes');
            featured.forEach(bike => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
                    <div class="card h-100 bike-card">
                        <div class="card-img-top position-relative">
                            <img src="${bike.imageUrl}" class="card-img-top" alt="${bike.brand} ${bike.model}">
                            ${bike.isAvailable ? '<span class="badge bg-success position-absolute top-0 end-0 m-2">Available</span>' : ''}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${bike.brand} ${bike.model}</h5>
                            <div class="bike-specs mb-2">
                                <span class="badge bg-secondary me-1">${bike.type}</span>
                                <span class="badge bg-secondary me-1">${bike.engine} CC</span>
                                <span class="badge bg-secondary">${bike.mileage} kmpl</span>
                            </div>
                            <div class="bike-pricing mb-3">
                                <h6 class="mb-0">₹${bike.pricePerDay} <small class="text-muted">/ day</small></h6>
                                <small class="text-muted">₹${bike.pricePerHour} per hour</small>
                            </div>
                            <div class="bike-location">
                                <small class="text-muted"><i class="bi bi-geo-alt"></i> ${bike.location}</small>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent">
                            <a href="bike-details.html?id=${bike.id}" class="btn btn-primary w-100">View Details</a>
                        </div>
                    </div>
                `;
                container.appendChild(col);
            });
        });
}

// Update UI based on authentication state
function updateAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.querySelectorAll('.auth-buttons');
    
    if (authButtons.length > 0) {
        if (currentUser) {
            authButtons.forEach(container => {
                container.innerHTML = `
                    <div class="dropdown">
                        <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle me-1"></i> ${currentUser.name}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="bookings.html">My Bookings</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><button class="dropdown-item" id="logoutBtn">Logout</button></li>
                        </ul>
                    </div>
                `;
                
                // Add logout handler
                document.getElementById('logoutBtn').addEventListener('click', logout);
            });
        } else {
            authButtons.forEach(container => {
                container.innerHTML = `
                    <button class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#authModal">Login</button>
                    <a href="admin.html" class="btn btn-primary">Admin</a>
                `;
            });
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    updateAuthState();
    window.location.href = 'index.html';
}

// Make functions available globally
window.updateAuthState = updateAuthState;
window.logout = logout;