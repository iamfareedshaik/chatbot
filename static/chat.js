document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbot = document.getElementById("chatbot");
    const chatbotClose = document.getElementById("chatbot-close");

    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatbotBody = document.getElementById("chatbot-body");
    let firstToggle = true;
    chatbotToggle.addEventListener("click", function () {
        chatbot.style.display = "block";
        chatbotToggle.style.display = "none";
        if (firstToggle) {
            const welcomeMessage = "Welcome to the chatbot! How can I assist you?";
            const welcomeMessageDiv = document.createElement("div");
            welcomeMessageDiv.className = "chatbot-message";
            welcomeMessageDiv.textContent = welcomeMessage;
            chatbotBody.appendChild(welcomeMessageDiv);
            firstToggle = false;
        }

    });

    chatbotClose.addEventListener("click", function () {
        chatbot.style.display = "none";
        chatbotToggle.style.display = "block";
    });

    sendButton.addEventListener("click", sendMessage);

    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        } else if (event.key === "Enter" && event.shiftKey) {
            userInput.value += "\n";
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();;
        if (userMessage) {
            const userMessageDiv = document.createElement("div");
            userMessageDiv.className = "user-message";
            userMessageDiv.textContent = userMessage;
            chatbotBody.appendChild(userMessageDiv);
            userInput.value = "";

            fetch('/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'user_input=' + encodeURIComponent(userMessage),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        setTimeout(function () {
                            const chatbotResponse = data.chatResponse;
                            const chatbotResponseDiv = document.createElement("div");
                            chatbotResponseDiv.className = "chatbot-message";
                            chatbotResponseDiv.textContent = chatbotResponse;
                            chatbotBody.appendChild(chatbotResponseDiv);
                        }, 1000);
                    }
                });
        }
    }


});
