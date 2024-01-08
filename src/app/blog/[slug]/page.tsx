import { blogArticle } from "@/app/interfaces/blogArticle";
import { clientSanity, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";

//Evita cache automática de Nextjs para las consultas
export const revalidate = 60;

export const metadata: Metadata = {
  //TODO: Create dinamic post title
  title: "Post title",
  description: "It's a example use Sanity Serverless.",
};

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
          "slug": slug.current,
          title,
          content,
          titleImage
      }[0]`;

  const data = await clientSanity.fetch(query);
  console.log(data);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: blogArticle = await getData(params.slug);

  return (
    <div className="mt-8">
      <h3 className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
        Pablo Pérez Blog
      </h3>

      {data ? (
        <div>
          <h1 className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {data.title}
          </h1>

          <Image
            src={urlFor(data.titleImage).url()}
            alt="Title Image"
            width={800}
            height={800}
            className="rounded-lg mt-8 border"
            priority
          />

          <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
            <PortableText value={data.content} />
          </div>
        </div>
      ) : (
        <div>No content</div>
      )}
    </div>
  );
}
