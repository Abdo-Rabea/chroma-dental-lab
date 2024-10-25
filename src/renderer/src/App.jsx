import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Doctors from './pages/Doctors';
import Bills from './pages/Bills';
import Deposits from './pages/Deposits';
import Products from './pages/Products';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Bill from './pages/Bill';
import { DarkModeProvider } from './context/DarkModeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // the time before next re-fetch
      staleTime: 0
    }
  }
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools buttonPosition="bottom-left" position="bottom" />

        <GlobalStyles />
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="doctors" replace />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="bills" element={<Bills />} />
              <Route path="bill/:billId" element={<Bill />} />
              <Route path="deposits" element={<Deposits />} />
              <Route path="products" element={<Products />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </HashRouter>
        <Toaster
          position="top-center"
          gutter={12} // the space between the screen and the toast
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000
            },
            error: {
              duration: 5000
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              background: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)'
            }
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
