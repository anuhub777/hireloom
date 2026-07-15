import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";
  
  const COLORS = [
    "#2563EB",
    "#EAB308",
    "#9333EA",
    "#22C55E",
    "#EF4444",
  ];
  
  function StatusPieChart({
    appliedCount,
    oaCount,
    interviewCount,
    offerCount,
    rejectedCount,
  }) {
  
    const data = [
      { name: "Applied", value: appliedCount },
      { name: "OA", value: oaCount },
      { name: "Interview", value: interviewCount },
      { name: "Offer", value: offerCount },
      { name: "Rejected", value: rejectedCount },
    ];
  
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Application Status
        </h2>
  
        <div className="h-80">
          <ResponsiveContainer>
            <PieChart>
  
              <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
  
              <Tooltip />
  
              <Legend />
  
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default StatusPieChart;