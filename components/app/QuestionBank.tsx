'use client';

import Button from '../ui/Button';
import Card from '../ui/Card';
import { Label } from '../ui/Label';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import ProContent from './ProAccess';
import { FREE_TAGS } from '@/siteconfig';
import { User } from '@supabase/supabase-js';
//import CopyStar from "./CopyStar"
import clsx from 'clsx';
import Link from 'next/link';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import ProCTA from './ProCTA';
import { ChevronRight } from 'lucide-react';

enum Seniorities {
  'Manager' = 2,
  'Senior' = 1,
  'Entry level' = 0
}

const QuestionBank = ({
  tags,
  getQuestionsByTags,
  subscription,
  user
}: {
  subscription?: any;
  user?: User;
  tags?:
    | {
        tag_name: any;
        question_count: any;
      }[]
    | undefined;
  getQuestionsByTags: any;
}) => {
  const [selected, setSelected] = useState(0);
  const [seniorityFilter, setSeniorityFilter] = useState<Seniorities>(2);
  const [selectedTag, setSelectedTag] = useState<{
    free: boolean;
    tag_name: any;
    question_count: any;
  } | null>();
  const [questions, setQuestions] = useState<
    { title: string; question_id: number }[]
  >([]);

  const categorizedTags = tags?.map((tag) => {
    const obj = { ...tag, free: false };
    if (FREE_TAGS.includes(tag.tag_name.toLowerCase())) {
      obj.free = true;
    }
    return obj;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let storedTag = localStorage.getItem('storedTag');
      const storedTagJSON = storedTag &&  JSON.parse(storedTag);
      storedTag && setSelectedTag(storedTagJSON);
     
    }
  }, []);

  useEffect(() => {
    const getQn = async () => {
      if (!selectedTag) return;
    //   if (!selectedTag.free && (!user || !subscription)) {
    //     setQuestions([]);
    //     return;
    //   }
      const qns = await getQuestionsByTags(
        selectedTag.tag_name,
        user,
        subscription
      );
      setQuestions(qns);
    };
    getQn();
  }, [selectedTag]);
  return (
    <div className="flex flex-col  md:flex-row gap-4">
      <div className="w-84 flex-none">
        <div className="mb-4">
          <h4 className="mb-4 border-b border-slate-6 pb-2">Tags</h4>
          <ul>
            {categorizedTags &&
              categorizedTags.map((tag, index) => (
                <li
                  key={'tag-' + index}
                  className={`flex flex-row gap-4 text-sm mb-2 capitalize font-semibold cursor-pointer hover:text-apple-8 mb-3 ${
                    (categorizedTags.length === 1 && index === 0) ||
                    tag.tag_name.toLowerCase() ==
                      selectedTag?.tag_name.toLowerCase()
                      ? 'text-snuff-800'
                      : ''
                  }`}
                  onClick={() => {  localStorage.setItem("storedTag", JSON.stringify(tag));setSelectedTag(tag)}}
                >
                  {!user && (
                    <div
                      className={`${
                        tag.free
                          ? 'bg-apple-9 text-white'
                          : 'bg-gray-800 text-snuff-600'
                      } px-2 py-0.5 rounded-lg font text-[9px]`}
                    >
                      {tag.free ? <span>Free</span> : <span>Pro</span>}
                    </div>
                  )}
                  <span>
                    {tag.tag_name} ({tag.question_count})
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 md:px-8">
        <h3 className="font-semibold mb-4 ">
          {selectedTag ? (
            <div>
              <div className=" text-xl capitalize">{selectedTag.tag_name} </div>
              {!subscription && selectedTag && selectedTag.free && (
                          <Card title='Showing only 10 of 60 questions' description='You need a paid subscription to access all questions.' footer={<ProCTA/>} />

                // <span className="text-xs">
                //   Showing 10 questions only. Upgrade to Pro to get access to all
                //   questions.
                // </span>
              )}
            </div>
          ) : (
            <span>Select a tag from the list of tags.</span>
          )}
        </h3>
        {selectedTag && !selectedTag.free && (!user || !subscription) && (
        //   <ProContent />
          <Card title='Get Pro to unlock all questions' description='You need a paid subscription to access response to the below questions.' footer={<ProCTA/>} />
        )}
        <ul>
          {questions &&
            questions.map((q, i) => {
               
              return (
                <li
                  className="mb-4 flex flex-row gap-2 mb-4 w-full rounded-[4px] border border-slate-800 bg-gray-800 p-4 hover:border-snuff-800"
                  key={'question-' + i}
                >
                  <div className="text-slate-500 text-sm font-bold">
                    {i + 1}
                  </div>
                  <Link href={'/questions/star-format-answer-behavioral-questions-on-'+ selectedTag?.tag_name+'-'+ q.question_id}>
                    {' '}
                    <div >{q.title}</div>
                  </Link>
                  <ChevronRight/>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default QuestionBank;

const SeniorityFilter = () => {
  return (
    <RadioGroup defaultValue="option-one" className="flex flex-row gap-6">
      {[0, 1, 2].map((ent) => (
        <div className="flex items-center space-x-2" key={'seniorities-' + ent}>
          <RadioGroupItem value={Seniorities[ent]} id={Seniorities[ent]} />
          <Label htmlFor={Seniorities[ent]}>{Seniorities[ent]}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
