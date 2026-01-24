import React from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import { DataGrid, Column } from '@/app/components/DataGrid';
import { StatusBadge } from '@/app/components/StatusBadge';
import { Button } from '@/app/components/ui/button';
import { Plus } from 'lucide-react';

interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  email: string;
  status: 'active' | 'inactive';
}

export const Users: React.FC = () => {
  const { language, isRTL } = useApp();

  const mockUsers: User[] = [
    { id: '1', username: 'admin', name: language === 'fa' ? 'مدیر سیستم' : 'Admin User', role: language === 'fa' ? 'مدیر سیستم' : 'System Admin', email: 'admin@orash.com', status: 'active' },
    { id: '2', username: 'accountant1', name: language === 'fa' ? 'احمد محمدی' : 'Ahmad Mohammadi', role: language === 'fa' ? 'حسابدار' : 'Accountant', email: 'ahmad@orash.com', status: 'active' },
    { id: '3', username: 'manager1', name: language === 'fa' ? 'فاطمه احمدی' : 'Fatemeh Ahmadi', role: language === 'fa' ? 'مدیر مالی' : 'Financial Manager', email: 'fatemeh@orash.com', status: 'active' },
  ];

  const columns: Column<User>[] = [
    { key: 'username', label: t('login.username', language), width: '150px' },
    { key: 'name', label: t('label.name', language), width: '200px' },
    { key: 'role', label: language === 'fa' ? 'نقش' : 'Role', width: '180px' },
    { key: 'email', label: t('label.email', language), width: '250px' },
    {
      key: 'status',
      label: t('label.status', language),
      width: '120px',
      render: (value) => <StatusBadge status={value} label={t(`status.${value}`, language)} />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('nav.users', language)}</h1>
          <p className="text-muted-foreground mt-1">
            {language === 'fa' ? 'مدیریت کاربران سیستم' : 'Manage system users'}
          </p>
        </div>
        <Button>
          <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {language === 'fa' ? 'کاربر جدید' : 'New User'}
        </Button>
      </div>

      <DataGrid columns={columns} data={mockUsers} keyField="id" />
    </div>
  );
};
