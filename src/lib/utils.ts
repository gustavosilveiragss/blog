export function formatDate(date: Date | string) {
    // format date to dd/mm/yyyy
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export function queryToStringOnly(query: string | string[] | undefined) {
    // eliminate array and undefined possibilities
    return Array.isArray(query) ? query[0] : (query ?? "")
}