import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Manual sort on the Projects index (lower = earlier).",
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "summary",
      type: "string",
      description: "One-line description.",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "heroImage",
      type: "image",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          name: "projectLink",
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "type",
              type: "string",
              options: {
                list: [
                  { title: "Repo", value: "repo" },
                  { title: "Demo", value: "demo" },
                  { title: "Paper", value: "paper" },
                  { title: "Writeup", value: "writeup" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "type" },
          },
        }),
      ],
    }),
    defineField({
      name: "disclaimer",
      type: "string",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
