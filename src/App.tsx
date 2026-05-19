/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { InventoryProvider } from '@/src/contexts/InventoryContext';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './app/layout';
import Dashboard from './app/page';
import InventoryList from './app/inventory/page';
import Inbound from './app/inbound/page';
import Outbound from './app/outbound/page';
import UIKit from './app/uikit/page';
import UIKitTypography from './app/uikit/typography/page';
import UIKitCards from './app/uikit/cards/page';
import UIKitCharts from './app/uikit/charts/page';
import UIKitForms from './app/uikit/forms/page';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';
import './styles.css';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="nexus-ui-theme">
      <InventoryProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<InventoryList />} />
              <Route path="/inbound" element={<Inbound />} />
              <Route path="/outbound" element={<Outbound />} />
              <Route path="/uikit" element={<UIKit />} />
              <Route path="/uikit/typography" element={<UIKitTypography />} />
              <Route path="/uikit/cards" element={<UIKitCards />} />
              <Route path="/uikit/charts" element={<UIKitCharts />} />
              <Route path="/uikit/forms" element={<UIKitForms />} />
            </Routes>
            <ThemeCustomizer />
          </AppLayout>
          <Toaster theme="dark" position="top-right" />
        </BrowserRouter>
      </InventoryProvider>
    </ThemeProvider>
  );
}
