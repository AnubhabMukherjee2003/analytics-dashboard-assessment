# **Electric Vehicle Analytics Dashboard**

## **Overview**
This project provides an **interactive analytics dashboard** for exploring the **Electric Vehicle (EV) population data** in Washington State. It visualizes key insights and trends in EV adoption, vehicle specifications, geographic distribution, and more using charts and statistics.


## **Features**
- **Interactive Visualizations**: Multiple chart types (**bar**, **pie**, **line**) for different aspects of the EV dataset
- **Multi-tab Interface**: Organized by **Overview**, **Vehicles**, **Geography**, and **Details** sections
- **Responsive Design**: Works on **desktop** and **mobile devices**
- **Filter Capabilities**: Analyze data by specific parameters
- **Summary Statistics**: Key metrics displayed for quick insights

## **Technology Stack**
- **Frontend Framework**: React 19.0.0
- **Visualization Libraries**:
  - Chart.js / react-chartjs-2
  - Recharts
- **Data Processing**: PapaParse for CSV parsing
- **Styling**: Tailwind CSS
- **Build Tool**: Vite 6.3.1

## **Data Insights**
The dashboard provides key insights about the Washington EV population:
- **Vehicle Types**: Distribution between **Battery Electric Vehicles (BEV)** and **Plug-in Hybrid Electric Vehicles (PHEV)**
- **Popular Makes and Models**: Analysis of the most common manufacturers and vehicle models
- **Geographic Distribution**: County-level analysis of EV adoption
- **Battery Range Analysis**: Distribution of electric ranges across the vehicle population
- **Year-over-Year Growth**: Trends in EV adoption over time
- **Utility Distribution**: Analysis of electric utilities serving EV owners
- **CAFV Eligibility**: Clean Alternative Fuel Vehicle eligibility statistics


## **Local Development**
To run this project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ev-analytics-dashboard.git
   cd ev-analytics-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** at [http://localhost:5173](http://localhost:5173)

