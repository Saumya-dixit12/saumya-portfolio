/* =========================================================
   SAUMYA DIXIT — PREMIUM PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const pageLoader = document.getElementById("pageLoader");

    const navbar = document.getElementById("navbar");

    const navMenu = document.getElementById("navMenu");

    const menuToggle = document.getElementById("menuToggle");

    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll("section[id]");

    const backToTop = document.getElementById("backToTop");

    const currentYear = document.getElementById("currentYear");

    const revealElements =
        document.querySelectorAll(".reveal");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    const contactForm =
        document.getElementById("contactForm");

    const submitBtn =
        document.getElementById("submitBtn");

    const formStatus =
        document.getElementById("formStatus");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const cursorGlow =
        document.querySelector(".cursor-glow");


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PAGE LOADER
    ====================================================== */

    const hideLoader = () => {

        if (!pageLoader) return;

        pageLoader.classList.add("hidden");

    };


    /*
       Small delay gives the page a polished entrance.
    */

    window.addEventListener("load", () => {

        setTimeout(hideLoader, 450);

    });


    /*
       Safety fallback in case the load event is delayed.
    */

    setTimeout(hideLoader, 3000);



    /* =====================================================
       NAVBAR SCROLL EFFECT
    ====================================================== */

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    handleNavbarScroll();

    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const closeMobileMenu = () => {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    };


    const openMobileMenu = () => {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.add("open");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    };


    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.contains("open");

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }



    /* =====================================================
       CLOSE MENU WHEN NAV LINK IS CLICKED
    ====================================================== */

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });



    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (!navMenu ||
                !menuToggle) return;


            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                navMenu.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu();

            }

        }
    );



    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );



    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((anchor) => {

        anchor.addEventListener(
            "click",
            (event) => {

                const targetId =
                    anchor.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (!target) return;


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const updateActiveNav = () => {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    updateActiveNav();


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );



    /* =====================================================
       REVEAL ON SCROLL
    ====================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        "IntersectionObserver" in window &&
        !reducedMotion
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* =====================================================
       PROJECT FILTERS
    ====================================================== */

    const filterProjects = (filter) => {

        projectCards.forEach((card) => {

            const categories =
                card.dataset.category || "";


            const shouldShow =
                filter === "all" ||
                categories
                    .split(" ")
                    .includes(filter);


            if (shouldShow) {

                card.classList.remove(
                    "filtered-out"
                );

                /*
                   Small animation reset.
                */

                if (!reducedMotion) {

                    card.style.opacity = "0";
                    card.style.transform =
                        "translateY(12px)";


                    requestAnimationFrame(() => {

                        card.style.transition =
                            "opacity 0.35s ease, transform 0.35s ease";

                        card.style.opacity = "1";
                        card.style.transform =
                            "translateY(0)";

                    });

                }

            } else {

                card.classList.add(
                    "filtered-out"
                );

            }

        });

    };


    filterButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    filterButtons.forEach(
                        (btn) => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const filter =
                        button.dataset.filter ||
                        "all";


                    filterProjects(filter);

                }
            );

        }
    );



    /* =====================================================
       PROJECT CARD TILT
       DESKTOP ONLY
    ====================================================== */

    const canHover =
        window.matchMedia(
            "(hover: hover)"
        ).matches;


    if (
        canHover &&
        !reducedMotion
    ) {

        projectCards.forEach(
            (card) => {

                card.addEventListener(
                    "mousemove",
                    (event) => {

                        /*
                           Don't use tilt on touch devices.
                        */

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateX =
                            ((y - centerY) /
                                centerY) *
                            -1.5;


                        const rotateY =
                            ((x - centerX) /
                                centerX) *
                            1.5;


                        card.style.transform =
                            `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-2px)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }



    /* =====================================================
       BACK TO TOP
    ====================================================== */

    const handleBackToTop = () => {

        if (!backToTop) return;


        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    };


    handleBackToTop();


    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }



    /* =====================================================
       TOAST
    ====================================================== */

    let toastTimer = null;


    const showToast = (
        message,
        duration = 3500
    ) => {

        if (
            !toast ||
            !toastMessage
        ) return;


        toastMessage.textContent =
            message;


        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                duration
            );

    };



    /* =====================================================
       CURSOR GLOW
    ====================================================== */

    if (
        cursorGlow &&
        canHover &&
        !reducedMotion
    ) {

        let mouseX = 0;

        let mouseY = 0;

        let glowX = 0;

        let glowY = 0;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );


        const animateCursor = () => {

            glowX +=
                (mouseX - glowX) * 0.08;


            glowY +=
                (mouseY - glowY) * 0.08;


            cursorGlow.style.left =
                `${glowX}px`;


            cursorGlow.style.top =
                `${glowY}px`;


            requestAnimationFrame(
                animateCursor
            );

        };


        animateCursor();

    }



    /* =====================================================
       HERO IMAGE ERROR HANDLING
    ====================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image img"
        );


    if (heroImage) {

        heroImage.addEventListener(
            "error",
            () => {

                heroImage.style.display =
                    "none";


                const imageContainer =
                    heroImage.parentElement;


                if (imageContainer) {

                    imageContainer.setAttribute(
                        "data-image-error",
                        "true"
                    );

                }

            }
        );

    }



    /* =====================================================
       RESUME FILE CHECK
    ====================================================== */

    const resumeLinks =
        document.querySelectorAll(
            'a[href="resume.pdf"]'
        );


    resumeLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                async (event) => {

                    /*
                       We check whether the file exists.
                       If it doesn't exist yet, we show a
                       friendly message instead of sending
                       the user to a broken PDF page.
                    */

                    try {

                        const response =
                            await fetch(
                                "resume.pdf",
                                {
                                    method: "HEAD",
                                    cache: "no-store"
                                }
                            );


                        if (!response.ok) {

                            event.preventDefault();


                            showToast(
                                "Resume PDF abhi portfolio folder mein add nahi hui hai."
                            );

                        }

                    } catch (error) {

                        /*
                           Local files / some browsers may
                           block HEAD requests. In that case
                           we don't block the normal link.
                        */

                    }

                }
            );

        }
    );



    /* =====================================================
       CONTACT FORM
       WEB3FORMS
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                /*
                   Reset status.
                */

                if (formStatus) {

                    formStatus.textContent =
                        "";

                    formStatus.className =
                        "form-status";

                }


                /*
                   Get form fields.
                */

                const nameField =
                    contactForm.querySelector(
                        '[name="name"]'
                    );


                const emailField =
                    contactForm.querySelector(
                        '[name="email"]'
                    );


                const subjectField =
                    contactForm.querySelector(
                        '[name="subject"]'
                    );


                const messageField =
                    contactForm.querySelector(
                        '[name="message"]'
                    );


                const name =
                    nameField
                        ? nameField.value.trim()
                        : "";


                const email =
                    emailField
                        ? emailField.value.trim()
                        : "";


                const subject =
                    subjectField
                        ? subjectField.value.trim()
                        : "";


                const message =
                    messageField
                        ? messageField.value.trim()
                        : "";


                /*
                   Basic validation.
                */

                if (
                    name.length < 2
                ) {

                    showFormError(
                        "Please enter your name."
                    );

                    nameField?.focus();

                    return;

                }


                if (
                    !isValidEmail(email)
                ) {

                    showFormError(
                        "Please enter a valid email address."
                    );

                    emailField?.focus();

                    return;

                }


                if (
                    subject.length < 2
                ) {

                    showFormError(
                        "Please enter a subject."
                    );

                    subjectField?.focus();

                    return;

                }


                if (
                    message.length < 10
                ) {

                    showFormError(
                        "Please enter a little more detail in your message."
                    );

                    messageField?.focus();

                    return;

                }


                /*
                   Get Web3Forms access key.
                */

                const accessKeyInput =
                    contactForm.querySelector(
                        '[name="access_key"]'
                    );


                const accessKey =
                    accessKeyInput
                        ? accessKeyInput.value.trim()
                        : "";


                if (
                    !accessKey ||
                    accessKey ===
                    "YOUR_WEB3FORMS_ACCESS_KEY"
                ) {

                    showFormError(
                        "Contact form setup is incomplete. Please add your Web3Forms access key."
                    );

                    return;

                }


                /*
                   Loading state.
                */

                setSubmitLoading(true);


                try {

                    const formData =
                        new FormData(
                            contactForm
                        );


                    /*
                       Web3Forms settings.
                    */

                    formData.set(
                        "subject",
                        `Portfolio Contact: ${subject}`
                    );


                    formData.set(
                        "from_name",
                        `${name} — Portfolio`
                    );


                    formData.set(
                        "replyto",
                        email
                    );


                    /*
                       Send request.
                    */

                    const response =
                        await fetch(
                            "https://api.web3forms.com/submit",
                            {
                                method: "POST",
                                body: formData
                            }
                        );


                    const result =
                        await response.json();


                    if (
                        response.ok &&
                        result.success
                    ) {

                        /*
                           Success.
                        */

                        contactForm.reset();


                        showFormSuccess(
                            "Message sent successfully. I'll get back to you soon."
                        );


                        showToast(
                            "Message sent successfully ✓"
                        );


                    } else {

                        throw new Error(
                            result.message ||
                            "Unable to send message."
                        );

                    }

                } catch (error) {

                    console.error(
                        "Web3Forms Error:",
                        error
                    );


                    showFormError(
                        "Something went wrong. Please try again or email me directly."
                    );


                    showToast(
                        "Message could not be sent."
                    );

                } finally {

                    setSubmitLoading(false);

                }

            }
        );

    }



    /* =====================================================
       FORM HELPER FUNCTIONS
    ====================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    function showFormError(message) {

        if (!formStatus) return;


        formStatus.textContent =
            message;


        formStatus.className =
            "form-status error";

    }


    function showFormSuccess(message) {

        if (!formStatus) return;


        formStatus.textContent =
            message;


        formStatus.className =
            "form-status success";

    }


    function setSubmitLoading(isLoading) {

        if (!submitBtn) return;


        if (isLoading) {

            submitBtn.classList.add(
                "loading"
            );


            submitBtn.disabled = true;


            submitBtn.setAttribute(
                "aria-busy",
                "true"
            );


            submitBtn.dataset.originalText =
                submitBtn.innerHTML;


            submitBtn.innerHTML =
                `
                Sending...
                <span>↗</span>
                `;

        } else {

            submitBtn.classList.remove(
                "loading"
            );


            submitBtn.disabled = false;


            submitBtn.setAttribute(
                "aria-busy",
                "false"
            );


            submitBtn.innerHTML =
                submitBtn.dataset.originalText ||
                `
                Send Message
                <span>↗</span>
                `;

        }

    }



    /* =====================================================
       INPUT INTERACTION
    ====================================================== */

    const formInputs =
        document.querySelectorAll(
            ".contact-form input, .contact-form textarea"
        );


    formInputs.forEach(
        (input) => {

            input.addEventListener(
                "input",
                () => {

                    if (
                        formStatus &&
                        formStatus.textContent
                    ) {

                        formStatus.textContent =
                            "";

                        formStatus.className =
                            "form-status";

                    }

                }
            );

        }
    );



    /* =====================================================
       EXTERNAL LINKS
    ====================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(
        (link) => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );



    /* =====================================================
       RESIZE HANDLER
    ====================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);


            resizeTimer =
                setTimeout(
                    () => {

                        /*
                           Close mobile menu if screen
                           becomes desktop size.
                        */

                        if (
                            window.innerWidth > 900
                        ) {

                            closeMobileMenu();

                        }

                    },
                    150
                );

        }
    );



    /* =====================================================
       PAGE VISIBILITY
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            /*
               Nothing heavy is required when the tab
               is hidden. This listener simply exists
               for future performance enhancements.
            */

            if (
                document.visibilityState ===
                "visible"
            ) {

                handleNavbarScroll();

            }

        }
    );



    /* =====================================================
       INITIAL STATE
    ====================================================== */

    /*
       Make first viewport content visible quickly.
       This also prevents a blank hero if JS loads
       after the page.
    */

    if (
        window.scrollY < 100 &&
        !reducedMotion
    ) {

        setTimeout(
            () => {

                document
                    .querySelectorAll(
                        ".hero .reveal"
                    )
                    .forEach(
                        (element) => {

                            element.classList.add(
                                "visible"
                            );

                        }
                    );

            },
            650
        );

    }


    /*
       Console message for development.
    */

    console.log(
        "%cSAUMYA DIXIT — PORTFOLIO",
        "color:#c9a46b;font-size:16px;font-weight:bold;"
    );

    console.log(
        "Portfolio initialized successfully."
    );

});