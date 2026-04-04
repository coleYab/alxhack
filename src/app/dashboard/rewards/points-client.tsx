'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import {
  readLoyaltyPoints,
  subscribeToLoyaltyPointsChanges
} from '@/features/trips/lib/trip-progress-storage';

type Reward = {
  name: string;
  image: string;
  coinCost: number;
};

const initialPoints = 0;
const REDEEMED_COUNTS_STORAGE_KEY = 'dashboard.rewards.redeemed-counts.v1';

function readRedeemedCounts(): Record<string, number> {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(REDEEMED_COUNTS_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed !== 'object') return {};

    return Object.entries(parsed).reduce<Record<string, number>>((accumulator, [key, value]) => {
      const count = Number(value);
      if (Number.isFinite(count) && count >= 0) {
        accumulator[key] = Math.floor(count);
      }

      return accumulator;
    }, {});
  } catch {
    return {};
  }
}

function saveRedeemedCounts(counts: Record<string, number>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(REDEEMED_COUNTS_STORAGE_KEY, JSON.stringify(counts));
}

const rewards: Reward[] = [
  {
    name: 'Notebook',
    image: '/images/loyality/notebook.png',
    coinCost: 10
  },
  {
    name: 'Cup',
    image: '/images/loyality/cup.png',
    coinCost: 15
  },
  {
    name: 'T-Shirt',
    image: '/images/loyality/tshits.png',
    coinCost: 20
  },
  {
    name: 'Hoodie',
    image: '/images/loyality/hoodie.png',
    coinCost: 25
  }
];

export default function MyPointsClient() {
  const [points, setPoints] = useState(initialPoints);
  const [redeemedCounts, setRedeemedCounts] = useState<Record<string, number>>(() =>
    readRedeemedCounts()
  );

  useEffect(() => {
    setPoints(readLoyaltyPoints(initialPoints));
    setRedeemedCounts(readRedeemedCounts());

    return subscribeToLoyaltyPointsChanges(() => {
      setPoints(readLoyaltyPoints(initialPoints));
    });
  }, []);

  function handleRedeem(reward: Reward) {
    if (points < reward.coinCost) return;

    const nextPoints = points - reward.coinCost;

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dashboard.loyalty.points.v1', String(nextPoints));
      window.dispatchEvent(new Event('loyalty-points-change'));
    }

    setPoints(nextPoints);
    setRedeemedCounts((currentCounts) => ({
      ...currentCounts,
      [reward.name]: (currentCounts[reward.name] ?? 0) + 1
    }));
  }

  useEffect(() => {
    saveRedeemedCounts(redeemedCounts);
  }, [redeemedCounts]);

  return (
    <div className='h-[calc(100dvh-52px)] overflow-y-auto'>
      <div className='mx-auto w-full max-w-6xl space-y-7 p-4 pb-10 md:px-6'>
        <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-gradient-to-r from-background to-muted/30 p-4 shadow-sm'>
          <p className='text-sm font-medium text-muted-foreground'>
            Keep collecting coins. Every trip brings you closer to your next free reward.
          </p>
          <div className='inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800 shadow-sm'>
            <Icons.wallet className='h-4 w-4' />
            {points} coins
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4'>
          {rewards.map((reward) => {
            const isAffordable = points >= reward.coinCost;
            const redeemedCount = redeemedCounts[reward.name] ?? 0;

            return (
              <article
                key={reward.name}
                className='border-border/60 group flex flex-col overflow-hidden rounded-2xl bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
              >
                <div className='relative h-48 w-full overflow-hidden sm:h-56'>
                  <Image
                    src={reward.image}
                    alt={reward.name}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent' />
                  <div className='absolute left-2 top-2'>
                    <div className='rounded-md border border-amber-200/60 bg-white/95 px-2 py-1 text-[10px] font-semibold text-amber-700 shadow-sm backdrop-blur'>
                      <span className='inline-flex items-center gap-1'>
                        <Icons.wallet className='h-3 w-3' />
                        {reward.coinCost}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex min-h-[138px] flex-col space-y-2 p-3.5'>
                  <p className='line-clamp-2 text-sm font-semibold leading-tight'>{reward.name}</p>
                  <p className='text-muted-foreground inline-flex items-center gap-1 text-xs'>
                    <Icons.wallet className='h-3.5 w-3.5' />
                    {reward.coinCost} coins needed
                  </p>
                  <p className='text-muted-foreground text-xs'>Redeemed: {redeemedCount}</p>

                  <button
                    type='button'
                    onClick={() => handleRedeem(reward)}
                    disabled={!isAffordable}
                    className={`mt-auto inline-flex w-fit items-center justify-center rounded-lg border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                      isAffordable
                        ? 'border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'cursor-not-allowed border-border bg-muted text-muted-foreground opacity-60'
                    }`}
                  >
                    redeem
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
