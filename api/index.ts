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
    async request(url:string, query: any, options: any = {}, timeout: number = defaultTimeout) {
        options = { ...defaultOptions, ...options };

        // Set authorization header if token is provided
        // const token = localStorage.getItem('token');
        // if (token) {
        //     options.headers.Authorization = `Bearer ${token}`;
        // }

        // Set timeout if provided
        if (timeout) {
            options.timeout = timeout;
        }

        if(query && typeof query === 'object'){
            query = new URLSearchParams(query).toString()
        }else if(query && typeof query === 'string'){
            query = query.replace('?','')
        }


        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_URL}${url ? url : ''}${query ? '?' + query : ''}`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },
};

export default api;