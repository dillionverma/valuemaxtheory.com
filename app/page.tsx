import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

type MdxProps = {
  code: string;
};

const MdxRenderer = ({ code }: MdxProps) => {
  const Component = useMDXComponent(code);
  return <Component />;
};

export default function Home() {
  const post = allPosts[0];

  if (!post) {
    notFound();
  }

  return (
    <main className="container prose">
      <article className="mx-auto py-8">
        <div className="mb-8 text-center">
          <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>
        <MdxRenderer code={post.body.code} />
      </article>
    </main>
  );
}
