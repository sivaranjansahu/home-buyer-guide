import { starResponse } from "@/types/entities";
import { Skeleton } from "../ui/skeleton";
import Button from "../ui/Button";
import Link from "next/link";
import { InfinitySpin } from "react-loader-spinner";

const MockStarAnswer = () => {
    return (
        <div className="text-sm">
            <div className=" mb-4 w-full rounded-[4px] border border-slate-6 bg-apple-2 p-4 ">
                <div className="mb-4 flex flex-row items-center gap-2  divide-blue-200">
                    <h4 className=" text-xl">Probable questions</h4>
                    <span className="text-sm italic text-slate-500">
                        Common behavioral questions , to which this scenario can be a response.
                    </span>
                </div>
                <Skeleton className="h-32 w-full" />

            </div>
            <div className=" mb-4 w-full rounded-[4px] border border-slate-6 bg-slate-2 p-4 ">
                <div className="mb-4 flex flex-row items-center gap-2  divide-blue-200">
                    <h4 className=" text-xl">Critique</h4>
                    <span className="text-sm italic text-slate-500">Critical analysis of your scenario</span>
                </div>
                <Skeleton className="h-32 w-full" />

            </div>
            <div className=" mb-4 w-full rounded-[4px] border border-slate-6 bg-slate-2 p-4">
                <h4 className="mb-6 text-xl">STAR Answer</h4>
                <Skeleton className="h-32 w-full" />
            </div>
            <div className=" mb-4 w-full rounded-[4px] border border-slate-6 bg-slate-2 p-4">
                <div className="mb-4 flex flex-row items-center gap-2  divide-blue-200">
                    <h4 className=" text-xl">Follow up questions</h4>
                    <span className="text-sm italic text-slate-500">
                        Questions you may expect after answering this
                    </span>
                </div>

                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    )
}

export const STARAnswer = ({ resp, isLoading }: { isLoading: boolean, resp: starResponse | undefined | null }) => {
    if (!resp && isLoading) return (
        <div className="flex flex-col gap-3 items-center mx-auto">
            <InfinitySpin width='200'
                color="#4fa94d" />
            <p>Generating STAR answer and analysis</p>
        </div>
    )
    if (!resp && !isLoading) return;
    const { probableQuestions, critique, starAnswer, followUpQuestions, tags, embellishInput } = resp || {};
    return (
        <>
            <div className="text-sm">
                <div className=" mb-4 w-full rounded-[4px] border border-slate-800 bg-gray-800 p-4 ">
                    <div className="mb-4 flex flex-row items-center gap-2  divide-blue-200">
                        <h4 className=" text-xl">Probable questions</h4>
                        <span className="text-sm italic text-slate-500">
                            Common behavioral questions , to which this scenario can be a response.
                        </span>
                    </div>

                    <ul className="list-disc pl-10 ">
                        {probableQuestions &&
                            probableQuestions.map((q, i) => {
                                return (
                                    <li className="mb-2" key={i}>
                                        {q}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div className=" mb-4 w-full rounded-[4px] border border-slate-800 bg-gray-800 p-4 ">
                    <div className="mb-4 flex flex-row items-center gap-2  divide-blue-200">
                        <h4 className=" text-xl">Critique</h4>
                        <span className="text-sm italic text-slate-500">Critical analysis of your scenario</span>
                    </div>
                    {critique}
                </div>
                <div className=" mb-4 w-full rounded-[4px] border border-slate-800 bg-gray-800 p-4">
                    <h4 className="mb-6 text-xl">STAR Answer</h4>

                    {starAnswer && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="mb-2 font-bold">Situation</div>

                                <p>{starAnswer.situation}</p>
                            </div>
                            <div>
                                <div className="mb-2 font-bold">Task</div>
                                <p>{starAnswer.task}</p>
                            </div>
                            <div>
                                <div className="mb-2 font-bold">Action</div>
                                <p>{starAnswer.action}</p>
                            </div>
                            <div>
                                <div className="mb-2 font-bold">Result</div>
                                <p>{starAnswer.result}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className=" mb-4 w-full rounded-[4px] border border-slate-800 bg-gray-800 p-4">
                    <div className="mb-4 flex flex-row items-center gap-2  divide-blue-200">
                        <h4 className=" text-xl">Follow up questions</h4>
                        <span className="text-sm italic text-slate-500">
                            Questions you may expect after answering this
                        </span>
                    </div>

                    <ul className="list-disc pl-10 ">
                        {followUpQuestions &&
                            followUpQuestions.map((q, i) => {
                                return (
                                    <li className="mb-2" key={i}>
                                        {q}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
            
        </>

    );
};

export default STARAnswer