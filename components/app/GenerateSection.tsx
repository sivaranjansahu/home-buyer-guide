"use client";

import { useCompletion } from "ai/react";
import { Copy, Frown, Meh, Smile } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
//import type { Usage } from "tier";

import Button from "@/components/ui/Button";
import { starResponse } from "@/types/entities";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { ToastAction } from "../ui/toast/toast";
import { toast } from "../ui/toast/use-toast";
import STARAnswer from "./StarAnswer";
//import { toast } from "@/components/ui/use-toast";
//import STARAnswer from "./StarAnswer";
//import { starResponse } from "@/types/entities";

export function copyText(entryText: string) {
  navigator.clipboard.writeText(entryText);
}

export function formatJsonToHumanReadable(jsonData: any) {
  let result = "";

  // Add probableQuestions section
  result += "Probable questions:\n--------------\n";
  for (const question of jsonData.probableQuestions) {
    result += `  - ${question}\n`;
  }

  // Add starAnswer section
  result += "\n\nStar Answer:\n--------------\n";
  const starAnswer = jsonData.starAnswer;
  for (const key in starAnswer) {
    result += `  ${key}: ${starAnswer[key]}\n`;
  }

  // Add critique section
  result += "\n\nCritique of the scenario:\n--------------\n";
  for (const critique of jsonData.critique) {
    result += `  - ${critique}\n`;
  }

  // Add followUpQuestions section
  result += "\n\nFollow up questions:\n--------------\n";
  for (const question of jsonData.followUpQuestions) {
    result += `  - ${question}\n`;
  }

  return result;
}


const qualityHelper = (input: number) => {
  let quality = null;
  if (input < 500) {
    quality = { ready: false, text: "Too short" };
  } else if (input < 800) {
    quality = { ready: true, text: "Acceptable length, can be better" };
  } else if (input > 4000) {
    quality = { ready: false, text: "Too long, try to shorten it" };
  } else {
    quality = { ready: true, text: "Looks good" };
  }
  return quality;
};

const QualityIndicator = ({ input }: { input: string }) => {
  const { ready, text } = qualityHelper(input.length);
  return (
    <div className="flex flex-row items-center gap-1">
      {!ready ? (
        <Frown size={16} />
      ) : text === "OK length, can be better" ? (
        <Meh size={16} />
      ) : (
        <Smile size={16} />
      )}
      <span className={ready ? "text-lime-600" : "text-amber-500"}>{text}</span>
    </div>
  );
};

