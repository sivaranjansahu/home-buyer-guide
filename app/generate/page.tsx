import { Metadata } from "next";

// import { TIER_AICOPY_FEATURE_ID } from "@/config/tierConstants";
// import { getCurrentUser } from "@/lib/session";

import { Generate } from "@/components/app/GenerateSection";
import { redirect } from "next/navigation";
import { getSession, getUserDetails, getSubscription, getTokens, decrementTokens, saveToHistory } from "../supabase-server";


export const metadata: Metadata = {
  title: "Generate Copy",
  description: "Generate your AI based marketing content",
};

export default async function GeneratePage() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
    
  ]);



  const user = session?.user;
  const quota = await getTokens(user?.id||"")


  return (
    <section >
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-2xl font-bold text-white sm:text-center sm:text-5xl">
            Generate
          </h1>
          </div>
      <Generate user={user}
      name={userDetails?.full_name||""}
      saveToHistory={saveToHistory}
      decrementTokens = {decrementTokens} tokens={quota?.tokens} subscription={subscription}  />
    </div>
    </section>
  );
}
