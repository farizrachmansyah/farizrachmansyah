function init() {
    const slides = document.querySelectorAll(".slide");
    const pages = document.querySelectorAll(".page");
    let current = 0;
    let scrollSlide = 0;

    slides.forEach((slide, index) => {
        slide.addEventListener("click", function () {
            changeDots(this);
            nextSlide(index);
            scrollSlide = index;
        });
    });

    // Change the dot's style
    function changeDots(dot) {
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        dot.classList.add("active");
    }

    // Next slide animation
    function nextSlide(pageNumber) {
        const nextPage = pages[pageNumber]; // ngambil page container setiap page selanjutnya
        const currentPage = pages[current]; // page container yang lagi aktif
        const nextText = nextPage.querySelector(".details");
        const portfolio = document.querySelector(".portfolio");

        // buat objek baru gsap
        const tl = new TimelineMax({
            // bikin gabisa di klik berkali2 biar ga aneh
            onStart: function () {
                slides.forEach(slide => {
                    slide.style.pointerEvents = "none";
                });
            },
            onComplete: function () {
                slides.forEach(slide => {
                    slide.style.pointerEvents = "all";
                });
            }
        });

        // animationed every single components
        tl
            .fromTo(currentPage, 0.3, { opacity: 1, pointerEvents: "all" }, { opacity: 0, pointerEvents: "none" })
            .fromTo(nextPage, 0.3, { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "all" }, "-=0.6")
            .fromTo(nextText, 0.3, { opacity: 0, x: -30 }, { opacity: 1, x: 0 })
        // .set(nextLeft, { clearProps: "all" })
        // .set(nextRight, { clearProps: "all" });
        //-------------------------------------

        current = pageNumber;
    }

    // wheel buat mouse scroll, wheel lebih modern
    // touchmove buat scroll di layar touchscreen
    document.addEventListener("wheel", throttle(scrollChange, 1500));
    document.addEventListener("touchmove", throttle(scrollChange, 1500));

    // ngubah style dots kalo di scroll
    function switchDots(dotNumber) {
        const activeDot = document.querySelectorAll(".slide")[dotNumber];
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        activeDot.classList.add("active");

    }

    // logika buat ngatur scrollnya, disesuaiin sama page numbernya
    // acuannya sama deltaY karna sumbu Y atas-bawah
    function scrollChange(e) {
        if (e.deltaY > 0) {
            scrollSlide += 1;
        } else {
            scrollSlide -= 1;
        }

        if (scrollSlide > 3) {
            scrollSlide = 0;
        } else if (scrollSlide < 0) {
            scrollSlide = 3;
        }

        switchDots(scrollSlide);

        // manggil fungsi ganti page dengan segala macem animasi yang ada di dalemnya
        // bedanya cuma argumennya pake nilai dari scrollSide
        nextSlide(scrollSlide);
    }

    // perintilan buat navigation
    const hamburger = document.querySelector(".burger");
    const hamburgerLines = document.querySelectorAll(".burger div");
    const navOpen = document.querySelector(".nav-open");
    const contact = document.querySelector(".contact");
    const social = document.querySelector(".social");
    const logo = document.querySelector(".logo");

    // bikin objek baru gsap-nya
    const tl = new TimelineMax({ paused: true, reversed: true });

    tl.to(navOpen, 0.5, { y: 0 })
        .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
        .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
        .fromTo(logo, 0.2, { color: "black" }, { color: "white" }, "-=0.1")
        .fromTo(hamburgerLines, 0.2, { backgroundColor: "black" }, { backgroundColor: "white" }, "-=1");

    hamburger.addEventListener("click", () => {
        tl.reversed() ? tl.play() : tl.reverse();
        hamburger.classList.toggle("burger-animated");
    });
}

// function umum buat ngambil nilai2 yang ada pas melakukan scrolling
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

init();