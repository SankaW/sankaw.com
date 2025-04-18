document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-contact");
  const contactContainer = document.getElementById("contact-container");
  const contactForm = document.getElementById("contact-form");
  const submitButton = document.getElementById("submit-contact");
  const spinner = document.getElementById("submit-spinner");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");
  const contactSection = document.getElementById("contact");

  // AWS Lambda endpoint - Replace with your actual endpoint
  const LAMBDA_ENDPOINT =
    "https://5lgbqzprb0.execute-api.us-east-1.amazonaws.com/send-email";

  // Toggle contact form visibility
  toggleButton.addEventListener("click", function () {
    contactContainer.classList.toggle("show");
    if (contactContainer.classList.contains("show")) {
      contactContainer.style.display = "block";
      setTimeout(() => {
        contactContainer.style.opacity = "1";
        // Smooth scroll to contact section
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 10);
    } else {
      contactContainer.style.opacity = "0";
      setTimeout(() => {
        contactContainer.style.display = "none";
      }, 300);
    }
  });

  // Handle form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Reset messages
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    // Get form data
    const formData = {
      name: document.getElementById("contact-name").value,
      email: document.getElementById("contact-email").value,
      subject: document.getElementById("contact-subject").value,
      message: document.getElementById("contact-message").value,
      formType: "sanka",
    };

    // Disable submit button and show spinner
    submitButton.disabled = true;
    spinner.style.display = "inline-block";

    try {
      console.log("Sending request to:", LAMBDA_ENDPOINT);
      console.log("With data:", formData);

      const response = await fetch(LAMBDA_ENDPOINT, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Show success message
      successMessage.style.display = "block";
      successMessage.textContent = "Message sent successfully!";

      // Reset form
      contactForm.reset();

      // Hide form after 3 seconds
      setTimeout(() => {
        contactContainer.classList.remove("show");
        contactContainer.style.opacity = "0";
        setTimeout(() => {
          contactContainer.style.display = "none";
          successMessage.style.display = "none";
        }, 300);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      // Show error message
      errorMessage.style.display = "block";
      errorMessage.textContent =
        error.message || "An error occurred. Please try again later.";
    } finally {
      // Re-enable submit button and hide spinner
      submitButton.disabled = false;
      spinner.style.display = "none";
    }
  });

  // Form validation
  const inputs = contactForm.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
      } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
      }
    });
  });
});
