export const depositMoney = (amount) => {
    return async (dispatch) => {
        dispatch({
            type: "DEPOSIT",
            payload: amount
        });
    }
};

export const withdrawMoney = (amount) => {
    return async (dispatch) => {
        dispatch({
            type: "WITHDRAW",
            payload: amount
        });
    }
};
