export function formatDate(isoString: string): string {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(date)
}

export function formatDateNumeric(isoString: string): string {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('en', {
        // dateStyle: 'short',
        // timeStyle: 'short',
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "UTC",
        timeZoneName: "short",
        hour12: false

    })
    return formatter.format(date)
}