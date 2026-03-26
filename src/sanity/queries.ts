import { sanityClient } from './client';
import type { Lang } from '../i18n/translations';

// ─── Singletons ──────────────────────────────────────────────

export async function getHeroSection() {
  return sanityClient.fetch(`*[_type == "heroSection" && _id == "heroSection"][0]{
    tag,
    line1,
    line2,
    cta1,
    cta2,
    meta,
    "logo": logo.asset->url
  }`);
}

export async function getAboutSection() {
  return sanityClient.fetch(`*[_type == "aboutSection" && _id == "aboutSection"][0]{
    label,
    title,
    subtitle,
    description,
    aboutSubtitle,
    paragraphs,
    reference,
    objectivesTitle,
    objectives[]{text}
  }`);
}

export async function getContactSection() {
  return sanityClient.fetch(`*[_type == "contactSection" && _id == "contactSection"][0]{
    label,
    title,
    text,
    piName,
    piLabel,
    email,
    emailLabel,
    institutionLabel,
    institutionValue,
    mapLabel,
    mapEmbedUrl
  }`);
}

export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
    navProject,
    navEntities,
    navTeam,
    navPhases,
    navPublications,
    navContact,
    teamLabel,
    teamTitle,
    teamCount,
    piRoleLabel,
    researcherFemaleLabel,
    researcherMaleLabel,
    entitiesLabel,
    entitiesTitle,
    coordinatorLabel,
    participantLabel,
    phasesLabel,
    phasesTitle,
    readMoreLabel,
    methodologyBackLink,
    methodologyPlaceholder,
    publicationsLabel,
    publicationsTitle,
    publicationsEmpty,
    footerCopy,
    footerLogos[]{
      name,
      "logoUrl": logo.asset->url
    }
  }`);
}

// ─── Collections ─────────────────────────────────────────────

export async function getTeamMembers() {
  return sanityClient.fetch(`*[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    institution,
    "photoUrl": photo.asset->url,
    initials,
    orcidUrl,
    profileUrl,
    order
  }`);
}

export async function getEntities() {
  return sanityClient.fetch(`*[_type == "entity"] | order(order asc){
    _id,
    name,
    location,
    type,
    "logoUrl": logo.asset->url,
    order
  }`);
}

export async function getMethodologyPhases() {
  return sanityClient.fetch(`*[_type == "methodologyPhase"] | order(phaseNumber asc){
    _id,
    phaseNumber,
    title,
    description,
    "slug": slug.current,
    "slugEn": slugEn.current,
    content,
    summary
  }`);
}

export async function getMethodologyPhaseBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "methodologyPhase" && (slug.current == $slug || slugEn.current == $slug)][0]{
      phaseNumber,
      title,
      description,
      "slug": slug.current,
      "slugEn": slugEn.current,
      content,
      summary
    }`,
    { slug },
  );
}

export async function getPublications() {
  return sanityClient.fetch(`*[_type == "publication"] | order(year desc){
    _id,
    title,
    year,
    type,
    authors,
    journal,
    abstract,
    url,
    doi,
    "fileUrl": file.asset->url
  }`);
}

// ─── Full page data loader ──────────────────────────────────

export async function getHomePageData() {
  const [hero, about, contact, settings, team, entities, phases, publications] =
    await Promise.all([
      getHeroSection(),
      getAboutSection(),
      getContactSection(),
      getSiteSettings(),
      getTeamMembers(),
      getEntities(),
      getMethodologyPhases(),
      getPublications(),
    ]);

  return { hero, about, contact, settings, team, entities, phases, publications };
}

// ─── Helper: get localized value ────────────────────────────

export function localize<T>(obj: { es?: T; en?: T } | null | undefined, lang: Lang): T | undefined {
  if (!obj) return undefined;
  return obj[lang] ?? obj.es;
}
