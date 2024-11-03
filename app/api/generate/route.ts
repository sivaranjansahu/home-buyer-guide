import { NextFetchEvent, NextRequest } from "next/server";
import { z } from "zod";

import { openAI } from "@/lib/ai"
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ratelimit } from "@/app/redis";


// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_URL as string,
//   token: process.env.UPSTASH_REDIS_TOKEN as string,
// })
// const ratelimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.slidingWindow(1, "60 s"),
// });
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const runtime = "edge";

const inputSchema = z.object({
  prompt: z.string(),
});

const generateCopyStream = async (input: string) => {
  const prompt = `
  You are a behavioral expert with 30+ years in interviewing candidates using STAR methodology of answering. You are the best in the industry to create STAR answers for situations and skills that will get the candidate hired in any organization.

I will provide you the following : 1. A scenario,  2. a list of skill areas
you need to come up with an behavioral answer in  STAR format, for the scenario  provided and following the best practices of STAR answer methodology, which will demonstrate is highly skilled in the areas provided above

Embellish and enhance the answer with details that may or may not be true, but which add a lot of impact, credibility and scope to the scenario.
I want you to respond with the following:
0. generate a short name for the scenario given
1. Find up to 5 behavioral questions that can be asked, to which the provided scenario can be a good answer that will exhibit excellent behavioral qualities. 
2. Create STAR formatted answer the the scenario highlighting the skills provided.  following these properties of STAR answering:
situation: Create an elaborate and coherent story around the scenario, fill in gaps logically when required. Bring out the need, importance clearly
task:Create an exhaustive set of tasks that are Well defined , thought out, meticulous forward, exhibit thinking planning, home work, analysis to address the situation
action: This is the most important part, so pay extra care to create this.Elaborate, structured, impactful and goal oriented actions, Highlight collaboration, efficiency, result oriented, out of the box thinking. Brea down in to sections
result: quantitive, positive, realistic, should tie back to situations
3. Critique: Critically analyze the scenario provided and list down the opportunities for improving it, or avoiding some parts that may be a red flag from a behavioral perspective 
4. Also provide a  list of follow up questions, do not answer them 
5. categorize the answer with an array of up to 3 most relevant tags related to behavioral traits/assessment areas
 provide the output in strict JSON format with properly validated JSON object of following structure:
    {
      shortName:string,probableQuestions:string[],      starAnswer:{        situation:string,
        task:string,        action:string,        result:string,reflection:string
      },      critique:string[],      followUpQuestions:string[],  tags:string[]
    }
Skill areas - problem solving, collaboration, innovation,
    Scenario:${input}
  `;

  const response = await openAI.createChatCompletion({
    model: "gpt-3.5-turbo-16k-0613",
    //model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 1,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false,
    n: 1,
  })

  return response;
};

export async function POST(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    ip
  );
  if (!success) {
    console.log("you cannot post more than 1 time in 60 seconds")
    return new Response(JSON.stringify({ remaining }), { status: 429 });

  }

  try {
    const json = await req.json();
    const body = inputSchema.parse(json);
    const stream = await generateCopyStream(body.prompt);
    return stream;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
