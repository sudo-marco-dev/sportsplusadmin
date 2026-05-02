import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MetricCard } from "./MetricCard";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Building2, 
  ArrowUpRight,
  Filter,
  Download
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { revenueData, recentTransactions, monetizationKPIs } from "../../../data/adminMockData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const phpFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const compactPhpFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  notation: 'compact',
  maximumFractionDigits: 1,
});

export function MonetizationView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Monetization Tracking</h2>
          <p className="text-muted-foreground">Revenue overview and transaction history.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total MRR" 
          value={monetizationKPIs.totalMRR} 
          icon={DollarSign} 
          trend="+12.5% from last month" 
          trendUp 
        />
        <MetricCard 
          title="Tournament Promotions" 
          value={monetizationKPIs.tournamentRevenue} 
          icon={TrendingUp} 
          trend="+8.3% from last month" 
          trendUp 
        />
        <MetricCard 
          title="Premium Organizations" 
          value={monetizationKPIs.activePremiumOrgs} 
          icon={Building2} 
          trend="+12 this month" 
          trendUp 
        />
        <MetricCard 
          title="Avg Transaction" 
          value={phpFormatter.format(1921.00)} 
          icon={CreditCard} 
          trend="+2.1%" 
          trendUp 
        />
      </div>

      {/* Revenue Chart */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPromos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs font-medium text-slate-500"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => compactPhpFormatter.format(value)}
                  className="text-xs font-medium text-slate-500"
                  width={80}
                />
                <Tooltip 
                  formatter={(value: number) => [phpFormatter.format(value), '']}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend verticalAlign="top" align="right" height={36} />
                <Area 
                  type="monotone" 
                  dataKey="subscriptions" 
                  name="Subscriptions"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorSubs)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="promotions" 
                  name="Promoted Tournaments"
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPromos)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-slate-200 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-medium">
            View All Transactions
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Transaction ID</th>
                  <th className="px-6 py-4 font-semibold">Organization</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{tx.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded bg-slate-100 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-slate-500" />
                        </div>
                        {tx.orgName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tx.type === 'Subscription' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {tx.type === 'Subscription' ? <CreditCard className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{phpFormatter.format(tx.amount)}</td>
                    <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
