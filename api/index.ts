import deepMerge from '../utils/deepMerge'

const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

const defaultOptions = {
    method: 'GET',
    headers: defaultHeaders,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
};

const defaultTimeout = 15000; // 10 seconds

const api = {
    async request(url: string, query?: any, options: any = {}, timeout: number = defaultTimeout) {
        options = deepMerge(defaultOptions, options)

        // Set timeout if provided
        if (timeout) {
            options.timeout = timeout;
        }

        if (query && typeof query === 'object') {
            query = new URLSearchParams(query).toString()
        } else if (query && typeof query === 'string') {
            query = query.replace('?', '')
        }

        console.log(query)
        console.log(`${process.env.NEXT_PUBLIC_ROUTE_URL}${url ? url : ''}${query ? ('?' + query) : ''}`)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_URL}${url ? url : ''}${query ? ('?' + query) : ''
                }`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },
};

export default api;