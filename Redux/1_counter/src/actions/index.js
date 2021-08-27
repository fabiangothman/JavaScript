export const increment = (increment_num) => {
    return {
        type: 'INCREMENT',
        payload: increment_num
    };
};

export const decrement = (decrement_num) => {
    return {
        type: 'DECREMENT',
        payload: decrement_num
    };
};

