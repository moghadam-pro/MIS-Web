import React, { useState } from 'react';
import { AppProvider } from '@/app/contexts/AppContext';
import { Header } from '@/app/components/layout/Header';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { Login } from '@/app/pages/Login';
import { CompanySelection } from '@/app/pages/CompanySelection';
import { Dashboard } from '@/app/pages/Dashboard';
import { Persons } from '@/app/pages/Persons';
import { Products } from '@/app/pages/Products';
import { ChartOfAccounts } from '@/app/pages/ChartOfAccounts';
import { Vouchers } from '@/app/pages/Vouchers';
import { TrialBalance } from '@/app/pages/TrialBalance';
import { Users } from '@/app/pages/Users';

type Page = 'login' | 'companySelection' | 'dashboard' | 'persons' | 'products' | 'accounts' | 'vouchers' | 'trial_balance' | 'users' | 'warehouses' | 'currencies' | 'taxes' | 'companies' | 'fiscal_years' | 'inventory' | 'purchase_invoices' | 'sales_invoices' | 'general_ledger' | 'profit_loss' | 'balance_sheet' | 'roles';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  const handleLogin = () => {
    setCurrentPage('companySelection');
  };

  const handleCompanySelection = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'companySelection':
        return <CompanySelection onContinue={handleCompanySelection} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'persons':
        return <Persons />;
      case 'products':
        return <Products />;
      case 'accounts':
        return <ChartOfAccounts />;
      case 'vouchers':
        return <Vouchers />;
      case 'trial_balance':
        return <TrialBalance />;
      case 'users':
        return <Users />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const showLayout = currentPage !== 'login' && currentPage !== 'companySelection';

  return (
    <div className="min-h-screen">
      {showLayout ? (
        <>
          <Header />
          <div className="flex">
            <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
            <main className="flex-1 overflow-auto">
              {renderPage()}
            </main>
          </div>
        </>
      ) : (
        renderPage()
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
