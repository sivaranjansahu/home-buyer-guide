import {
  getSession,
  getSubscription,
  getQuestionById
} from '@/app/supabase-server';
import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'STAR format answers for behavioral questions';
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription()
  ]);
  const user = session?.user;
  const qTokens = params.slug.split('-');
  const qId = qTokens[qTokens.length-1];
  const question = await getQuestionById(parseInt(qId,10), user, subscription);
  // Font
  const interSemiBold = fetch(
    new URL('/fonts/Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 60,
          color: '#eeeeee',
          background: 'rgb(17,24,39)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 72,
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 24, color: '#ddd' }}>
          Behavioural interview question
        </div>
        {question?.question.question}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400
        }
      ]
    }
  );
}
