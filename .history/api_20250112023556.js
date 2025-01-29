import BASE_URL from './config.js'; // Config file ka base URL import karein

// GET Request Function
export const fetchData = async (endpoint, params = {}) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('GET API Call Failed:', error);
        throw error;
    }
};

// POST Request Function
export const postData = async (endpoint, body = {}) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('POST API Call Failed:', error);
        throw error;
    }
};

// PUT Request Function
export const putData = async (endpoint, body = {}) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('PUT API Call Failed:', error);
        throw error;
    }
};

// DELETE Request Function
export const deleteData = async (endpoint) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('DELETE API Call Failed:', error);
        throw error;
    }
};
