
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3, LineChart, PieChart, Settings, Download, RefreshCw } from "lucide-react";
import D3BarChart from "../components/dashboard/D3BarChart";
import D3LineChart from "../components/dashboard/D3LineChart";
import D3PieChart from "../components/dashboard/D3PieChart";
import ChartControls from "../components/dashboard/ChartControls";

interface ChartConfig {
  id: string;
  type: 'bar' | 'line' | 'pie';
  title: string;
  data: any[];
  color: string;
  width: number;
  height: number;
}

const Dashboard = () => {
  const [charts, setCharts] = useState<ChartConfig[]>([
    {
      id: '1',
      type: 'bar',
      title: 'Ticket Status Distribution',
      data: [
        { label: 'Open', value: 45 },
        { label: 'In Progress', value: 32 },
        { label: 'Resolved', value: 78 },
        { label: 'Closed', value: 23 }
      ],
      color: '#3b82f6',
      width: 400,
      height: 300
    },
    {
      id: '2',
      type: 'line',
      title: 'Tickets Over Time',
      data: [
        { date: '2024-01', value: 120 },
        { date: '2024-02', value: 135 },
        { date: '2024-03', value: 148 },
        { date: '2024-04', value: 162 },
        { date: '2024-05', value: 179 },
        { date: '2024-06', value: 195 }
      ],
      color: '#10b981',
      width: 500,
      height: 300
    },
    {
      id: '3',
      type: 'pie',
      title: 'Priority Distribution',
      data: [
        { label: 'High', value: 25 },
        { label: 'Medium', value: 45 },
        { label: 'Low', value: 30 }
      ],
      color: '#f59e0b',
      width: 350,
      height: 350
    }
  ]);

  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const updateChart = (chartId: string, updates: Partial<ChartConfig>) => {
    setCharts(prev => prev.map(chart => 
      chart.id === chartId ? { ...chart, ...updates } : chart
    ));
  };

  const addNewChart = () => {
    const newChart: ChartConfig = {
      id: Date.now().toString(),
      type: 'bar',
      title: 'New Chart',
      data: [
        { label: 'A', value: 10 },
        { label: 'B', value: 20 },
        { label: 'C', value: 15 }
      ],
      color: '#8b5cf6',
      width: 400,
      height: 300
    };
    setCharts(prev => [...prev, newChart]);
  };

  const deleteChart = (chartId: string) => {
    setCharts(prev => prev.filter(chart => chart.id !== chartId));
    setSelectedChart(null);
  };

  const exportDashboard = () => {
    const dashboardData = JSON.stringify(charts, null, 2);
    const blob = new Blob([dashboardData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderChart = (chart: ChartConfig) => {
    switch (chart.type) {
      case 'bar':
        return <D3BarChart data={chart.data} color={chart.color} width={chart.width} height={chart.height} />;
      case 'line':
        return <D3LineChart data={chart.data} color={chart.color} width={chart.width} height={chart.height} />;
      case 'pie':
        return <D3PieChart data={chart.data} width={chart.width} height={chart.height} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dynamic Dashboard</h1>
          <p className="text-slate-600 mt-2">Create and customize interactive charts with D3.js</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addNewChart} className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Add Chart
          </Button>
          <Button variant="outline" onClick={exportDashboard} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Controls Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Chart Controls
              </CardTitle>
              <CardDescription>
                Select a chart to customize its properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartControls
                charts={charts}
                selectedChart={selectedChart}
                onSelectChart={setSelectedChart}
                onUpdateChart={updateChart}
                onDeleteChart={deleteChart}
              />
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {charts.map((chart) => (
              <Card 
                key={chart.id} 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedChart === chart.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedChart(chart.id)}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{chart.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    {chart.type === 'bar' && <BarChart3 className="w-4 h-4" />}
                    {chart.type === 'line' && <LineChart className="w-4 h-4" />}
                    {chart.type === 'pie' && <PieChart className="w-4 h-4" />}
                    {chart.type.charAt(0).toUpperCase() + chart.type.slice(1)} Chart
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    {renderChart(chart)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {charts.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Charts Yet</h3>
                <p className="text-slate-600 mb-4">Create your first chart to get started with the dashboard.</p>
                <Button onClick={addNewChart}>
                  Add Your First Chart
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
