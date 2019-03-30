const debounced = (delay: number, fn: any) => {
    let timerId: NodeJS.Timer | null;
    return (...args: Event[]) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
};

export default debounced;
