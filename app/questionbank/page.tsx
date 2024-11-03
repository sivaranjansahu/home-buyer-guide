import QuestionBank from "@/components/app/QuestionBank";
import { getActiveProductsWithPrices, getQuestionsByTags, getSession, getSubscription, getTags } from "../supabase-server";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: 'Amazon Leadership Principles and other behavioral interview questions list',
  description: "Guidance for job seekers, including senior professionals, on acing behavioral interviews with STAR answers and Amazon leadership principle questions."
,
};
export default async function IndexPage(){
    const tags = await getTags();
    //const questions = await getQuestionsByTags("prioritization");
    const filtered = tags?.sort((a,b)=>b.question_count-a.question_count);
    const [session, subscription] = await Promise.all([
      getSession(),
      getSubscription()
    ]);
    const user = session?.user;
    return(
        <section >
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold  sm:text-center sm:text-5xl mb-16">
            Question bank
          </h1>
        <QuestionBank subscription={subscription} user={user} tags={filtered} getQuestionsByTags = {getQuestionsByTags}/>
        </div>
        </section>
    )
}