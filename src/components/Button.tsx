import type { ButtonProps } from "../types/button";

function Button({
  text,
  type = "button",
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className="btn"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? "Please Wait..." : text}
    </button>
  );
}

export default Button;
