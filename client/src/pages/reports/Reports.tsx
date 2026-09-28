import { PageHeader, Card, Button } from '../../components/common';
import { BarChart3, Download, FileText, PieChart } from 'lucide-react';

export function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Reports & Analytics" 
        description="Generate compliance, financial, and operational reports."
      >
        <Button variant="primary" className="gap-2">
          <Download size={16} />
          Export All
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 hover:border-primary transition-colors cursor-pointer group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
            <BarChart3 size={24} />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Asset Valuation Report</h3>
          <p className="text-sm text-text-secondary mb-4">Financial overview of all registered assets including depreciation and current book value.</p>
          <Button variant="outline" className="w-full">Generate</Button>
        </Card>

        <Card className="p-6 hover:border-primary transition-colors cursor-pointer group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-status-attention/10 text-status-attention mb-4 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Compliance Audit</h3>
          <p className="text-sm text-text-secondary mb-4">Regulatory compliance status across regions, highlighting critical infractions.</p>
          <Button variant="outline" className="w-full">Generate</Button>
        </Card>

        <Card className="p-6 hover:border-primary transition-colors cursor-pointer group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-status-operational/10 text-status-operational mb-4 group-hover:scale-110 transition-transform">
            <PieChart size={24} />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Maintenance Efficiency</h3>
          <p className="text-sm text-text-secondary mb-4">Analysis of work order completion times, SLA breaches, and contractor performance.</p>
          <Button variant="outline" className="w-full">Generate</Button>
        </Card>
      </div>
    </div>
  );
}
