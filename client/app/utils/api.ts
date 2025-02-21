const API_BASE = 'http://localhost:3000';

export const api = {
  // User onboarding
  createUser: async (data: { email: string; password: string }) => {
    try {
      console.log('createUser request data:', data);
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log('createUser raw response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        ok: response.ok,
        url: response.url,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const result = await response.json();
      console.log('createUser parsed result:', result);
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Get onboarding config
  getConfig: async () => {
    try {
      const response = await fetch(`${API_BASE}/config`);
      console.log('getConfig raw response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        ok: response.ok,
        url: response.url,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const result = await response.json();
      console.log('getConfig parsed result:', result);
      return result;
    } catch (error) {
      console.error('Error getting configuration:', error);
      throw error;
    }
  },

  // Update user profile onboarding
  updateProfile: async (data: {
    user_id: string;
    about_me?: string;
    street_address?: string;
    city?: string;
    state?: string;
    zip?: string;
    birthdate?: string;
  }) => {
    try {
      console.log('updateProfile called with data:', data);
      console.log('Call stack:', new Error().stack);

      const response = await fetch(`${API_BASE}/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: data.user_id,
          user_profiles: [{
            about_me: data.about_me,
            street_address: data.street_address,
            city: data.city,
            state: data.state,
            zip: data.zip,
            birthdate: data.birthdate,
          }],
        }),
      });
      console.log('updateProfile raw response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        ok: response.ok,
        url: response.url,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.log('updateProfile error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
  
      const result = await response.json();
      console.log('updateProfile parsed result:', result);
      return result;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Admin
  updateConfig: async (config: any) => {
    try {
      console.log('updateConfig request data:', config);
      const response = await fetch(`${API_BASE}/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ components: config }),
      });
      console.log('updateConfig raw response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        ok: response.ok,
        url: response.url,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const result = await response.json();
      console.log('updateConfig parsed result:', result);
      return result;
    } catch (error) {
      console.error('Error updating configuration:', error);
      throw error;
    }
  },

  // Data table
  getData: async () => {
    try {
      const response = await fetch(`${API_BASE}/data`);
      console.log('getData raw response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        ok: response.ok,
        url: response.url,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const results = await response.json();
      console.log('getData parsed result:', results);
      return results;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
};