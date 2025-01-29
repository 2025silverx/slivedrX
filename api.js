import BASE_URL from './config.js'; // Ensure this path is correct

export async function poddstData(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json(); // Return JSON response
    } catch (error) {
        console.error("API Error:", error);
        return { success: false, message: "Network error" };
    }
}
