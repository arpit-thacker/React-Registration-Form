export const isStrongPassword = (password: string): boolean => {

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);

};

export const validatePassword = (
    password: string
): string => {

    if (password.trim() === "") {
        return "";
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
        return "Password must contain uppercase, lowercase, number and special character.";
    }

    return "";

};

export const getPasswordStrength = (
    password: string
): "Weak" | "Medium" | "Strong" => {

    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 2) {
        return "Weak";
    }

    if (score <= 4) {
        return "Medium";
    }

    return "Strong";

};

export const getPasswordRequirements = (password: string) => {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@$!%*?&]/.test(password),
  };
};

export const getPasswordMatchStatus = (
    password: string,
    confirmPassword: string
): string => {

    if (!confirmPassword) {
        return "";
    }

    return password === confirmPassword
        ? "Matched"
        : "Not Matched";
};
