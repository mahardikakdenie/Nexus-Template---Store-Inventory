import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Item = {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
};

export type TransactionType = 'masuk' | 'keluar';

export type Transaction = {
  id: string;
  itemId: string;
  type: TransactionType;
  quantity: number;
  date: string;
  notes: string;
  pic: string;
};

interface InventoryContextType {
  items: Item[];
  transactions: Transaction[];
  addItem: (item: Omit<Item, 'id'>) => void;
  updateItem: (id: string, item: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const initialItems: Item[] = [
  { id: '1', sku: 'SKU-001', name: 'MacBook Pro M3', category: 'Laptop', stock: 15, price: 30000000 },
  { id: '2', sku: 'SKU-002', name: 'Keychron K2', category: 'Accessories', stock: 42, price: 1500000 },
  { id: '3', sku: 'SKU-003', name: 'Logitech MX Master 3S', category: 'Accessories', stock: 24, price: 1800000 },
  { id: '4', sku: 'SKU-004', name: 'Dell UltraSharp 27', category: 'Monitor', stock: 8, price: 8500000 },
  { id: '5', sku: 'SKU-005', name: 'Sony WH-1000XM5', category: 'Audio', stock: 12, price: 5500000 },
];

const initialTransactions: Transaction[] = [
  { id: 't1', itemId: '1', type: 'masuk', quantity: 20, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), notes: 'Restock awal bulan', pic: 'Admin Budi' },
  { id: 't2', itemId: '1', type: 'keluar', quantity: 5, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), notes: 'Terjual ke PT. Alpha', pic: 'Admin Siti' },
  { id: 't3', itemId: '2', type: 'masuk', quantity: 50, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), notes: 'Supply baru dari distributor', pic: 'Admin Budi' },
  { id: 't4', itemId: '2', type: 'keluar', quantity: 8, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), notes: 'Pengiriman via Tokopedia', pic: 'Admin Siti' },
];

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  // In a real app, we would load from localStorage here, but relying on initial state for demo
  // is fine and keeps it predictable.

  const addItem = (item: Omit<Item, 'id'>) => {
    setItems((prev) => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateItem = (id: string, updatedFields: Partial<Item>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)));
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const item = items.find((i) => i.id === transaction.itemId);
    if (!item) return;

    if (transaction.type === 'keluar' && item.stock < transaction.quantity) {
      throw new Error('Stock tidak mencukupi!');
    }

    const tData: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [tData, ...prev]);

    // Update stock
    updateItem(transaction.itemId, {
      stock: item.stock + (transaction.type === 'masuk' ? transaction.quantity : -transaction.quantity),
    });
  };

  return (
    <InventoryContext.Provider value={{ items, transactions, addItem, updateItem, deleteItem, addTransaction }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
