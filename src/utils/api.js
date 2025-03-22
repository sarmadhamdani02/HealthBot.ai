export const sendMessageToHealthBot = async (userMessage) => {
    try {
        const response = await fetch("http://localhost:5000/healthbot_chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: userMessage }),
        });

        const data = await response.json();
        return data.answer; // Extract response
    } catch (error) {
        console.error("Error calling HealthBot API:", error);
        return "Sorry, something went wrong.";
    }
};
