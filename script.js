/* =====================================================
   TYPING EFFECT
===================================================== */

const words = [
    "Computational Biologist",
    "Bioinformatician",
    "Data Analyst",
    "Genomics Researcher",
    "Machine Learning Enthusiast"
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

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topBtn.style.display="flex";

    }

    else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


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

const counters = document.querySelectorAll(".stat h3");

const counterObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const el = entry.target;

            const target = parseInt(el.innerText);

            let value=0;

            const speed=Math.max(10,Math.floor(target/80));

            const timer=setInterval(()=>{

                value+=speed;

                if(value>=target){

                    value=target;

                    clearInterval(timer);

                }

                if(el.innerText.includes("+"))

                    el.innerHTML=value+"+";

                else

                    el.innerHTML=value;

            },20);

            counterObserver.unobserve(el);

        }

    });

});

counters.forEach(c=>counterObserver.observe(c));