// 1. ระบบตั้งค่าเริ่มต้นให้เว็บเป็นภาษาไทย
document.body.classList.add("lang-th");

// 2. ระบบไฮไลต์ Tab Bar ตามการเลื่อนหน้าจอตรงกลาง
const sections = document.querySelectorAll("section[id], .container[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY + window.innerHeight / 2 >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// 3. ระบบเปลี่ยนการเลื่อนหน้าจอให้อยู่กึ่งกลาง
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetHref = this.getAttribute("href");
    if (targetHref.startsWith("#")) {
      e.preventDefault();
      const targetId = targetHref.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  });
});

// 4. ระบบเปลี่ยนธีม (Dark Mode)
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("themeBtn");
  if (document.body.classList.contains("dark-mode")) {
    btn.innerText = "☀️";
  } else {
    btn.innerText = "🌙";
  }
}

// 5. ระบบสลับภาษา
function toggleLanguage() {
  const body = document.body;
  const langBtn = document.getElementById("langBtn");

  if (body.classList.contains("lang-th")) {
    body.classList.remove("lang-th");
    body.classList.add("lang-en");
    langBtn.innerText = "TH";
  } else {
    body.classList.remove("lang-en");
    body.classList.add("lang-th");
    langBtn.innerText = "EN";
  }
}

// 6. เอฟเฟกต์พิมพ์ดีด
const textArray = [
  "Student Developer",
  "Frontend Enthusiast",
  "UI/UX Designer",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenWords = 2000;

function typeWriter() {
  const currentText = textArray[textIndex];
  let displayString = currentText.substring(0, charIndex);
  document.getElementById("typewriter").innerText = displayString;

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(typeWriter, typeSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeWriter, deleteSpeed);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      textIndex = (textIndex + 1) % textArray.length;
    }
    setTimeout(typeWriter, isDeleting ? delayBetweenWords : 500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  typeWriter();
});

// 7. แอนิเมชันเลื่อนจอ (Scroll Reveal)
function revealElement() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", revealElement);
revealElement();

// 8. ระบบเปิด-ปิด Popup รูป Resume
function openResume() {
  document.getElementById("resumeModal").style.display = "block";
}

const resumeImg = document.getElementById("resumeImg");
if (resumeImg) {
  resumeImg.addEventListener("click", function (event) {
    event.stopPropagation();
    this.classList.toggle("zoomed");
  });
}

function closeResume() {
  document.getElementById("resumeModal").style.display = "none";
  if (resumeImg) resumeImg.classList.remove("zoomed");
}

window.onclick = function (event) {
  var modal = document.getElementById("resumeModal");
  if (event.target == modal) {
    modal.style.display = "none";
    if (resumeImg) resumeImg.classList.remove("zoomed");
  }
};

// 9. ระบบส่งอีเมลด้วย JavaScript Fetch API
const form = document.getElementById("portfolio-form");
const successMsg = document.getElementById("form-success");
const errorMsg = document.getElementById("form-error");
const submitBtn = document.getElementById("submit-btn");

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // เปลี่ยนสถานะปุ่มตอนกำลังรอส่ง (รองรับ 2 ภาษา)
    submitBtn.innerHTML =
      '<span class="text-th">กำลังส่ง...</span><span class="text-en">SENDING...</span>';
    submitBtn.disabled = true;
    successMsg.style.display = "none";
    errorMsg.style.display = "none";

    const data = new FormData(event.target);

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          successMsg.style.display = "block";
          form.reset();
        } else {
          errorMsg.style.display = "block";
        }
        // คืนสถานะปุ่มกลับมาเหมือนเดิม
        submitBtn.innerHTML =
          '<span class="text-th">ส่งข้อความ</span><span class="text-en">SEND</span>';
        submitBtn.disabled = false;
      })
      .catch((error) => {
        errorMsg.style.display = "block";
        submitBtn.innerHTML =
          '<span class="text-th">ส่งข้อความ</span><span class="text-en">SEND</span>';
        submitBtn.disabled = false;
      });
  });
}