import { defineField, defineType } from "sanity";

export const externalPublication = defineType({
  name: "externalPublication",
  title: "External Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publication",
      type: "string",
      description: 'e.g., "The Legal Intelligencer".',
    }),
    defineField({
      name: "date",
      type: "date",
    }),
    defineField({
      name: "url",
      type: "url",
    }),
    defineField({
      name: "summary",
      type: "string",
      description: "One-line summary.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publication" },
  },
});
