/**
 * Design-outcome renders for the /research page.
 *
 * To add a render:
 *   1. Export the image at 1536 px wide (or the largest useful size).
 *   2. Run
 *      `node scripts/optimize-photo.cjs "<file>" <slug> research/figures 84`
 *      to write the three responsive WebP widths.
 *   3. Add one entry below with its real intrinsic width and height.
 */

export type ThesisFigure = {
  id: string;
  /** Figure number as printed in the thesis. */
  figure: string;
  title: string;
  /** What the render shows and which survey finding it answers. */
  caption: string;
  /** Describes the image itself, for screen readers. */
  alt: string;
  /** Path stem inside /research/figures, without the width or extension. */
  image: string;
  width: number;
  height: number;
};

/** Responsive widths generated for every render. */
export const thesisFigureWidths = [640, 1024, 1536] as const;

export const spatialFigures: ThesisFigure[] = [
  {
    id: 'proposed-masterplan',
    figure: 'Figure 5-6',
    title: 'Proposed masterplan',
    caption:
      'Oriented on the east–west axis to lift the daylight factor above 2.5% while cutting direct solar glare — a direct response to the baseline light and ventilation rating of 2.93 / 5.',
    alt: 'Aerial render of the proposed Rangpur Hi-Tech Park masterplan, with courtyard buildings, planted roofs and terraces arranged around a central lake and landscaped gardens.',
    image: '/research/figures/proposed-masterplan',
    width: 1672,
    height: 941,
  },
  {
    id: 'courtyard-gathering-space',
    figure: 'Figure 5-26',
    title: 'Courtyard as common gathering space',
    caption:
      'The courtyard answers the 12.2% of selections that named breakout and rest space, acting as a thermal buffer and a social core for cross-firm interaction.',
    alt: 'Sunlit campus courtyard with palm planting and benches, where people gather beneath glazed office wings and timber roof trusses.',
    image: '/research/figures/courtyard-gathering-space',
    width: 1672,
    height: 941,
  },
  {
    id: 'biophilic-environment',
    figure: 'Figure 5-30',
    title: 'Biophilic environment',
    caption:
      'Interior planting and daylight deliver the views of greenery that 26.7% named as their first priority, supporting the 76.6% who report work stress at least sometimes.',
    alt: 'Exterior render of a biophilic office building with planted terraces, cascading greenery and deep shaded balconies overlooking a landscaped courtyard.',
    image: '/research/figures/biophilic-environment',
    width: 1672,
    height: 941,
  },
  {
    id: 'natural-view-green-lens',
    figure: 'Figure 5-32',
    title: 'Natural view as a green lens',
    caption:
      'Deep interior sightlines of 20 feet or more terminate in planting, making the 20-20-20 visual rest rule part of everyday desk work and easing the eye strain reported by 80% of respondents.',
    alt: 'Open-plan office with floor-to-ceiling glazing framing trees and campus greenery, with planting between desk clusters.',
    image: '/research/figures/natural-view-green-lens',
    width: 1541,
    height: 1020,
  },
];
