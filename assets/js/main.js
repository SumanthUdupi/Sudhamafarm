const galleryConfig = {
            'bhubaneswar': [
                { src: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&amp;w=800', caption: 'Lingaraj Temple Spire' },
                { src: 'https://images.unsplash.com/photo-1599831168278-e56598c919d3?q=80&amp;w=800', caption: 'Udayagiri Monk Caves' },
                { src: 'https://images.unsplash.com/photo-1620766182578-02435699aa59?q=80&amp;w=800', caption: 'Tribal Art Details' }
            ],
            'shakti': [
                { src: 'https://images.unsplash.com/photo-1605330889276-80dc48464670?q=80&amp;w=800', caption: 'Streets of Cuttack' },
                { src: 'https://images.unsplash.com/photo-1621832174306-6953dc31215b?q=80&amp;w=800', caption: 'Temple Bells' }
            ],
            'konark': [
                { src: 'https://images.unsplash.com/photo-1591807353982-bfa33e83b4c6?q=80&amp;w=800', caption: 'The Wheel of Time' },
                { src: 'https://images.unsplash.com/photo-1621257406323-288219662b66?q=80&amp;w=800', caption: 'Stone Horses' },
                { src: 'https://images.unsplash.com/photo-1626101683262-654876b50e30?q=80&amp;w=800', caption: 'Architectural Detail' }
            ],
            'puri': [
                { src: 'https://images.unsplash.com/photo-1566804968393-27d9753c2289?q=80&amp;w=800', caption: 'The Grand Road (Bada Danda)' },
                { src: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&amp;w=800', caption: 'Pilgrimage' }
            ]
        };

        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 1000);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuOpenIcon = document.getElementById('menu-open-icon');
        const menuCloseIcon = document.getElementById('menu-close-icon');

        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            mobileMenu.setAttribute('aria-hidden', isExpanded);
            menuOpenIcon.classList.toggle('hidden', !isExpanded);
            menuCloseIcon.classList.toggle('hidden', isExpanded);
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('hidden');
                mobileMenu.setAttribute('aria-hidden', 'true');
                menuOpenIcon.classList.remove('hidden');
                menuCloseIcon.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });

        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            const progressBar = document.getElementById('progress-bar');

            // Navbar animation
            if(window.scrollY > 50) {
                nav.classList.add('bg-black/80', 'backdrop-blur-md', 'py-2');
                nav.classList.remove('py-4');
            } else {
                nav.classList.remove('bg-black/80', 'backdrop-blur-md', 'py-2');
                nav.classList.add('py-4');
            }

            // Progress bar
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        });

        const grid = document.getElementById('main-gallery-grid');
        let currentLightboxImages = [];
        let currentLightboxIndex = 0;

        function renderGallery(filter = 'all') {
            grid.innerHTML = '';
            let allImages = [];

            if (filter === 'all') {
                Object.keys(galleryConfig).forEach(key => allImages.push(...galleryConfig[key]));
            } else if (galleryConfig[filter]) {
                allImages = galleryConfig[filter];
            }

            allImages.forEach((img, index) => {
                const div = document.createElement('div');
                div.className = 'relative aspect-square overflow-hidden rounded-lg cursor-pointer group';
                div.innerHTML = `
                    <img src="${img.src}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                        <span class="text-white opacity-0 group-hover:opacity-100 font-display tracking-widest text-sm">${img.caption}</span>
                    </div>
                `;
                div.onclick = () => openLightbox(allImages, index);
                grid.appendChild(div);
            });
        }

        renderGallery();

        document.querySelectorAll('.gallery-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.gallery-filter.active').classList.remove('active');
                e.target.classList.add('active');
                renderGallery(e.target.dataset.filter);
            });
        });

        window.openGallery = function(category) {
            document.getElementById('gallery-section').scrollIntoView({ behavior: 'smooth' });
            const btn = document.querySelector(`.gallery-filter[data-filter="${category}"]`);
            if(btn) btn.click();
        };

        const lightbox = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        const lbCap = document.getElementById('lightbox-caption');

        function openLightbox(images, index) {
            currentLightboxImages = images;
            currentLightboxIndex = index;
            updateLightbox();
            lightbox.classList.remove('hidden');
            setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
            document.body.style.overflow = 'hidden';
        }

        function updateLightbox() {
            const img = currentLightboxImages[currentLightboxIndex];
            lbImg.src = img.src;
            lbCap.textContent = img.caption;
        }

        function closeLightbox() {
            lightbox.classList.add('opacity-0');
            setTimeout(() => lightbox.classList.add('hidden'), 300);
            document.body.style.overflow = '';
        }

        document.getElementById('lightbox-close').onclick = closeLightbox;
        document.getElementById('lightbox-next').onclick = (e) => {
            e.stopPropagation();
            currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
            updateLightbox();
        };
        document.getElementById('lightbox-prev').onclick = (e) => {
            e.stopPropagation();
            currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
            updateLightbox();
        };

        lightbox.onclick = (e) => {
            if(e.target === lightbox) closeLightbox();
        }

        document.querySelectorAll('.accordion-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !isExpanded);
                const content = document.getElementById(button.getAttribute('aria-controls'));
                content.classList.toggle('hidden');
                const icon = button.querySelector('svg');
                icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            });
        });

        // Map
        const map = L.map('leaflet-map').setView([20.2961, 85.8245], 9);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        const locations = [
            {lat: 20.254, lon: 85.841, title: 'Bhubaneswar'},
            {lat: 20.470, lon: 85.900, title: 'Cuttack'},
            {lat: 20.827, lon: 86.335, title: 'Jajpur'},
            {lat: 19.887, lon: 86.094, title: 'Konark'},
            {lat: 19.813, lon: 85.831, title: 'Puri'}
        ];

        locations.forEach(loc => {
            L.marker([loc.lat, loc.lon]).addTo(map)
                .bindPopup(loc.title);
        });