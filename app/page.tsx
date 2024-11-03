import { Textarea } from "@/components/ui/textarea"

import type { Metadata } from 'next';
import Link from 'next/link';

//import { SignUpButton } from "@/components/marketing/LandingSignUp";

export const metadata: Metadata = {
  title: 'Mastering Behavioral Interviews and Amazon Leadership Principles',
  description: "Guidance for job seekers, including senior professionals, on acing behavioral interviews with STAR answers and Amazon leadership principle questions."
,
};

export default async function IndexPage() {
  return (
      <div className=" flex-1 h-96 flex justify-center items-center">
      <Textarea  rows={5} className="max-w-md  mx-auto rounded-xl border-gray-300 " placeholder="What kind of form/contract do you want to create ?" />

        </div>
  );
}

