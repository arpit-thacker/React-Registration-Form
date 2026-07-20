export const isValidMobile = (mobile: string): boolean => {

    return /^[0-9]{10}$/.test(mobile);

};