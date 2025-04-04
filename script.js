/**
 * Business Card Functionality
 * A script to handle interactive elements for a digital business card
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check which page we're on
  const isMainPage = document.querySelector(".card");
  const isQrPage = document.querySelector("#qrcode");

  if (isMainPage) {
    setupContactDownload();
    setupCardAnimations();
    setupDarkModeToggle();
    trackCardViews();
  }

  if (isQrPage) {
    setupQrCodeGenerator();
    setupBackButton();
  }
});

// Function to handle contact saving
const setupContactDownload = () => {
  const downloadButton = document.getElementById("download-contact");
  if (downloadButton) {
    downloadButton.addEventListener("click", () => {
      // Create a vCard format text
      const vCard = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
TITLE:Full Stack Developer
TEL;TYPE=CELL:+1234567890
EMAIL:john.doe@example.com
URL:https://johndoe.com
NOTE:Digital business card created with Vercel and Claude AI
END:VCARD`;

      // Create a downloadable link with the vCard data
      const blob = new Blob([vCard], { type: "text/vcard" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "contact.vcf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      // Show confirmation message
      const message = document.createElement("div");
      message.className = "download-message";
      message.textContent = "Contact saved to your device!";
      document.body.appendChild(message);

      setTimeout(() => {
        message.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(message);
        }, 500);
      }, 2000);
    });
  }
};

// Add animation and interactive elements to the card
const setupCardAnimations = () => {
  const card = document.querySelector(".card");
  if (card) {
    // Hover effect
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.02)";
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      card.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
    });

    // Add click animation for social links
    const socialLinks = document.querySelectorAll(".social-icon");
    socialLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        this.classList.add("clicked");
        setTimeout(() => {
          this.classList.remove("clicked");
        }, 300);
      });
    });
  }
};

// Setup dark mode toggle functionality
const setupDarkModeToggle = () => {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    // Check for saved preference
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", () => {
      if (darkModeToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
    });
  }
};

// Setup QR code generator if on QR page
const setupQrCodeGenerator = () => {
  const generateButton = document.getElementById("generate");
  if (generateButton) {
    const contentTypeSelect = document.getElementById("content-type");
    const urlInput = document.getElementById("url-input");
    const vcardInputs = document.getElementById("vcard-inputs");
    const textInput = document.getElementById("text-input");

    contentTypeSelect.addEventListener("change", () => {
      const selectedValue = contentTypeSelect.value;
      urlInput.style.display = selectedValue === "url" ? "block" : "none";
      vcardInputs.style.display = selectedValue === "vcard" ? "block" : "none";
      textInput.style.display = selectedValue === "text" ? "block" : "none";
    });

    // Handle QR code generation logic
  }
};

// Setup back button for QR page
const setupBackButton = () => {
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
};

// Track card views (for analytics)
const trackCardViews = () => {
  // This is a simple view counter using localStorage
  // For production, you'd use a more robust analytics solution
  let views = localStorage.getItem("cardViews") || 0;
  views = parseInt(views) + 1;
  localStorage.setItem("cardViews", views);

  // You could send this data to an analytics service
  console.log(`Card viewed ${views} times`);
};
