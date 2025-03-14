//fade in Main Container on startup.JS

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.2 });



  const container = document.querySelector(".fade-in");
  if (container){
    observer.observe(container);
  }
});

//modal scroll
document.addEventListener("DOMContentLoaded", () => {
  window.scrollToContent = function () {
    const content = document.getElementById("main-content");
    if (content) {
      content.scrollIntoView({ behavior: "smooth" });
    }
  };
});
//For working tooltips
document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

//fetching
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (!form) {
      console.error("Form not found!");
      return;
  }

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      let formData = new FormData(form);
      console.log("Sending data:", Object.fromEntries(formData));

      fetch("https://auraa.tech/tuck_message.php", {
        method: "POST",
        body: formData
    })
      .then(response => response.text())
      .then(data => {
          console.log("Server Response:", data);

          //closes modal after submission
          const modalElement = document.getElementById("emailModal");
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
              modalInstance.hide();
          }

          //success popup
          let responseMessage = document.getElementById("responseMessage");
          if (!responseMessage) {
              responseMessage = document.createElement("p");
              responseMessage.id = "responseMessage";
              responseMessage.style.position = "fixed";
              responseMessage.style.bottom = "20px";
              responseMessage.style.left = "50%";
              responseMessage.style.transform = "translateX(-50%)";
              responseMessage.style.padding = "10px";
              responseMessage.style.backgroundColor = "rgba(205, 0, 0, 0.8)";
              responseMessage.style.color = "white";
              responseMessage.style.borderRadius = "5px";
              responseMessage.style.fontSize = "16px";
              document.body.appendChild(responseMessage);
          }

          responseMessage.innerText = "Message sent successfully!";
          responseMessage.style.display = "block";

          //clears
          form.reset();
          
          setTimeout(() => {
              responseMessage.style.display = "none";
          }, 3000);
      })
      .catch(error => {
          console.error("Error:", error);
      });
  });
});





//For mallow feeties
document.addEventListener("DOMContentLoaded", () => {
  const footerImage = document.querySelector(".footer-image");
  const FeetiesContainer = document.querySelector(".sliding-footer");
  const maxFeeties = 100;
  const Feeties = [];
  let feetiesIndex = 0; //Footprint count



  // Establish object pooling
  for (let i = 0; i < maxFeeties; i++) {
    const feeties = document.createElement("div");
    feeties.classList.add("feeties");
    feeties.style.display = "none"; //At first, all footprints are hidden
    FeetiesContainer.appendChild(feeties);
    Feeties.push(feeties);
  }


  //Establish footprint interval
  const interval = 500;
  setInterval(() => {
    const characterRight = parseFloat(
      getComputedStyle(footerImage).right.replace("px", "")
    );



    //If the character is visible, footprints may be placed.
    if (characterRight >= -50 && characterRight <= FeetiesContainer.offsetWidth) {
      const feeties = Feeties[feetiesIndex];
      feeties.style.display = "block"; // make visible
      feeties.style.right = `${characterRight}px`; // Update print position
      feeties.style.bottom = "10%"; // prints are always near bottom of footer
      feetiesIndex = (feetiesIndex + 1) % maxFeeties; // Cycling through pool
    }
  }, interval);
});
//end of mallow feeties