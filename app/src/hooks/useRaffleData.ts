import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import type { RaffleNumber, RaffleData, ReservationFormData } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const ADMIN_KEY = 'thomas_admin_2024';

export const useRaffleData = () => {
  const [numbers, setNumbers] = useState<RaffleNumber[]>([]);
  const [stats, setStats] = useState({
    available: 0,
    reserved: 0,
    sold: 0,
    total: 800,
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(API_URL);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setError(null);
    });

    newSocket.on('connect_error', () => {
      setError('Error de conexión con el servidor');
    });

    newSocket.on('numbersUpdated', (data: RaffleData) => {
      setNumbers(data.numbers);
      updateStats(data.numbers);
      setIsLoading(false);
    });

    // Fetch initial data
    fetchNumbers();

    return () => {
      newSocket.close();
    };
  }, []);

  // Check admin status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminKey = localStorage.getItem('raffela_admin_key');
      setIsAdmin(adminKey === ADMIN_KEY);
    }
  }, []);

  const fetchNumbers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/numbers`);
      if (response.ok) {
        const data = await response.json();
        setNumbers(data.numbers);
        updateStats(data.numbers);
        setIsLoading(false);
      } else {
        setError('Error al cargar los datos');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Error de conexión');
      setIsLoading(false);
    }
  };

  const updateStats = (nums: RaffleNumber[]) => {
    setStats({
      available: nums.filter((n) => n.status === 'available').length,
      reserved: nums.filter((n) => n.status === 'reserved').length,
      sold: nums.filter((n) => n.status === 'sold').length,
      total: 800,
    });
  };

  const reserveNumbers = useCallback(async (formData: ReservationFormData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/api/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numbers: formData.numbers,
          name: formData.name,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        return true;
      } else {
        const error = await response.json();
        console.error('Error reserving numbers:', error);
        return false;
      }
    } catch (err) {
      console.error('Error:', err);
      return false;
    }
  }, []);

  const markAsSold = useCallback(async (nums: number[]): Promise<boolean> => {
    if (!isAdmin) return false;

    try {
      const response = await fetch(`${API_URL}/api/mark-sold`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numbers: nums,
          adminKey: ADMIN_KEY,
        }),
      });

      return response.ok;
    } catch (err) {
      console.error('Error:', err);
      return false;
    }
  }, [isAdmin]);

  const markAsAvailable = useCallback(async (nums: number[]): Promise<boolean> => {
    if (!isAdmin) return false;

    try {
      const response = await fetch(`${API_URL}/api/mark-available`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numbers: nums,
          adminKey: ADMIN_KEY,
        }),
      });

      return response.ok;
    } catch (err) {
      console.error('Error:', err);
      return false;
    }
  }, [isAdmin]);

  const loginAsAdmin = useCallback((password: string): boolean => {
    if (password === 'thomas2024') {
      localStorage.setItem('raffela_admin_key', ADMIN_KEY);
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem('raffela_admin_key');
    setIsAdmin(false);
  }, []);

  const exportData = useCallback(async (): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/api/export`, {
        headers: {
          'x-admin-key': ADMIN_KEY,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return JSON.stringify(data, null, 2);
      }
      return '';
    } catch (err) {
      console.error('Error:', err);
      return '';
    }
  }, []);

  const importData = useCallback(async (jsonString: string): Promise<boolean> => {
    if (!isAdmin) return false;

    try {
      const data = JSON.parse(jsonString);
      const response = await fetch(`${API_URL}/api/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({ data }),
      });

      return response.ok;
    } catch (err) {
      console.error('Error:', err);
      return false;
    }
  }, [isAdmin]);

  return {
    numbers,
    stats,
    isAdmin,
    isLoading,
    error,
    reserveNumbers,
    markAsSold,
    markAsAvailable,
    loginAsAdmin,
    logoutAdmin,
    exportData,
    importData,
  };
};
