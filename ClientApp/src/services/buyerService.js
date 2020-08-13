import axios from 'axios';

const baseUrl = '/api/buyers';

const addBuyerToDataBase = async (buyer) => {
    const res = await axios.post(baseUrl, buyer);
    return res.data;
}

const getBuyers = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const deleteBuyer = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
};

export default { addBuyerToDataBase, getBuyers, deleteBuyer };