'use client'
import { Dispatch, SetStateAction, useState } from "react"
//import CopyStar from "./CopyStar"
import clsx from "clsx"

import STARAnswer from "./StarAnswer"
import { starResponse } from "@/types/entities"
import CopyStar from "./CopyStar"
import Button from "../ui/Button"



const HistoryList = ({ histories }: {
    histories: {
        id: string;
        scenario: string;
        result: string | null;
        created_at: string;
        userId: string;
    }[]
}) => {
    const [selected, setSelected] = useState(0);
    const [filterType, setFilterType] = useState<"qn" | "scenario">("qn");
    const [selectedTag, setSelectedTag] = useState<string | null>()
    const parsedHistories = histories.map((h, i) => {
        const { scenario, created_at, result, id } = h;
        let starResp: starResponse | undefined = undefined;
        try {
            starResp = result
                ? JSON.parse(result)
                : undefined;
        } catch (e) {
            console.log(e)
        }
        return ({ starResp, created_at, scenario, id }
        )
    });

    const groupByTags = parsedHistories.reduce<{ [tag: string]: string[] }>((acc, item, index) => {
        const tags = item.starResp?.tags;
        if (tags) {
            tags.forEach(tag => {
                if (!acc[tag]) acc[tag] = [];
                acc[tag].push(item.id)
            })
        }
        return acc;
    }, {});
    const obj = Object.entries(groupByTags)
    return (
            <div className="flex flex-row gap-4">
                <div className="w-96 flex-none">
                    <div className="flex gap-x-8 mb-4 border-b border-slate-6">
                        {[{ name: "Questions", type: "qn" }, { name: "Scenarios", type: "scenario" },].map((item) => (
                            <div 
                                key={item.name}
                                onClick={() => setFilterType(item.type as "qn" | "scenario")}
                                className={clsx(
                                    "body  py-3 text-slate-11 border-b-4 border-b cursor-pointer",
                                    filterType === item.type ? " border-apple-9" : "border-transparent"
                                )}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>

                    {
                        filterType === "qn" &&
                        parsedHistories.map((h, i) => {
                            const { starResp, created_at, scenario } = h;


                            return (

                                <div key={"history" + created_at}>
                                    {starResp?.probableQuestions.map((q, ind) => (
                                        <div
                                            className={`text-xs mb-3 ${i === selected ? "" : "text-slate-400"}`}

                                            onClick={() => setSelected(i)}
                                            key={i + '-' + ind}>
                                            <div>{q}</div>
                                            <span className="text-xs italic text-slate-500"> {created_at.toLocaleString()}</span>

                                        </div>
                                    ))}
                                </div>

                            )
                        })
                    }

                    {
                        filterType === "scenario" &&

                        parsedHistories && <ScenariosFilter
                            selectedTag={selectedTag}
                            setSelectedTag={setSelectedTag}
                            parsedHistories={parsedHistories} tagGroup={Object.entries(groupByTags)}
                            selected={selected}
                            setSelected={setSelected}
                        />

                    }
                </div>
                {
                    parsedHistories[selected]?.starResp &&
                    <div style={{ flex: 1 }}>

                        <div className="flex justify-between mb-4">
                            <span className="text-sm italic text-slate-500"> {parsedHistories[selected].created_at}</span>
                            {parsedHistories[selected].starResp && <CopyStar starResp={parsedHistories[selected].starResp} />}

                        </div>

                        <STARAnswer resp={parsedHistories[selected].starResp} isLoading={false} />
                        <div>
                        <h4 className=" text-xl my-4">Provided scenario</h4>
                        <div>{parsedHistories[selected].scenario}</div>
                        </div>
                        {/* {parsedHistories[selected].starResp !== undefined && <STARAnswer resp={parsedHistories[selected].starResp} />} */}
                    </div>
                }
            </div >
    )
}
type parsedHistories = {
    starResp: starResponse | undefined;
    created_at: string;
    scenario: string;
    id: string;
}[]


const ScenariosFilter = ({ parsedHistories, tagGroup, setSelectedTag, selectedTag, selected, setSelected }: {
    selected: number,
    setSelected: Dispatch<SetStateAction<number>>,
    parsedHistories: parsedHistories, tagGroup: [string, string[]][], selectedTag: string | null | undefined, setSelectedTag: Dispatch<SetStateAction<string | null | undefined>>
}) => {
    const selectedTagQuestions = tagGroup.filter(tg => tg[0] === selectedTag);
    const filteredHistories = selectedTagQuestions && selectedTagQuestions.length > 0 && parsedHistories.filter(history => selectedTagQuestions[0][1]?.includes(history.id))
    console.log(filteredHistories)
    return (
        <div className="flex flex-row gap-4">
            <ul>
                {
                    tagGroup.map(tag => {
                        return <li className={`mb-2 capitalize cursor-pointer hover:text-apple-8 ${selectedTag  && tag[0] === selectedTag ? "text-apple-8" : ""}`} onClick={() => setSelectedTag(tag[0])} key={"tag" + tag[0]}>{tag[0]}</li>
                    })
                }
            </ul>
            <div>{filteredHistories && filteredHistories.map((history, i) => {
                return (
                    <div
                        className={`capitalize cursor-pointer hover:text-apple-8 text-xs mb-3 ${(filteredHistories.length===1 && i==0) || (i === selected) ? "text-apple-8" : ""}`}

                        onClick={() => setSelected(i)}
                        key={"scene" + history.id}>
                        <div>{history.starResp?.shortName}</div>
                        <span className="text-xs italic text-slate-500"> {history.created_at.toLocaleString()}</span>

                    </div>
                )
            })}</div>
        </div>

    )
}

export default HistoryList