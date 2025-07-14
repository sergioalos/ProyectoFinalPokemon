export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
export const authHeader = () => {
  const token = getToken();
  if (token) {
    return {
      Authorization: `Bearer ${token}`
    };
  } else {
    return {};
  }
};