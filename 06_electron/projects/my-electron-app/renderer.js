document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".icon-btn");
    const output = document.getElementById("output");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const iconName = button.getAttribute("data-name");
            output.innerHTML = `Connect to server: <strong>${iconName}</strong>`;

            console.log(`User selected: ${iconName}`);

            // Highlight selected button
            buttons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
        });
    });
});
