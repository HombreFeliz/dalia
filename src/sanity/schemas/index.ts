// Custom types (i18n)
import { localeString } from './types/localeString';
import { localeText } from './types/localeText';
import { localeBlockContent } from './types/localeBlockContent';

// Singletons
import { heroSection } from './singletons/heroSection';
import { aboutSection } from './singletons/aboutSection';
import { contactSection } from './singletons/contactSection';
import { siteSettings } from './singletons/siteSettings';

// Documents (collections)
import { teamMember } from './documents/teamMember';
import { entity } from './documents/entity';
import { methodologyPhase } from './documents/methodologyPhase';
import { publication } from './documents/publication';

export const schemaTypes = [
  // Custom types
  localeString,
  localeText,
  localeBlockContent,
  // Singletons
  heroSection,
  aboutSection,
  contactSection,
  siteSettings,
  // Documents
  teamMember,
  entity,
  methodologyPhase,
  publication,
];
