import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Crown, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { 
  useSubscription, 
  SUBSCRIPTION_PLANS, 
  SubscriptionPlanId, 
  FREE_TIER_LIMIT 
} from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';

export const SubscriptionModal: React.FC = () => {
  const { 
    isUpgradeModalOpen, 
    closeUpgradeModal, 
    upgradeModalReason,
    subscription, 
    subscribe, 
    cancelSubscription, 
    usageCount, 
    remainingQuota, 
    isUnlimited,
    resetUsageForTesting
  } = useSubscription();

  const { user, signInWithGoogle, signInAsGuest } = useAuth();

  const [selectedPlanId, setSelectedPlanId] = useState<SubscriptionPlanId>('1year');
  const [paymentStep, setPaymentStep] = useState<'plans' | 'checkout' | 'success'>('plans');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'gpay'>('card');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!isUpgradeModalOpen) return null;

  const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[2];

  const handleSelectPlan = (planId: SubscriptionPlanId) => {
    setSelectedPlanId(planId);
    setPaymentStep('checkout');
  };

  const handleCompleteSubscription = () => {
    setIsProcessing(true);
    setTimeout(() => {
      subscribe(
        selectedPlanId, 
        paymentMethod === 'card' ? 'Visa / Mastercard ending in 4242' : 'Google Pay'
      );
      setIsProcessing(false);
      setPaymentStep('success');
    }, 800);
  };

  const handleClose = () => {
    setPaymentStep('plans');
    closeUpgradeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <div className="relative px-6 pt-6 pb-4 sm:pt-7 sm:px-8 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {subscription.active ? 'Your Pro Subscription' : 'Upgrade to Pro'}
                </h2>
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {subscription.active ? 'Active' : 'Special Offer'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {subscription.active 
                  ? 'Manage your active plan, billing details, and unlimited benefits.'
                  : 'Unlock unlimited image resizing, batch processing, and maximum speed.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 py-5 sm:px-8 sm:py-6 space-y-6">

          {/* Reason Alert / Quota Banner */}
          {!subscription.active && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold block sm:inline">Signed-in Usage Limit: </span>
                  <span>{usageCount} of {FREE_TIER_LIMIT} images resized ({remainingQuota} remaining)</span>
                </div>
              </div>
              <div className="w-full sm:w-44 bg-amber-200 dark:bg-amber-900/60 rounded-full h-2 overflow-hidden shrink-0">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    usageCount >= FREE_TIER_LIMIT ? 'bg-rose-500' : 'bg-amber-600 dark:bg-amber-400'
                  }`}
                  style={{ width: `${Math.min(100, (usageCount / FREE_TIER_LIMIT) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* If Active Subscription: Show Management Screen */}
          {subscription.active && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 border border-indigo-200 dark:border-indigo-800/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30">
                      <Crown className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {subscription.planName}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
                          Active Pro
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        ${subscription.priceUSD} USD • Unlimited image resizing enabled
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Renews / Valid Until</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {subscription.expiresDate 
                        ? new Date(subscription.expiresDate).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          }) 
                        : 'Active'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-indigo-100 dark:border-indigo-900/50">
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited Image Resizing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Priority Browser Worker Speed</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Parallel Batch ZIP Downloads</span>
                  </div>
                </div>
              </div>

              {/* Cancel / Change plan section */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Subscription Management</span>
                  <span className="text-slate-500 dark:text-slate-400">Cancel or renew your subscription at any time without fees.</span>
                </div>

                {showCancelConfirm ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                    >
                      Keep Plan
                    </button>
                    <button
                      onClick={() => {
                        cancelSubscription();
                        setShowCancelConfirm(false);
                        setPaymentStep('plans');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors"
                    >
                      Confirm Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="px-3 py-1.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 font-semibold transition-colors"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Success Screen */}
          {paymentStep === 'success' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-in zoom-in duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Welcome to Pro!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your <strong>{selectedPlan.name}</strong> subscription has been successfully activated. The 10-image limit is now completely removed!
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all"
                >
                  Start Resizing Images
                </button>
              </div>
            </div>
          )}

          {/* Checkout Screen */}
          {!subscription.active && paymentStep === 'checkout' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setPaymentStep('plans')}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  ← Back to Plans
                </button>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-bit Encrypted Checkout</span>
                </div>
              </div>

              {/* Selected Plan Summary Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {selectedPlan.name}
                    </span>
                    {selectedPlan.discountBadge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {selectedPlan.discountBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Unlimited image resizing • {selectedPlan.periodText}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    ${selectedPlan.priceUSD} <span className="text-xs font-bold text-slate-500">USD</span>
                  </div>
                  <span className="text-[11px] text-slate-500">One-time / recurring</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/50 dark:border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-900 dark:text-white">Credit / Debit Card</span>
                      <span className="text-[10px] text-slate-500">Visa, Mastercard, Amex</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gpay')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'gpay'
                        ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/50 dark:border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-indigo-600">
                      GPay
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-900 dark:text-white">Google Pay</span>
                      <span className="text-[10px] text-slate-500">Fast 1-touch checkout</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Card Simulated Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value="•••• •••• •••• 4242 (Instant Demo Activation)"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="12 / 29"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="888"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>30-day money back guarantee • Cancel anytime</span>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleCompleteSubscription}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Activation...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ${selectedPlan.priceUSD} USD & Activate Pro</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Pricing Plans Comparison Cards */}
          {!subscription.active && paymentStep === 'plans' && (
            <div className="space-y-6">
              {/* Three Tier Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
                {SUBSCRIPTION_PLANS.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all border ${
                        plan.popular
                          ? 'border-indigo-500 dark:border-indigo-500 bg-gradient-to-b from-indigo-50/60 to-white dark:from-indigo-950/30 dark:to-slate-900 ring-2 ring-indigo-500/30 shadow-lg'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                      }`}
                    >
                      {/* Top Badges */}
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                          Most Popular
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                            {plan.name}
                          </h4>
                          {plan.discountBadge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              {plan.discountBadge}
                            </span>
                          )}
                        </div>

                        {/* Price */}
                        <div className="my-4">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                              ${plan.priceUSD}
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase">
                              USD
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            {plan.periodText}
                          </p>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-2.5 my-5 text-xs text-slate-600 dark:text-slate-300">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <button
                        type="button"
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full py-2.5 px-4 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          plan.popular
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 active:scale-95'
                            : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white/90 active:scale-95'
                        }`}
                      >
                        <span>Choose {plan.durationLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Free vs Pro Comparison Strip */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3">
                  Why Upgrade from Free to Pro?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <span className="font-bold text-slate-500 dark:text-slate-400">Free Tier (Signed-in)</span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                      <li>• Maximum 10 image resizes total</li>
                      <li>• Standard batch limit</li>
                      <li>• Standard worker thread priority</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Pro Tier (1mo / 3mo / 1yr)
                    </span>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                      <li>• <strong>Unlimited</strong> image resizes forever while active</li>
                      <li>• Bulk batch resize 100+ images in parallel</li>
                      <li>• Priority browser compression worker speeds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3.5 sm:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% In-Browser Privacy
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">1 Month: $10 USD | 3 Months: $25 USD | 1 Year: $75 USD</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Demo Reset Usage Button */}
            <button
              type="button"
              onClick={resetUsageForTesting}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
              title="Reset 10-image limit counter for testing demo"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              Reset 10-Usage Counter (Demo)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
