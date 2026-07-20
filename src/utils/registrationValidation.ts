import type { RegistrationErrors, RegistrationFormData, } from "../types/registration";
import { isValidEmail } from "./emailValidation";
import { isValidMobile } from "./mobileValidation";
import { isStrongPassword } from "./passwordValidation";

export const validateRegistration = (
    formData: RegistrationFormData
): RegistrationErrors => {

    const errors: RegistrationErrors = {};

    if (!formData.firstName.trim()) {
        errors.firstName = "First Name is required";
    } else if (formData.firstName.trim().length < 3) {
        errors.firstName = "First name must be at least 3 characters.";
    } else if (formData.firstName.trim().length > 20) {
        errors.firstName = "First name cannot exceed 20 characters.";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName.trim())) {
        errors.firstName = "First name can contain only alphabets.";
    }

    if (!formData.lastName.trim()) {
        errors.lastName = "Last Name is required";
    } else if (formData.firstName.trim().length < 3) {
        errors.firstName = "Last name must be at least 3 characters.";
    } else if (formData.firstName.trim().length > 20) {
        errors.firstName = "Last name cannot exceed 20 characters.";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName.trim())) {
        errors.firstName = "Last name can contain only alphabets.";
    }

    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
        errors.email = "Invalid Email";
    }

    if (!formData.companyName.trim()) {
        errors.companyName = "Company Name is required";
    } else if (formData.companyName.trim().length > 45) {
        errors.companyName = "Company name cannot exceed 45 characters.";
    }

    if (!formData.mobile.trim()) {
        errors.mobile = "Mobile Number is required";
    } else if (!isValidMobile(formData.mobile)) {
        errors.mobile = "Invalid Mobile Number";
    }

    if (!formData.state) {
        errors.state = "State is required.";
    }

    if (!formData.city) {
        errors.city = "City is required.";
    }

    if (!formData.gender) {
        errors.gender = "Gender is required";
    }

    if (!formData.password.trim()) {
        errors.password = "Password is required";
    } else if (!isStrongPassword(formData.password)) {
        errors.password =
            "Password must contain uppercase, lowercase, number and special character.";
    }

    if (!formData.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm Password is required";
    } else if (
        formData.password !== formData.confirmPassword
    ) {
        errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
        errors.agreeTerms = "Please accept the Terms & Conditions.";
    }

    return errors;

};