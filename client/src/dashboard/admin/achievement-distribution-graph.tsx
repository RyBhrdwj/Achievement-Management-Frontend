import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeProvider";
import { TooltipProps } from "recharts";
const lightColors = ["#6366F1", "#9333EA", "#06B6D4"];
const darkColors = ["#818CF8", "#A855F7", "#22D3EE"];

const data = [
  { name: "Accepted", value: 63 },
  { name: "Rejected", value: 25 },
  { name: "Pending", value: 12 },
];
type CustomTooltipProps = TooltipProps<number, string> & { theme: string };
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, theme }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-2 rounded-lg shadow-md"
          style={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
            color: theme === "dark" ? "#f1f5f9" : "#1e293b",
            border: "none",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow:
              theme === "dark"
                ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
                : "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  

export function AchievementDistributionGraph() {
  const { theme } = useTheme();

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-800 dark:text-gray-200 lg:text-xl text-sm">
          Achievement Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] lg:h-[335px] flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={3}
                strokeWidth={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      theme === "dark" ? darkColors[index] : lightColors[index]
                    }
                    className="transition-all duration-300 hover:scale-105 hover:brightness-110"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: "rgba(255, 255, 255, 0.05)" }} />


              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  fontSize: "14px",
                  color: theme === "dark" ? "#f1f5f9" : "#1e293b",
                  marginTop: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
