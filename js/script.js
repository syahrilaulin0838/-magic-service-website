document.addEventListener('DOMContentLoaded', () => {

    // 0. Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Durasi animasi dalam milidetik
        once: true,    // Animasi hanya berjalan sekali saat scroll
        offset: 50,    // Memicu animasi sedikit lebih awal
    });
    
    // Memfungsikan tombol play di video promo
    const playOverlay = document.querySelector('.play-overlay');
    const video = document.querySelector('#video-promo video');

    if (playOverlay && video) {
        playOverlay.addEventListener('click', () => {
            video.play();
            playOverlay.style.display = 'none'; // Sembunyikan tombol play
        });

        // Opsional: tampilkan kembali overlay saat video selesai
        video.addEventListener('ended', () => {
            playOverlay.style.display = 'flex';
        });
    }

    // 1. Menu Navigasi Mobile (Hamburger)
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Menutup menu mobile saat link diklik
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // 2. Accordion untuk FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Tutup semua item lain
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Buka/tutup item yang diklik (jika tidak aktif sebelumnya)
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 3. Tombol "Kembali ke Atas" (Back to Top)
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 4. Validasi Formulir Kontak (Simulasi)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah form dari reload halaman

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                formMessage.textContent = 'Harap isi semua kolom yang wajib diisi.';
                formMessage.className = 'error';
            } else {
                formMessage.textContent = 'Terima kasih! Pesan Anda telah terkirim.';
                formMessage.className = 'success';
                contactForm.reset();

                setTimeout(() => {
                    formMessage.className = 'hidden';
                }, 5000);
            }
        });
    }

    // 5. Slider Testimoni
    const track = document.querySelector('.testimoni-track');
    const slides = document.querySelectorAll('.testimoni-item');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        if (track) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    if (nextBtn && prevBtn && totalSlides > 0) {
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= totalSlides) {
                currentIndex = 0; // balik ke awal
            }
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = totalSlides - 1; // balik ke slide terakhir
            }
            updateSlider();
        });
    }

    // Inisialisasi awal
    updateSlider();

    // Opsional: Auto-slide setiap 5 detik
    setInterval(() => {
        if (totalSlides > 1) {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }
    }, 5000);

});
