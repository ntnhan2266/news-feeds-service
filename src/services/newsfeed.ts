import api from './api';

export const list = (data) => {
    let query = `sortBy=publishedAt`
    if (data.sortBy) {
        query = `sortBy=${data.sortBy}`
    }
    if (data.order) {
        query += `&order=${data.order}`
    }
    if (data.filter) {
        query += `&filter=${data.filter}`
    }
    if (data.filterBy) {
        query += `&filterBy=${data.filterBy}`
    }
    return api.get(`newsfeeds?${query}`);
}

export const addSource = (source) => {
    return api.post('newsfeeds/add-source', {source});
}

export const deleteSource = (source) => {
    return api.delete(`newsfeeds/source?source=${source}`);
}

export const getSources = () => {
    return api.get('newsfeeds/sources');
}