const webStorageFieldPrefix = "sputnik.";

export function getItemWebStorage(key: string) {
    const localPersist = localStorage.getItem("sputnik.persist");
    const persist = localPersist && JSON.parse(localPersist);
    let itemLocal: any;
    let item: any;
    if (persist) {
        itemLocal = localStorage.getItem(webStorageFieldPrefix + key);
        item = itemLocal && JSON.parse(itemLocal);
    } else {
        itemLocal = sessionStorage.getItem(webStorageFieldPrefix + key);
        item = itemLocal && JSON.parse(itemLocal);
    }
    return item || undefined;
}

export function setItemWebStorage(key: string, value: any) {
    const localPersist = localStorage.getItem("sputnik.persist");
    const persist = localPersist && JSON.parse(localPersist);
    if (persist) {
        localStorage.setItem(
            webStorageFieldPrefix + key,
            JSON.stringify(value)
        );
    } else {
        sessionStorage.setItem(
            webStorageFieldPrefix + key,
            JSON.stringify(value)
        );
    }
}

export function getItemSessionStorage(key: string) {
    const itemLocal = sessionStorage.getItem(webStorageFieldPrefix + key);
    const item = itemLocal && JSON.parse(itemLocal);
    return item;
}
export function setItemSessionStorage(key: string, value: any) {
    sessionStorage.setItem(webStorageFieldPrefix + key, JSON.stringify(value));
}

export function clearWebStorage() {
    localStorage.clear();
    sessionStorage.clear();
}
