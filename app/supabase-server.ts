import { FREE_TAGS } from '@/siteconfig';
import { Database } from '@/types_db';
import { User, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';


export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getTokens(userId: string) {

  const supabase = createServerSupabaseClient();
  try {
    const { data: quota } = await supabase
      .from('quota')
      .select()
      .eq("user_id", userId)
      .single()

    return quota;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getTags() {
  const supabase = createServerSupabaseClient();
  try {

      // const { data:tags, error } = await supabase
      // .from('unique_tags')
      // .select()
      
      const { data:tagItems, error } = await supabase
      .from('tag_question_count')
      .select('tag_name, question_count')
      .order('question_count', { ascending: false })
      .limit(50);

    return tagItems;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getQuestionById(id:number,user?:User,subscription?:any) {
  'use server'
  const supabase = createServerSupabaseClient();
  try {

    const { data:question, error } = await supabase
    .from('questionbank')
    .select('question')
    .eq('id', id)
    .single()

    const {tags} = question?.question||{};
    const isFree = tags.some((tag:string)=>FREE_TAGS.includes(tag.toLocaleLowerCase()))

    if(isFree || (subscription && user)) {
      return question;
    }else{
      return null
    }
    
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getQuestionsByTags(tag:string,user:User,subscription:any) {
  'use server'

  const isFree = FREE_TAGS.includes(tag.toLowerCase());
  const supabase = createServerSupabaseClient();
  // if((!subscription || !user) && !isFree){
  //   return null;
  // }
  try {

    const { data:questions, error } = await supabase
    .from('questions_by_tag')
    .select('title, question_id')
    .eq('tag_name', tag)
    .limit(subscription ? 100: 10)


    

    return questions;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getHistory(userId: string | null | undefined) {
  if (!userId) return null
  const supabase = createServerSupabaseClient();
  try {
    const { data: history } = await supabase
      .from('history')
      .select()
      .eq("user_id", userId)

    return history;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function decrementTokens(userId: string) {
  "use server"
  const supabase = createServerSupabaseClient();
  const currTokens = await getTokens(userId);
  if (!currTokens || (currTokens && currTokens.tokens <= 0)) {
    return null;
  }
  try {
    const { data: quota } = await supabase
      .from('quota')
      .update({ tokens: currTokens.tokens - 1 })
      .eq('user_id', userId)
      .select()

    return currTokens - 1;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function refillTokens(userId: string, newTokens: number) {
  "use server"
  const supabase = createServerSupabaseClient();
  const currTokens = await getTokens(userId);

  try {
    const totalTokens = currTokens ? currTokens.tokens + newTokens : newTokens;
    const { data: quota } = await supabase
      .from('quota')
      .insert({ tokens: totalTokens, user_id: userId })
      .select()
    return totalTokens;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
  //}

}


export async function saveToHistory({ userId, scenario, result }: { userId: string, scenario: string, result: string }) {
  "use server"
  const supabase = createServerSupabaseClient();

  try {
    const { data: quota } = await supabase
      .from('history')
      .insert({
        "user_id": userId,
        "scenario": scenario,
        "result": result
      })
      .select()

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getSubscription() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};
