export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key) {
    const storedData = localStorage.getItem(key);

    if (!storedData) {
        return null;
    }

    return JSON.parse(storedData);
}

export function removeData(key) {
    localStorage.removeItem(key);
}

export function clearStorage() {
    localStorage.clear();
}