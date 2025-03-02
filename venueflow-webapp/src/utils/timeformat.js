export default function formatTimestamp(ms) {
    return new Date(ms).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}