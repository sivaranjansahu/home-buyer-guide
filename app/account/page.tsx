import {
  getSession,
  getSubscription,
  getTokens,
  getUserDetails
} from '@/app/supabase-server';
import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import ManageSubscriptionButton from './ManageSubscriptionButton';
import Card from '@/components/ui/Card';
import { CircleDollarSign, Coins, Gem } from 'lucide-react';

export default async function Account() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;
  const tokensObj = await getTokens(user?.id || "")

  if (!session) {
    return redirect('/signin');
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const updateName = async (formData: FormData) => {
    'use server';

    const newName = formData.get('name') as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();
    const user = session?.user;
    const { error } = await supabase
      .from('users')
      .update({ full_name: newName })
      .eq('id', user?.id || "");
    if (error) {
      console.log(error);
    }
    revalidatePath('/account');
  };


  const redeemCode = async (formData: FormData) => {
    'use server';
    const REFILL_AMOUNT = 15;

    const code = formData.get('coupon') as string;
    const supabase = createServerComponentClient<Database>({ cookies });
    const session = await getSession();
    const user = session?.user;
    const tokensObj = await getTokens(user?.id || "")

    const { data: couponData, error } = await supabase.from('coupons').select('*').eq('id', code).single();
    if (!couponData?.redeemed) {
     
      const totalToken = tokensObj ? (tokensObj.tokens + REFILL_AMOUNT) : REFILL_AMOUNT;
      const quotaData = {
        user_id: user?.id,
        tokens: totalToken
      };

      try {
        const { error } = await supabase.from('quota').upsert([quotaData]);
        await supabase.from('coupons').update({ redeemed: true }).eq('id', code);
        return true;

      } catch {
        return false
      }


    }
  };

  const updateEmail = async (formData: FormData) => {
    'use server';

    const newEmail = formData.get('email') as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      console.log(error);
    }
    revalidatePath('/account');
  };

  return (
    <section className="mb-32">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-2xl font-bold text-white sm:text-center sm:text-5xl">
            Account          </h1>
          <p className="max-w-2xl m-auto mt-5 text-lg text-zinc-200 sm:text-center sm:text-lg">
            We use Stripe for a secure and simplified billing experience for you.
          </p>
        </div>
      </div>
      {/* <Redeem redeemCode={redeemCode}/> */}
      <div className="p-4">
        <Card
          title={<div className='flex flex-row gap-2 items-center'><Gem className=' stroke-snuff-500'/> Your plan</div>}
          
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : 'You are not currently subscribed to any plan.'
          }
          footer={subscription ? <ManageSubscriptionButton session={session} /> : null}
        >
          <div className="mt-8 mb-4 text-xl font-semibold text-snuff-700">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/pricing"><Button>Choose your plan</Button></Link>
            )}
          </div>
        </Card>

      </div>
      <Card
       title={<div className='flex flex-row gap-2 items-center'><CircleDollarSign className=' stroke-snuff-500'/> Tokens</div>}
        description="You can redeem coupons to add tokens to your account"
        footer={
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h4>Redeem Coupon</h4>
            <div className='flex flex-row gap-2'>
            <form id="couponForm" action={redeemCode} >
            <input
              type="text"
              name="coupon"
              className="p-3 rounded-md bg-zinc-800"
              defaultValue=""
              placeholder="Enter code"
              maxLength={64}
            />
          </form>
            <Button
              variant="slim"
              type="submit"
              form="couponForm"
            >
              {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
              Validate
            </Button>
            </div>
          </div>
        }
      >
        <div className="mt-8 mb-4 text-xl font-semibold">
        <p className="pb-4 sm:pb-0  text-snuff-700">Available {tokensObj?.tokens || 0} </p>
        </div>
      </Card>
      <Card
        title="Your Name"
        description="Please enter your full name, or a display name you are comfortable with."
        footer={
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <p className="pb-4 sm:pb-0">64 characters maximum</p>
            <Button
              variant="slim"
              type="submit"
              form="nameForm"
            //disabled={true}
            >
              {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
              Update Name
            </Button>
          </div>
        }
      >
        <div className="mt-8 mb-4 text-xl font-semibold">
          <form id="nameForm" action={updateName}>
            <input
              type="text"
              name="name"
              className="w-1/2 p-3 rounded-md bg-zinc-800"
              defaultValue={userDetails?.full_name ?? ''}
              placeholder="Your name"
              maxLength={64}
            />
          </form>
        </div>
      </Card>
      

    </section>
  );
}

// interface Props {
//   title: string;
//   description?: string;
//   footer?: ReactNode;
//   children: ReactNode;
// }

// export function Card({ title, description, footer, children }: Props) {
//   return (
//     <div className="w-full max-w-3xl m-auto my-8 border rounded-md p border-zinc-700">
//       <div className="px-5 py-4">
//         <h3 className="mb-1 text-2xl font-medium">{title}</h3>
//         <p className="text-zinc-300">{description}</p>
//         {children}
//       </div>
//       <div className="p-4 border-t rounded-b-md border-zinc-700 bg-zinc-900 text-zinc-500">
//         {footer}
//       </div>
//     </div>
//   );
// }
