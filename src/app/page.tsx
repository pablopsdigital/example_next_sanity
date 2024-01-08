import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { clientSanity, urlFor } from "@/lib/sanity";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogCard } from "./interfaces/blogCard";

//Evita cache automática de Nextjs para las consultas
export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "It's a example use Sanity Serverless.",
  metadataBase: new URL("https://pablopsdigital.com"),
};

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
      title,
      smallDescription,
      "slug": slug.current,
      titleImage
  }`;

  const data = await clientSanity.fetch(query);
  console.log(data);

  return data;
}

export default async function Home() {
  const data: blogCard[] = await getData();

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 mt-5 gap-5">
      {data ? (
        data.map((post, index) => (
          <Card key={index}>
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              width={500}
              height={500}
              className="rounded-t-lg h-[200px] object-cover"
            />

            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <div> No content</div>
      )}
    </div>
  );
}
