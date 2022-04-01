const api = {
  loadWidget: async (partnerId) => {
    const response = await fetch(`${process.env.DATA_URL}${partnerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  },
};

export default api;
