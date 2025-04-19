const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
        <p className="ml-3 text-lg font-medium text-gray-700">Loading data...</p>
      </div>
    );
  };
  
  export default LoadingSpinner;