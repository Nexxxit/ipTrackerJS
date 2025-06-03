export function addOffset(map) {
    const offsetY = map.getSize().y * 0.2;

    map.panBy([0, -offsetY], {animation: false})
}