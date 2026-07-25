// storage.js

export function saveData(key, data) {
    console.log("Saving:", key, data);
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key) {
    const storedData = localStorage.getItem(key);

    console.log("Loading:", key, storedData);

    if (!storedData) {
        return null;
    }

    return JSON.parse(storedData);
}