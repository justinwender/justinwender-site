export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0]{
    contactEmail,
    contactTagline,
    socialLinks[]{platform, url}
  }
`;

export const aboutPageQuery = /* groq */ `
  *[_type == "aboutPage"][0]{
    body
  }
`;

export const featuredProjectsQuery = /* groq */ `
  *[_type == "project" && featured == true]
    | order(coalesce(order, 9999) asc, title asc){
      _id,
      title,
      slug,
      summary,
      status,
      tags
    }
`;
