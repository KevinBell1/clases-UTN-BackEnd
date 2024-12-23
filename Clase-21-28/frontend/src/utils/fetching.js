const getAuthenticateHeaders = () => {
    const token = sessionStorage.getItem('access-token');
    if (!token) {
        throw new Error('No se encontró un token válido en el almacenamiento.');
    }

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};
export default getAuthenticateHeaders