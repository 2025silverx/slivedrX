import BASE_URL from './config.js'; // Ensure this path is correct

export const postData = async (endpoint, body) => {
    try {
        const url = `${BASE_URL}/${endpoint}`; // Construct the URL
        const response = await fetch(url, {
            method: 'POST', // Using POST method
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body), // Send data as JSON
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json(); // Return the response data
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
