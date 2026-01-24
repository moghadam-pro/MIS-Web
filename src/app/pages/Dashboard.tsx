import React from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { StatusBadge } from '@/app/components/StatusBadge';
import {
  Wallet,
  Users,
  FileText,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { language, isRTL } = useApp();

  // Mock data for charts
  const monthlyData = language === 'fa' ? [
    { month: 'فروردین', sales: 45000000, purchases: 32000000 },
    { month: 'اردیبهشت', sales: 52000000, purchases: 38000000 },
    { month: 'خرداد', sales: 48000000, purchases: 35000000 },
    { month: 'تیر', sales: 61000000, purchases: 42000000 },
    { month: 'مرداد', sales: 55000000, purchases: 40000000 },
    { month: 'شهریور', sales: 58000000, purchases: 43000000 },
  ] : [
    { month: 'Jan', sales: 45000000, purchases: 32000000 },
    { month: 'Feb', sales: 52000000, purchases: 38000000 },
    { month: 'Mar', sales: 48000000, purchases: 35000000 },
    { month: 'Apr', sales: 61000000, purchases: 42000000 },
    { month: 'May', sales: 55000000, purchases: 40000000 },
    { month: 'Jun', sales: 58000000, purchases: 43000000 },
  ];

  const recentVouchers = [
    { number: '۱۰۰۱', numberEn: '1001', date: '۱۴۰۴/۰۲/۱۳', dateEn: '2026-01-21', desc: 'خرید کالا از تامین کننده', descEn: 'Purchase from supplier', amount: 15000000, status: 'final' },
    { number: '۱۰۰۲', numberEn: '1002', date: '۱۴۰۴/۰۲/۱۲', dateEn: '2026-01-20', desc: 'فروش به مشتری', descEn: 'Sale to customer', amount: 28000000, status: 'final' },
    { number: '۱۰۰۳', numberEn: '1003', date: '۱۴۰۴/۰۲/۱۲', dateEn: '2026-01-20', desc: 'پرداخت حقوق', descEn: 'Salary payment', amount: 45000000, status: 'temporary' },
    { number: '۱۰۰۴', numberEn: '1004', date: '۱۴۰۴/۰۲/۱۱', dateEn: '2026-01-19', desc: 'دریافت وجه از مشتری', descEn: 'Payment received from customer', amount: 12000000, status: 'draft' },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en-US').format(num);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('nav.dashboard', language)}</h1>
          <p className="text-muted-foreground mt-1">
            {language === 'fa' ? 'خلاصه وضعیت مالی شرکت' : 'Financial overview of your company'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate('vouchers')}>
            <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {language === 'fa' ? 'سند حسابداری جدید' : 'New Voucher'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{language === 'fa' ? 'موجودی نقد و بانک' : 'Cash & Bank'}</p>
              <p className="text-2xl font-semibold mt-2">{formatNumber(125000000)}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {language === 'fa' ? '+۱۲٪ از ماه قبل' : '+12% from last month'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{language === 'fa' ? 'مطالبات' : 'Receivables'}</p>
              <p className="text-2xl font-semibold mt-2">{formatNumber(85000000)}</p>
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                {language === 'fa' ? '-۵٪ از ماه قبل' : '-5% from last month'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{language === 'fa' ? 'بدهی‌ها' : 'Payables'}</p>
              <p className="text-2xl font-semibold mt-2">{formatNumber(62000000)}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                {language === 'fa' ? '-۸٪ از ماه قبل' : '-8% from last month'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
              <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{language === 'fa' ? 'فروش ماه جاری' : 'Monthly Sales'}</p>
              <p className="text-2xl font-semibold mt-2">{formatNumber(58000000)}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {language === 'fa' ? '+۱۸٪ از ماه قبل' : '+18% from last month'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">
            {language === 'fa' ? 'فروش و خرید ماهانه' : 'Monthly Sales & Purchases'}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="var(--primary)" name={language === 'fa' ? 'فروش' : 'Sales'} />
              <Bar dataKey="purchases" fill="#94a3b8" name={language === 'fa' ? 'خرید' : 'Purchases'} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">
            {language === 'fa' ? 'روند موجودی نقد' : 'Cash Flow Trend'}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={2} name={language === 'fa' ? 'جریان نقد' : 'Cash Flow'} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{t('widget.recent_vouchers', language)}</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('vouchers')}>
              {language === 'fa' ? 'مشاهده همه' : 'View All'}
              <ArrowUpRight className={`h-4 w-4 ${isRTL ? 'mr-1' : 'ml-1'}`} />
            </Button>
          </div>
          <div className="space-y-3">
            {recentVouchers.map((voucher, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{language === 'fa' ? voucher.number : voucher.numberEn}</span>
                    <StatusBadge status={voucher.status as any} label={t(`status.${voucher.status}`, language)} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'fa' ? voucher.desc : voucher.descEn}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{language === 'fa' ? voucher.date : voucher.dateEn}</p>
                </div>
                <div className="text-left">
                  <p className="font-semibold">{formatNumber(voucher.amount)}</p>
                  <p className="text-xs text-muted-foreground">{t('currency', language)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{t('widget.inventory_alerts', language)}</h3>
            <Button variant="ghost" size="sm">
              {language === 'fa' ? 'مشاهده همه' : 'View All'}
              <ArrowUpRight className={`h-4 w-4 ${isRTL ? 'mr-1' : 'ml-1'}`} />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border border-yellow-200 dark:border-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{language === 'fa' ? 'کالای A - موجودی کم' : 'Product A - Low Stock'}</p>
                <p className="text-sm text-muted-foreground">{language === 'fa' ? 'موجودی فعلی: ۵ واحد' : 'Current stock: 5 units'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-yellow-200 dark:border-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{language === 'fa' ? 'کالای B - موجودی کم' : 'Product B - Low Stock'}</p>
                <p className="text-sm text-muted-foreground">{language === 'fa' ? 'موجودی فعلی: ۳ واحد' : 'Current stock: 3 units'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{language === 'fa' ? 'کالای C - ناموجود' : 'Product C - Out of Stock'}</p>
                <p className="text-sm text-muted-foreground">{language === 'fa' ? 'موجودی فعلی: ۰ واحد' : 'Current stock: 0 units'}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
