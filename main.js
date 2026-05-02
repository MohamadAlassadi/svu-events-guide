/* =============================================
   دليل فعاليات الجامعة الافتراضية | BWP401
   ============================================= */

// ========== قاعدة البيانات المحلية للفعاليات ==========
const eventsDatabase = [
    { id: 1, title: "مهرجان الربيع الثقافي", date: "2026-04-15", category: "ثقافية", location: "ساحة الجامعة", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=400&h=250", description: "احتفال بقدوم الربيع مع أمسيات شعرية وفنون شعبية." },

    { id: 2, title: "مباراة كرة قدم", date: "2026-04-18", category: "رياضية", location: "الملعب الرياضي", img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=400&h=250", description: "مباراة حماسية بين كليتي الهندسة والطب." },

    { id: 3, title: "ورشة الذكاء الاصطناعي", date: "2026-04-20", category: "علمية", location: "قاعة المؤتمرات", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=250", description: "تعلم أساسيات الذكاء الاصطناعي وتطبيقاته." },

    { id: 4, title: "حفل موسيقي طلابي", date: "2026-04-25", category: "ترفيهية", location: "المسرح الكبير", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400&h=250", description: "أمسية موسيقية رائعة مع فرقة الطلاب." },

    { id: 5, title: "معرض التصوير الفوتوغرافي", date: "2026-04-28", category: "فنية", location: "معرض الفنون", img: "https://images.unsplash.com/photo-1519183071298-a2962f01f0d0?auto=format&fit=crop&w=800&q=80", description: "أعمال إبداعية لطلاب الجامعة." }
];

// ========== بيانات فريق العمل ==========
const teamData = [
    { name: "أحمد", id: "20241001", role: "قائد الفريق / مطور", icon: "fas fa-user-tie" },
    { name: "محمد", id: "20241002", role: "مطور واجهات", icon: "fas fa-laptop-code" },
    { name: "يوسف", id: "20241003", role: "قاعدة بيانات ومحتوى", icon: "fas fa-database" },
    { name: "سحر", id: "20241004", role: "اختبار وتكامل", icon: "fas fa-check-double" }
];

// ========== دالة عرض آخر الفعاليات ==========
function displayLatestEvents(containerId, count = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const latest = eventsDatabase.slice(0, count);
    container.innerHTML = latest.map(event => `
        <div class="col-md-6 col-lg-4">
            <div class="event-card">
                <img src="${event.img}" class="event-img" alt="${event.title}">
                <div class="p-3">
                    <span class="badge-cat d-inline-block mb-2">${event.category}</span>
                    <h5 class="fw-bold">${event.title}</h5>
                    <p class="text-muted small"><i class="fas fa-calendar-alt"></i> ${event.date} &nbsp;| <i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <a href="event-details.html?id=${event.id}" class="btn btn-outline-custom btn-sm w-100">التفاصيل <i class="fas fa-chevron-left"></i></a>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== دالة عرض فريق العمل ==========
function displayTeamMembers(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = teamData.map(member => `
        <div class="col-6 col-md-3">
            <div class="team-badge">
                <i class="${member.icon}"></i>
                <p class="fw-bold mt-2 mb-0">${member.name}</p>
                <small class="text-muted">ID: ${member.id}</small>
                <p class="small mt-1">${member.role}</p>
            </div>
        </div>
    `).join('');
}

// ========== دالة عرض جميع الفعاليات مع فلترة ==========
function renderAllEvents(filteredEvents = null) {
    const container = document.getElementById('eventsContainer');
    if (!container) return;
    const eventsToRender = filteredEvents || eventsDatabase;
    const noMsg = document.getElementById('noResult');
    if (eventsToRender.length === 0) {
        if (noMsg) noMsg.classList.remove('d-none');
        container.innerHTML = '';
        return;
    }
    if (noMsg) noMsg.classList.add('d-none');
    container.innerHTML = eventsToRender.map(event => `
        <div class="col-md-6 col-lg-4">
            <div class="event-card">
                <img src="${event.img}" class="event-img" alt="${event.title}">
                <div class="p-3">
                    <span class="badge-cat d-inline-block mb-2">${event.category}</span>
                    <h5 class="fw-bold">${event.title}</h5>
                    <p class="text-muted small"><i class="fas fa-calendar-alt"></i> ${event.date}<br><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <a href="event-details.html?id=${event.id}" class="btn btn-sm btn-outline-primary rounded-pill px-3">التفاصيل</a>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== دالة فلترة الفعاليات ==========
function filterEventsList() {
    const category = document.getElementById('catFilter')?.value || 'all';
    const date = document.getElementById('dateFilter')?.value || '';
    let filtered = [...eventsDatabase];
    if (category !== 'all') {
        filtered = filtered.filter(e => e.category === category);
    }
    if (date) {
        filtered = filtered.filter(e => e.date === date);
    }
    renderAllEvents(filtered);
}

// ========== إعادة تعيين الفلترة ==========
function resetFilters() {
    const categorySelect = document.getElementById('catFilter');
    const dateInput = document.getElementById('dateFilter');
    if (categorySelect) categorySelect.value = 'all';
    if (dateInput) dateInput.value = '';
    renderAllEvents(eventsDatabase);
}

// ========== إعداد نموذج الاتصال ==========
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('msg')?.value.trim();
        const alertDiv = document.getElementById('alertMsg');
        if (!alertDiv) return;
        if (!name || !email || !message) {
            alertDiv.innerHTML = '<div class="alert alert-danger">❌ جميع الحقول مطلوبة</div>';
        } else if (!email.includes('@') || !email.includes('.')) {
            alertDiv.innerHTML = '<div class="alert alert-danger">❌ بريد إلكتروني غير صحيح</div>';
        } else {
            alertDiv.innerHTML = '<div class="alert alert-success">✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</div>';
            form.reset();
        }
        setTimeout(() => alertDiv.innerHTML = '', 3000);
    });
}

// ========== عرض تفاصيل الفعالية ==========
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    const event = eventsDatabase.find(e => e.id === eventId) || eventsDatabase[0];
    const container = document.getElementById('detailsContainer');
    if (!container) return;
    container.innerHTML = `
        <h2 class="fw-bold">${event.title}</h2>
        <img src="${event.img.replace('400/250', '800/400')}" class="img-fluid rounded my-3" alt="${event.title}">

        <p><i class="fas fa-calendar-alt"></i> <strong>التاريخ:</strong> ${event.date}</p>
        <p><i class="fas fa-map-marker-alt"></i> <strong>المكان:</strong> ${event.location}</p>

        <p><i class="fas fa-tag"></i> <strong>التصنيف:</strong> ${event.category}</p>

        <p>${event.description}</p>
    `;
}

// ========== إعداد زر التقويم ==========
function setupCalendarButton() {
    const calendarBtn = document.getElementById('calBtn');
    const modalElement = document.getElementById('calModal');
    if (calendarBtn && modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        calendarBtn.addEventListener('click', () => modal.show());
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // الصفحة الرئيسية
    if (document.getElementById('featuredEvents')) {
        displayLatestEvents('featuredEvents', 3);
    }
    if (document.getElementById('teamList')) {
        displayTeamMembers('teamList');
    }
    if (document.getElementById('teamAbout')) {
        displayTeamMembers('teamAbout');
    }
    
    // صفحة الفعاليات
    if (document.getElementById('eventsContainer')) {
        renderAllEvents(eventsDatabase);
    }
    
    // صفحة التفاصيل
    if (document.getElementById('detailsContainer')) {
        loadEventDetails();
        setupCalendarButton();
    }
    
    // صفحة الاتصال
    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
});

