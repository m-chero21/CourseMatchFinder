# Design Guidelines: Educational Course Matching System

## Design Approach
**Reference-Based Approach**: Drawing inspiration from educational platforms like Coursera and Khan Academy, combined with application form patterns from Typeform and government education portals. This system prioritizes clarity and trust-building for prospective students making important educational decisions.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Brand Purple: 270 60% 45% (matching WorldWide EduConnect logo)
- Light Purple: 270 40% 85% (backgrounds, subtle highlights)
- Dark Purple: 270 70% 25% (headings, emphasis)

**Supporting Colors:**
- Success Green: 142 70% 45% (course matches, positive feedback)
- Warning Orange: 35 85% 55% (deadlines, important dates)
- Neutral Gray: 220 10% 95% (backgrounds)
- Text Dark: 220 15% 20%

### B. Typography
**Font System:**
- Primary: Inter (Google Fonts) - clean, educational feel
- Headings: 600-700 weight
- Body text: 400-500 weight
- Form labels: 500 weight
- Sizes: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl

### C. Layout System
**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16
- Component padding: p-6, p-8
- Section spacing: mb-12, mb-16
- Form field spacing: mb-6
- Card spacing: gap-4, gap-6

### D. Component Library

**Navigation:**
- Clean header with logo (left) and progress indicator
- Breadcrumb navigation for multi-step process
- Back/Next buttons with clear labeling

**Forms:**
- Large, accessible input fields with floating labels
- Dropdown selectors for qualifications and countries
- Grade selection buttons (A-E) with clear visual states
- Progress bars showing completion status

**Data Display:**
- Course cards with structured information layout
- Filter sidebar with collapsible sections
- Results summary with match confidence indicators
- Institution badges and accreditation markers

**Overlays:**
- Modal dialogs for course details
- Loading states during matching process
- Success/error notifications

### E. Visual Treatment

**Card Design:**
- Subtle shadows (shadow-sm, shadow-md)
- Rounded corners (rounded-lg)
- White backgrounds with purple accent borders for selected states

**Button Hierarchy:**
- Primary: Solid purple buttons for main actions
- Secondary: Outline purple buttons for secondary actions
- When buttons are on images: Use variant="outline" with blurred backgrounds

**Form Styling:**
- Generous whitespace between form sections
- Clear visual grouping with subtle background differences
- Focus states using purple accent colors

## Images
**Hero Section:**
- Medium-sized hero image (not full viewport) showing diverse students studying
- Overlay with WorldWide EduConnect logo and welcome message
- Image should convey international education and opportunity

**Course Cards:**
- Small institutional logos or country flags
- No large decorative images - focus on information clarity

**Background Elements:**
- Subtle geometric patterns in light purple tones
- Minimal use to avoid distraction from form completion

## Key UX Principles
- **Progressive Disclosure:** Show relevant questions based on study level selection
- **Clear Progress:** Visual indicators throughout the multi-step process
- **Trust Building:** Professional appearance with institutional credibility markers
- **Accessibility:** High contrast ratios and clear typography for educational context
- **Mobile-First:** Responsive design prioritizing mobile form completion