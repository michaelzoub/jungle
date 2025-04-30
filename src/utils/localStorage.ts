export function setLocalStorage() {

}

export function getLocalStorage(item: string) {
    return JSON.parse(localStorage.getItem(item) || "[]");
}