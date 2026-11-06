/**
 * Photography gallery for the Work page.
 *
 * To add a photo:
 *   1. Export the image at 1536 px wide (or the largest useful size) and save
 *      three WebP versions in public/photography/gallery/ as
 *      `<slug>-640.webp`, `<slug>-1024.webp` and `<slug>-1536.webp`.
 *   2. Add one entry below with its real intrinsic width and height.
 *
 * Nothing else needs editing; the gallery and filters read from this list.
 */

export type PhotoCategory = 'Architecture' | 'Urban Life' | 'Landscape' | 'Nature';

export type GalleryPhoto = {
  id: string;
  title: string;
  category: PhotoCategory;
  /** Describes what is visible, for screen readers and when images fail. */
  alt: string;
  /** Short editorial caption shown under the photograph. */
  caption: string;
  /** Path stem inside /photography/gallery, without the width or extension. */
  image: string;
  /** Intrinsic dimensions, used to reserve space and avoid layout shift. */
  width: number;
  height: number;
};

/** Responsive widths generated for every photograph. */
export const photoWidths = [640, 1024, 1536] as const;

export const photoCategories = ['All', 'Architecture', 'Urban Life', 'Landscape', 'Nature'] as const;

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'where-the-sun-rests',
    title: 'Where the Sun Rests',
    category: 'Landscape',
    alt: 'The setting sun glowing through the silhouetted branches of a tree above a dark, misty treeline.',
    caption: 'Last light caught in the branches above the treeline.',
    image: '/photography/gallery/where-the-sun-rests',
    width: 1536,
    height: 1024,
  },
  {
    id: 'stillness-in-bloom',
    title: 'Stillness in Bloom',
    category: 'Nature',
    alt: 'A white water lily fully open above green lily pads on deep blue water, with two more blooms behind it.',
    caption: 'Water lilies opening across a still pond.',
    image: '/photography/gallery/stillness-in-bloom',
    width: 1672,
    height: 941,
  },
  {
    id: 'the-beauty-of-what-remains',
    title: 'The Beauty of What Remains',
    category: 'Architecture',
    alt: 'Ruined brick arcade and multi-storey shell of a historic building under a blue sky, with grass growing across the floor.',
    caption: 'A weathered brick arcade, held open to the sky.',
    image: '/photography/gallery/the-beauty-of-what-remains',
    width: 1674,
    height: 940,
  },
  {
    id: 'where-light-finds-its-way',
    title: 'Where Light Finds Its Way',
    category: 'Architecture',
    alt: 'Black-and-white interior of a brick hall with a long run of tall windows casting shadows across a polished tile floor.',
    caption: 'Long shadows across a brick-walled hall.',
    image: '/photography/gallery/where-light-finds-its-way',
    width: 1618,
    height: 972,
  },
  {
    id: 'a-city-lost-in-the-mist',
    title: 'A City Lost in the Mist',
    category: 'Urban Life',
    alt: 'A hill town at night, its warm street lights glowing through layers of mist above a dark forested ridge.',
    caption: 'A hill town dissolving into night mist.',
    image: '/photography/gallery/a-city-lost-in-the-mist',
    width: 1672,
    height: 941,
  },
];
