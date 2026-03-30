// WedFlow - Application Logic

// Static Venue Data
const venues = [
    {
        id: 1,
        name: "Emerald Garden Estate",
        location: "Beverly Hills, CA",
        capacity: 300,
        contact: "+1 (555) 101-2020",
        image: "https://picsum.photos/seed/emerald/800/600",
        bookedDates: ["2026-06-12", "2026-06-13", "2026-07-04"]
    },
    {
        id: 2,
        name: "The Glass House",
        location: "Seattle, WA",
        capacity: 150,
        contact: "+1 (555) 303-4040",
        image: "https://picsum.photos/seed/glass/800/600",
        bookedDates: ["2026-05-20", "2026-05-21"]
    },
    {
        id: 3,
        name: "Vintage Oak Barn",
        location: "Nashville, TN",
        capacity: 200,
        contact: "+1 (555) 505-6060",
        image: "https://picsum.photos/seed/oak/800/600",
        bookedDates: ["2026-10-10", "2026-10-11"]
    },
    {
        id: 4,
        name: "Starlight Rooftop",
        location: "New York, NY",
        capacity: 100,
        contact: "+1 (555) 707-8080",
        image: "https://picsum.photos/seed/rooftop/800/600",
        bookedDates: ["2026-12-31"]
    },
    {
        id: 5,
        name: "Majestic Manor",
        location: "London, UK",
        capacity: 500,
        contact: "+44 20 7946 0000",
        image: "https://picsum.photos/seed/manor/800/600",
        bookedDates: ["2026-08-15"]
    },
    {
        id: 6,
        name: "Sunset Beach Resort",
        location: "Maui, HI",
        capacity: 250,
        contact: "+1 (555) 909-0000",
        image: "https://picsum.photos/seed/beach/800/600",
        bookedDates: ["2026-06-01", "2026-06-02"]
    }
];

// Navigation Logic
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');
const logo = document.getElementById('logo');

function navigateTo(pageId) {
    pages.forEach(page => {
        page.classList.add('hidden');
        if (page.id === `${pageId}-page`) {
            page.classList.remove('hidden');
        }
    });

    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    window.scrollTo(0, 0);
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateTo(pageId);
    });
});

logo.addEventListener('click', () => navigateTo('home'));

// Venue List Logic
const venueList = document.getElementById('venue-list');
const searchInput = document.getElementById('location-search');
const searchBtn = document.getElementById('search-btn');

function renderVenues(data = venues) {
    venueList.innerHTML = '';
    data.forEach(venue => {
        const card = document.createElement('div');
        card.className = 'venue-card';
        card.innerHTML = `
            <img src="${venue.image}" alt="${venue.name}">
            <div class="venue-info">
                <h3>${venue.name}</h3>
                <p>📍 ${venue.location}</p>
                <p>👥 Capacity: ${venue.capacity} guests</p>
                <button onclick="viewVenueDetails(${venue.id})">View Details</button>
            </div>
        `;
        venueList.appendChild(card);
    });
}

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = venues.filter(v => 
        v.location.toLowerCase().includes(query) || 
        v.name.toLowerCase().includes(query)
    );
    renderVenues(filtered);
});

// Venue Details Logic
const detailsPage = document.getElementById('details-page');
const venueDetailsContainer = document.getElementById('venue-details');
const backToVenuesBtn = document.getElementById('back-to-venues');

window.viewVenueDetails = function(id) {
    const venue = venues.find(v => v.id === id);
    if (!venue) return;

    pages.forEach(p => p.classList.add('hidden'));
    detailsPage.classList.remove('hidden');

    venueDetailsContainer.innerHTML = `
        <div class="details-container">
            <div class="details-image">
                <img src="${venue.image}" alt="${venue.name}">
            </div>
            <div class="details-info">
                <h2>${venue.name}</h2>
                <p><strong>Location:</strong> ${venue.location}</p>
                <p><strong>Capacity:</strong> ${venue.capacity} guests</p>
                <p><strong>Contact:</strong> ${venue.contact}</p>
                
                <div class="availability-box">
                    <h3>Check Availability</h3>
                    <div class="check-form">
                        <input type="date" id="check-date">
                        <button id="check-btn">Check Date</button>
                    </div>
                    <div id="status-msg" class="status-msg hidden"></div>
                </div>
            </div>
        </div>
    `;

    const checkBtn = document.getElementById('check-btn');
    const checkDate = document.getElementById('check-date');
    const statusMsg = document.getElementById('status-msg');

    checkBtn.addEventListener('click', () => {
        const date = checkDate.value;
        if (!date) return alert('Please select a date');

        statusMsg.classList.remove('hidden', 'available', 'booked');
        if (venue.bookedDates.includes(date)) {
            statusMsg.textContent = '❌ This date is already booked.';
            statusMsg.classList.add('booked');
        } else {
            statusMsg.textContent = '✅ This date is available!';
            statusMsg.classList.add('available');
        }
    });
};

backToVenuesBtn.addEventListener('click', () => navigateTo('venues'));

// Contact Form Logic
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Auth Page Logic
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');

function toggleAuthForm(mode) {
    if (mode === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
    } else {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        signupTab.classList.remove('active');
        loginTab.classList.add('active');
    }
}

if (loginTab) loginTab.addEventListener('click', () => toggleAuthForm('login'));
if (signupTab) signupTab.addEventListener('click', () => toggleAuthForm('signup'));
if (switchToSignup) switchToSignup.addEventListener('click', (e) => { e.preventDefault(); toggleAuthForm('signup'); });
if (switchToLogin) switchToLogin.addEventListener('click', (e) => { e.preventDefault(); toggleAuthForm('login'); });

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login successful! (Backend integration coming soon)');
        navigateTo('home');
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Account created successfully! (Backend integration coming soon)');
        navigateTo('home');
    });
}

// Initial Render
renderVenues();
navigateTo('home');
