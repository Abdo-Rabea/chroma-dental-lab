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
import { cloneElement, useEffect } from 'react';

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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition="bottom-left" position="bottom" />

      <GlobalStyles />
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="doctors" replace />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="bills" element={<Bills />} />
            <Route path="deposits" element={<Deposits />} />
            <Route path="products" element={<Products />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
