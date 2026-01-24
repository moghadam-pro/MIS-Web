import React, { useState } from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import { DataGrid, Column } from '@/app/components/DataGrid';
import { StatusBadge } from '@/app/components/StatusBadge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Plus, Search } from 'lucide-react';

interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
}

export const Products: React.FC = () => {
  const { language, isRTL } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const mockProducts: Product[] = [
    { id: '1', code: 'P1001', name: language === 'fa' ? 'لپ‌تاپ دل' : 'Dell Laptop', unit: language === 'fa' ? 'عدد' : 'Unit', price: 25000000, stock: 15, status: 'active' },
    { id: '2', code: 'P1002', name: language === 'fa' ? 'ماوس بی‌سیم' : 'Wireless Mouse', unit: language === 'fa' ? 'عدد' : 'Unit', price: 350000, stock: 48, status: 'active' },
    { id: '3', code: 'P1003', name: language === 'fa' ? 'کیبورد مکانیکی' : 'Mechanical Keyboard', unit: language === 'fa' ? 'عدد' : 'Unit', price: 1200000, stock: 22, status: 'active' },
    { id: '4', code: 'P1004', name: language === 'fa' ? 'مانیتور ۲۴ اینچ' : '24" Monitor', unit: language === 'fa' ? 'عدد' : 'Unit', price: 8500000, stock: 8, status: 'active' },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en-US').format(num);
  };

  const columns: Column<Product>[] = [
    { key: 'code', label: t('label.code', language), width: '120px' },
    { key: 'name', label: t('label.name', language), width: '300px' },
    { key: 'unit', label: language === 'fa' ? 'واحد' : 'Unit', width: '100px' },
    {
      key: 'price',
      label: language === 'fa' ? 'قیمت' : 'Price',
      width: '150px',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      key: 'stock',
      label: language === 'fa' ? 'موجودی' : 'Stock',
      width: '120px',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      key: 'status',
      label: t('label.status', language),
      width: '120px',
      render: (value) => <StatusBadge status={value} label={t(`status.${value}`, language)} />,
    },
  ];

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('nav.products', language)}</h1>
          <p className="text-muted-foreground mt-1">
            {language === 'fa' ? 'مدیریت کالاها و خدمات' : 'Manage products and services'}
          </p>
        </div>
        <Button>
          <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {language === 'fa' ? 'کالا جدید' : 'New Product'}
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            type="text"
            placeholder={t('action.search', language)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={isRTL ? 'pr-10' : 'pl-10'}
          />
        </div>
        <Button variant="outline">{t('action.export', language)}</Button>
      </div>

      <DataGrid columns={columns} data={filteredProducts} keyField="id" />
    </div>
  );
};
