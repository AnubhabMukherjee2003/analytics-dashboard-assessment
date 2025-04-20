export function Badge({
    variant = "default",
    size = "md",
    className = "",
    children,
    ...props
  }) {
    const variants = {
      default: "bg-gray-100 text-gray-800",
      primary: "bg-primary-100 text-primary-800",
      secondary: "bg-secondary-100 text-secondary-800",
      success: "bg-success-100 text-success-800",
      danger: "bg-danger-100 text-danger-800",
      warning: "bg-warning-100 text-warning-800",
      info: "bg-blue-100 text-blue-800",
      outline: "bg-transparent border border-gray-300 text-gray-700",
    };
    
    const sizes = {
      xs: "text-xs px-1.5 py-0.5",
      sm: "text-xs px-2 py-0.5",
      md: "text-xs px-2.5 py-1",
      lg: "text-sm px-3 py-1.5",
    };
    
    return (
      <span
        className={`inline-flex items-center font-medium rounded-full transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }