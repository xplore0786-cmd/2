import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export type SubscriptionPlanId = '1month' | '3month' | '1year';

export interface PlanConfig {
  id: SubscriptionPlanId;
  name: string;
  durationLabel: string;
  durationDays: number;
  priceUSD: number;
  periodText: string;
  monthlyEquivalent: number;
  discountBadge?: string;
  popular?: boolean;
  features: string[];
}

export const SUBSCRIPTION_PLANS: PlanConfig[] = [
  {
    id: '1month',
    name: '1 Month Pro',
    durationLabel: '1 Month',
    durationDays: 30,
    priceUSD: 10,
    periodText: 'billed monthly',
    monthlyEquivalent: 10,
    features: [
      'Unlimited image resizing & compression',
      'Batch resize up to 50+ images at once',
      'Target file size mode (100KB, 500KB, custom)',
      'Lossless & custom compression control',
      'Zero server uploads – 100% private in-browser',
      'Ad-free experience & priority support'
    ]
  },
  {
    id: '3month',
    name: '3 Months Pro',
    durationLabel: '3 Months',
    durationDays: 90,
    priceUSD: 25,
    periodText: 'billed every 3 months ($8.33/mo)',
    monthlyEquivalent: 8.33,
    discountBadge: 'Save 17%',
    features: [
      'All 1-Month Pro features included',
      'Unlimited image resizing & compression',
      'Batch resize up to 100 images in parallel',
      'Instant batch ZIP download export',
      'Custom width, height & aspect ratio presets',
      'Priority browser worker execution'
    ]
  },
  {
    id: '1year',
    name: '1 Year Pro',
    durationLabel: '1 Year',
    durationDays: 365,
    priceUSD: 75,
    periodText: 'billed yearly ($6.25/mo)',
    monthlyEquivalent: 6.25,
    discountBadge: 'Best Value • Save 37.5%',
    popular: true,
    features: [
      'Maximum savings ($45 saved vs monthly)',
      'Unlimited image resizing for 1 full year',
      'Unlimited batch processing & bulk export',
      'Target file size auto-binary search optimizer',
      'VIP priority processing & custom naming suffixes',
      'Early access to new compression formats'
    ]
  }
];

export const FREE_TIER_LIMIT = 10; // Sign-in user usage limit is 10 images resize

export interface UserSubscription {
  active: boolean;
  planId: SubscriptionPlanId | null;
  planName: string | null;
  priceUSD: number;
  startDate: string | null;
  expiresDate: string | null;
  paymentMethod?: string;
}

interface SubscriptionContextType {
  usageCount: number;
  limit: number;
  remainingQuota: number;
  isUnlimited: boolean;
  hasReachedLimit: boolean;
  subscription: UserSubscription;
  isUpgradeModalOpen: boolean;
  upgradeModalReason: string;
  canResizeCount: (count: number) => boolean;
  recordResizedImages: (count: number) => boolean;
  subscribe: (planId: SubscriptionPlanId, paymentMethod?: string) => void;
  cancelSubscription: () => void;
  resetUsageForTesting: () => void;
  openUpgradeModal: (reason?: string) => void;
  closeUpgradeModal: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  // Storage key is scoped to user UID or guest
  const storageKey = user ? `isr_sub_${user.uid}` : `isr_sub_guest`;

  const [usageCount, setUsageCount] = useState<number>(0);
  const [subscription, setSubscription] = useState<UserSubscription>({
    active: false,
    planId: null,
    planName: null,
    priceUSD: 0,
    startDate: null,
    expiresDate: null,
  });

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [upgradeModalReason, setUpgradeModalReason] = useState<string>('');

  // Load user data on user switch or mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Check if subscription has expired
        if (parsed.subscription?.active && parsed.subscription?.expiresDate) {
          const expiresTime = new Date(parsed.subscription.expiresDate).getTime();
          if (Date.now() > expiresTime) {
            parsed.subscription.active = false;
          }
        }
        setUsageCount(parsed.usageCount || 0);
        setSubscription(
          parsed.subscription || {
            active: false,
            planId: null,
            planName: null,
            priceUSD: 0,
            startDate: null,
            expiresDate: null,
          }
        );
      } else {
        setUsageCount(0);
        setSubscription({
          active: false,
          planId: null,
          planName: null,
          priceUSD: 0,
          startDate: null,
          expiresDate: null,
        });
      }
    } catch {
      // fallback
    }
  }, [storageKey]);

  // Helper to persist state
  const persistState = (newUsage: number, newSub: UserSubscription) => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          usageCount: newUsage,
          subscription: newSub,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch {
      // ignore storage error
    }
  };

  const isUnlimited = subscription.active;
  const limit = isUnlimited ? Infinity : FREE_TIER_LIMIT;
  const remainingQuota = isUnlimited ? Infinity : Math.max(0, FREE_TIER_LIMIT - usageCount);
  const hasReachedLimit = !isUnlimited && usageCount >= FREE_TIER_LIMIT;

  const canResizeCount = (count: number): boolean => {
    if (isUnlimited) return true;
    return usageCount + count <= FREE_TIER_LIMIT;
  };

  const recordResizedImages = (count: number): boolean => {
    if (count <= 0) return true;
    if (isUnlimited) {
      const nextUsage = usageCount + count;
      setUsageCount(nextUsage);
      persistState(nextUsage, subscription);
      return true;
    }

    const nextUsage = usageCount + count;
    setUsageCount(nextUsage);
    persistState(nextUsage, subscription);
    return true;
  };

  const subscribe = (planId: SubscriptionPlanId, paymentMethod = 'Credit / Debit Card (USD)') => {
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[0];
    const now = new Date();
    const expires = new Date(now.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

    const newSub: UserSubscription = {
      active: true,
      planId: plan.id,
      planName: plan.name,
      priceUSD: plan.priceUSD,
      startDate: now.toISOString(),
      expiresDate: expires.toISOString(),
      paymentMethod,
    };

    setSubscription(newSub);
    persistState(usageCount, newSub);
    setIsUpgradeModalOpen(false);
  };

  const cancelSubscription = () => {
    const updatedSub: UserSubscription = {
      active: false,
      planId: null,
      planName: null,
      priceUSD: 0,
      startDate: null,
      expiresDate: null,
    };
    setSubscription(updatedSub);
    persistState(usageCount, updatedSub);
  };

  const resetUsageForTesting = () => {
    setUsageCount(0);
    persistState(0, subscription);
  };

  const openUpgradeModal = (reason?: string) => {
    setUpgradeModalReason(
      reason || 'Free signed-in users can resize up to 10 images. Upgrade to Pro for unlimited image resizing!'
    );
    setIsUpgradeModalOpen(true);
  };

  const closeUpgradeModal = () => {
    setIsUpgradeModalOpen(false);
    setUpgradeModalReason('');
  };

  return (
    <SubscriptionContext.Provider
      value={{
        usageCount,
        limit,
        remainingQuota,
        isUnlimited,
        hasReachedLimit,
        subscription,
        isUpgradeModalOpen,
        upgradeModalReason,
        canResizeCount,
        recordResizedImages,
        subscribe,
        cancelSubscription,
        resetUsageForTesting,
        openUpgradeModal,
        closeUpgradeModal,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
