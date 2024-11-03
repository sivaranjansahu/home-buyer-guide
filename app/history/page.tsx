import Button from "@/components/ui/Button";
import { getHistory, getSession, getTokens } from "../supabase-server";
import HistoryList from "@/components/app/HistoryList";
import Link from "next/link";
import Image from 'next/image';


export default async function History() {
  const session = await getSession()

  const user = session?.user;
  const history = await getHistory(user?.id);

  if (!history || history.length === 0) {
    return (
      <section >
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold  sm:text-center sm:text-5xl mb-8">
            History
          </h1>
          <div className="flex flex-col gap-8 items-center mb-16">
            <p className="body text-slate-11 max-w-lg text-lg text-center">
              {!user && <span>Log in to save your STAR answers in the history to access later. </span>}
              {user && <span>You have not generated any STAR answers yet. You can see previously generated answers here.</span>}
            </p>
            {user && <Button>
              <Link href="/generate">
                Generate Copy
              </Link>
            </Button>
            }
            {!user && <Button>
              <Link href="/signin">
                Login
              </Link>
            </Button>
            }
          </div>

          <img src="/images/historydemo.png" className="mt-4 blur-[2px] brightness-80" />

        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-900">

      <div className="max-w-6xl px-4 mx-auto py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold sm:text-center sm:text-5xl">
          History
        </h1>

        <div className="mx-auto mb-32 mt-16 flex w-full flex-col gap-6 ">

          <HistoryList histories={history} />

        </div>
      </div>
    </section>
  );
}