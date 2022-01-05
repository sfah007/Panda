"use strict";
import Joi from "joi-browser";
import emailjs from "emailjs-com";
import arabicElements from "./js/language";
import VanillaTilt from "vanilla-tilt"


VanillaTilt.init(document.querySelector(".your-element"), {
  max: 25,
  speed: 400,
});

//It also supports NodeList
VanillaTilt.init(document.querySelectorAll(".projects__link"));


let language = "en";

emailjs.init("user_FyctN2OjaCRdSRxKI5WPO");
// blob morphisim
const tween = KUTE.fromTo(
  "#blob1",
  {
    path: "#blob1",
  },
  {
    path: "#blob2",
  },
  {
    repeat: 999,
    duration: 3000,
    yoyo: true,
  }
);

tween.start();
// cursor functionality
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
document.querySelectorAll(".hover").forEach((ele) => {
  ele.addEventListener(
    "mouseover",
    (e) => (cursor.style.transform = "scale(4)")
  );
  ele.addEventListener(
    "mouseout",
    (e) => (cursor.style.transform = "scale(1)")
  );
});




// call to action btn

const ctlBtn = document.querySelector(".call-to-action");
const paragraph = document.querySelector(".hero__paragraph");
const header = document.querySelector("#header");
const btnY = ctlBtn.getBoundingClientRect().y;
const sectionY = document.querySelector(".info").getBoundingClientRect().y;

const obsOptions = {
  root: null,
  threshold: [0.35],
  rootMargin: `${0}px`,
};

const obsCallBack = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    ctlBtn.classList.add("float");
    ctlBtn.innerHTML = `<i style="fill:white;" class="fas fa-envelope"></i>`;
  } else {
    ctlBtn.classList.remove("float");
    if (language === "en") {
      ctlBtn.innerHTML = "";
      ctlBtn.textContent = "Let's Talk";
    } else {
      ctlBtn.textContent = "دعنا نتحدث";
    }
  }
};
const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(header);

// model

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = function () {
  // modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector("body").style.overflow = "hidden";

  modal.style.overflowY = "auto";
};

const closeModal = function () {
  // modal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.querySelector("body").style.overflow = "auto";
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay")) {
    closeModal();
  }
});

document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// navbar toggle

const navBtn = document.querySelector(".nav__toggle");
const navList = document.querySelector(".nav__list");
navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("open");
  navList.classList.toggle("open");
});

// nav Links

const aboutLink = document.querySelector(".about-link");
const homeLink = document.querySelector(".home-link");

aboutLink.addEventListener("click",function(e){
  e.preventDefault();
  const id = this.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  navBtn.classList.remove("open");
  navList.classList.remove("open");
})

homeLink.addEventListener("click",function(e){
  e.preventDefault();
  const id = this.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  navBtn.classList.remove("open");
  navList.classList.remove("open");
})

// forms
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const schema = {
  email: Joi.string().required().email().label("Username"),
  name: Joi.string().required().label("Name"),
  message: Joi.string().required().max(250).label("Message"),
};
const validateProperty = ({ name, value }) => {
  const obj = { [name]: value };
  const newschema = { [name]: schema[name] };
  const { error } = Joi.validate(obj, newschema);
  return error ? error.details[0].message : null;
};
const inputs = [nameInput, emailInput, messageInput];

inputs.forEach((ele) => {
  ele.addEventListener("keyup", (e) => {
    const value = ele.value;

    const error = validateProperty({ name: ele.id, value });

    if (error) {
      ele.classList.remove("correct");
      ele.classList.add("wrong");
    } else {
      ele.classList.add("correct");
      ele.classList.remove("wrong");
    }
    if (inputs.every((input) => input.classList.contains("correct"))) {
      document.querySelector(".send").classList.remove("disabled");
    } else {
      document.querySelector(".send").classList.add("disabled");
    }
  });
});

// submittung the form

const renderMessage = (element,message,color)=>{
  const markup =document.createElement("div")
  markup.innerText=message
  markup.className = "form-message";
  markup.classList.add(color)
  element.insertAdjacentElement("beforebegin", markup);
  setTimeout(()=>{
    markup.remove()
  },3000)
}

const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let radioValue = "";
  document.querySelectorAll(".form__radio-input").forEach((ele) => {
    if (ele.checked) {
      radioValue = ele.id;
    }
  });
  
  inputs.forEach(ele=>{
    ele.classList.remove("correct")
    ele.classList.remove("wrong")
  })
  document.querySelector(".send").classList.add("disabled");
  const templateParams = {
    name: nameInput.value,
    email: emailInput.value,
    option: radioValue,
    replay_to: "djfj",
    message: messageInput.value,
  };
  
e.target.reset();
  emailjs.send("service_vktz1t9", "template_2nay408", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      if(language==="en"){
        renderMessage(e.target,"Thank you for your message","success")
      }else{
        renderMessage(e.target, "شكرا لك سيتم التواصل معك باقرب وقت", "success");
      }
    },
    function (error) {
      console.log("FAILED...", error);
      if (language === "en") {
        renderMessage(e.target, "Sorry! something happened. try again", "failed");
      } else {
        renderMessage(
          e.target,
          "حدث خطا, حاول مجددا",
          "failed"
        );
      }
    }
  );
});

// switcher

const switcher = document.querySelector(".switcher .label");
let turner = true;
switcher.addEventListener("click", () => {
  if (turner) {
    document.body.style.setProperty("--color-white", "#000");
    document.body.style.setProperty("--color-black", "#fff");
  } else {
    document.body.style.setProperty("--color-white", "#fff");
    document.body.style.setProperty("--color-black", "#000");
  }
  turner = !turner;
});

// language

const textElements = document.querySelectorAll(".text");

const englishElements = [];
textElements.forEach((ele, i) => {
  // console.log(ele.textContent);
  englishElements.push(ele.textContent.trim());
});

const btnLang = document.querySelector(".lang-switcher");
const btnMenu = document.querySelector(".lang-menu");
const navElement = document.querySelector("nav");

let swap;

btnLang.addEventListener("click", (e) => {
  if (btnMenu.classList.contains("open")) {
    btnMenu.classList.remove("open");
  } else {
    btnMenu.classList.add("open");
  }
  if (e.target.closest("div").classList.contains("lang-menu")) {
    if (language === "en") {
      language = "ar";
      textElements.forEach((ele, i) => {
        ele.textContent = arabicElements[i];
      });
      document.body.classList.add("ar");
      navElement.setAttribute("dir","rtl")
    } else {
      language = "en";
      textElements.forEach((ele, i) => {
        ele.textContent = englishElements[i];
      });

      document.body.classList.remove("ar");
      navElement.removeAttribute("dir")
    }

    swap = btnLang.querySelector(".main-lang").textContent;
    btnLang.querySelector(".main-lang").textContent = e.target.textContent;
    e.target.textContent = swap;
  }
});

// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();


