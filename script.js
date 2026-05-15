const slides = document.querySelectorAll('.slide');

const dots = document.querySelectorAll('.dot');

const posters = document.querySelectorAll('.poster');

const carouselContainer = document.getElementById('carousel-container');

const prevBtn = document.getElementById('prevBtn');

const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;

let autoSlideInterval;

let startX = 0;

let isDragging = false;

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 3000);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
    });
});

posters.forEach((poster) => {
    poster.addEventListener('mouseenter', stopAutoSlide);
    poster.addEventListener('mouseleave', startAutoSlide);
});

const handleDragStart = (e) => {
    stopAutoSlide();
    isDragging = true;
    startX = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
};

const handleDragEnd = (e) => {
    if (!isDragging) return;
    const endX = (e.type === 'touchend') ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
    isDragging = false;
    startAutoSlide();
};

carouselContainer.addEventListener('touchstart', handleDragStart);

carouselContainer.addEventListener('touchend', handleDragEnd);

carouselContainer.addEventListener('mousedown', handleDragStart);

carouselContainer.addEventListener('mouseup', handleDragEnd);

startAutoSlide();

const subscribeForm = document.getElementById('subscribeForm');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('userName');
        const email = document.getElementById('userEmail');
        const pref = document.getElementById('recipePref');
        const nameErr = document.getElementById('nameError');
        const emailErr = document.getElementById('emailError');
        const prefErr = document.getElementById('prefError');
        let isValid = true;
        if (name.value.trim() === "") {
            nameErr.innerText = "Please enter your name.";
            isValid = false;
        } else {
            nameErr.innerText = "";
        }
        if (!email.value.includes("@")) {
            emailErr.innerText = "Invalid email format.";
            isValid = false;
        } else {
            emailErr.innerText = "";
        }
        if (pref.value === "") {
            prefErr.innerText = "Please select a preference.";
            isValid = false;
        } else {
            prefErr.innerText = "";
        }
        if (isValid) {
            alert("Subscription successful! Welcome to our culinary family.");
            subscribeForm.reset();
        }
    });
}

Vue.createApp({
    data() {
        return {
            searchQuery: '',
            selectedCategory: 'All',
            selectedRecipe: null,
            recipes: [
                {
                    id: 'steak',
                    name: 'Ribeye Steak',
                    image: 'assets/steak.jpg',
                    category: 'Meat',
                    time: '20 min',
                    ingredients: ['250g Ribeye', 'Coarse Salt', 'Black Pepper', 'Garlic', 'Butter', 'Rosemary'],
                    steps: ['Thaw steak and pat dry.', 'Season heavily.', 'Sear in hot skillet for 3m.', 'Baste with butter and herbs.', 'Rest for 5m.']
                },
                {
                    id: 'pasta',
                    name: 'Carbonara',
                    image: 'assets/pasta.jpg',
                    category: 'Carbs',
                    time: '15 min',
                    ingredients: ['Spaghetti', '2 Eggs', 'Guanciale', 'Pecorino', 'Black Pepper'],
                    steps: ['Boil pasta.', 'Fry guanciale.', 'Mix eggs and cheese.', 'Toss pasta off heat.', 'Stir in egg mixture.']
                },
                {
                    id: 'salad',
                    name: 'Caesar Salad',
                    image: 'assets/salad.jpg',
                    category: 'Vegetarian',
                    time: '10 min',
                    ingredients: ['Romaine', 'Parmesan', 'Croutons', 'Anchovies', 'Lemon', 'Olive Oil'],
                    steps: ['Chop romaine.', 'Prepare dressing.', 'Toss leaves.', 'Top with parmesan.', 'Serve fresh.']
                },
                {
                    id: 'soup',
                    name: 'Mushroom Soup',
                    image: 'assets/soup.webp',
                    category: 'Vegetarian',
                    time: '25 min',
                    ingredients: ['Mushrooms', 'Heavy Cream', 'Vegetable Broth', 'Onion', 'Garlic'],
                    steps: ['Sauté onion and garlic.', 'Add mushrooms.', 'Simmer with broth.', 'Blend smooth.', 'Add cream.']
                },
                {
                    id: 'dessert',
                    name: 'Tiramisu',
                    image: 'assets/dessert.jpg',
                    category: 'Sweet',
                    time: '40 min',
                    ingredients: ['Ladyfingers', 'Mascarpone', 'Espresso', 'Cocoa', 'Sugar'],
                    steps: ['Brew espresso.', 'Whisk mascarpone.', 'Dip ladyfingers.', 'Layer cookies.', 'Chill for 4h.']
                },
                {
                    id: 'kungpao',
                    name: 'Kung Pao Chicken',
                    image: 'assets/kungpao.jpg',
                    category: 'Meat',
                    time: '25 min',
                    ingredients: ['Chicken', 'Peanuts', 'Dried Chilies', 'Sichuan Pepper', 'Soy Sauce'],
                    steps: ['Marinate chicken.', 'Toast peanuts.', 'Sizzle chilies.', 'Stir-fry chicken.', 'Toss all.']
                },
                {
                    id: 'mapotofu',
                    name: 'Mapo Tofu',
                    image: 'assets/mapotofu.jpg',
                    category: 'Vegetarian',
                    time: '20 min',
                    ingredients: ['Soft Tofu', 'Chili Paste', 'Pepper', 'Garlic', 'Ginger'],
                    steps: ['Blanch tofu.', 'Fry ginger and paste.', 'Add broth and tofu.', 'Thicken with starch.', 'Garnish scallions.']
                },
                {
                    id: 'tomatoegg',
                    name: 'Tomato & Egg',
                    image: 'assets/tomatoegg.jpg',
                    category: 'Vegetarian',
                    time: '10 min',
                    ingredients: ['3 Eggs', '2 Tomatoes', 'Sugar', 'Salt', 'Spring Onion'],
                    steps: ['Scramble eggs.', 'Sauté tomatoes.', 'Simmer gravy.', 'Fold eggs back.', 'Serve hot.']
                },
                {
                    id: 'friedrice',
                    name: 'Yangzhou Fried Rice',
                    image: 'assets/friedrice.jpg',
                    category: 'Carbs',
                    time: '15 min',
                    ingredients: ['Overnight Rice', 'Eggs', 'Ham', 'Peas', 'Shrimp'],
                    steps: ['Break up rice.', 'Scramble eggs.', 'Stir-fry ingredients.', 'Add rice.', 'Toss thoroughly.']
                },
                {
                    id: 'sweetpork',
                    name: 'Sweet & Sour Pork',
                    image: 'assets/sweetpork.jpg',
                    category: 'Meat',
                    time: '35 min',
                    ingredients: ['Pork Loin', 'Pineapple', 'Bell Peppers', 'Ketchup', 'Vinegar'],
                    steps: ['Fry pork.', 'Make glaze.', 'Sauté fruit.', 'Toss pork in sauce.', 'Coat and serve.']
                }
            ]
        };
    },
    methods: {
        isMatch(recipe) {
            const s = this.searchQuery.toLowerCase();
            const n = recipe.name.toLowerCase();
            return n.indexOf(s) !== -1 && (this.selectedCategory === 'All' || recipe.category === this.selectedCategory);
        },
        getMatchCount() {
            let count = 0;
            for (let i = 0; i < this.recipes.length; i++) {
                if (this.isMatch(this.recipes[i])) {
                    count++;
                }
            }
            return count;
        },
        openModal(recipe) {
            this.selectedRecipe = recipe;
            document.body.style.overflow = 'hidden';
        },
        closeModal() {
            this.selectedRecipe = null;
            document.body.style.overflow = '';
        }
    }
}).mount('#vue-app');

