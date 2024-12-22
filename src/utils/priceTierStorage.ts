import { PriceTier, defaultTiers } from '@/types/prices';

const STORAGE_KEY = 'price-tiers';

export const getPriceTiers = (): PriceTier[] => {
  const storedTiers = localStorage.getItem(STORAGE_KEY);
  return storedTiers ? JSON.parse(storedTiers) : defaultTiers;
};

export const savePriceTiers = (tiers: PriceTier[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tiers));
};