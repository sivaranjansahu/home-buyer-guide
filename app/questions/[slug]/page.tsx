import {
  getQuestionById,
  getQuestionsByTags,
  getSession,
  getSubscription,
  getTags
} from '../../supabase-server';
import BackButton from '@/components/app/BackButton';
import ProContent from '@/components/app/ProAccess';
import QuestionBank from '@/components/app/QuestionBank';
import {
  ArrowBigLeft,
  CheckSquare,
  Flag,
  Star,
  TextSelect,
  XOctagon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default async function IndexPage({ params }: { params: {slug:string} }) {
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription()
  ]);
  const user = session?.user;
  const qTokens = params.slug.split('-');
  const qId = qTokens[qTokens.length-1];
  const question = await getQuestionById(parseInt(qId,10), user, subscription);
  const {
    question: title,
    tags,
    choosingScenario,
    redFlags,
    highlightKeywords,
    sampleAnswer
  } = question?.question ?? {};

  if (!question?.question) {
    return (
      <section>
        <div className="w-full md:max-w-3xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <BackButton />
          <ProContent />
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="w-full md:max-w-3xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <div className="inline-block flex flex-row gap-2 text-xs cursor-pointer hover:text-snuff-500">
          <BackButton />
        </div>
        <div className="mb-12">
          <h4 className="font-semibold mb-2 text-slate-600">Question</h4>
          <h1 className=" font-regular text-slate-400 mb-2 sm:text-lg md:text-2xl border-1 p-6 tracking-loose bg-gray-800">
            {title}
          </h1>
          <div className="text-right">
            {tags &&
              tags.map((t: string) => (
                <span className="text-sm text-snuff-600">#{t}&nbsp;&nbsp;</span>
              ))}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-regular mb-4 text-xl text-slate-500 border-b pb-2 border-gray-500 flex flex-row gap-2 items-center">
            <TextSelect className="stroke-snuff-700" />
            How to pick a scenario for this question
          </h3>
          <p>{choosingScenario}</p>
        </div>
        <div className="mb-8">
          <h3 className="font-regular mb-4 text-xl text-slate-500 border-b pb-2 border-gray-500 flex flex-row gap-2  items-center">
            <CheckSquare className="stroke-snuff-700" />
            Areas to emphasize
          </h3>
          <ul>
            {highlightKeywords?.map((keyword: any, index: number) => {
              return (
                <li key={`keyword-${index}`} className="mb-6 ">
                  <h4 className="font-semibold mb-2 text-slate-500 capitalize">
                    {keyword.keyword}
                  </h4>
                  <p>{keyword.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="font-regular mb-4 text-xl text-slate-500 border-b pb-2 border-gray-500 flex flex-row gap-2  items-center">
            <XOctagon className="stroke-snuff-700" />
            Red flags to avoid
          </h3>
          <ul>
            {redFlags?.map((flag: any, index: number) => {
              return (
                <li key={`keyword-${index}`} className="mb-6">
                  <h4 className="font-semibold mb-2 text-slate-500 capitalize">
                    {flag.flag}
                  </h4>
                  <p>{flag.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="font-regular mb-4 text-xl text-slate-500 border-b pb-2 border-gray-500 flex flex-row gap-2  items-center">
            <Star className="stroke-snuff-700" />
            Sample STAR answer
          </h3>

          <STAR star={sampleAnswer} />
        </div>
      </div>
    </section>
  );
}

const STAR = ({
  star
}: {
  star: { situation: string; task: string; action: string; result: string };
}) => {
  return (
    <>
      {star &&
        Object.entries(star).map((obj) => {
          return (
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-slate-400 capitalize">
                {obj[0]}
              </h4>
              <p>{obj[1]}</p>
            </div>
          );
        })}
    </>
  );
};
