export function formatDate(date: Date) {
    // format date to dd/mm/yyyy
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export function queryToStringOnly(query: string | string[] | undefined) {
    // eliminate array and undefined possibilities
    return Array.isArray(query) ? query[0] : (query ?? "")
}