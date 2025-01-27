'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface CertificateData {
  timestamp: bigint;
  isValid: boolean;
}

interface ActivityChartProps {
  data: CertificateData[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  // Prépare les données pour le graphique
  const processData = () => {
    const now = new Date();
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setMonth(now.getMonth() - (11 - i));
      return {
        month: d.toLocaleString('default', { month: 'short' }),
        count: 0,
        timestamp: d.getTime(),
      };
    });

    // Compte les certificats par mois
    data.forEach(cert => {
      const certDate = new Date(Number(cert.timestamp) * 1000);
      const monthIndex = months.findIndex(m => {
        const month = new Date(m.timestamp);
        return month.getMonth() === certDate.getMonth() &&
               month.getFullYear() === certDate.getFullYear();
      });
      
      if (monthIndex !== -1 && cert.isValid) {
        months[monthIndex].count++;
      }
    });

    return months;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={processData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis 
          dataKey="month"
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
        />
        <YAxis 
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
          cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
        />
        <Bar
          dataKey="count"
          fill="#3B82F6"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
