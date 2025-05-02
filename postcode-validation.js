document.addEventListener("DOMContentLoaded", () => {
    // Postcode validation helper
    async function validatePostcode(inputEl, feedbackEl) {
        const code = inputEl.value.trim();
        feedbackEl.textContent = "";
        if (!code) {
            feedbackEl.textContent = "Please enter a postcode.";
            return false;
        }
        try {
            const res = await fetch(
                `https://api.postcodes.io/postcodes/${encodeURIComponent(code)}`
            );
            const json = await res.json();
            if (json.status === 200) return true;
            feedbackEl.textContent = "Invalid UK postcode.";
            return false;
        } catch {
            feedbackEl.textContent = "Error checking postcode. Try again.";
            return false;
        }
    }

    // Generic setup for a form
    function setupForm(formId, postcodeId, feedbackId, buttonId) {
        const form       = document.getElementById(formId);
        const postcodeIn = document.getElementById(postcodeId);
        const feedback   = document.getElementById(feedbackId);
        const button     = document.getElementById(buttonId);

        if (!form || !button) return;

        button.addEventListener("click", async () => {
            // 1) validate postcode
            const ok = await validatePostcode(postcodeIn, feedback);
            if (!ok) return;

            // 2) validate HTML5 constraints
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // 3) show TOS modal
            showTosModal(form);
        });
    }

    // Apply to both forms
    setupForm("giftAidForm",       "postcode",           "postcodeFeedback",           "giftAidSubmit");
    setupForm("collectionForm",    "collectionPostcode", "collectionPostcodeFeedback", "collectionSubmit");

    // TOS modal logic (shared)
    const tosModal     = document.getElementById("tosModal");
    const closeButton  = document.getElementById("closeButton");
    const acceptButton = document.getElementById("acceptButton");

    function showTosModal(form) {
        tosModal.classList.remove("hidden");
        // unbind previous handlers to avoid duplicates
        closeButton.replaceWith(closeButton.cloneNode(true));
        acceptButton.replaceWith(acceptButton.cloneNode(true));
        const closeBtn  = document.getElementById("closeButton");
        const acceptBtn = document.getElementById("acceptButton");

        closeBtn.addEventListener("click", () => tosModal.classList.add("hidden"));
        acceptBtn.addEventListener("click", () => {
            tosModal.classList.add("hidden");
            form.submit();
        });
    }

    // Mobile menu (unchanged)
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            menuButton.classList.toggle("open");
            mobileMenu.classList.toggle("hidden");
        });
    }
});
