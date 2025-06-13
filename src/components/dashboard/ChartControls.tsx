
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Minus } from "lucide-react";

interface ChartConfig {
  id: string;
  type: 'bar' | 'line' | 'pie';
  title: string;
  data: any[];
  color: string;
  width: number;
  height: number;
}

interface ChartControlsProps {
  charts: ChartConfig[];
  selectedChart: string | null;
  onSelectChart: (chartId: string | null) => void;
  onUpdateChart: (chartId: string, updates: Partial<ChartConfig>) => void;
  onDeleteChart: (chartId: string) => void;
}

const ChartControls = ({ 
  charts, 
  selectedChart, 
  onSelectChart, 
  onUpdateChart, 
  onDeleteChart 
}: ChartControlsProps) => {
  const [newDataPoint, setNewDataPoint] = useState({ label: '', value: '' });

  const currentChart = charts.find(chart => chart.id === selectedChart);

  if (!selectedChart || !currentChart) {
    return (
      <div className="text-center text-slate-500 py-8">
        <p>Select a chart to customize its properties</p>
      </div>
    );
  }

  const updateProperty = (property: keyof ChartConfig, value: any) => {
    onUpdateChart(selectedChart, { [property]: value });
  };

  const addDataPoint = () => {
    if (!newDataPoint.label || !newDataPoint.value) return;
    
    const newPoint = {
      label: newDataPoint.label,
      value: parseFloat(newDataPoint.value)
    };
    
    updateProperty('data', [...currentChart.data, newPoint]);
    setNewDataPoint({ label: '', value: '' });
  };

  const removeDataPoint = (index: number) => {
    const newData = currentChart.data.filter((_, i) => i !== index);
    updateProperty('data', newData);
  };

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Cyan', value: '#06b6d4' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-slate-900 mb-2">Chart Selection</h4>
        <Select value={selectedChart} onValueChange={onSelectChart}>
          <SelectTrigger>
            <SelectValue placeholder="Select a chart" />
          </SelectTrigger>
          <SelectContent>
            {charts.map((chart) => (
              <SelectItem key={chart.id} value={chart.id}>
                {chart.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Chart Title</Label>
          <Input
            id="title"
            value={currentChart.title}
            onChange={(e) => updateProperty('title', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="type">Chart Type</Label>
          <Select value={currentChart.type} onValueChange={(value) => updateProperty('type', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="color">Color</Label>
          <Select value={currentChart.color} onValueChange={(value) => updateProperty('color', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              value={currentChart.width}
              onChange={(e) => updateProperty('width', parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              value={currentChart.height}
              onChange={(e) => updateProperty('height', parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-2">Data Points</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {currentChart.data.map((point, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span className="flex-1">{point.label}: {point.value}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeDataPoint(index)}
                className="h-6 w-6 p-0"
              >
                <Minus className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Label"
              value={newDataPoint.label}
              onChange={(e) => setNewDataPoint(prev => ({ ...prev, label: e.target.value }))}
              className="text-sm"
            />
            <Input
              placeholder="Value"
              type="number"
              value={newDataPoint.value}
              onChange={(e) => setNewDataPoint(prev => ({ ...prev, value: e.target.value }))}
              className="text-sm"
            />
          </div>
          <Button onClick={addDataPoint} size="sm" className="w-full">
            <Plus className="w-3 h-3 mr-1" />
            Add Point
          </Button>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button
          variant="destructive"
          onClick={() => onDeleteChart(selectedChart)}
          className="w-full"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Chart
        </Button>
      </div>
    </div>
  );
};

export default ChartControls;
