import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const clientSanity = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "jq6oppv1",
  useCdn: false,
});

const builder = imageUrlBuilder(clientSanity);

export function urlFor(source: any) {
  return builder.image(source);
}
