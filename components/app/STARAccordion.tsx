import { ReactNode } from "react";

import { starResponse } from "@/types/entities";

import { scenario } from "./landingScenario";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/Accordion";

const AccordionItemWrapper = ({
  title,
  children,
  value,
  subtitle,
}: {
  title: string;
  children: ReactNode;
  value: string;
  subtitle: string;
}) => {

  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="items-center mb-4 bg-gray-900 hover:bg-gray-700">
        <div className="  w-full p-2 text-left font-normal">
          <h4 className=" text-md font-medium text-slate-4">{title}</h4>
          <span className="text-sm text-slate-7">{subtitle}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export const STARAccordion = () => {
  const { probableQuestions, critique, starAnswer, followUpQuestions, tags, embellishInput } =
    scenario;
  return (
    <div className="md:w-96">
      <Accordion type="single" collapsible>
        <AccordionItemWrapper title="STAR Answer" value="item-0" subtitle="Generated answer">
          {starAnswer && (
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 font-semibold   py-2  pl-3 text-lg border-b-2 border-slate-8 ">Situation</div>
                <p className="pl-3">{starAnswer.situation}</p>
              </div>
              <div>
                <div className="mb-2 font-semibold  py-2  pl-3 text-lg border-b-2 border-slate-8">Task</div>
                <p className="pl-3">{starAnswer.task}</p>
              </div>
              <div>
                <div className="mb-2 font-semibold  py-2 pl-3 text-lg border-b-2 border-slate-8">Action</div>
                <p className="pl-3">{starAnswer.action}</p>
              </div>
              <div>
                <div className="mb-2 font-semibold py-2 pl-3 text-lg border-b-2 border-slate-8">Result</div>
                <p className="pl-3">{starAnswer.result}</p>
              </div>
            </div>
          )}
        </AccordionItemWrapper>
        <AccordionItemWrapper
          title="Probable questions"
          value="item-1"
          subtitle="Questions that can be answered with this scenario"
        ><ol className="list-none">
            {probableQuestions &&
              probableQuestions.map((q, i) => {
                return (
                  <li className="pl-3 mb-2 border-b-1 flex gap-2 text-sm" key={i}>
                    <div>{i + 1}.</div>
                    <div>{q}</div>
                  </li>
                );
              })}
          </ol>
        </AccordionItemWrapper>
        <AccordionItemWrapper
          title="Critique"
          value="item-2"
          subtitle="Critical analysis of your scenario"
        ><ul className="list-none">
            {critique &&
              critique.map((q, i) => {
                return (
                  <li className="pl-3 mb-2 border-b-1 flex gap-2 text-sm" key={i}>
                    <div>{i + 1}.</div>
                    <div>{q}</div>
                  </li>
                );
              })}
          </ul>
        </AccordionItemWrapper>

        <AccordionItemWrapper title="Enhancements" value="item-3" subtitle="Imrove the scenario">
          <ul className="list-none">
            {embellishInput &&
              embellishInput.map((q, i) => {
                return (
                  <li className="pl-3 mb-2 border-b-1 flex gap-2 text-sm" key={i}>
                    <div>{i + 1}.</div>
                    <div>{q}</div>
                  </li>
                );
              })}
          </ul>
        </AccordionItemWrapper>
        <AccordionItemWrapper
          title="Follow up questions"
          value="item-4"
          subtitle="Questions you can expect as a follow up"
        >
          <ul className="list-none">
            {followUpQuestions &&
              followUpQuestions.map((q, i) => {
                return (
                  <li className="pl-3 mb-2 border-b-1 flex gap-2 text-sm" key={i}>
                    <div>{i + 1}.</div>
                    <div>{q}</div>
                  </li>
                );
              })}
          </ul>
        </AccordionItemWrapper>
      </Accordion>
    </div>
  );
};

export default STARAccordion;
