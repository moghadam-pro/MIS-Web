import React from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import {
  LayoutDashboard,
  Users,
  Package,
  ListTree,
  Warehouse,
  Coins,
  Receipt,
  FileText,
  Building2,
  Calendar as CalendarIcon,
  ShoppingCart,
  ShoppingBag,
  BarChart3,
  UserCog,
  Settings,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { cn } from '@/app/components/ui/utils';

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: MenuItem[];
}

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const { language, isRTL } = useApp();
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['basics', 'accounting']);

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: t('nav.dashboard', language),
    },
    {
      key: 'basics',
      icon: <Settings className="h-5 w-5" />,
      label: t('nav.basics', language),
      children: [
        {
          key: 'persons',
          icon: <Users className="h-4 w-4" />,
          label: t('nav.persons', language),
        },
        {
          key: 'products',
          icon: <Package className="h-4 w-4" />,
          label: t('nav.products', language),
        },
        {
          key: 'accounts',
          icon: <ListTree className="h-4 w-4" />,
          label: t('nav.accounts', language),
        },
        {
          key: 'warehouses',
          icon: <Warehouse className="h-4 w-4" />,
          label: t('nav.warehouses', language),
        },
        {
          key: 'currencies',
          icon: <Coins className="h-4 w-4" />,
          label: t('nav.currencies', language),
        },
        {
          key: 'taxes',
          icon: <Receipt className="h-4 w-4" />,
          label: t('nav.taxes', language),
        },
      ],
    },
    {
      key: 'accounting',
      icon: <FileText className="h-5 w-5" />,
      label: t('nav.accounting', language),
      children: [
        {
          key: 'vouchers',
          icon: <FileText className="h-4 w-4" />,
          label: t('nav.vouchers', language),
        },
        {
          key: 'companies',
          icon: <Building2 className="h-4 w-4" />,
          label: t('nav.companies', language),
        },
        {
          key: 'fiscal_years',
          icon: <CalendarIcon className="h-4 w-4" />,
          label: t('nav.fiscal_years', language),
        },
      ],
    },
    {
      key: 'inventory',
      icon: <Warehouse className="h-5 w-5" />,
      label: t('nav.inventory', language),
    },
    {
      key: 'purchase_sales',
      icon: <ShoppingCart className="h-5 w-5" />,
      label: t('nav.purchase_sales', language),
      children: [
        {
          key: 'purchase_invoices',
          icon: <ShoppingBag className="h-4 w-4" />,
          label: t('nav.purchase_invoices', language),
        },
        {
          key: 'sales_invoices',
          icon: <ShoppingCart className="h-4 w-4" />,
          label: t('nav.sales_invoices', language),
        },
      ],
    },
    {
      key: 'reports',
      icon: <BarChart3 className="h-5 w-5" />,
      label: t('nav.reports', language),
      children: [
        {
          key: 'trial_balance',
          icon: <BarChart3 className="h-4 w-4" />,
          label: t('nav.trial_balance', language),
        },
        {
          key: 'general_ledger',
          icon: <FileText className="h-4 w-4" />,
          label: t('nav.general_ledger', language),
        },
        {
          key: 'profit_loss',
          icon: <BarChart3 className="h-4 w-4" />,
          label: t('nav.profit_loss', language),
        },
        {
          key: 'balance_sheet',
          icon: <BarChart3 className="h-4 w-4" />,
          label: t('nav.balance_sheet', language),
        },
      ],
    },
    {
      key: 'system',
      icon: <UserCog className="h-5 w-5" />,
      label: t('nav.system', language),
      children: [
        {
          key: 'users',
          icon: <Users className="h-4 w-4" />,
          label: t('nav.users', language),
        },
        {
          key: 'roles',
          icon: <UserCog className="h-4 w-4" />,
          label: t('nav.roles', language),
        },
      ],
    },
  ];

  const toggleMenu = (key: string) => {
    setExpandedMenus((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.key);
    const isActive = currentPage === item.key;

    return (
      <div key={item.key}>
        <Button
          variant={isActive && level > 0 ? 'secondary' : 'ghost'}
          className={cn(
            'w-full justify-start gap-3',
            level === 0 ? 'mb-1' : 'mb-0.5',
            level > 0 && (isRTL ? 'pr-8' : 'pl-8'),
            isActive && level === 0 && 'bg-sidebar-accent'
          )}
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.key);
            } else {
              onNavigate(item.key);
            }
          }}
        >
          {item.icon}
          <span className="flex-1 text-start">{item.label}</span>
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className={cn('h-4 w-4', isRTL && 'rotate-180')} />
            )
          )}
        </Button>

        {hasChildren && isExpanded && (
          <div className="space-y-0.5">
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'w-64 border-border bg-sidebar h-[calc(100vh-4rem)] sticky top-16',
        isRTL ? 'border-l' : 'border-r'
      )}
    >
      <ScrollArea className="h-full">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
      </ScrollArea>
    </aside>
  );
};
