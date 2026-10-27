// Protect Your Crown — Application logic
const STORAGE = {
  lang: 'pyc_lang',
  cart: 'pyc_cart',
  cookies: 'pyc_cookies',
  placeholders: 'pyc_placeholders',
};

const VALID_PAGES = ['accueil', 'prestations', 'boutique', 'apropos', 'contact', 'mentions'];

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE.cart);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((i) => i && i.id && i.qty > 0) : [];
  } catch {
    return [];
  }
}

function persistCart() {
  try {
    localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
  } catch (_) {}
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let currentLang = localStorage.getItem(STORAGE.lang) === 'fr' ? 'fr' : 'en';
let cart = loadCart();
let activeServiceFilter = 'all';
let activeProductFilter = 'all';

        /* ----------------------------------------------------------
           4. LANGUAGE SWITCHER (EN-US Default / FR Secondary)
           ---------------------------------------------------------- */
        function setLanguage(lang) {
            if (!I18N[lang]) return;
            currentLang = lang;
            try { localStorage.setItem(STORAGE.lang, lang); } catch (_) {}
            document.documentElement.lang = lang === 'en' ? 'en-US' : 'fr';

            // Update language switcher buttons
            document.querySelectorAll('[data-lang-btn]').forEach(btn => {
                if (btn.dataset.langBtn === lang) {
                    btn.classList.add('is-active');
                } else {
                    btn.classList.remove('is-active');
                }
            });

            // Translate all static DOM nodes with data-i18n
            const dict = I18N[lang];
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) {
                    el.innerHTML = dict[key];
                }
            });

            // Update preview mode button label
            const previewBtn = document.getElementById('toggle-placeholder-btn');
            if (previewBtn) {
                previewBtn.textContent = document.body.classList.contains('hide-placeholders')
                    ? dict['preview.hidden']
                    : dict['preview.visible'];
            }

            // Re-render dynamic grids & bag in selected language
            renderServices(activeServiceFilter);
            renderProducts(activeProductFilter);
            updateCartUI();

            setTimeout(() => {
                updateSlidingTabIndicator('service-tabs-nav', 'service-tab-indicator');
                updateSlidingTabIndicator('product-tabs-nav', 'product-tab-indicator');
            }, 40);
        }

        /* ----------------------------------------------------------
           5. SLIDING TAB INDICATOR
           ---------------------------------------------------------- */
        function updateSlidingTabIndicator(navId, indicatorId) {
            const nav = document.getElementById(navId);
            const indicator = document.getElementById(indicatorId);
            if (!nav || !indicator) return;
            const activeTab = nav.querySelector('.editorial-tab.is-active');
            if (!activeTab) return;

            indicator.style.width = `${activeTab.offsetWidth}px`;
            indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
        }

        /* ----------------------------------------------------------
           6. RENDER SERVICES & PRODUCTS
           ---------------------------------------------------------- */
        function renderServices(filter = 'all') {
            activeServiceFilter = filter;
            const grid = document.getElementById('services-grid');
            if (!grid) return;

            const filtered = filter === 'all' 
                ? SERVICES_DATA 
                : SERVICES_DATA.filter(s => s.category === filter);

            grid.innerHTML = filtered.map((service, idx) => {
                const t = service[currentLang];
                return `
                <article class="editorial-card flex flex-col justify-between group reveal-on-scroll is-visible" style="animation: pageReveal 0.65s cubic-bezier(0.19, 1, 0.22, 1) ${idx * 90}ms backwards;">
                    <div>
                        <div class="editorial-img-wrap h-64 bg-forest">
                            <img src="${service.image}" alt="${t.title}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x450/0F291E/C5A059?text=Crown+Service'">
                            <span class="absolute top-4 left-4 bg-forest/95 text-gold-light text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border border-gold/30">
                                ${t.categoryLabel}
                            </span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="font-serif text-2xl text-forest font-medium group-hover:text-gold-dark transition-colors">${t.title}</h3>
                            <p class="text-sm text-charcoal/75 leading-relaxed">${t.description}</p>
                            <div class="flex flex-wrap gap-2 pt-3">
                                <span class="placeholder-tag">${t.durationPlaceholder}</span>
                                <span class="placeholder-tag">${t.pricePlaceholder}</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-8 pt-0">
                        <button onclick="openBookingModal('${t.title.replace(/'/g, "\\'")}')" class="w-full btn-editorial-primary py-3.5 px-5">
                            <span>${t.bookBtn}</span>
                            <span class="arrow-glide text-gold-light">
                                <svg class="arrow-first" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                                <svg class="arrow-second" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                            </span>
                        </button>
                    </div>
                </article>
            `}).join('');
        }

        function filterServices(category) {
            document.querySelectorAll('.service-filter-btn').forEach(btn => {
                if (btn.dataset.serviceFilter === category) {
                    btn.classList.add('is-active');
                } else {
                    btn.classList.remove('is-active');
                }
            });
            updateSlidingTabIndicator('service-tabs-nav', 'service-tab-indicator');
            renderServices(category);
        }

        function renderProducts(filter = 'all') {
            activeProductFilter = filter;
            const grid = document.getElementById('products-grid');
            if (!grid) return;

            const filtered = filter === 'all'
                ? PRODUCTS_DATA
                : PRODUCTS_DATA.filter(p => p.category === filter);

            grid.innerHTML = filtered.map((product, idx) => {
                const t = product[currentLang];
                return `
                <article class="editorial-card flex flex-col justify-between group reveal-on-scroll is-visible" style="animation: pageReveal 0.65s cubic-bezier(0.19, 1, 0.22, 1) ${idx * 90}ms backwards;">
                    <div>
                        <div class="editorial-img-wrap h-72 bg-forest">
                            <img src="${product.image}" alt="${t.name}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x500/0F291E/C5A059?text=Crown+Elixir'">
                            <span class="absolute top-4 left-4 bg-forest/95 text-gold-light text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border border-gold/30">
                                ${t.categoryLabel}
                            </span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="font-serif text-2xl text-forest font-medium group-hover:text-gold-dark transition-colors">${t.name}</h3>
                            <p class="text-sm text-charcoal/75 leading-relaxed">${t.description}</p>
                            <div class="flex flex-wrap gap-2 pt-3">
                                <span class="placeholder-tag">${t.formatPlaceholder}</span>
                                <span class="placeholder-tag">${t.pricePlaceholder}</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-8 pt-0 grid grid-cols-2 gap-3">
                        <button onclick="addToCart('${product.id}', false)" class="btn-editorial-outline text-forest py-3.5 px-3">
                            <span>${t.addBtn}</span>
                        </button>
                        <button onclick="addToCart('${product.id}', true)" class="btn-editorial-primary py-3.5 px-3">
                            <span>${t.buyBtn}</span>
                            <span class="arrow-glide text-gold-light">
                                <svg class="arrow-first" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                                <svg class="arrow-second" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                            </span>
                        </button>
                    </div>
                </article>
            `}).join('');
        }

        function filterProducts(category) {
            document.querySelectorAll('.product-filter-btn').forEach(btn => {
                if (btn.dataset.productFilter === category) {
                    btn.classList.add('is-active');
                } else {
                    btn.classList.remove('is-active');
                }
            });
            updateSlidingTabIndicator('product-tabs-nav', 'product-tab-indicator');
            renderProducts(category);
        }

        /* ----------------------------------------------------------
           7. SHOPPING BAG & ORDER INQUIRY
           ---------------------------------------------------------- */
        function addToCart(productId, openImmediately = false) {
            const product = PRODUCTS_DATA.find(p => p.id === productId);
            if (!product) return;

            const existing = cart.find(item => item.id === productId);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ id: product.id, qty: 1 });
            }

            persistCart();
            updateCartUI();
            const prodTitle = product[currentLang].name;
            if (openImmediately) {
                toggleCartDrawer(true);
                showCheckoutForm();
            } else {
                const msg = currentLang === 'en'
                    ? `“${prodTitle}” added to your selection.`
                    : `« ${prodTitle} » ajouté à votre sélection.`;
                showToast(msg);
            }
        }

        function updateCartQuantity(productId, delta) {
            const index = cart.findIndex(item => item.id === productId);
            if (index === -1) return;

            cart[index].qty += delta;
            if (cart[index].qty <= 0) {
                cart.splice(index, 1);
            }
            persistCart();
            updateCartUI();
        }

        function updateCartUI() {
            const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
            const badge = document.getElementById('cart-badge');
            const badgeMobile = document.getElementById('cart-badge-mobile');
            if (badge) badge.textContent = totalItems;
            if (badgeMobile) badgeMobile.textContent = totalItems;

            const container = document.getElementById('cart-items-container');
            const proceedBtn = document.getElementById('proceed-checkout-btn');
            const checkoutForm = document.getElementById('checkout-form');
            const dict = I18N[currentLang];

            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12 space-y-3">
                        <p class="font-serif text-2xl text-forest">${dict['bag.emptyTitle']}</p>
                        <p class="text-xs text-charcoal/70">${dict['bag.emptySub']}</p>
                    </div>
                `;
                proceedBtn.classList.add('hidden');
                checkoutForm.classList.add('hidden');
                return;
            }

            proceedBtn.classList.remove('hidden');
            container.innerHTML = cart.map(cartItem => {
                const product = PRODUCTS_DATA.find(p => p.id === cartItem.id);
                const t = product[currentLang];
                return `
                <div class="flex items-center gap-4 p-3.5 rounded-[2px] bg-white border gold-border">
                    <img src="${product.image}" alt="${t.name}" class="w-16 h-16 rounded-[2px] object-cover bg-forest shrink-0">
                    <div class="flex-grow">
                        <h4 class="font-serif text-lg text-forest leading-snug">${t.name}</h4>
                        <span class="placeholder-tag mt-1">${t.pricePlaceholder}</span>
                        <div class="flex items-center gap-3 mt-2">
                            <button onclick="updateCartQuantity('${product.id}', -1)" class="w-6 h-6 rounded-[2px] bg-ivory-warm text-forest text-xs font-bold active:scale-[0.985]">-</button>
                            <span class="text-xs font-semibold">${cartItem.qty}</span>
                            <button onclick="updateCartQuantity('${product.id}', 1)" class="w-6 h-6 rounded-[2px] bg-ivory-warm text-forest text-xs font-bold active:scale-[0.985]">+</button>
                        </div>
                    </div>
                </div>
            `}).join('');
        }

        function toggleCartDrawer(show) {
            const drawer = document.getElementById('cart-drawer');
            if (show) {
                drawer.classList.remove('hidden');
                document.getElementById('order-feedback').classList.add('hidden');
            } else {
                drawer.classList.add('hidden');
            }
        }

        function showCheckoutForm() {
            if (cart.length === 0) return;
            document.getElementById('checkout-form').classList.remove('hidden');
            document.getElementById('proceed-checkout-btn').classList.add('hidden');
        }

        function handleOrderSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('order-name').value.trim();
            const email = document.getElementById('order-email').value.trim();
            const feedback = document.getElementById('order-feedback');

            const safeName = escapeHtml(name);
            const safeEmail = escapeHtml(email);
            if (currentLang === 'en') {
                feedback.innerHTML = `
                    <p class="font-serif text-lg text-gold-light mb-1">Order Inquiry Received</p>
                    <p class="text-xs text-ivory/90 leading-relaxed">
                        Thank you, <strong>${safeName}</strong>. Your selection has been recorded. Once the apothecary catalog is finalized, we will email <strong>${safeEmail}</strong> with confirmed pricing and your secure checkout link.
                    </p>
                `;
            } else {
                feedback.innerHTML = `
                    <p class="font-serif text-lg text-gold-light mb-1">Demande de commande enregistrée</p>
                    <p class="text-xs text-ivory/90 leading-relaxed">
                        Merci <strong>${safeName}</strong>. Votre sélection a bien été préparée. Dès la validation finale du catalogue, vous recevrez à l’adresse <strong>${safeEmail}</strong> les détails tarifaires et le lien de paiement sécurisé.
                    </p>
                `;
            }
            feedback.classList.remove('hidden');
            cart = [];
            persistCart();
            updateCartUI();
            e.target.reset();
        }

        /* ----------------------------------------------------------
           8. SPA NAVIGATION & MODAL FORMS
           ---------------------------------------------------------- */
        function navigateTo(pageId, options = {}) {
            const { updateHash = true, smooth = true } = options;
            if (!VALID_PAGES.includes(pageId)) pageId = 'accueil';

            document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
            const target = document.getElementById(`page-${pageId}`);
            if (target) target.classList.add('active');

            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.dataset.nav === pageId) {
                    link.classList.add('is-active', 'text-forest');
                    link.classList.remove('text-charcoal/70');
                } else {
                    link.classList.remove('is-active', 'text-forest');
                    link.classList.add('text-charcoal/70');
                }
            });

            if (updateHash) {
                const nextHash = `#${pageId}`;
                if (location.hash !== nextHash) {
                    history.replaceState(null, '', nextHash);
                }
            }

            window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });

            setTimeout(() => {
                updateSlidingTabIndicator('service-tabs-nav', 'service-tab-indicator');
                updateSlidingTabIndicator('product-tabs-nav', 'product-tab-indicator');
                observeScrollElements();
            }, 60);
        }

        function pageFromHash() {
            const hash = (location.hash || '#accueil').replace(/^#/, '').split('?')[0];
            return VALID_PAGES.includes(hash) ? hash : 'accueil';
        }

        function toggleMobileMenu() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        }

        function openBookingModal(preselectedService) {
            const modal = document.getElementById('booking-modal');
            const serviceInput = document.getElementById('booking-service');
            const feedback = document.getElementById('booking-feedback');
            const defaultLabel = currentLang === 'en'
                ? 'Knotless Braids / Protective Styling Consultation'
                : 'Consultation Knotless Braids & Coiffure Protectrice';
            if (serviceInput) serviceInput.value = preselectedService || defaultLabel;
            if (feedback) feedback.classList.add('hidden');
            modal.classList.remove('hidden');
        }

        function closeBookingModal() {
            document.getElementById('booking-modal').classList.add('hidden');
        }

        function handleBookingSubmit(e) {
            e.preventDefault();
            const service = document.getElementById('booking-service').value.trim();
            const date = document.getElementById('booking-date').value;
            const slot = document.getElementById('booking-slot').value;
            const name = document.getElementById('booking-name').value.trim();
            const feedback = document.getElementById('booking-feedback');

            feedback.className = 'p-4 rounded-[2px] bg-forest text-ivory border border-gold/40 text-xs leading-relaxed';
            if (currentLang === 'en') {
                feedback.innerHTML = `
                    <strong class="text-gold-light block font-serif text-base mb-1">Appointment Request Recorded</strong>
                    Thank you, <strong>${name}</strong>. Your request for <em>“${service}”</em> (${date} — ${slot}) has been received. Protect Your Crown Beauty.Co will reach out to confirm your slot and bespoke quote.
                `;
            } else {
                feedback.innerHTML = `
                    <strong class="text-gold-light block font-serif text-base mb-1">Demande de créneau enregistrée</strong>
                    Merci <strong>${name}</strong>. Votre souhait de rendez-vous pour <em>« ${service} »</em> (${date} — ${slot}) est bien pris en compte. L’équipe Protect Your Crown Beauty.Co vous recontactera pour confirmer l’horaire et le devis.
                `;
            }
            feedback.classList.remove('hidden');
            e.target.reset();
            document.getElementById('booking-service').value = service;
        }

        function handleContactSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value.trim();
            const consent = document.getElementById('contact-consent').checked;
            const feedback = document.getElementById('contact-feedback');

            if (!name || !email || !subject || !message || !consent) {
                feedback.className = 'p-4 rounded-[2px] bg-ivory-warm border-l-2 border-gold text-forest text-xs';
                feedback.textContent = currentLang === 'en'
                    ? 'Please complete all required fields (*) and accept the privacy policy.'
                    : 'Veuillez renseigner tous les champs obligatoires (*) et accepter la politique de confidentialité.';
                feedback.classList.remove('hidden');
                return;
            }

            feedback.className = 'p-4 rounded-[2px] bg-forest text-ivory border border-gold/40 text-xs leading-relaxed';
            feedback.innerHTML = currentLang === 'en'
                ? `<strong class="text-gold-light block font-serif text-base mb-1">Inquiry Sent Successfully</strong>Thank you, <strong>${name}</strong>. We have received your message regarding <em>“${subject}”</em> and will reply at <strong>${email}</strong>.`
                : `<strong class="text-gold-light block font-serif text-base mb-1">Message transmis avec succès</strong>Merci <strong>${name}</strong>. Votre demande concernant <em>« ${subject} »</em> a bien été enregistrée. Nous vous répondrons à l’adresse <strong>${email}</strong>.`;
            feedback.classList.remove('hidden');
            e.target.reset();
        }

        function openCookieBanner() {
            document.getElementById('cookie-banner').classList.remove('hidden');
        }

        function saveCookieChoice(choice) {
            document.getElementById('cookie-banner').classList.add('hidden');
            try { localStorage.setItem(STORAGE.cookies, choice); } catch (_) {}
            if (currentLang === 'en') {
                showToast(choice === 'accepted' ? 'Cookie preferences saved.' : 'Essential cookies only enabled.');
            } else {
                showToast(choice === 'accepted' ? 'Préférences de cookies enregistrées.' : 'Seuls les cookies essentiels sont activés.');
            }
        }

        function maybeShowCookieBanner() {
            const banner = document.getElementById('cookie-banner');
            if (!banner) return;
            const saved = localStorage.getItem(STORAGE.cookies);
            if (!saved) banner.classList.remove('hidden');
        }

        function showToast(message) {
            const toast = document.getElementById('toast-notification');
            const text = document.getElementById('toast-message');
            text.textContent = message;
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 3400);
        }

        function toggleEditorialPlaceholders() {
            document.body.classList.toggle('hide-placeholders');
            const hidden = document.body.classList.contains('hide-placeholders');
            try { localStorage.setItem(STORAGE.placeholders, hidden ? 'hidden' : 'visible'); } catch (_) {}
            const btn = document.getElementById('toggle-placeholder-btn');
            const dict = I18N[currentLang];
            btn.textContent = hidden ? dict['preview.hidden'] : dict['preview.visible'];
        }

        /* Scroll Reveal Observer */
        let scrollObserver = null;
        function observeScrollElements() {
            const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
            if (!('IntersectionObserver' in window)) {
                elements.forEach(el => el.classList.add('is-visible'));
                return;
            }
            if (!scrollObserver) {
                scrollObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            scrollObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            }
            elements.forEach(el => scrollObserver.observe(el));
        }

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            const progressBar = document.getElementById('scroll-progress');
            if (progressBar) progressBar.style.width = `${progress}%`;

            const headerInner = document.getElementById('header-inner');
            if (headerInner) {
                if (scrollTop > 40) {
                    headerInner.classList.remove('h-24');
                    headerInner.classList.add('h-16', 'is-compact');
                } else {
                    headerInner.classList.add('h-24');
                    headerInner.classList.remove('h-16', 'is-compact');
                }
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            updateSlidingTabIndicator('service-tabs-nav', 'service-tab-indicator');
            updateSlidingTabIndicator('product-tabs-nav', 'product-tab-indicator');
        });

        window.addEventListener('hashchange', () => {
            navigateTo(pageFromHash(), { updateHash: false, smooth: false });
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleCartDrawer(false);
                const modal = document.getElementById('booking-modal');
                if (modal && !modal.classList.contains('hidden')) {
                    closeBookingModal();
                }
                const menu = document.getElementById('mobile-menu');
                if (menu && !menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                }
            }
        });

        window.addEventListener('DOMContentLoaded', () => {
            const yearEl = document.getElementById('current-year');
            if (yearEl) yearEl.textContent = new Date().getFullYear();

            if (localStorage.getItem(STORAGE.placeholders) === 'hidden') {
                document.body.classList.add('hide-placeholders');
            }

            setLanguage(currentLang);
            navigateTo(pageFromHash(), { updateHash: true, smooth: false });
            updateCartUI();
            maybeShowCookieBanner();
            observeScrollElements();

            setTimeout(() => {
                updateSlidingTabIndicator('service-tabs-nav', 'service-tab-indicator');
                updateSlidingTabIndicator('product-tabs-nav', 'product-tab-indicator');
            }, 100);
        });

