import BackButton from "@/components/app/BackButton";
import { getPostData, getSortedPostsData } from "@/lib/posts";

export default async function IndexPage({ params }: { params: {id:string} }) {
    const posts = await getSortedPostsData();
    const postHtml = await getPostData(params.id);
    return(
        <section>
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        
          <div>
            <article className="prose mx-auto lg:prose-lg dark:prose-invert text-gray-400 prose-headings:text-gray-200 prose-strong:text-gray-400">
            <BackButton title="Back to blogs"/>
              <div dangerouslySetInnerHTML={{ __html: postHtml.contentHtml }} />
            </article>
          </div>
        </div>
      </section>
    )
}