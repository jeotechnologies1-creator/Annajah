const properties = [
  {
    id: 1,
    title: 'Luxury 5-Bedroom Duplex',
    price: '₦85,000,000',
    location: 'Karmo, Abuja FCT',
    type: 'sale',
    category: 'residential',
    beds: 5,
    baths: 6,
    area: '450 sqm',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop',
    description: 'Stunning modern duplex with premium finishes, smart home features, and a private compound in the serene Karmo district.'
  },
  {
    id: 2,
    title: 'Executive 3-Bedroom Apartment',
    price: '₦2,500,000/year',
    location: 'Abeokuta, Ogun State',
    type: 'rent',
    category: 'residential',
    beds: 3,
    baths: 3,
    area: '200 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop',
    description: 'Spacious apartment in a secure estate with 24/7 power, swimming pool, and gym access. Perfect for families.'
  },
  {
    id: 3,
    title: 'Prime Residential Land',
    price: '₦15,000,000',
    location: 'Ibadan, Oyo State',
    type: 'land',
    category: 'land',
    beds: 0,
    baths: 0,
    area: '600 sqm',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
    description: 'Dry, fenced land with C of O in a fast-developing neighborhood. Ready for immediate construction.'
  },
  {
    id: 4,
    title: 'Modern Office Complex',
    price: '₦120,000,000',
    location: 'Lagos Island, Lagos',
    type: 'sale',
    category: 'commercial',
    beds: 0,
    baths: 8,
    area: '800 sqm',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
    description: 'Premium office building with elevator, parking, and conference facilities in Lagos business district.'
  },
  {
    id: 5,
    title: '4-Bedroom Bungalow',
    price: '₦45,000,000',
    location: 'Ilorin, Kwara State',
    type: 'sale',
    category: 'residential',
    beds: 4,
    baths: 4,
    area: '350 sqm',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=500&fit=crop',
    description: 'Beautifully designed bungalow with spacious rooms, modern kitchen, and landscaped garden.'
  },
  {
    id: 6,
    title: 'Shopping Plaza Units',
    price: '₦1,800,000/year',
    location: 'Kaduna, Kaduna State',
    type: 'rent',
    category: 'commercial',
    beds: 0,
    baths: 2,
    area: '120 sqm',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
    description: 'Retail spaces in a busy shopping plaza with high foot traffic and ample parking.'
  }
];

const testimonials = [
  {
    text: 'ANNAJAAH BEST END made my dream of owning a home in Abeokuta a reality. Their team handled everything from property search to documentation. Professional, transparent, and truly caring.',
    name: 'Mrs. Adebayo Funmilayo',
    role: 'Homeowner, Abeokuta',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    text: "I've worked with many agents, but none compare to ANNAJAAH. They found me the perfect commercial property in Abuja and the returns have been excellent. Highly recommended!",
    name: 'Alhaji Ibrahim Musa',
    role: 'Business Owner, Abuja',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  },
  {
    text: 'The construction team built our family home in record time without compromising quality. Every detail was perfect, and they stayed within budget. Thank you ANNAJAAH!',
    name: 'Dr. Oluwaseun Adeyemi',
    role: 'Homeowner, Ibadan',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  },
  {
    text: 'Their property management service has been a game-changer. My rental properties in Lagos are always occupied, well-maintained, and I receive detailed reports monthly.',
    name: 'Chief Mrs. Ngozi Okonkwo',
    role: 'Property Investor, Lagos',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
  }
];

let currentTestimonial = 0;
let currentFilter = 'all';
const CHAIRMAN_PASSWORD = 'ANNAJAAH2026';

const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const propertiesGrid = document.getElementById('propertiesGrid');

function setupEventListeners() {
  window.addEventListener('scroll', handleScroll);

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  mobileNavOverlay.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderProperties();
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.getElementById('propertyModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  const propertyAdminModal = document.getElementById('propertyAdminModal');
  if (propertyAdminModal) {
    propertyAdminModal.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closePropertyAdmin();
    });
  }

  const adminAccessModal = document.getElementById('adminAccessModal');
  if (adminAccessModal) {
    adminAccessModal.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeAdminAccessGate();
    });
  }

  const openPropertyAdminBtn = document.getElementById('openPropertyAdmin');
  if (openPropertyAdminBtn) {
    openPropertyAdminBtn.addEventListener('click', openAdminAccessGate);
  }

  const closePropertyAdminBtn = document.getElementById('closePropertyAdmin');
  if (closePropertyAdminBtn) {
    closePropertyAdminBtn.addEventListener('click', closePropertyAdmin);
  }

  const adminAccessForm = document.getElementById('adminAccessForm');
  if (adminAccessForm) {
    adminAccessForm.addEventListener('submit', handleChairmanAccess);
  }

  const propertyForm = document.getElementById('propertyForm');
  if (propertyForm) {
    propertyForm.addEventListener('submit', handlePropertyFormSubmit);
    propertyForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', updatePropertyPreview);
      field.addEventListener('change', updatePropertyPreview);
    });
  }

  const propertyImageUpload = document.getElementById('propertyImageUpload');
  const propertyImagePreview = document.getElementById('propertyImagePreview');
  if (propertyImageUpload && propertyImagePreview) {
    propertyImageUpload.addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) {
        propertyImagePreview.innerHTML = '<span>No image selected</span>';
        return;
      }

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target.result;
        propertyImagePreview.innerHTML = `<img src="${dataUrl}" alt="Property preview">`;
        const imageUrlField = document.getElementById('propertyImage');
        if (imageUrlField) {
          imageUrlField.value = dataUrl;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closePropertyAdmin();
    }
  });
}

function handleScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

function toggleMobileMenu() {
  mobileMenuBtn.classList.toggle('active');
  mobileNav.classList.toggle('active');
  mobileNavOverlay.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  mobileMenuBtn.classList.remove('active');
  mobileNav.classList.remove('active');
  mobileNavOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatCategoryLabel(category) {
  if (!category) return 'General';
  return category
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function renderProperties() {
  const filtered = currentFilter === 'all'
    ? properties
    : properties.filter(p => p.type === currentFilter || p.category === currentFilter);

  propertiesGrid.innerHTML = filtered.map(property => `
    <div class="property-card animate-on-scroll" onclick="openPropertyModal(${property.id})">
      <div class="property-image">
        <img src="${property.image}" alt="${property.title}" loading="lazy">
        <span class="property-badge badge-${property.type}">${property.type}</span>
        <span class="status-badge status-${property.status || 'available'}">${property.status || 'available'}</span>
        <div class="property-price">${property.price}</div>
      </div>
      <div class="property-info">
        <h3>${property.title}</h3>
        <div class="property-location">📍 ${property.location}</div>
        <div class="property-features">
          ${property.beds ? `<span class="property-feature">🛏️ ${property.beds} Beds</span>` : ''}
          ${property.baths ? `<span class="property-feature">🚿 ${property.baths} Baths</span>` : ''}
          <span class="property-feature">📐 ${property.area}</span>
        </div>
        <p class="property-desc">${property.description}</p>
        <button class="property-btn">View Details</button>
      </div>
    </div>
  `).join('');

  setupIntersectionObserver();
}

function renderAdminListingManager() {
  const list = document.getElementById('adminListingList');
  if (!list) return;

  list.innerHTML = properties.map(property => `
    <div class="admin-listing-item">
      <strong>${property.title}</strong>
      <label>
        <span>Set status</span>
        <select data-property-status-id="${property.id}">
          <option value="available" ${property.status === 'available' || !property.status ? 'selected' : ''}>Available</option>
          <option value="sold" ${property.status === 'sold' ? 'selected' : ''}>Sold</option>
          <option value="rented" ${property.status === 'rented' ? 'selected' : ''}>Rented</option>
        </select>
      </label>
    </div>
  `).join('');

  document.querySelectorAll('[data-property-status-id]').forEach(select => {
    select.addEventListener('change', (event) => {
      const id = Number(event.target.dataset.propertyStatusId);
      const property = properties.find(item => item.id === id);
      if (!property) return;

      property.status = event.target.value;
      renderProperties();
      renderAdminListingManager();
    });
  });
}

function openAdminAccessGate() {
  const modal = document.getElementById('adminAccessModal');
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeAdminAccessGate() {
  const modal = document.getElementById('adminAccessModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function handleChairmanAccess(event) {
  event.preventDefault();
  const passwordInput = document.getElementById('chairmanPassword');
  const enteredPassword = passwordInput ? passwordInput.value.trim() : '';

  if (enteredPassword === CHAIRMAN_PASSWORD) {
    closeAdminAccessGate();
    openPropertyAdmin();
    return;
  }

  passwordInput.value = '';
  passwordInput.focus();
  passwordInput.setAttribute('placeholder', 'Incorrect password');
}

function openPropertyAdmin() {
  const modal = document.getElementById('propertyAdminModal');
  if (!modal) return;
  renderAdminListingManager();
  updatePropertyPreview();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePropertyAdmin() {
  const modal = document.getElementById('propertyAdminModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updatePropertyPreview() {
  const title = document.getElementById('propertyTitle')?.value || 'Luxury 4-Bedroom Villa';
  const price = document.getElementById('propertyPrice')?.value || '₦45,000,000';
  const location = document.getElementById('propertyLocation')?.value || 'Lekki Phase 1, Lagos';
  const previewTitle = document.getElementById('propertyPreviewTitle');
  const previewMeta = document.getElementById('propertyPreviewMeta');
  const previewImage = document.getElementById('propertyPreviewImage');
  const imageValue = document.getElementById('propertyImage')?.value || '';

  if (previewTitle) previewTitle.textContent = title || 'Luxury 4-Bedroom Villa';
  if (previewMeta) previewMeta.textContent = `${price} • ${location}`;
  if (previewImage) {
    if (imageValue) {
      previewImage.innerHTML = `<img src="${imageValue}" alt="Property preview">`;
      previewImage.style.background = 'transparent';
    } else {
      previewImage.innerHTML = '<span>House Preview</span>';
      previewImage.style.background = 'linear-gradient(135deg, rgba(212,165,116,0.12), rgba(255,255,255,0.04))';
    }
  }
}

function handlePropertyFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const uploadedFile = document.getElementById('propertyImageUpload')?.files?.[0];
  const previewImage = document.getElementById('propertyImagePreview')?.querySelector('img');
  const baseImageUrl = formData.get('image').toString().trim();
  const imageUrl = previewImage?.src || baseImageUrl || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop';

  const newProperty = {
    id: Date.now(),
    title: formData.get('title').toString().trim(),
    price: formData.get('price').toString().trim(),
    location: formData.get('location').toString().trim(),
    type: formData.get('type').toString(),
    category: formData.get('category').toString(),
    beds: Number(formData.get('beds')) || 0,
    baths: Number(formData.get('baths')) || 0,
    area: formData.get('area').toString().trim() || 'N/A',
    image: imageUrl,
    status: formData.get('status').toString(),
    description: formData.get('description').toString().trim()
  };

  properties.unshift(newProperty);
  renderProperties();
  renderAdminListingManager();
  form.reset();
  const previewBox = document.getElementById('propertyImagePreview');
  if (previewBox) {
    previewBox.innerHTML = '<span>No image selected</span>';
  }
  alert('New property uploaded successfully.');
}

function openPropertyModal(id) {
  const property = properties.find(p => p.id === id);
  if (!property) return;

  const modalBody = document.getElementById('modalBody');
  document.getElementById('modalTitle').textContent = property.title;

  modalBody.innerHTML = `
    <div class="property-gallery">
      <div class="gallery-main">
        <img src="${property.image}" alt="${property.title}">
      </div>
      <div class="gallery-thumbs">
        <div class="gallery-thumb active">
          <img src="${property.image}" alt="View 1">
        </div>
        <div class="gallery-thumb">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=250&fit=crop" alt="Interior">
        </div>
        <div class="gallery-thumb">
          <img src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=250&fit=crop" alt="Exterior">
        </div>
      </div>
    </div>
    <div class="property-details-grid">
      <div class="property-detail">
        <h4>Property Details</h4>
        <ul class="detail-list">
          <li><span>Price</span><span>${property.price}</span></li>
          <li><span>Location</span><span>${property.location}</span></li>
          <li><span>Type</span><span>${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span></li>
          <li><span>Category</span><span>${formatCategoryLabel(property.category)}</span></li>
          ${property.beds ? `<li><span>Bedrooms</span><span>${property.beds}</span></li>` : ''}
          ${property.baths ? `<li><span>Bathrooms</span><span>${property.baths}</span></li>` : ''}
          <li><span>Area</span><span>${property.area}</span></li>
        </ul>
      </div>
      <div class="property-detail">
        <h4>Description</h4>
        <p style="color: var(--text-gray); line-height: 1.8; margin-bottom: 1.5rem;">${property.description}</p>
        <h4>Features</h4>
        <ul class="detail-list">
          <li><span>✓</span><span>Verified Documentation</span></li>
          <li><span>✓</span><span>Professional Inspection</span></li>
          <li><span>✓</span><span>Flexible Payment Options</span></li>
          <li><span>✓</span><span>After-Sales Support</span></li>
        </ul>
      </div>
    </div>
    <div class="modal-actions">
      <a href="https://wa.me/2349113089015?text=${encodeURIComponent(`I'm interested in: ${property.title} at ${property.location}`)}" class="btn btn-primary" target="_blank" style="flex: 1; justify-content: center;">💬 Inquire on WhatsApp</a>
      <a href="tel:09113089015" class="btn btn-outline" style="flex: 1; justify-content: center; border-color: var(--deep-green); color: var(--deep-green);">📞 Call Agent</a>
    </div>
  `;

  document.getElementById('propertyModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('propertyModal').classList.remove('active');
  document.body.style.overflow = '';
}

function showTestimonial(index) {
  const t = testimonials[index];
  document.getElementById('testimonialText').textContent = t.text;
  document.getElementById('testimonialName').textContent = t.name;
  document.getElementById('testimonialRole').textContent = t.role;
  document.getElementById('testimonialImg').src = t.image;
  document.getElementById('testimonialImg').alt = t.name;
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function startTestimonialSlider() {
  setInterval(nextTestimonial, 6000);
}

function toggleFaq(element) {
  const item = element.parentElement;
  const wasActive = item.classList.contains('active');

  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

  if (!wasActive) {
    item.classList.add('active');
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('.form-submit');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert('Thank you for your message! We will contact you within 24 hours.');
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        const counter = entry.target.querySelector('.counter-number[data-target]');
        if (counter && !counter.dataset.counted) {
          counter.dataset.counted = 'true';
          animateCounter(counter);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    const current = Math.floor(eased * target);
    element.textContent = current + (target >= 10 ? '+' : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + (target >= 10 ? '+' : '');
    }
  }

  requestAnimationFrame(update);
}

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProperties();
  setupEventListeners();
  setupIntersectionObserver();
  startTestimonialSlider();
});
