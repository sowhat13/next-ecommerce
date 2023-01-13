export default function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (targetValue && typeof targetValue === 'object' && sourceValue && typeof sourceValue === 'object') {
            deepMerge(targetValue, sourceValue);
        } else {
            target[key] = sourceValue;
        }
    }
    return target;
}