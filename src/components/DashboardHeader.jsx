const DashboardHeader = () => {
    return (
      <header className="bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <h1 className="text-3xl font-bold">Washington EV Population Dashboard</h1>
          <p className="mt-2 opacity-90">
            Interactive analytics of Electric Vehicle population in Washington State
          </p>
        </div>
      </header>
    );
  };
  
  export default DashboardHeader;