export function Generate({ user, name, tokens, subscription, decrementTokens, saveToHistory }: { name: string, user?: User, tokens: number, subscription?: any, decrementTokens: any, saveToHistory: any }) {
  const [error, setError] = useState(false);
  //const [usedQuota, setUsedQuota] = useState(featureLimits.used);
  const [remainingTokens, setRemainingTokens] = useState(tokens);
  const [answer, setAnswer] = useState<starResponse | null>();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    complete,
    completion,
    setCompletion,
    input,
    setInput,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/generate",
    body: {
      //userId: user.id,
    },
    onResponse: async (res) => {
      if (res.status === 402) {
        toast({
          title: "Upgrade your plan",
          description: res.statusText,
        });
      }
      if (res.status === 429) {
        console.log('hit limit');
        setErrorMessage("You have reached the free daily invocations limit, consider signing up");

        toast({
          title: "You have reached the free daily invocations limit",
          action: (
            <ToastAction altText="Upgrade">
              <Link href="/pricing">
                <Button variant="link">
                  Upgrade to pro
                </Button>
              </Link>
            </ToastAction>
          ),
        });
      }
    },
    onFinish: async (prompt, completion) => {
      //setUsedQuota(usedQuota + 1);
      try {
        const ansObj = JSON.parse(JSON.parse(completion).choices[0].message.content);
        setAnswer(ansObj);
        console.log(ansObj)
        user && deductTokens(user)
        user && saveToHistory({
          userId: user?.id,
          scenario: prompt,
          result: ansObj
        })


      } catch (error) {
        console.log(error);
      }
    },
  });

  function clearGeneration() {
    setInput("");
    setCompletion("");
    setAnswer(null)
  }

  const deductTokens = useCallback(async (user: User) => {
    if (remainingTokens > 0) {
      await decrementTokens(user.id).then(() => setRemainingTokens(t => t - 1))
    }
  }, [])


  useEffect(() => {
    if (input.length <= 500) setError(false);
  }, [input]);

  return (
    <div className=" mx-auto">
      {/* Greetings */}
      <div className="mt-16 flex  flex-col items-center gap-3 lg:flex-row lg:justify-between lg:gap-0 bg-gray-800	p-4">
        <h1 className="h5">
          Hello <span className="text-snuff-600 font-bold">{name || "guest"}!</span>
          <div className="text-sm">{!subscription && ` You can generate 3 scenarios per day for free. Upgrade to get access to more tokens and features.`}</div>
        </h1>
        {errorMessage}

        {
          user && remainingTokens && <div className="flex gap-2 items-center">
            Remaining tokens
            <div className="px-2 py-1 bg-apple-8 border-radius-2">{!remainingTokens ? 0 : remainingTokens}</div>
          </div>
        }
        {
          (!subscription &&  !remainingTokens) && 
          <Link href="/pricing">
            <Button variant="cta">
              Upgrade
            </Button>
          </Link>

        }

      </div>
      {/* Generate Section */}
      <div className="mb-12 mt-8 flex  flex-col items-start gap-8 xl:mb-60 xl:flex-col xl:justify-between xl:gap-8 max-w-screen-md	mx-auto	">
        {/* Input field for prompt*/}
        <form className="flex w-full flex-col  gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex w-full justify-between py-2">
              <div>
                <span>Enter a scenario</span>
                {
                  !completion && <Button
                    variant="link"
                    onClick={() => setInput(sampleScenario)}
                    className="disabled:bg-transparent border-none disabled:text-gray-500 text-apple-7 text-sm font-normal hover:text-apple-9"
                    disabled={input.length !== 0}
                  //disabled={true}
                  >
                    Or, Load an example
                  </Button>
                }
              </div>

              {input && <QualityIndicator input={input} />}
            </div>
            <div className="relative">
              <textarea
                rows={6}
                value={input}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder={`Explain a scenario that you want to create STAR questions for. You dont have to focus on grammar or semantics, but pay attention to facts, events, data etc Be as detailed and thorough as possible. Our AI model will automatically fix the language errors and generate a well written STAR answer for this scenario.`}
                className="body w-full resize-none rounded-[4px] border border-gray-800 bg-gray-700 p-6 text-sm text-slate-300  placeholder:text-slate-9"
              />
              {/* Character length indicator */}
              <div
                className={`caption-s absolute bottom-4 right-3 ${input.length > 500 ? "text-red-500" : "text-slate-9"
                  }`}
              ></div>
            </div>
            {/* Error Message */}
            {error && <p className="-mt-1 text-xs text-red-600">Character limit exceeded</p>}
          </div>
          <div className="flex flex-row justify-between gap-3">
            <div>
              {subscription && subscription.status !== 'active' && <span>Your subscription is inactive</span>}
              {tokens <= 0 && <span>Insufficient tokens</span>}</div>
            <div className="flex flex-row gap-3">
              <Button
                variant="flat"
                type="submit"
                className="text-slate-6  disabled:text-slate-11"
                disabled={isLoading || !qualityHelper(input.length).ready || tokens <= 0 || (subscription && subscription.status !== 'active')}
              // disabled={usedQuota < user?.limit.limit ? false : true}
              >
                {isLoading ? "Generating STAR analysis..." : "Generate STAR analysis"}
              </Button>



              <Button
                variant="link"
                onClick={clearGeneration}
                className="text-slate-6 disabled:text-slate-11"
                disabled={isLoading || input.length === 0}

              >
                Clear
              </Button>

            </div>
          </div>
        </form>
        {/* Output field for marketing copy */}

        {completion && (
          <>
            <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10" />
            <h3 className="text-2xl">STAR answer and analysis</h3>
            <div className="flex  w-full items-center justify-between">
              <h5>Scenario : {answer?.shortName}</h5>
              <Button
                onClick={() => copyText(formatJsonToHumanReadable(answer))}
                className="flex flex-row items-center gap-2"
              >
                <Copy size={16} />
              </Button>
            </div>
          </>
        )}

        <STARAnswer resp={answer} isLoading={isLoading} />
        {
          !user && completion && <div className="w-full border-1  p-6 text-center flex flex-col items-center gap-6">

            <Link href="/signin">
              <Button variant="cta">
                Sign up to save answers to history
              </Button>
            </Link>

            <div>
              When you create an account with us, your generated answers will be automatically saved in the <Link href="/history">History</Link> page for accessing it in the future.

            </div>
          </div>
        }
      </div>
    </div >
  );
}


const sampleScenario = `Our team got a critical project with vague instructions. Developers in my team - David and Emily interpreted it differently, leading to conflicting strategies.As the deadline neared, David and Emily noticed the differences but hesitated to speak up, fearing tension.I sensed the issue and organized a meeting where we openly discussed the project. We clarified misunderstandings, aligned our goals, and stressed the importance of communication.
We adjusted the project plan, reviewed work together, and with clear communication, completed the project successfully.`