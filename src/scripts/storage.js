
export const authToken = {
    key: 'PROJECT_AUTH_TOKEN',
    get: function () {
        const data = localStorage.getItem(authToken.key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    },
    set: (value) => {
        localStorage.setItem(authToken.key, JSON.stringify(value));
    },
    remove: () => {
        localStorage.removeItem(authToken.key);
    },
};

export const detailsSideBar = {
    key: 'PROJECT_DETIAL_SIDEBAR',
    get: function () {
        const data = localStorage.getItem(detailsSideBar.key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    },
    set: (value) => {
        localStorage.setItem(detailsSideBar.key, JSON.stringify(value));
    },
    remove: () => {
        localStorage.removeItem(detailsSideBar.key);
    },
};

