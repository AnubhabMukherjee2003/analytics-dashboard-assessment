export function Select({
    label,
    options,
    value,
    onChange,
    className = "",
    size = "md",
    ...props
  }) {
    const sizes = {
      sm: "py-1.5 text-xs",
      md: "py-2 text-sm",
      lg: "py-2.5 text-base"
    };
    
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            value={value}
            onChange={onChange}
            className={`block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-3 pr-10 ${sizes[size]} shadow-sm 
                      transition-all duration-200 focus:border-primary-500 dark:focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-700/20
                      focus:outline-none hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-gray-100`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    );
  }