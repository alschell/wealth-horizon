
// Helper function to generate Monte Carlo simulation data
export const generateMonteCarloData = (riskFactor: number) => {
  const baseValue = 1000000;
  const volatility = riskFactor / 50; // Convert 0-100 scale to 0-2 scale
  const years = 20;
  const simulations = 10;
  
  const result = [];
  
  for (let year = 0; year <= years; year++) {
    const yearData: any = { year };
    
    for (let sim = 1; sim <= simulations; sim++) {
      // Different expected returns based on simulation path
      const expectedReturn = 0.06 + (sim * 0.005);
      
      if (year === 0) {
        yearData[`sim${sim}`] = baseValue;
      } else {
        const previousValue = result[year - 1][`sim${sim}`];
        const randomReturn = expectedReturn + ((Math.random() - 0.5) * volatility);
        yearData[`sim${sim}`] = Math.round(previousValue * (1 + randomReturn));
      }
    }
    
    // Calculate percentiles
    const simValues = [];
    for (let sim = 1; sim <= simulations; sim++) {
      simValues.push(yearData[`sim${sim}`]);
    }
    
    simValues.sort((a, b) => a - b);
    yearData.min = simValues[0];
    yearData.p25 = simValues[Math.floor(simulations * 0.25)];
    yearData.median = simValues[Math.floor(simulations * 0.5)];
    yearData.p75 = simValues[Math.floor(simulations * 0.75)];
    yearData.max = simValues[simulations - 1];
    
    result.push(yearData);
  }
  
  return result;
};

// Sample data for stress test scenarios
export const stressTestData = [
  { year: 2023, baseline: 1000000, marketCrash: 1000000, recession: 1000000, inflation: 1000000 },
  { year: 2024, baseline: 1060000, marketCrash: 800000, recession: 950000, inflation: 1020000 },
  { year: 2025, baseline: 1123600, marketCrash: 840000, recession: 940000, inflation: 1030200 },
  { year: 2026, baseline: 1191016, marketCrash: 890400, recession: 968000, inflation: 1030200 },
  { year: 2027, baseline: 1262477, marketCrash: 943824, recession: 997040, inflation: 1040502 },
  { year: 2028, baseline: 1338226, marketCrash: 1000453, recession: 1026951, inflation: 1050907 },
  { year: 2029, baseline: 1418519, marketCrash: 1060480, recession: 1057760, inflation: 1061416 },
  { year: 2030, baseline: 1503630, marketCrash: 1124109, recession: 1089493, inflation: 1072030 }
];

// Chart configurations
export const monteCarloConfig = {
  median: { label: "Median Outcome", color: "#3B82F6" },
  p25: { label: "25th Percentile", color: "#D1D5DB" },
  p75: { label: "75th Percentile", color: "#D1D5DB" },
  min: { label: "Minimum", color: "#EF4444" },
  max: { label: "Maximum", color: "#10B981" }
};

export const stressTestConfig = {
  baseline: { label: "Baseline", color: "#3B82F6" },
  marketCrash: { label: "Market Crash", color: "#EF4444" },
  recession: { label: "Recession", color: "#F59E0B" },
  inflation: { label: "High Inflation", color: "#8B5CF6" }
};
