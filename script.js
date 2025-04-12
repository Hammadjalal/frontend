

const sections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => revealObserver.observe(sec));

// Partners Section Starts 
$('.partners-slider').owlCarousel({
  loop:true,
  autoplay:true,
  autoplayTimeout:3000,
  margin:10,
  nav:true,
  navText:["<i class='fa-solid fa-arrow-left'></i>",
           "<i class='fa-solid fa-arrow-right'></i>"],
  responsive:{
      0:{
          items:1
      },
      500:{
          items:2
      },
      700:{
          items:3
      },
      1000:{
        items:5
      }
  }
})
// Partners Section Ends 



// Smooth scroll back to top
document.querySelector('.back-to-top').addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    this.reset(); // Clear the form
  });

  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackList = document.getElementById('feedbackList');

  window.addEventListener('DOMContentLoaded', () => {
    const saved = JSON.parse(localStorage.getItem('feedbackData')) || [];
    saved.forEach(displayFeedback);
  });

  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    const feedback = { name, rating, comment };
    
    let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
    feedbackData.push(feedback);
    localStorage.setItem('feedbackData', JSON.stringify(feedbackData));

    displayFeedback(feedback);
    feedbackForm.reset();
    alert("Thanks for your feedback!");
  });

  function displayFeedback(feedback) {
    const item = document.createElement('div');
    item.className = 'feedback-item';
    item.innerHTML = `
      <h4>${feedback.name} <span>– ${feedback.rating}/5</span></h4>
      <p>${feedback.comment}</p>
    `;
    feedbackList.prepend(item);
  }

  const clearBtn = document.getElementById('clearFeedbackBtn');

  clearBtn.addEventListener('click', function () {
    if (confirm("Are you sure you want to clear all feedback?")) {
      localStorage.removeItem('feedbackData');
      feedbackList.innerHTML = "";
      alert("All feedback has been cleared.");
    }
  });

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      item.classList.toggle("active");
      
      // Optional: Close other open answers
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
    });
  });


  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const section = document.getElementById("testimonial-section");
  let current = 0;
  let interval;
  let started = false;

  function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active-dot"));

    testimonials[index].classList.add("active");
    dots[index].classList.add("active-dot");
  }

  function startSlider() {
    if (started) return; // avoid multiple starts
    started = true;
    interval = setInterval(() => {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    }, 4000);
  }

  function resetSlider(index) {
    clearInterval(interval);
    current = index;
    showTestimonial(index);
    startSlider();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      resetSlider(index);
    });
  });

  // Scroll Triggered Start
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startSlider();
      }
    },
    { threshold: 0.5 } // 50% visible
  );

  observer.observe(section);

