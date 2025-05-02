document.getElementById("statusForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const ref = document.getElementById("refNumber").value.trim();
    const last = document.getElementById("lastName").value.trim().toLowerCase();
    const post = document.getElementById("postcode").value.trim().toUpperCase();
    const resultBox = document.getElementById("statusResult");
    const text = document.getElementById("statusText");
    const icon = document.getElementById("statusIcon");

    let statusMessage;

    if (ref) {
        statusMessage = "Your item is currently in the van and out for delivery. ETA: 2:30 PM.";
        icon.innerHTML = '<i class="fas fa-truck fa-2xl"></i>';
    } else if (last && post) {
        statusMessage = "Your item is in inventory awaiting dispatch.";
        icon.innerHTML = '<i class="fas fa-warehouse fa-2xl"></i>';
    } else {
        statusMessage = "Please enter a reference number or both last name and postcode.";
        icon.innerHTML = '<i class="fas fa-exclamation-triangle fa-2xl"></i>';
    }

    text.textContent = statusMessage;
    resultBox.classList.remove("hidden");
});
