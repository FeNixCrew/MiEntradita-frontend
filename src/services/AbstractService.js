import axiosInstance from './axiosInstance';

class AbstractService {

    constructor(path) {
        this.axios = axiosInstance;
        this.path = path;
    }
}

export default AbstractService;