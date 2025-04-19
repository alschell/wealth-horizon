
export const validateEmail = (email: string): string | null => {
  try {
    if (!email.trim()) return null;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? null : "Please enter a valid email address";
  } catch (error) {
    console.error("Email validation error:", error);
    return "Email validation failed";
  }
};
