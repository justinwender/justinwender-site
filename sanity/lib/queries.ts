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

export const allProjectsQuery = /* groq */ `
  *[_type == "project"]
    | order(coalesce(order, 9999) asc, title asc){
      _id,
      title,
      slug,
      summary,
      status,
      tags,
      heroImage
    }
`;

export const projectBySlugQuery = /* groq */ `
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    order,
    status,
    summary,
    tags,
    heroImage,
    body,
    links,
    disclaimer,
    featured
  }
`;

export const projectSlugsQuery = /* groq */ `
  *[_type == "project" && defined(slug.current)].slug.current
`;

export const allPostsQuery = /* groq */ `
  *[_type == "post" && draft != true]
    | order(publishedAt desc){
      _id,
      slug,
      title,
      summary,
      publishedAt,
      tags
    }
`;

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug && draft != true][0]{
    _id,
    title,
    slug,
    publishedAt,
    summary,
    tags,
    body,
    featured,
    draft
  }
`;

export const postSlugsQuery = /* groq */ `
  *[_type == "post" && draft != true && defined(slug.current)].slug.current
`;

export const allExternalPublicationsQuery = /* groq */ `
  *[_type == "externalPublication"]
    | order(date desc){
      _id,
      title,
      publication,
      date,
      url,
      summary
    }
`;
