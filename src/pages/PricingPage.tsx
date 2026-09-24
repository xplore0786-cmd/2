import React from 'react';
import { 
  Check, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  HelpCircle,
  FileCheck,
  RotateCcw
} from 'lucide-react';
import { 
  useSubscription, 
  SUBSCRIPTION_PLANS, 
  FREE_TIER_LIMIT,
  SubscriptionPlanId 
} from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { PageRoute } from '../types';

interface PricingPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { 
    usageCount, 
    remainingQuota, 
    subscription, 
    openUpgradeModal,
    resetUsageForTesting 
  } = useSubscription();
  const { user } = useAuth();

  return (
    <div className="space-y-16 py-6 sm:py-10 max-w-6xl mx-auto">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Flexible Plans for Creators, Photographers & Teams</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Simple, Transparent Pricing
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Sign-in free users get <strong>10 image resizes</strong>. Need more? Upgrade to Pro for unlimited image resizing, batch processing, and maximum speed.
        </p>

        {/* Current status pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
          <span className="text-slate-500">Your Current Status:</span>
          {subscription.active ? (
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Crown className="w-4 h-4" /> {subscription.planName} (Unlimited Resizing Active)
            </span>
          ) : (
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Free Tier: <strong className="text-indigo-600 dark:text-indigo-400">{usageCount} / {FREE_TIER_LIMIT}</strong> images resized ({remainingQuota} remaining)
            </span>
          )}
          <button
            onClick={() => openUpgradeModal()}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 underline hover:no-underline ml-1"
          >
            {subscription.active ? 'Manage Plan' : 'Upgrade Now'}
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        
        {/* Free Plan Card */}
        <div className="flex flex-col justify-between rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Starter</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">Free Plan</h3>
            <p className="text-xs text-slate-500 mt-1">For casual, one-off image size reductions.</p>

            <div className="my-6">
              <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
              <span className="text-xs font-bold text-slate-500 ml-1">USD / forever</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>10 image resizes limit</strong> for signed-in users</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Single image & small batch upload</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Target KB size mode</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>100% In-browser privacy</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs text-slate-700 dark:text-slate-200 transition-colors"
            >
              Use Free Plan
            </button>
          </div>
        </div>

        {/* 3 Paid Tiers */}
        {SUBSCRIPTION_PLANS.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all border ${
                plan.popular
                  ? 'border-indigo-500 dark:border-indigo-500 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-900 ring-2 ring-indigo-500/20 shadow-xl'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {plan.durationLabel}
                  </span>
                  {plan.discountBadge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {plan.discountBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{plan.periodText}</p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      ${plan.priceUSD}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase">USD</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    ${plan.monthlyEquivalent.toFixed(2)} USD / month
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => openUpgradeModal()}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 active:scale-95'
                      : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white/90 active:scale-95'
                  }`}
                >
                  <span>Select {plan.durationLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

      </section>

      {/* Feature Comparison Table */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Detailed Feature Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-3 px-4 font-bold text-slate-500">Feature</th>
                <th className="py-3 px-4 font-bold text-slate-500">Free Tier</th>
                <th className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                  Pro (1mo: $10 / 3mo: $25 / 1yr: $75 USD)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Image Resizing Limit</td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">10 Images Total</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Batch Processing</td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Up to 3 images at once</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Up to 100+ images in parallel</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Target File Size Compression (100KB, 500KB)</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">✓ Included</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">✓ High Precision Binary Search</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Format Conversion (JPG, PNG, WebP)</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">✓ Included</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Batch ZIP Archive Download</td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Standard speed</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">High-speed parallel stream</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Privacy & Zero Server Uploads</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">100% In-Browser</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">100% In-Browser</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Support</td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Community</td>
                <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">Priority 24/7 Email Support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">
            Everything you need to know about our plans, pricing, and 10-image free usage limit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
              How does the 10-image usage limit work?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When you sign in with your Google account, you receive 10 free image resizes. Once you reach 10 images, you can upgrade to 1 Month ($10 USD), 3 Months ($25 USD), or 1 Year ($75 USD) to unlock unlimited image resizing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
              What currencies are supported?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              All prices are billed in USD ($10 for 1 Month, $25 for 3 Months, $75 for 1 Year). International credit and debit cards will automatically convert the charge at standard bank rates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
              Can I cancel my subscription?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes, absolutely! You can cancel at any time directly from the user profile menu or the subscription modal with 1 click. You will keep your Pro benefits until your paid period ends.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
              Are my images ever uploaded to a server?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Never! Both Free and Pro tiers process 100% of images locally in your browser memory using HTML5 Canvas and WebAssembly. Your photos never leave your device.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
