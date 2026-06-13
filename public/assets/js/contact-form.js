// contact-form.js

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit");
    const overlay = document.getElementById("lottie-overlay");
    const maxMessages = 5;
    const cooldown = 60 * 60 * 1000; // 1 hour in ms

    let messageCount = parseInt(localStorage.getItem("messageCount")) || 0;
    let lastSentTime = parseInt(localStorage.getItem("lastSentTime")) || 0;

    // Load local Lottie animation
    const animation = lottie.loadAnimation({
        container: document.getElementById("lottie-container"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/images/logo/Email successfully sent.json' // Relative path from JS file
    });

    const triggerAnimation = () => {
        overlay.style.display = "flex";

        const play = () => {
            animation.removeEventListener('DOMLoaded', play);
            animation.goToAndPlay(0, true);
        };

        if (animation.isLoaded) {
            play();
        } else {
            animation.addEventListener('DOMLoaded', play);
        }
    };

    const handleAnimationCompletion = () => {
        overlay.style.display = "none";
    };

    animation.addEventListener('complete', handleAnimationCompletion);
    animation.addEventListener('data_failed', handleAnimationCompletion);

    function checkLimit() {
        const now = Date.now();
        if (messageCount >= maxMessages && now - lastSentTime < cooldown) {
            submitBtn.disabled = true;
            submitBtn.querySelector(".btn-text").innerText = "Limit Reached";
            return false;
        } else if (now - lastSentTime >= cooldown) {
            messageCount = 0;
            localStorage.setItem("messageCount", messageCount);
        }
        submitBtn.disabled = false;
        submitBtn.querySelector(".btn-text").innerText = "Send Appointment";
        return true;
    }

    checkLimit();

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (!checkLimit()) return;

        triggerAnimation();

        // Disable submit button and update text
        submitBtn.disabled = true;
        submitBtn.querySelector(".btn-text").innerText = "Submitted";

        // Update message count and timestamp
        messageCount++;
        lastSentTime = Date.now();
        localStorage.setItem("messageCount", messageCount);
        localStorage.setItem("lastSentTime", lastSentTime);

        // Silent form submit via hidden iframe using prototype method to avoid name conflict
        HTMLFormElement.prototype.submit.call(form);
        form.reset();
    });

    // Enable submit if user edits any input field
    form.querySelectorAll("input, textarea").forEach(field => {
        field.addEventListener("input", () => {
            checkLimit();
        });
    });

});
