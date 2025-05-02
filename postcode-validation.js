document.addEventListener("DOMContentLoaded", () => {
    // Gift Aid Form Postcode Check
    const giftForm = document.getElementById("giftAidForm");
    if (giftForm) {
        giftForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const postcodeInput = document.getElementById("postcode");
            const feedback = document.getElementById("postcodeFeedback");
            const postcode = postcodeInput.value.trim();
            feedback.textContent = "";

            if (!postcode) {
                feedback.textContent = "Please enter a postcode.";
                return;
            }

            try {
                const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
                const data = await response.json();

                if (data.status === 200) {
                    giftForm.submit();
                } else {
                    feedback.textContent = "Invalid UK postcode.";
                }
            } catch (error) {
                feedback.textContent = "Error checking postcode. Try again.";
                console.error(error);
            }
        });
    }

    // Collection Form Postcode Check
    const collectionForm = document.getElementById("collectionForm");
    if (collectionForm) {
        collectionForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const postcodeInput = document.getElementById("collectionPostcode");
            const feedback = document.getElementById("collectionPostcodeFeedback");
            const postcode = postcodeInput.value.trim();
            feedback.textContent = "";

            if (!postcode) {
                feedback.textContent = "Please enter a postcode.";
                return;
            }

            try {
                const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
                const data = await response.json();

                if (data.status === 200) {
                    collectionForm.submit();
                } else {
                    feedback.textContent = "Invalid UK postcode.";
                }
            } catch (error) {
                feedback.textContent = "Error checking postcode. Try again.";
                console.error(error);
            }
        });
    }
});



const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const [bar1, bar2, bar3] = menuButton.querySelectorAll('span');

let isOpen = false;

menuButton.addEventListener('click', () => {
    isOpen = !isOpen;
    mobileMenu.classList.toggle('hidden');

    bar1.classList.toggle('translate-y-[6px]');
    bar2.classList.toggle('opacity-0');
    bar3.classList.toggle('-rotate-45');
    bar3.classList.toggle('-translate-y-[6px]');
});



