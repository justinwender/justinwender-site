import { client } from "./client";

type FetchArgs<P extends Record<string, unknown> = Record<string, unknown>> = {
  query: string;
  params?: P;
  revalidate?: number | false;
  tags?: string[];
};

export async function sanityFetch<T>({
  query,
  params,
  revalidate = 60,
  tags,
}: FetchArgs): Promise<T> {
  return client.fetch<T>(query, params ?? {}, {
    next: {
      revalidate: tags && tags.length > 0 ? false : revalidate,
      tags,
    },
  });
}
