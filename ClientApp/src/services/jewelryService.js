import axios from 'axios';

const baseUrl = '/api/jewelries';

const getAll = async () => {
    const result = await axios.get(baseUrl);
    return result.data;
};

const uploadJewelry = async (jewelry) => {
    const result = await axios.post(baseUrl, jewelry);
    return result;
};

const jewelryAvailabilityToFalse = async (jewelry) => {
    const updatedJewelry = { ...jewelry, availability: false };
    await axios.put(baseUrl, updatedJewelry);
};

const deleteJewelry = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, uploadJewelry, jewelryAvailabilityToFalse, deleteJewelry };