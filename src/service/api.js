import axios from 'axios';
import { getHeadersAndParams } from '../utils/common-utils';

export const getData = async (formData, jsonText, paramData, headerData, authData) => {
    
    const apiType = formData.type.toLowerCase(); 
    const apiUrl = formData.url;
    let apiHeaders = getHeadersAndParams(headerData);
    const apiParams = getHeadersAndParams(paramData);

    if (authData?.type === 'bearer' && authData.token) {
        apiHeaders['Authorization'] = `Bearer ${authData.token}`;
    } else if (authData?.type === 'basic' && (authData.username || authData.password)) {
        const encoded = btoa(`${authData.username || ''}:${authData.password || ''}`);
        apiHeaders['Authorization'] = `Basic ${encoded}`;
    }

    let parsedBody = null;
    if (jsonText && (apiType === 'post' || apiType === 'put' || apiType === 'patch' || apiType === 'delete')) {
        try {
            parsedBody = JSON.parse(jsonText);
        } catch {
            parsedBody = jsonText;
        }
    }

    try {
        const startTime = new Date().getTime();
        const response = await axios({
            method: apiType,
            url: apiUrl,
            data: parsedBody,
            headers: apiHeaders,
            params: apiParams
        });
        const endTime = new Date().getTime();

        return {
            status: response.status,
            statusText: response.statusText,
            time: endTime - startTime,
            size: formatBytes(JSON.stringify(response.data || '').length + JSON.stringify(response.headers || '').length),
            headers: response.headers,
            data: response.data
        };
    } catch (error) {
        console.log('Error while getting the response ', error);
        
        if (error.response) {
            return {
                isError: true,
                status: error.response.status,
                statusText: error.response.statusText,
                time: 0,
                size: formatBytes(JSON.stringify(error.response.data || '').length),
                headers: error.response.headers,
                data: error.response.data
            };
        }
        
        return 'error';
    }
}

const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}