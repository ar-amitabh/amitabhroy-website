export type ProjectCategory =
  | 'Architecture'
  | 'Urban Planning'
  | 'Landscape'
  | 'Research'
  | 'Competitions';

export interface PortfolioProject {
  slug: string;
  title: string;
  category: ProjectCategory;
  categories: ProjectCategory[];
  year: string;
  location: string;
  role: string;
  status: string;
  image: string;
  imageAlt: string;
  aspectRatio: '16/9' | '3/2';
  overview: string;
  keyFacts: { label: string; value: string }[];
  context: string;
  concept: string;
  process: string;
  finalDesign: string;
  impact: string;
  tags: string[];
  galleryImages?: { src: string; caption: string; alt: string }[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'rangpur-hi-tech-park',
    title: 'Human-Centered Hi-Tech Park, Rangpur',
    category: 'Architecture',
    categories: ['Architecture', 'Landscape', 'Research'],
    year: '2021 · Rev. 2026',
    location: 'Khalishakuri, Rangpur',
    role: 'B.Arch Thesis · Lead Designer & Researcher',
    status: 'Academic Proposal · Published on Zenodo',
    image: '/hi-tech-park-rangpur-biophilic-architecture.jpg',
    imageAlt:
      'Aerial architectural rendering of the proposed Rangpur Hi-Tech Park organized around a central planted courtyard and water retention pond',
    aspectRatio: '16/9',
    overview:
      'An 8.59-acre technology campus proposal in northern Bangladesh that replaces the conventional deep-plan glass office tower with four narrower, climate-responsive building blocks arranged around a shaded central courtyard (uthon) and rainwater retention pond.',
    keyFacts: [
      { label: 'Site area', value: '8.59 Acres' },
      { label: 'Survey sample', value: 'n = 30 IT/ITES' },
      { label: 'Spatial strategy', value: '4 Blocks + Courtyard' },
      { label: 'DOI', value: '10.5281/zenodo.23915357' },
    ],
    context:
      'Located at Khalishakuri, Topodhan in Rangpur, the site contains existing mature jackfruit, mango, lemon and banana trees and experiences warm pre-monsoon heat, heavy monsoon rain and cool northern winter winds. A survey of 30 IT/ITES professionals revealed that light, ventilation and greenery scored lowest in existing offices (2.93 / 5.00).',
    concept:
      'Guided by an 18-attribute human-centred design framework, the massing breaks the programme into shallow floor plates along an east-west axis so workstations remain close to daylight, natural views and cross-ventilation routes.',
    process:
      'Translated employee survey priorities (26.7% ventilation and thermal comfort; 26.7% green views) into a criteria matrix, testing solar orientation, vertical west louvers, deep horizontal overhangs and courtyard microclimate zoning.',
    finalDesign:
      'Four interconnected blocks frame a shaded central courtyard and stormwater pond, linked by semi-outdoor verandahs, planted terraces and quiet focus zones alongside collaborative studios.',
    impact:
      'Demonstrates how user-survey evidence and traditional Bengali courtyard intelligence can shape contemporary technology infrastructure in Bangladesh, paired with a post-occupancy evaluation protocol.',
    tags: ['Workplace Architecture', 'Biophilic Design', 'Thesis Research'],
    galleryImages: [
      {
        src: '/research/figures/proposed-masterplan-1536.webp',
        caption: 'Masterplan · Four blocks around central courtyard and retention pond',
        alt: 'Masterplan drawing showing four building blocks around a central planted courtyard at Rangpur Hi-Tech Park',
      },
      {
        src: '/research/figures/courtyard-gathering-space-1536.webp',
        caption: 'Courtyard section · Shared outdoor gathering and microclimate cooling',
        alt: 'Courtyard gathering space rendering with mature trees, water edge and shaded walkways',
      },
      {
        src: '/research/figures/biophilic-environment-1536.webp',
        caption: 'Workstation environment · Daylight, planted terraces and visual relief',
        alt: 'Biophilic office interior and terrace with daylight and greenery views',
      },
      {
        src: '/research/figures/natural-view-green-lens-1536.webp',
        caption: 'Green lens · Framing existing site vegetation from interior circulation',
        alt: 'Architectural frame looking out onto mature trees and landscape',
      },
    ],
  },
  {
    slug: '500-bed-hospital-design',
    title: '500-Bed Tertiary Teaching Hospital',
    category: 'Architecture',
    categories: ['Architecture', 'Landscape'],
    year: '2020',
    location: 'Northern Bangladesh',
    role: 'Academic Studio · Architectural Design',
    status: 'Design Studio Proposal',
    image: '/hospital-design-500-bed-healing-spaces.jpg',
    imageAlt:
      'Architectural rendering of the 500-bed hospital showing stepped healing gardens, shaded ward facades and clear emergency access',
    aspectRatio: '3/2',
    overview:
      'A 500-bed healthcare facility designed around patient recovery, clear clinical circulation and climate-responsive ward orientation. Daylit inpatient wings look onto quiet healing gardens while separating emergency, outpatient and diagnostic flows.',
    keyFacts: [
      { label: 'Capacity', value: '500 Beds' },
      { label: 'Typology', value: 'Healthcare Architecture' },
      { label: 'Core strategy', value: 'Daylit Healing Courts' },
      { label: 'Year', value: '2020' },
    ],
    context:
      'Large hospitals in Bangladesh often suffer from congested corridors, disorienting wayfinding and mechanically sealed wards with minimal daylight or views of nature.',
    concept:
      'Organizes clinical departments in a low-rise podium while lifting inpatient wards into narrow, north-south oriented bars interspersed with planted sky courts.',
    process:
      'Mapped clean, soiled, visitor, outpatient and emergency circulation loops to eliminate cross-contamination while maximizing perimeter window access for patient beds.',
    finalDesign:
      'Deep recessed balconies and external sun-breakers shield patient rooms from low-angle glare while admitting soft daylight and views of vegetated courtyards.',
    impact:
      'Establishes a calm, legible healing environment that reduces thermal loads and supports staff and patient wellbeing.',
    tags: ['Healthcare', 'Healing Spaces', 'Passive Cooling'],
  },
  {
    slug: 'sundar-bari-climate-housing',
    title: 'Sundar Bari: Climate-Resilient Rural Homestead',
    category: 'Competitions',
    categories: ['Competitions', 'Architecture', 'Landscape'],
    year: '2020',
    location: 'Coastal & Floodplain Bangladesh',
    role: 'Architectural Competition Entry',
    status: 'Competition Proposal',
    image: '/sundar-bari-climate-housing-competition.jpg',
    imageAlt:
      'Perspective of the Sundar Bari climate-resilient housing design featuring raised plinth, deep verandahs and local bamboo-brick construction',
    aspectRatio: '3/2',
    overview:
      'A competition entry reimagining the rural Bangladeshi homestead for flood-prone and monsoon-intensive regions. The scheme combines an elevated, erosion-resistant plinth with breathable стены, deep verandahs and a productive domestic courtyard.',
    keyFacts: [
      { label: 'Typology', value: 'Climate-Resilient Housing' },
      { label: 'Format', value: 'Design Competition' },
      { label: 'Materials', value: 'Stabilized Earth, Brick & Bamboo' },
      { label: 'Year', value: '2020' },
    ],
    context:
      'Rural families across Bangladesh face seasonal flooding, cyclone winds and rising heat while needing affordable, locally buildable housing that respects the traditional uthon (courtyard) lifestyle.',
    concept:
      'Pairs a durable masonry plinth and rainwater harvesting core with lightweight, cross-ventilated upper enclosures and deep overhanging roofs.',
    process:
      'Analyzed vernacular homestead zoning—inner courtyard, verandah, granary and kitchen garden—to ensure cultural continuity alongside structural resilience.',
    finalDesign:
      'Modular construction allows incremental expansion by local craftspeople while keeping indoor spaces naturally ventilated and protected from driving monsoon rain.',
    impact:
      'Demonstrates a low-carbon, culturally grounded housing prototype adaptable to changing climatic conditions.',
    tags: ['Competition', 'Climate Housing', 'Vernacular Intelligence'],
  },
  {
    slug: 'renewal-of-public-realm-dinajpur',
    title: 'Renewal of the Historic Public Realm, Dinajpur',
    category: 'Urban Planning',
    categories: ['Urban Planning', 'Landscape'],
    year: '2018',
    location: 'Dinajpur, Bangladesh',
    role: 'Urban Design Studio',
    status: 'Urban Regeneration Proposal',
    image: '/dinajpur-public-realm-urban-design.jpg',
    imageAlt:
      'Urban design perspective of Dinajpur public realm showing shaded pedestrian promenade, heritage edge and civic gathering plaza',
    aspectRatio: '16/9',
    overview:
      'An urban regeneration proposal in Dinajpur that reclaims encroached civic edges for pedestrians, linking historic landmarks through shaded walkways, permeable paving, street trees and inclusive public gathering spaces.',
    keyFacts: [
      { label: 'Scale', value: 'Urban Corridor & Civic Plaza' },
      { label: 'Focus', value: 'Pedestrian Mobility & Heritage' },
      { label: 'Location', value: 'Dinajpur, Bangladesh' },
      { label: 'Year', value: '2018' },
    ],
    context:
      'Rapid vehicular growth and informal encroachment in Dinajpur had fragmented historic civic spaces, leaving pedestrians with unshaded, discontinuous footpaths and degraded water edges.',
    concept:
      'Re-stitches the urban fabric through a continuous shaded pedestrian spine, pocket parks and reorganized street-vending zones that honour historic sightlines.',
    process:
      'Conducted land-use mapping, pedestrian movement counts and heritage edge assessments to balance everyday commerce with civic openness.',
    finalDesign:
      'Introduces bioswales for monsoon runoff, native canopy trees for thermal comfort, barrier-free crossings and stepped seating along public plazas.',
    impact:
      'Creates a walkable, climate-adaptive public realm that supports local livelihoods and civic life.',
    tags: ['Urban Design', 'Heritage Conservation', 'Public Realm'],
  },
  {
    slug: 'hstu-residential-complex',
    title: 'HSTU Campus Residential Complex',
    category: 'Architecture',
    categories: ['Architecture', 'Landscape'],
    year: '2019',
    location: 'Dinajpur, Bangladesh',
    role: 'Academic Studio · Housing Design',
    status: 'Studio Proposal',
    image: '/hstu-residential-complex-courtyard-living.jpg',
    imageAlt:
      'Architectural rendering of the HSTU residential complex organized around shaded community courtyards and pedestrian greenways',
    aspectRatio: '3/2',
    overview:
      'A multi-family university housing scheme at HSTU that balances household privacy with shared community life through staggered courtyard blocks, cross-ventilated apartments and car-free planted pedestrian greens.',
    keyFacts: [
      { label: 'Typology', value: 'Campus Residential Housing' },
      { label: 'Site', value: 'HSTU, Dinajpur' },
      { label: 'Strategy', value: 'Courtyard Cluster Blocks' },
      { label: 'Year', value: '2019' },
    ],
    context:
      'University residential quarters require both quiet study environments at home and safe, shaded outdoor commons for families and children.',
    concept:
      'Clusters apartments around dual-aspect stair cores so every unit receives prevailing southern breezes and overlooks shared green courts.',
    process:
      'Tested block spacing and solar angles to prevent mutual overshadowing in winter while shading pedestrian paths during hot pre-monsoon months.',
    finalDesign:
      'Perforated brick jali screens filter harsh western sun along balconies and utility verandas, lending tactile warmth to the facades.',
    impact:
      'Fosters neighborly interaction and passive indoor comfort within a compact campus footprint.',
    tags: ['Housing', 'Courtyard Living', 'Passive Ventilation'],
  },
  {
    slug: 'skf-commercial-office-visualization',
    title: 'SK+F Commercial Workplace Visualization',
    category: 'Architecture',
    categories: ['Architecture'],
    year: '2019',
    location: 'Dhaka, Bangladesh',
    role: 'Architectural Intern · Sthapotik',
    status: 'Professional Practice',
    image: '/skf-office-commercial-3d-rendering.jpg',
    imageAlt:
      'Interior architectural visualization of the SK+F office showing warm timber baffles, daylight integration and collaborative work zones',
    aspectRatio: '3/2',
    overview:
      'Architectural visualization and material study completed during professional internship at Sthapotik in Dhaka, exploring warm acoustic timber ceilings, balanced task lighting and collaborative workplace zoning.',
    keyFacts: [
      { label: 'Studio', value: 'Sthapotik, Dhaka' },
      { label: 'Role', value: 'Intern Architect' },
      { label: 'Focus', value: 'Interior Spatial Quality & Lighting' },
      { label: 'Year', value: '2019' },
    ],
    context:
      'Developed during professional training in Dhaka to test material palettes, ceiling acoustics and lighting distribution prior to construction documentation.',
    concept:
      'Uses warm natural textures and articulated ceiling planes to humanize a contemporary corporate floor plate.',
    process:
      'Built detailed 3D spatial models and physically based lighting studies to evaluate glare control and visual warmth.',
    finalDesign:
      'Delivered presentation renders and material schedules that guided client decision-making.',
    impact:
      'Strengthened practical fluency in translating architectural drawings into tactile spatial experiences.',
    tags: ['Workplace', 'Professional Practice', 'Spatial Visualization'],
  },
];
