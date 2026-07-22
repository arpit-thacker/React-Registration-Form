import { useEffect, useState, useRef } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import { toast } from "react-toastify";
import {
  isStrongPassword,
  getPasswordStrength,
  getPasswordMatchStatus,
  validatePassword,
} from "../utils/passwordValidation";
import type {
  RegistrationFormData,
  RegistrationErrors,
} from "../types/registration";
import { validateRegistration } from "../utils/registrationValidation";
import { getCurrentDateTime } from "../utils/dateTime";
import { stateCityData } from "../data/locationData";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import PhoneInput from "../components/phoneInput";
import GenderSelect from "../components/GenderSelect";

function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    countryCode: "+91",
    mobile: "",
    state: "",
    city: "",
    gender: null,
    registrationDateTime: getCurrentDateTime(),
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<RegistrationErrors>({});

  const [loading, setLoading] = useState(false);

  const [showStateOptions, setShowStateOptions] = useState(false);
  const [showCityOptions, setShowCityOptions] = useState(false);

  const [activeStateIndex, setActiveStateIndex] = useState(-1);
  const [activeCityIndex, setActiveCityIndex] = useState(-1);

  const stateDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormData((prev) => ({
        ...prev,
        registrationDateTime: getCurrentDateTime(),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const validate = (): boolean => {
    const newErrors = validateRegistration(formData);

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* const { name, value } = e.target; */
    const { name } = e.target;
    let { value } = e.target;

    if (name === "firstName") {
      value = value.trimStart();
      value = value.replace(/[^A-Za-z]/g, "");
      value = value.charAt(0).toUpperCase() + value.slice(1);
      value = value.slice(0, 20);
    }

    if (name === "lastName") {
      value = value.trimStart();
      value = value.replace(/[^A-Za-z]/g, "");
      value = value.charAt(0).toUpperCase() + value.slice(1);
      value = value.slice(0, 20);
    }

    if (name === "email") {
      value = value.replace(/\s/g, "");
      value = value.toLowerCase();
    }

    if (name === "companyName") {
      value = value.trimStart();
      value = value.replace(/[^A-Za-z0-9\s.&'-]/g, "");
      value = value.replace(/\s+/g, " ");

      value = value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      value = value.slice(0, 45);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const updatedErrors = {
        ...prev,
        [name]: "",
      };

      if (name === "email") {
        if (value.trim() === "") {
          updatedErrors.email = "";
        } else if (!isValidEmail(value)) {
          updatedErrors.email = "Please enter a valid email address";
        } else {
          updatedErrors.email = "";
        }
      }

      if (name === "password") {
        if (value.trim() === "") {
          updatedErrors.password = "";
        } else {
          updatedErrors.password = validatePassword(value);
        }
      }

      if (name === "password") {
        if (value.trim() === "") {
          updatedErrors.password = "";
        } else {
          updatedErrors.password = validatePassword(value);
        }
      }

      return updatedErrors;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  /* const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }; */

  /*   const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;

    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: "",
    }));
  }; */

  /*   const cities = formData.state ? stateCityData[formData.state] : [];
   */

  const cities = stateCityData[formData.state] || [];
  console.log(stateCityData);
  const filteredStates = Object.keys(stateCityData).filter((state) =>
    state.toLowerCase().includes(formData.state.toLowerCase()),
  );

  const filteredCities = (cities || []).filter((city) =>
    city.toLowerCase().includes(formData.city.toLowerCase()),
  );

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <span className="highlight">{match}</span>
        {after}
      </>
    );
  };

  useEffect(() => {
    if (activeStateIndex >= 0 && stateDropdownRef.current) {
      const activeOption = stateDropdownRef.current.children[
        activeStateIndex
      ] as HTMLElement;

      activeOption?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeStateIndex]);

  useEffect(() => {
    if (activeCityIndex >= 0 && cityDropdownRef.current) {
      const activeOption = cityDropdownRef.current.children[
        activeCityIndex
      ] as HTMLElement;

      activeOption?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeCityIndex]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields.", {
        toastId: "validation-error",
      });
      return;
    }

    setLoading(true);

    try {
      // simulate API

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Registration Successful!");
      console.log(formData);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        countryCode: "+91",
        mobile: "",
        state: "",
        city: "",
        agreeTerms: false,
        gender: null,
        registrationDateTime: getCurrentDateTime(),
        password: "",
        confirmPassword: "",
        rememberMe: false,
      });
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const confirmPasswordStatus = getPasswordMatchStatus(
    formData.password,
    formData.confirmPassword,
  );

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>EduTech Registration</h2>

        <TextInput
          label="First Name"
          required
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={formData.firstName}
          error={errors.firstName}
          onChange={handleChange}
        />

        <TextInput
          label="Last Name"
          required
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          value={formData.lastName}
          error={errors.lastName}
          onChange={handleChange}
        />

        <TextInput
          label="Email"
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
        />

        <TextInput
          label="Company Name"
          required
          type="text"
          name="companyName"
          placeholder="Enter Company Name"
          value={formData.companyName}
          error={errors.companyName}
          onChange={handleChange}
        />

        <PhoneInput
          required
          countryCode={formData.countryCode}
          mobile={formData.mobile}
          error={errors.mobile}
          onCountryChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              countryCode: e.target.value,
            }))
          }
          onMobileChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              // mobile: e.target.value,
              mobile: e.target.value.replace(/\D/g, "")
            }))
          }
        />
        {/* <div className="form-group searchable-dropdown">
  <label htmlFor="state">
    State <span className="required">*</span>
  </label>

  <input
    type="text"
    id="state"
    name="state"
    placeholder="Type or select state"
    value={formData.state}
    onChange={(e) => {
      setFormData((prev) => ({
        ...prev,
        state: e.target.value,
        city: "",
      }));
      setShowStateOptions(true);
      setActiveStateIndex(-1);
    }}
    onFocus={() => setShowStateOptions(true)}
    onBlur={() => setTimeout(() => setShowStateOptions(false), 150)}
    onKeyDown={(e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveStateIndex((prev) =>
          prev < filteredStates.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveStateIndex((prev) => (prev > 0 ? prev - 1 : 0));
          } else if (e.key === "Enter") {
      if (activeStateIndex >= 0) {
        e.preventDefault();
        const selectedState = filteredStates[activeStateIndex];
        setFormData((prev) => ({
          ...prev,
          state: selectedState,
          city: "",
        }));
        setShowStateOptions(false);
      } else if (filteredStates.length > 0) {
        e.preventDefault();
        const selectedState = filteredStates[0];
        setFormData((prev) => ({
          ...prev,
          state: selectedState,
          city: "",
        }));
        setShowStateOptions(false);
      }
    }
    }}
    className="input"
  />

  {showStateOptions && filteredStates.length > 0 && (
      <div className="dropdown-options" ref={stateDropdownRef}>
        {filteredStates.map((state, index) => (
        <div
          key={state}
          className={`dropdown-option ${
            index === activeStateIndex ? "active" : ""
          }`}
          onMouseDown={() => {
            setFormData((prev) => ({
              ...prev,
              state,
              city: "",
            }));
            setShowStateOptions(false);
          }}
        >
          {highlightMatch(state, formData.state)}
        </div>
      ))}
    </div>
  )}

  {errors.state && <p className="error">{errors.state}</p>}
</div> */}

        <div className="form-group searchable-dropdown">
          <div className="input-wrapper">
            <input
              type="text"
              id="state"
              name="state"
              placeholder=" "
              value={formData.state}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  state: e.target.value,
                  city: "",
                }));
                setShowStateOptions(true);
                setActiveStateIndex(-1);
              }}
              onFocus={() => setShowStateOptions(true)}
              onBlur={() => setTimeout(() => setShowStateOptions(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveStateIndex((prev) =>
                    prev < filteredStates.length - 1 ? prev + 1 : prev,
                  );
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveStateIndex((prev) => (prev > 0 ? prev - 1 : 0));
                } else if (e.key === "Enter") {
                  if (activeStateIndex >= 0) {
                    e.preventDefault();
                    const selectedState = filteredStates[activeStateIndex];
                    setFormData((prev) => ({
                      ...prev,
                      state: selectedState,
                      city: "",
                    }));
                    setShowStateOptions(false);
                  } else if (filteredStates.length > 0) {
                    e.preventDefault();
                    const selectedState = filteredStates[0];
                    setFormData((prev) => ({
                      ...prev,
                      state: selectedState,
                      city: "",
                    }));
                    setShowStateOptions(false);
                  }
                }
              }}
              className="input"
            />

            <label htmlFor="state">
              State <span className="required">*</span>
            </label>
          </div>

          {showStateOptions && filteredStates.length > 0 && (
            <div className="dropdown-options" ref={stateDropdownRef}>
              {filteredStates.map((state, index) => (
                <div
                  key={state}
                  className={`dropdown-option ${
                    index === activeStateIndex ? "active" : ""
                  }`}
                  onMouseDown={() => {
                    setFormData((prev) => ({
                      ...prev,
                      state,
                      city: "",
                    }));
                    setShowStateOptions(false);
                  }}
                >
                  {highlightMatch(state, formData.state)}
                </div>
              ))}
            </div>
          )}

          {errors.state && <p className="error">{errors.state}</p>}
        </div>

        {/* <div className="form-group searchable-dropdown">
  <label htmlFor="city">
    City <span className="required">*</span>
  </label>

  <input
    type="text"
    id="city"
    name="city"
    placeholder="Type or select city"
    value={formData.city}
    onChange={(e) => {
      setFormData((prev) => ({
        ...prev,
        city: e.target.value,
      }));
      setShowCityOptions(true);
      setActiveCityIndex(-1);
    }}
    onFocus={() => setShowCityOptions(true)}
    onBlur={() => setTimeout(() => setShowCityOptions(false), 150)}
    onKeyDown={(e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveCityIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveCityIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
      if (activeCityIndex >= 0) {
        e.preventDefault();
        const selectedCity = filteredCities[activeCityIndex];
        setFormData((prev) => ({
          ...prev,
          city: selectedCity,
        }));
        setShowCityOptions(false);
      } else if (filteredCities.length > 0) {
        e.preventDefault();
        const selectedCity = filteredCities[0];
        setFormData((prev) => ({
          ...prev,
          city: selectedCity,
        }));
        setShowCityOptions(false);
      }
    }
    }}
    className="input"
    disabled={!formData.state}
  />

  {showCityOptions && filteredCities.length > 0 && (
    <div className="dropdown-options" ref={cityDropdownRef}>
{filteredCities.map((city, index) => (
        <div
          key={city}
          className={`dropdown-option ${
            index === activeCityIndex ? "active" : ""
          }`}
          onMouseDown={() => {
            setFormData((prev) => ({
              ...prev,
              city,
            }));
            setShowCityOptions(false);
          }}
        >
          {highlightMatch(city, formData.city)}
        </div>
      ))}
    </div>
  )}

  {errors.city && <p className="error">{errors.city}</p>}
</div> */}

        <div className="form-group searchable-dropdown">
          <div className="input-wrapper">
            <input
              type="text"
              id="city"
              name="city"
              placeholder=" "
              value={formData.city}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }));

                setShowCityOptions(true);
                setActiveCityIndex(-1);
              }}
              onFocus={() => {
                if (formData.state) {
                  setShowCityOptions(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => {
                  setShowCityOptions(false);
                }, 150);
              }}
              onKeyDown={(e) => {
                // Down Arrow
                if (e.key === "ArrowDown") {
                  e.preventDefault();

                  setActiveCityIndex((prev) =>
                    prev < filteredCities.length - 1 ? prev + 1 : prev,
                  );
                }

                // Up Arrow
                else if (e.key === "ArrowUp") {
                  e.preventDefault();

                  setActiveCityIndex((prev) => (prev > 0 ? prev - 1 : 0));
                }

                // Enter Selection
                else if (e.key === "Enter") {
                  e.preventDefault();

                  if (activeCityIndex >= 0) {
                    const selectedCity = filteredCities[activeCityIndex];

                    setFormData((prev) => ({
                      ...prev,
                      city: selectedCity,
                    }));
                  } else if (filteredCities.length > 0) {
                    setFormData((prev) => ({
                      ...prev,
                      city: filteredCities[0],
                    }));
                  }

                  setShowCityOptions(false);
                }

                // Escape Close
                else if (e.key === "Escape") {
                  setShowCityOptions(false);
                }
              }}
              className="input"
              disabled={!formData.state}
            />

            <label htmlFor="city">
              City <span className="required">*</span>
            </label>
          </div>

          {showCityOptions && filteredCities.length > 0 && (
            <div className="dropdown-options" ref={cityDropdownRef}>
              {filteredCities.map((city, index) => (
                <div
                  key={city}
                  className={`dropdown-option ${
                    index === activeCityIndex ? "active" : ""
                  }`}
                  onMouseDown={() => {
                    setFormData((prev) => ({
                      ...prev,
                      city,
                    }));

                    setShowCityOptions(false);
                  }}
                >
                  {highlightMatch(city, formData.city)}
                </div>
              ))}
            </div>
          )}

          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        {/* <div className="form-group">
          <label className="form-label">
            Gender
            <span className="required">*</span>
          </label>

          <div className="gender-group">
            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                onFocus={() => {
                if (!formData.gender) {
                  setFormData((prev) => ({
                    ...prev,
                    gender: "Male",
                  }));
                }
              }}
              />
              <span>Male</span>
            </label>

            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <span>Female</span>
            </label>

            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
              <span>Other</span>
            </label>
          </div>

          {errors.gender && <p className="error">{errors.gender}</p>}
        </div> */}

        <GenderSelect
          required
          value={formData.gender}
          error={errors.gender}
          onChange={(value) => {
            setFormData((prev) => ({
              ...prev,

              gender: value,
            }));
          }}
        />

        <TextInput
          label="Registration Date & Time"
          type="text"
          name="registrationDateTime"
          placeholder=""
          value={formData.registrationDateTime}
          readOnly
          tabIndex={-1}
          onChange={() => {}}
        />

        <PasswordInput
          required
          label="Password"
          name="password"
          placeholder="Password"
          value={formData.password}
          error={errors.password}
          strength={passwordStrength}
          onChange={handleChange}
        />

        <PasswordInput
          required
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          error={errors.confirmPassword}
          strength={confirmPasswordStatus}
          onChange={handleChange}
          disabled={!isStrongPassword(formData.password)}
        />

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
            />

            <span>Remember Me</span>
          </label>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleCheckboxChange}
            />

            <span>
              I agree to the Terms & Conditions{" "}
              <span className="required">*</span>
            </span>
          </label>

          {errors.agreeTerms && <p className="error">{errors.agreeTerms}</p>}
        </div>

        <div className="forgot-password">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Forgot password feature is coming soon.", {
                toastId: "forgot-password-toast",
              });
            }}
          >
            Forgot Password?
          </a>
        </div>

        <Button text="Register" type="submit" loading={loading} />

        <div className="divider">
          <span>OR</span>
        </div>

        <button type="button" className="social-btn google-btn">
          <FcGoogle size={22} />

          <span>Continue with Google</span>
        </button>

        <button type="button" className="social-btn">
          <FaApple size={20} />

          <span>Continue with Apple</span>
        </button>

        <button type="button" className="social-btn">
          <FaGithub size={20} />

          <span>Continue with GitHub</span>
        </button>

        <div className="login-link">
          <span>Already have an account?</span>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Login Page Coming Soon.", {
                toastId: "login-toast",
              });
            }}
          >
            Login
          </a>
        </div>

        <div className="footer">
          <p>&copy; 2026 EduTech. All rights reserved.</p>

          <div className="footer-links">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Not Available.", {
                  toastId: "login-toast",
                });
              }}
            >
              Privacy Policy
            </a>

            <span>•</span>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Not Available.", {
                  toastId: "login-toast",
                });
              }}
            >
              Terms of Service
            </a>

            <span>•</span>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Not Available.", {
                  toastId: "login-toast",
                });
              }}
            >
              Help
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
