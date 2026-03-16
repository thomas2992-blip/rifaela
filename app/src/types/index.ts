export interface RaffleNumber {
  number: number;
  status: 'available' | 'reserved' | 'sold';
  reservedBy?: {
    name: string;
    phone: string;
  } | null;
  reservedAt?: string | null;
}

export interface RaffleData {
  numbers: RaffleNumber[];
  totalNumbers: number;
  lastUpdated: string;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  numbers: number[];
}

export const PRICING = {
  single: {
    mxn: 100,
    brl: 30,
  },
  promo3: {
    mxn: 200,
    brl: 60,
    quantity: 3,
  },
  promo10: {
    mxn: 500,
    brl: 150,
    quantity: 10,
  },
};

export const PAYMENT_INFO = {
  bank: 'Banco Klar',
  account: '661610002848494304',
  name: 'Thomas Diniz Antas',
  whatsapp: '+52 55 1980 8217',
  pix: '349.683.688-10',
};
