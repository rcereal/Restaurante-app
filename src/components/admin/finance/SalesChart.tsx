"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesChartProps {
  data: any[]; // recebe a lista de pedidos
}

export function SalesChart({ data }: SalesChartProps) {
  // 1 Agrupar dados por data (ex: 20/12 -> R$ 500,00)
  // Usamos um Map para somar vendas do mesmo dia
  const chartData = data.reduce((acc: any[], order) => {
    const date = new Date(order.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });

    const existingDay = acc.find((item) => item.date === date);

    if (existingDay) {
      existingDay.amount += order.total_amount;
    } else {
      acc.push({ date, amount: order.total_amount });
    }

    return acc;
  }, []);

  if (chartData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Sem dados suficientes para o gráfico
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$ ${value}`}
          fontSize={12}
        />
        <Tooltip
          formatter={(value: any) => [
            `R$ ${Number(value).toFixed(2)}`,
            "Vendas",
          ]}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#ea580c" // Cor laranja do tema
          strokeWidth={3}
          dot={{ r: 4, fill: "#ea580c", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
