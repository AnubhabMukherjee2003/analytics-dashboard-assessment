export function Button({
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
  }) {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm focus:ring-primary-500/50 focus:ring-offset-white",
      secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm focus:ring-gray-400/50 focus:ring-offset-white",
      ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-400/50 focus:ring-offset-white",
      outline: "border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500/50 focus:ring-offset-white",
      danger: "bg-danger-600 text-white hover:bg-danger-700 shadow-sm focus:ring-danger-500/50 focus:ring-offset-white",
      success: "bg-success-600 text-white hover:bg-success-700 shadow-sm focus:ring-success-500/50 focus:ring-offset-white"
    };
    
    const sizes = {
      xs: "px-2 py-1 text-xs",
      sm: "px-2.5 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
      xl: "px-6 py-3 text-base"
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