import instance from "common/config/api";

const itensService = {
    fetch: async () => {
        const response = await instance.get('/itens');

        return response.data;
    }
};

export default itensService;