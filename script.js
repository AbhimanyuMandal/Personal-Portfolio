/* =====================================================
   TYPING EFFECT
===================================================== */

const words = [
    "Computational Biologist",
    "Bioinformatics Researcher",
    "Genomics & Multi-Omics Analyst"
];

const typingElement = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    if(!typingElement) return;

    const current = words[wordIndex];

    if(!deleting){

        typingElement.textContent =
            current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;

        }

    }

    else{

        typingElement.textContent =
            current.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex = (wordIndex+1)%words.length;

            charIndex = 0;

        }

    }

    setTimeout(typeEffect,deleting?40:90);

}

typeEffect();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


/* =====================================================
   BACK TO TOP
===================================================== */

const topBtn = document.getElementById("backToTop");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 500 ? "flex" : "none";
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* =====================================================
   NAVBAR SHADOW
===================================================== */

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

    }

    else{

        header.style.boxShadow="none";

    }

});


/* =====================================================
   DARK MODE
===================================================== */

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    const icon = toggle.querySelector("i");

    if(document.body.classList.contains("dark")){

        icon.className="fa-solid fa-sun";

        localStorage.setItem("theme","dark");

    }

    else{

        icon.className="fa-solid fa-moon";

        localStorage.setItem("theme","light");

    }

});

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

    toggle.querySelector("i").className="fa-solid fa-sun";

}


/* =====================================================
   COUNTER ANIMATION
===================================================== */

<script>
document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat h3");

    const animateCounter = (element) => {
        const target = Number(element.dataset.target);
        const duration = 1500;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth ease-out animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easedProgress);

            element.textContent =
                currentValue.toLocaleString("en-IN") + "+";

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent =
                    target.toLocaleString("en-IN") + "+";
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    stats.forEach(stat => observer.observe(stat));
});
</script>
