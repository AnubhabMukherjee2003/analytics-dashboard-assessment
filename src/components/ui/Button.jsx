export function Button({
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
  }) {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors";
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
      secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm",
      ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
      outline: "border border-blue-500 text-blue-600 hover:bg-blue-50",
    };
    
    const sizes = {
      sm: "px-2.5 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    };
    
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }