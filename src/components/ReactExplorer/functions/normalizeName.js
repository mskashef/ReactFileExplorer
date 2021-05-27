export default function (name) {
    if (name.length > 20)
        return name.slice(0, 15) + '...';
    return name;
}