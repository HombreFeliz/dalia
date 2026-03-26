import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ct4976jq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function seed() {
  console.log('Seeding Sanity...\n');

  // ─── Hero Section ──────────────────────────────────────
  console.log('→ Hero Section');
  await client.createOrReplace({
    _id: 'heroSection',
    _type: 'heroSection',
    tag: {
      es: 'Ministerio de Ciencia, Innovación y Universidades · 2025–2028',
      en: 'Ministry of Science, Innovation and Universities · 2025–2028',
    },
    line1: {
      es: 'Datos, Algoritmos e Inteligencia Artificial en Atención Primaria',
      en: 'Data, Algorithms and Artificial Intelligence in Primary Care',
    },
    line2: {
      es: 'Hacia una digitalización responsable en los cuidados y la salud.',
      en: 'Towards responsible digitalisation in care and health.',
    },
    cta1: {
      es: 'Conocer el proyecto →',
      en: 'Learn about the project →',
    },
    cta2: {
      es: 'Conocer el equipo',
      en: 'Meet the team',
    },
    meta: {
      es: 'IIIA-CSIC · Barcelona',
      en: 'IIIA-CSIC · Barcelona',
    },
  });

  // ─── About Section ─────────────────────────────────────
  console.log('→ About Section');
  await client.createOrReplace({
    _id: 'aboutSection',
    _type: 'aboutSection',
    label: {
      es: 'El Proyecto',
      en: 'The Project',
    },
    title: {
      es: 'Datos, Algoritmos e Inteligencia Artificial en Atención Primaria.',
      en: 'Data, Algorithms and Artificial Intelligence in Primary Care.',
    },
    subtitle: {
      es: 'Hacia una digitalización responsable en los cuidados y la salud (DALIA)',
      en: 'Towards responsible digitalisation in care and health (DALIA)',
    },
    description: {
      es: 'El proyecto DALIA es un I+D+i financiado por el Ministerio de Ciencia, Innovación y Universidades para el periodo 2025-2028. El proyecto está liderado por el Institut d\'Investigació en Intel·ligència Artificial del CSIC (IP Núria Vallès Peris), contando con un equipo de más de 10 investigadores e investigadoras, y con la participación de 6 centros de investigación: Escuela Andaluza de Salud Pública, Fundació Hospital d\'Olot i Comarcal de la Garrotxa, Institut d\'Investigació en Atenció Primària Jordi Gol–Institut Català de la Salut, Institut d\'Investigació en Intel·ligència Artificial–CSIC, Universitat Autònoma de Barcelona y Universitat de Barcelona.',
      en: 'The DALIA project is an R&D+i initiative funded by the Spanish Ministry of Science, Innovation and Universities for the period 2025-2028. The project is led by the Institut d\'Investigació en Intel·ligència Artificial of the CSIC (PI Núria Vallès Peris), with a team of more than 10 researchers, and with the participation of 6 research centres: Escuela Andaluza de Salud Pública, Fundació Hospital d\'Olot i Comarcal de la Garrotxa, Institut d\'Investigació en Atenció Primària Jordi Gol–Institut Català de la Salut, Institut d\'Investigació en Intel·ligència Artificial–CSIC, Universitat Autònoma de Barcelona and Universitat de Barcelona.',
    },
    aboutSubtitle: {
      es: 'Finalidad y objetivos del proyecto',
      en: 'Purpose and objectives of the project',
    },
    paragraphs: [
      {
        _key: 'p2',
        es: 'Durante los últimos años la inteligencia artificial (IA) ha adquirido un papel especialmente relevante en la transformación digital de la sociedad en múltiples ámbitos, entre ellos en la salud. La IA ofrece múltiples potencialidades en el campo de la sanidad y la salud. Sin embargo, también plantea diversos desafíos para la práctica clínica, la organización de los sistemas de salud, las relaciones con pacientes y la comprensión misma de la salud y la enfermedad o la ética de la salud pública. El proyecto DALIA se centra en el estudio de estos retos en el ámbito de la atención primaria, partiendo de la premisa de que esta constituye un pilar esencial y básico para la equidad y la justicia social en todo aquello relacionado con la salud y el bienestar. La atención primaria de salud es ampliamente reconocida como la vía más inclusiva, equitativa y costo-efectiva para alcanzar la cobertura sanitaria universal. Asimismo, resulta fundamental para fortalecer la resiliencia de los sistemas de salud, a fin de prepararlos para afrontar, responder y recuperarse frente a situaciones de emergencia y crisis.',
        en: 'In recent years, artificial intelligence (AI) has acquired a particularly relevant role in the digital transformation of society across multiple domains, including health. AI offers multiple potentialities in the field of healthcare and health. However, it also poses various challenges for clinical practice, the organisation of health systems, relationships with patients, and the very understanding of health and disease or public health ethics. The DALIA project focuses on the study of these challenges in the field of primary care, based on the premise that primary care constitutes an essential and fundamental pillar for equity and social justice in everything related to health and well-being. Primary health care is widely recognised as the most inclusive, equitable, and cost-effective way to achieve universal health coverage. It is also fundamental for strengthening the resilience of health systems, in order to prepare them to face, respond to, and recover from emergency and crisis situations.',
      },
      {
        _key: 'p3',
        es: 'DALIA es un estudio liderado desde la perspectiva interdisciplinar de los Estudios Sociales de la Ciencia y la Tecnología (STS, por sus siglas en inglés de Science and Technology Studies), desarrollado por un equipo de investigación multidisciplinar (sociología, antropología, psicología social, filosofía y salud pública). Esta riqueza de especializaciones y enfoques confiere al proyecto DALIA un carácter singular y particularmente innovador. Desde esta perspectiva, en lugar de percibir la IA en el ámbito de la salud únicamente como redes neuronales y de reconocimiento de patrones estadísticos inherentes al aprendizaje automático, esta investigación adopta una perspectiva más amplia de la IA -una que entiende la IA como un sistema sociotécnico.',
        en: 'DALIA is a study led from the interdisciplinary perspective of Science and Technology Studies (STS), developed by a multidisciplinary research team (sociology, anthropology, social psychology, philosophy, and public health). This wealth of specialisations and approaches gives the DALIA project a singular and particularly innovative character. From this perspective, rather than perceiving AI in the health field solely as neural networks and statistical pattern recognition inherent to machine learning, this research adopts a broader perspective of AI—one that understands AI as a sociotechnical system.',
      },
      {
        _key: 'p4',
        es: 'Desde este planteamiento e integrando una aproximación crítica al estudio de la IA, el objetivo general de DALIA es promover una incorporación responsable de los sistemas de IA en la atención primaria, ajustada a las necesidades asistenciales y al bienestar de las personas.',
        en: 'From this standpoint and integrating a critical approach to the study of AI, the general objective of DALIA is to promote a responsible incorporation of AI systems in primary care, adjusted to the care needs and well-being of people.',
      },
    ],
    reference: {
      es: 'PID2024-160387NA-I00. Agencia Estatal de Investigación, Ministerio de Ciencia Innovación y Universidades.',
      en: 'PID2024-160387NA-I00. Agencia Estatal de Investigación, Ministerio de Ciencia Innovación y Universidades.',
    },
    objectivesTitle: {
      es: 'Objetivos específicos',
      en: 'Specific Objectives',
    },
    objectives: [
      {
        _key: 'obj1',
        text: {
          es: 'Analizar la percepción y valoración de la IA de las personas que trabajan en los centros de atención primaria (personal médico, de enfermería y administrativo), sus impactos en las competencias profesionales, identidad profesional y condiciones laborales.',
          en: 'Analyse the perception and assessment of AI among people working in primary care centres (medical, nursing, and administrative staff), its impacts on professional competencies, professional identity, and working conditions.',
        },
      },
      {
        _key: 'obj2',
        text: {
          es: 'Identificar las preocupaciones y (potenciales) sesgos de acceso y relación de pacientes con el sistema sanitario, debido a la implantación de sistemas de automatización basada en algoritmos.',
          en: 'Identify concerns and (potential) biases in patient access to and relationship with the healthcare system, due to the implementation of algorithm-based automation systems.',
        },
      },
      {
        _key: 'obj3',
        text: {
          es: 'Evaluar el impacto de la introducción de los sistemas de IA, y otros sistemas de automatización, en las prácticas y rutinas cotidianas de los centros de atención primaria.',
          en: 'Evaluate the impact of the introduction of AI systems, and other automation systems, on the daily practices and routines of primary care centres.',
        },
      },
      {
        _key: 'obj4',
        text: {
          es: 'Elaborar un decálogo de recomendaciones participativo -Policy Brief- para garantizar que la IA que contribuye a mejorar la atención primaria.',
          en: 'Develop a participatory decalogue of recommendations — Policy Brief — to ensure that AI contributes to improving primary care.',
        },
      },
    ],
  });

  // ─── Contact Section ───────────────────────────────────
  console.log('→ Contact Section');
  await client.createOrReplace({
    _id: 'contactSection',
    _type: 'contactSection',
    label: { es: 'Contacto', en: 'Contact' },
    title: { es: 'Contacto', en: 'Contact' },
    text: {
      es: 'Para cualquier consulta sobre el proyecto DALIA, puedes ponerte en contacto con la investigadora principal.',
      en: 'For any enquiries about the DALIA project, please get in touch with the principal investigator.',
    },
    piName: 'Núria Vallès Peris',
    piLabel: { es: 'Investigadora Principal', en: 'Principal Investigator' },
    email: 'nuria.valles@iiia.csic.es',
    emailLabel: { es: 'Correo electrónico', en: 'Email' },
    institutionLabel: { es: 'Institución', en: 'Institution' },
    institutionValue: {
      es: "Institut d'Investigació en Intel·ligència Artificial\nCampus UAB · Bellaterra, Barcelona",
      en: "Institut d'Investigació en Intel·ligència Artificial\nCampus UAB · Bellaterra, Barcelona",
    },
    mapLabel: { es: 'Campus UAB · Bellaterra', en: 'Campus UAB · Bellaterra' },
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.0982293101156!2d2.10127867712562!3d41.50214608886753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4942a9b7b8f63%3A0x8a51bd1095fe826d!2sUniversidad%20Aut%C3%B3noma%20de%20Barcelona%20(UAB)!5e0!3m2!1ses!2ses!4v1772728724490!5m2!1ses!2ses',
  });

  // ─── Site Settings ─────────────────────────────────────
  console.log('→ Site Settings');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    navProject: { es: 'Proyecto', en: 'Project' },
    navEntities: { es: 'Entidades', en: 'Entities' },
    navTeam: { es: 'Equipo', en: 'Team' },
    navPhases: { es: 'Metodología', en: 'Methodology' },
    navPublications: { es: 'Publicaciones', en: 'Publications' },
    navContact: { es: 'Contacto', en: 'Contact' },
    teamLabel: { es: 'El Equipo', en: 'The Team' },
    teamTitle: { es: 'Investigadoras<br />e Investigadores', en: 'Researchers' },
    teamCount: { es: '12 investigadores · 6 instituciones', en: '12 researchers · 6 institutions' },
    piRoleLabel: { es: 'Investigadora Principal', en: 'Principal Investigator' },
    researcherFemaleLabel: { es: 'Investigadora', en: 'Researcher' },
    researcherMaleLabel: { es: 'Investigador', en: 'Researcher' },
    entitiesLabel: { es: 'Entidades Participantes', en: 'Participating Entities' },
    entitiesTitle: { es: 'Seis centros de investigación', en: 'Six research centres' },
    coordinatorLabel: { es: 'Coordinadora', en: 'Coordinator' },
    participantLabel: { es: 'Participante', en: 'Participant' },
    phasesLabel: { es: 'Metodología', en: 'Methodology' },
    phasesTitle: { es: 'Un proyecto con<br />métodos mixtos', en: 'A project with<br />mixed methods' },
    readMoreLabel: { es: 'Ver más →', en: 'Read more →' },
    methodologyBackLink: { es: '← Volver a metodología', en: '← Back to methodology' },
    methodologyPlaceholder: {
      es: 'El contenido de esta sección se actualizará conforme avance la investigación.',
      en: 'The content of this section will be updated as the research progresses.',
    },
    publicationsLabel: { es: 'Publicaciones', en: 'Publications' },
    publicationsTitle: { es: 'Resultados del proyecto', en: 'Project Results' },
    publicationsEmpty: {
      es: 'En esta sección se irán recogiendo los artículos científicos y materiales de divulgación generados a lo largo del proyecto.',
      en: 'This section will collect the scientific articles and outreach materials produced throughout the project.',
    },
    footerCopy: { es: '© 2025–2028 Proyecto DALIA · I+D+i', en: '© 2025–2028 DALIA Project · R&D+i' },
    footerLogos: [
      { _key: 'logo1', name: 'IIIA–CSIC' },
      { _key: 'logo2', name: 'CSIC' },
      { _key: 'logo3', name: 'Min. Ciencia' },
    ],
  });

  // ─── Team Members ──────────────────────────────────────
  console.log('→ Team Members');
  const teamMembers = [
    { id: 'team-nuria', name: 'Núria Vallès Peris', role: 'pi', institution: 'IIIA-CSIC', initials: 'NV', order: 0 },
    { id: 'team-violeta', name: 'Violeta Argudo', role: 'researcher_f', institution: 'UB', initials: 'VA', order: 1 },
    { id: 'team-victor', name: 'Víctor Bermejo', role: 'researcher_m', institution: 'IIIA-CSIC', initials: 'VB', order: 2 },
    { id: 'team-maite', name: 'Maite Cruz', role: 'researcher_f', institution: 'EASP', initials: 'MC', order: 3 },
    { id: 'team-neus', name: 'Neus Domènech', role: 'researcher_f', institution: 'Hospital Olot', initials: 'ND', order: 4 },
    { id: 'team-lisette', name: 'Lisette Lemus', role: 'researcher_f', institution: 'IIIA-CSIC', initials: 'LL', order: 5 },
    { id: 'team-brenda', name: 'Brenda Biaani León', role: 'researcher_f', institution: 'IDIAP-JGol', initials: 'BL', order: 6 },
    { id: 'team-eduard', name: 'Eduard Moreno', role: 'researcher_m', institution: 'IDIAP-JGol', initials: 'EM', order: 7 },
    { id: 'team-juanjose', name: 'Juan José Moreno', role: 'researcher_m', institution: 'IDIAP-JGol', initials: 'JM', order: 8 },
    { id: 'team-joan', name: 'Joan Moyà', role: 'researcher_m', institution: 'UAB', initials: 'JM', order: 9 },
    { id: 'team-joel', name: 'Joel Piqué', role: 'researcher_m', institution: 'Hospital Olot', initials: 'JP', order: 10 },
    { id: 'team-marina', name: 'Marina Prat Carreño', role: 'researcher_f', institution: 'IIIA-CSIC', initials: 'MP', order: 11 },
    { id: 'team-valentina', name: 'Valentina Umaña', role: 'researcher_f', institution: 'IIIA-CSIC', initials: 'VU', order: 12 },
  ];

  for (const member of teamMembers) {
    await client.createOrReplace({
      _id: member.id,
      _type: 'teamMember',
      name: member.name,
      role: member.role,
      institution: member.institution,
      initials: member.initials,
      order: member.order,
    });
    console.log(`  ✓ ${member.name}`);
  }

  // ─── Entities ──────────────────────────────────────────
  console.log('→ Entities');
  const entities = [
    { id: 'entity-iiia', name: "Institut d'Investigació en Intel·ligència Artificial – CSIC", location: 'Barcelona, Cataluña', type: 'coordinator', order: 0 },
    { id: 'entity-easp', name: 'Escuela Andaluza de Salud Pública', location: 'Granada, Andalucía', type: 'participant', order: 1 },
    { id: 'entity-olot', name: "Fundació Hospital d'Olot i Comarcal de la Garrotxa", location: 'Olot, Cataluña', type: 'participant', order: 2 },
    { id: 'entity-idiap', name: "Institut d'Investigació en Atenció Primària Jordi Gol – ICS", location: 'Barcelona, Cataluña', type: 'participant', order: 3 },
    { id: 'entity-uab', name: 'Universitat Autònoma de Barcelona', location: 'Bellaterra, Cataluña', type: 'participant', order: 4 },
    { id: 'entity-ub', name: 'Universitat de Barcelona', location: 'Barcelona, Cataluña', type: 'participant', order: 5 },
  ];

  for (const entity of entities) {
    await client.createOrReplace({
      _id: entity.id,
      _type: 'entity',
      name: entity.name,
      location: entity.location,
      type: entity.type,
      order: entity.order,
    });
    console.log(`  ✓ ${entity.name}`);
  }

  // ─── Methodology Phases ────────────────────────────────
  console.log('→ Methodology Phases');
  const phases = [
    {
      id: 'phase-1',
      phaseNumber: 1,
      title: { es: 'Entrevistas', en: 'Interviews' },
      description: {
        es: 'Entrevistas en profundidad con profesionales de los centros de atención primaria.',
        en: 'In-depth interviews with primary care centre professionals.',
      },
      slug: 'entrevistas',
      slugEn: 'interviews',
      summary: {
        es: 'Se llevarán a cabo entrevistas en profundidad con el personal de los centros de atención primaria participantes (personal médico, de enfermería y administrativo). Las entrevistas explorarán la percepción y valoración de la IA, así como sus impactos en las competencias y la identidad profesional.',
        en: 'In-depth interviews will be conducted with staff from participating primary care centres (medical, nursing, and administrative staff). The interviews will explore the perception and assessment of AI, as well as its impacts on professional competencies and identity.',
      },
    },
    {
      id: 'phase-2',
      phaseNumber: 2,
      title: { es: 'Cuestionarios', en: 'Questionnaires' },
      description: {
        es: 'Cuestionarios para evaluar percepciones y actitudes sobre la IA.',
        en: 'Questionnaires to assess perceptions and attitudes towards AI.',
      },
      slug: 'cuestionarios',
      slugEn: 'questionnaires',
      summary: {
        es: 'Se diseñarán y distribuirán cuestionarios para evaluar las percepciones, actitudes y preocupaciones del personal sanitario y pacientes respecto a los sistemas de inteligencia artificial en atención primaria.',
        en: 'Questionnaires will be designed and distributed to assess the perceptions, attitudes, and concerns of healthcare staff and patients regarding artificial intelligence systems in primary care.',
      },
    },
    {
      id: 'phase-3',
      phaseNumber: 3,
      title: { es: 'Etnografía', en: 'Ethnography' },
      description: {
        es: 'Observación etnográfica de las prácticas cotidianas en centros de salud.',
        en: 'Ethnographic observation of everyday practices in health centres.',
      },
      slug: 'etnografia',
      slugEn: 'ethnography',
      summary: {
        es: 'Se realizará trabajo etnográfico en los centros de atención primaria participantes, observando las prácticas y rutinas cotidianas para evaluar el impacto de la introducción de sistemas de IA y otros sistemas de automatización.',
        en: 'Ethnographic fieldwork will be carried out in participating primary care centres, observing daily practices and routines to evaluate the impact of the introduction of AI systems and other automation systems.',
      },
    },
    {
      id: 'phase-4',
      phaseNumber: 4,
      title: { es: 'Proceso<br />participativo', en: 'Participatory<br />process' },
      description: {
        es: 'Co-diseño de recomendaciones con actores clave del sistema sanitario.',
        en: 'Co-design of recommendations with key healthcare stakeholders.',
      },
      slug: 'proceso-participativo',
      slugEn: 'participatory-process',
      summary: {
        es: 'Se organizará un proceso participativo para la elaboración de un decálogo de recomendaciones —Policy Brief— que garantice que la IA contribuye a mejorar la atención primaria.',
        en: 'A participatory process will be organised to develop a decalogue of recommendations — Policy Brief — to ensure that AI contributes to improving primary care.',
      },
    },
  ];

  for (const phase of phases) {
    await client.createOrReplace({
      _id: phase.id,
      _type: 'methodologyPhase',
      phaseNumber: phase.phaseNumber,
      title: phase.title,
      description: phase.description,
      slug: { _type: 'slug', current: phase.slug },
      slugEn: { _type: 'slug', current: phase.slugEn },
      summary: phase.summary,
    });
    console.log(`  ✓ Phase ${phase.phaseNumber}: ${phase.title.es}`);
  }

  console.log('\n✓ Seed complete! All content uploaded to Sanity.');
  console.log('  Now you just need to upload photos for team members and logos for entities in Sanity Studio.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