/*
AI USE DISCLOSURE:
AI, with the help of Google Gemini, was used for following purposes:

Purpose 1: Generating ideas and content for the Culinary FAQ.
Where: In index.html (specifically within the #faq-section using the Bootstrap Accordion structure).
Why: We needed to populate our website with professional, realistic culinary questions 
(e.g., about steak cuts and mapo tofu). AI helped brainstorm and generate these questions and answers 
to save time on content writing.

Purpose 2: Understanding and fixing the Carousel auto-play bug.
Where: In script.js (specifically inside the startAutoSlide, stopAutoSlide functions, 
and button event listeners).
Why: Our image slider permanently stopped sliding automatically after a user clicked the navigation dots. 
We used AI to explain the logic of clearInterval() and how to correctly reset the JavaScript timer.

Purpose 3: Explaining how to fix image distortion in the recipe grid.
Where: In style.css (specifically the CSS rules for .card img).
Why: The recipe images we downloaded had different original dimensions, 
which caused our grid cards to stretch and break the layout. 
AI explained how to use aspect-ratio: 4/3 and object-fit: cover to force a uniform size.

Purpose 4: Generating layout concepts for the Hero Section.
Where: In index.html and style.css (the #welcome section at the top of the page).
Why: We struggled to integrate the required promo video attractively over our dark background. 
AI suggested a modern "Side-by-Side" layout idea, and we developed it using Bootstrap grid classes (col-lg-6).

Purpose 5: Understanding data structuring in Vue.js.
Where: In script.js (inside the data() method of Vue.createApp).
Why: We needed to learn how to correctly format complex data for 10 recipes 
(including nested arrays for ingredients and multi-step instructions) so it could be dynamically rendered 
using Vue's v-for directive.

Purpose 6: Explaining the logic for touch and swipe events.
Where: In script.js (the handleDragStart and handleDragEnd functions for the carousel).
Why: We wanted to add swipe functionality for mobile users, 
but we didn't understand how to capture screen coordinates 
and calculate swipe direction using JavaScript touchstart and touchend events.

Purpose 7: Understanding basic form validation logic.
Where: In script.js (inside the #subscribeForm submit event listener).
Why: We needed to understand how to validate user inputs before submission, 
specifically how to stop the page from reloading using e.preventDefault() and 
how to check if the email input includes an "@" symbol.

Purpose 8: Understanding dynamic Modal rendering with Vue.
Where: In index.html (the .vue-modal-content section) and script.js (openModal and closeModal methods).
Why: We wanted to optimize our code by replacing 10 hardcoded HTML modals with a single dynamic one. 
AI explained how to bind data to a selectedRecipe variable to switch modal content dynamically upon 
clicking a recipe card.
*/