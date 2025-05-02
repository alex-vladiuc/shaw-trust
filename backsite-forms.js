document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3002/api/giftaid/unread-count")
        .then(res => res.json())
        .then(data => {
            console.log("Unread count response:", data); // <-- add this
            const countElement = document.getElementById("unreadCount");
            if (countElement) {
                countElement.innerText = data.count;
            } else {
                console.error("Element with ID 'unreadCount' not found.");
            }
        })

        .catch(err => {
            console.error("Error fetching unread count:", err);
        });
});