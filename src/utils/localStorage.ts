export function setLocalStorage(username: string, password: string): void {
    localStorage.setItem("login", JSON.stringify({
        username: username,
        password: password
    }))
}

export function getLocalStorage(item: string) {
    return JSON.parse(localStorage.getItem(item) || "{}");
}