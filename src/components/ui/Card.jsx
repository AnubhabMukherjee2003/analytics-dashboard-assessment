export function Card({ className = "", children, ...props }) {
    return (
      <div
        className={`rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-card-hover ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  export function CardHeader({ className = "", children, ...props }) {
    return (
      <div className={`px-5 py-4 border-b border-gray-200 ${className}`} {...props}>
        {children}
      </div>
    );
  }
  
  export function CardTitle({ className = "", children, ...props }) {
    return (
      <h3 className={`text-lg font-semibold leading-6 text-gray-900 ${className}`} {...props}>
        {children}
      </h3>
    );
  }
  
  export function CardDescription({ className = "", children, ...props }) {
    return (
      <p className={`mt-1 text-sm text-gray-500 ${className}`} {...props}>
        {children}
      </p>
    );
  }
  
  export function CardContent({ className = "", children, ...props }) {
    return (
      <div className={`p-5 ${className}`} {...props}>
        {children}
      </div>
    );
  }
  
  export function CardFooter({ className = "", children, ...props }) {
    return (
      <div className={`px-5 py-4 border-t border-gray-200 ${className}`} {...props}>
        {children}
      </div>
    );
  }