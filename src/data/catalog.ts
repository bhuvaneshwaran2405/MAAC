import { Category, Product } from '../types.ts';

export const CATEGORIES: Category[] = [
  {
    id: 'interior',
    name: 'Interior Accessories',
    slug: 'interior',
    tagline: 'Alcantara Bolsters, QLED Cockpits & Forged Carbon Trim',
    description: 'Custom-tailored Nappa & Alcantara seat covers, high-definition Android head units, dry carbon D-cut steering wheels, weighted titanium shifters, and 64-color ambient lighting.',
    image: '/images/categories/interior-accessories.jpg',
    itemCount: 11,
    mainType: 'interior',
    subcategories: [
      { id: 'seat-covers', name: 'Seat Covers & Upholstery', count: 3 },
      { id: 'android-screens', name: 'Android Head Units & Audio', count: 3 },
      { id: 'interior-trim', name: 'Steering Wheels & Controls', count: 3 },
      { id: 'ambient-lighting', name: 'Ambient Lighting & 7D Mats', count: 2 },
    ]
  },
  {
    id: 'exterior',
    name: 'Exterior Accessories',
    slug: 'exterior',
    tagline: 'Hyper-Focus Bi-LED Optics, Carbon Aero & Widebody Diffusers',
    description: 'Precision projector retrofit modules, penetrating yellow fog pods, sequential underglow bars, autoclave carbon front lips, rear F1 brake light diffusers, and aerodynamic track spoilers.',
    image: '/images/categories/exterior-accessories.jpg',
    itemCount: 8,
    mainType: 'exterior',
    subcategories: [
      { id: 'lighting', name: 'Bi-LED & Laser Lighting', count: 4 },
      { id: 'aero-kits', name: 'Carbon Splitters & Diffusers', count: 2 },
      { id: 'spoilers', name: 'Aero Spoilers & Wings', count: 1 },
      { id: 'wheels', name: 'Track Rims & Hardware', count: 1 },
    ]
  },
  {
    id: 'car-care',
    name: 'Car Care & Detailing',
    slug: 'car-care',
    tagline: 'Graphene 10H Armor & Hydrophobic Detailing Chemistry',
    description: 'Laboratory-grade ceramic sealants, acid-free iron fallout cleaners, pH-neutral citrus foam pre-washes, and ultra-plush 1200 GSM twisted-loop microfiber towels.',
    image: '/images/categories/car-care.jpg',
    itemCount: 4,
    mainType: 'car-care',
    subcategories: [
      { id: 'ceramic', name: 'Ceramic & Graphene Coatings', count: 1 },
      { id: 'cleaners', name: 'Iron & Wheel Decontaminants', count: 1 },
      { id: 'wash-towels', name: 'Citrus Pre-Wash & Towels', count: 2 },
    ]
  }
];

export const PRODUCTS: Product[] = [
  // ==========================================
  // INTERIOR CATEGORY PRODUCTS
  // ==========================================
  {
    id: 'prod-seat-1',
    name: 'Apex Diamond-Quilted Nappa Leather Seat Covers',
    slug: 'apex-diamond-quilted-nappa-covers',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'seat-covers',
    subCategoryName: 'Seat Covers',
    price: 4890,
    compareAtPrice: 5990,
    stock: 12,
    sku: 'MAAC-INT-SEAT-01',
    image: '/images/categories/seat-covers.jpg',
    badge: 'FLAGSHIP INTERIOR',
    shortDesc: 'Precision 3D scanned form-fit seat protection with motorsport bolster reinforcement and emerald contrast stitching.',
    specs: {
      'Material': 'Full-Grain Breathable Italian Synthetic Nappa',
      'Airbag Safe': 'Certified Tear-Stitch Safety Deployment Tested',
      'Cushioning': '12mm High-Resilience High-Density Memory Foam',
      'Installation': 'Direct Fitment with Custom Fasteners'
    },
    rating: 5.0,
    reviewsCount: 53,
    featured: true,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-seat-2',
    name: 'Trackday Alcantara Grip Hybrid Sport Seat System',
    slug: 'trackday-alcantara-grip-hybrid-covers',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'seat-covers',
    subCategoryName: 'Seat Covers',
    price: 5290,
    compareAtPrice: 6290,
    stock: 6,
    sku: 'MAAC-INT-SEAT-02',
    image: '/images/categories/seat-covers.jpg',
    badge: 'MOTORSPORT SPEC',
    shortDesc: 'Non-slip center Alcantara panels prevent torso slide under severe lateral g-forces with thermal dispersion backing.',
    specs: {
      'Center Fabric': 'Authentic Tactile Alcantara Suede',
      'Fitment Type': 'Model Specific Custom 3D Mold',
      'Temperature Control': 'Anti-Thermal UV Resistant Surface'
    },
    rating: 4.9,
    reviewsCount: 31,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-seat-3',
    name: 'Stealth Ash-Gray Perforated Sport Comfort Covers',
    slug: 'stealth-ash-gray-sport-covers',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'seat-covers',
    subCategoryName: 'Seat Covers',
    price: 3690,
    compareAtPrice: 4200,
    stock: 18,
    sku: 'MAAC-INT-SEAT-03',
    image: '/images/categories/seat-covers.jpg',
    badge: 'DAILY DRIVER',
    shortDesc: 'Minimalist OEM-plus aesthetics with laser-perforated cooling channels and liquid-repellent ash gray barrier.',
    specs: {
      'Stitching': 'Tension Triple-Lock Nylon Thread',
      'Colorway': 'Matte Ash Gray with Charcoal Insets',
      'Installation': 'Buckle & Anchor Fast-Lok Setup'
    },
    rating: 4.6,
    reviewsCount: 16,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-head-1',
    name: 'ApexPro 12.3" QLED 2K Ultra-Wide Android Cockpit',
    slug: 'apexpro-12-3-qled-2k-android-cockpit',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'android-screens',
    subCategoryName: 'Android Head Units',
    price: 18990,
    compareAtPrice: 22490,
    stock: 9,
    sku: 'MAAC-INT-AUD-01',
    image: '/images/categories/android-head-units.jpg',
    badge: 'OCTA-CORE 2K',
    shortDesc: 'Qualcomm Snapdragon Octa-Core 8GB+128GB with 48-band DSP, 4G SIM slot, and optical lossless audio staging.',
    specs: {
      'Screen': '12.3-inch 1920x720 2.5D Curved QLED Panel',
      'Processor': 'Qualcomm Snapdragon 665 Octa-Core 2.0GHz',
      'Memory': '8GB LPDDR4X RAM + 128GB UFS Flash',
      'Audio DSP': 'AKM 32-Bit 768kHz Professional DAC',
      'Connectivity': 'Wireless Apple CarPlay & Android Auto'
    },
    rating: 4.9,
    reviewsCount: 64,
    featured: true,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-head-2',
    name: 'Apex 10.1" Floating IPS Android Media Hub',
    slug: 'apex-10-1-floating-ips-android-hub',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'android-screens',
    subCategoryName: 'Android Head Units',
    price: 12490,
    compareAtPrice: 14990,
    stock: 15,
    sku: 'MAAC-INT-AUD-02',
    image: '/images/categories/android-head-units.jpg',
    badge: 'HIGH VALUE',
    shortDesc: 'Double DIN modular chassis with tilt-adjustable floating glass screen and AHD 1080p reverse camera included.',
    specs: {
      'Display': '10.1-inch 1280x720 IPS Multi-touch Glass',
      'Memory': '4GB RAM + 64GB Storage',
      'Camera Support': 'AHD 1080p 30fps Night Vision Included'
    },
    rating: 4.8,
    reviewsCount: 29,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-head-3',
    name: 'OBD2 Real-Time CANBUS Gauge & Telemetry Unit',
    slug: 'obd2-canbus-gauge-telemetry-unit',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'android-screens',
    subCategoryName: 'Android Head Units',
    price: 6490,
    compareAtPrice: 7990,
    stock: 11,
    sku: 'MAAC-INT-AUD-03',
    image: '/images/categories/android-head-units.jpg',
    badge: 'TRACK TELEMETRY',
    shortDesc: 'Live boost pressure, air-fuel ratio, oil temperature, and 0-100 km/h acceleration timer display.',
    specs: {
      'CAN Protocol': 'High-Speed ISO 15765-4 CAN 500kbps',
      'Latency': '<12ms Real-Time Refresh Rate',
      'Mount': 'Universal Dash Stanchion or A-Pillar Pod'
    },
    rating: 5.0,
    reviewsCount: 41,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-int-1',
    name: 'Forged Dry Carbon D-Cut Racing Steering Wheel',
    slug: 'forged-dry-carbon-d-cut-steering-wheel',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'interior-trim',
    subCategoryName: 'Steering & Controls',
    price: 24990,
    compareAtPrice: 28990,
    stock: 5,
    sku: 'MAAC-INT-STR-01',
    image: '/images/categories/interior-accessories.jpg',
    badge: 'HANDCRAFTED',
    shortDesc: 'Authentic autoclave-cured forged carbon fiber with Italian perforated Alcantara grips and racing green 12 o’clock center ring.',
    specs: {
      'Core': 'OEM Spec Magnesium-Aluminum Alloy Skeleton',
      'Finish': 'Satin Gloss UV-Resistant Autoclave Pre-Preg Carbon',
      'Profile': 'Flat-Bottom D-Shape with Ergonomic Thumb Notches'
    },
    rating: 5.0,
    reviewsCount: 47,
    featured: true,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-int-2',
    name: 'Magnetic Tactile Carbon Fiber Paddle Shifters',
    slug: 'magnetic-tactile-carbon-paddle-shifters',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'interior-trim',
    subCategoryName: 'Steering & Controls',
    price: 4990,
    compareAtPrice: 6490,
    stock: 14,
    sku: 'MAAC-INT-STR-02',
    image: '/images/categories/interior-accessories.jpg',
    badge: 'CRISP SNAP',
    shortDesc: 'Neodymium magnetic snap mechanism provides crisp, mechanical motorsport-grade gear change feedback.',
    specs: {
      'Actuation': 'Industrial Grade Neodymium Magnets',
      'Material': '100% 3K Twill Matte Carbon Blades',
      'Hardware': 'Stainless Steel M3 Hex Fasteners'
    },
    rating: 4.9,
    reviewsCount: 36,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-int-3',
    name: 'Titanium Weighted Billet Shift Knob (480g)',
    slug: 'titanium-weighted-billet-shift-knob',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'interior-trim',
    subCategoryName: 'Steering & Controls',
    price: 3290,
    compareAtPrice: 3990,
    stock: 25,
    sku: 'MAAC-INT-STR-03',
    image: '/images/categories/interior-accessories.jpg',
    badge: '480g WEIGHTED',
    shortDesc: 'Heavyweight mass reduces shift effort while providing direct mechanical synchro engagement.',
    specs: {
      'Weight': '480 grams Solid Billet Grade 5 Titanium',
      'Thread Fitment': 'M10x1.25, M10x1.5, M12x1.25 Adapters Included',
      'Finish': 'Brushed Raw Titanium with Laser Engraved Shift Gate'
    },
    rating: 4.8,
    reviewsCount: 18,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-int-4',
    name: '64-Color Symphony Ambient Fiber Cockpit Lighting Kit',
    slug: 'symphony-ambient-fiber-cockpit-lighting-kit',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'ambient-lighting',
    subCategoryName: 'Ambient & Mats',
    price: 4490,
    compareAtPrice: 5490,
    stock: 20,
    sku: 'MAAC-INT-AMB-01',
    image: '/images/categories/interior-accessories.jpg',
    badge: 'APP CONTROLLED',
    shortDesc: 'Ultra-thin 0.5mm acrylic optical light guides with synchronous waterfall chasing, welcome modes, and music reactivity.',
    specs: {
      'Light Guide': 'High-Transmission Side Glow Laser-Etched Acrylic',
      'Control': 'Wireless Smartphone App & Hidden Physical Touch Button',
      'Channels': '18 Points (Doors, Dashboard, Footwells, Center Console)'
    },
    rating: 4.9,
    reviewsCount: 52,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-int-5',
    name: 'Laser-Scanned 7D Waterproof All-Weather Honeycomb Mats',
    slug: 'laser-scanned-7d-all-weather-mats',
    categoryId: 'interior',
    categoryName: 'Interior Accessories',
    mainCategory: 'interior',
    subCategory: 'ambient-lighting',
    subCategoryName: 'Ambient & Mats',
    price: 3890,
    compareAtPrice: 4690,
    stock: 16,
    sku: 'MAAC-INT-AMB-02',
    image: '/images/categories/interior-accessories.jpg',
    badge: 'ALL-WEATHER 7D',
    shortDesc: 'Full cabin edge-to-edge laser scanned floor coverage with detachable anti-wear heel pad and anti-skid backing.',
    specs: {
      'Construction': 'Multi-Layer High Density EVA + Carbon Grain Surface',
      'Spill Protection': 'Raised 3-Inch Lip Contains Dirt & Mud',
      'Maintenance': 'Quick Unclip & Pressure Washable'
    },
    rating: 4.8,
    reviewsCount: 37,
    createdAt: '2026-09-21T19:35:12.331Z'
  },

  // ==========================================
  // EXTERIOR CATEGORY PRODUCTS
  // ==========================================
  {
    id: 'prod-light-1',
    name: 'Apex Bi-LED Projector Retrofit V3 (Dual Quartz Lens)',
    slug: 'apex-bi-led-projector-retrofit-v3',
    categoryId: 'exterior',
    categoryName: 'Exterior Accessories',
    mainCategory: 'exterior',
    subCategory: 'lighting',
    subCategoryName: 'Bi-LED & Laser Lighting',
    price: 3490,
    compareAtPrice: 4290,
    stock: 14,
    sku: 'MAAC-EXT-LGT-01',
    image: '/images/categories/lighting.jpg',
    badge: 'BEST SELLER',
    shortDesc: 'Laser-assisted low/high beam module with razor-sharp Z-cutoff and 14,000 effective lumens for maximum road visibility.',
    specs: {
      'Lumen Output': '14,000 Lumens / Pair',
      'Color Temperature': '5500K Crisp Hyper-White',
      'Lens Diameter': '3.0 inch Optical Grade Quartz',
      'Power Rating': '65W Low / 75W High Beam',
      'Lifespan': '50,000+ Operating Hours'
    },
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    createdAt: '2026-09-21T19:35:12.330Z'
  },
  {
    id: 'prod-light-2',
    name: 'Phantom Ice-Blue DRL Halo & Demon Eye Retrofit Kit',
    slug: 'phantom-ice-blue-drl-halo-kit',
    categoryId: 'exterior',
    categoryName: 'Exterior Accessories',
    mainCategory: 'exterior',
    subCategory: 'lighting',
    subCategoryName: 'Bi-LED & Laser Lighting',
    price: 1890,
    compareAtPrice: 2290,
    stock: 8,
    sku: 'MAAC-EXT-LGT-02',
    image: '/images/categories/lighting.jpg',
    badge: 'APEX SPEC',
    shortDesc: 'Bluetooth-addressable RGBW halos with sequential turn signaling and track-spec daytime running optics.',
    specs: {
      'Compatibility': 'Universal 80mm - 100mm Shrouds',
      'Control Mode': 'iOS/Android Low-Energy Bluetooth App',
      'Waterproof': 'IP68 Submersible Sealed Driver'
    },
    rating: 4.8,
    reviewsCount: 22,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-light-3',
    name: 'Velocity Ultra-Output LED Fog Pods (Selective Yellow 3000K)',
    slug: 'velocity-ultra-output-led-fog-pods',
    categoryId: 'exterior',
    categoryName: 'Exterior Accessories',
    mainCategory: 'exterior',
    subCategory: 'lighting',
    subCategoryName: 'Bi-LED & Laser Lighting',
    price: 1590,
    compareAtPrice: 1990,
    stock: 20,
    sku: 'MAAC-EXT-LGT-03',
    image: '/images/categories/lighting.jpg',
    badge: 'ALL-WEATHER',
    shortDesc: 'Penetrating 3000K selective yellow fog pods for maximum contrast and zero reflection in rain, snow, and dense fog.',
    specs: {
      'Beam Pattern': 'SAE / DOT Compliant Wide Flat Cutoff',
      'Housing': 'Die-cast 6063 Aircraft Aluminum Heat Sink',
      'Bracket': 'Stainless Steel 304 Anti-Vibration Heavy Duty'
    },
    rating: 4.7,
    reviewsCount: 19,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-light-4',
    name: 'Apex Horizon Sequential Underglow Bar System',
    slug: 'apex-horizon-sequential-underglow-bar',
    categoryId: 'exterior',
    categoryName: 'Exterior Accessories',
    mainCategory: 'exterior',
    subCategory: 'lighting',
    subCategoryName: 'Bi-LED & Laser Lighting',
    price: 2190,
    compareAtPrice: 2690,
    stock: 5,
    sku: 'MAAC-EXT-LGT-04',
    image: '/images/categories/lighting.jpg',
    badge: 'SHOWCASE SPEC',
    shortDesc: 'Armored solid silicone diffused neon bar with high-frequency frequency modulation and brake strobe sync.',
    specs: {
      'Protection': 'Impact Proof Lexan Enclosure Tube',
      'Color Sync': 'Sound & RPM Pulse Responsive Mode',
      'Durability': '100% Gravel & Salt Resistant'
    },
    rating: 4.9,
    reviewsCount: 45,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-ext-1',
    name: 'Autoclave Pre-Preg Carbon Fiber Front Splitter',
    slug: 'autoclave-carbon-fiber-front-splitter',
    categoryId: 'exterior',
    categoryName: 'Exterior Accessories',
    mainCategory: 'exterior',
    subCategory: 'aero-kits',
    subCategoryName: 'Splitters & Diffusers',
    price: 16890,
    compareAtPrice: 19990,
    stock: 7,
    sku: 'MAAC-EXT-AERO-01',
    image: '/images/categories/exterior-accessories.jpg',
    badge: 'AERO DOWNFORCE',
    shortDesc: 'Aerodynamically optimized front lip spoiler with integrated skid plates and chassis support stanchions.',
    specs: {
      'Manufacturing': 'Pre-Preg Carbon Fiber Autoclave Molded',
      'Downforce': 'Provides 38kg Functional Front Axle Load @ 120km/h',
      'Coating': 'High-Solid Ceramic Clear Coat UV Inhibited'
    },
    rating: 4.9,
    reviewsCount: 39,
    featured: true,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-ext-2',
    name: 'Rear Aero Diffuser with F1 Brake Light Module',
    slug: 'rear-aero-diffuser-f1-light',
    categoryId: 'exterior',
    categoryName: 'Exterior Accessories',
    mainCategory: 'exterior',
    subCategory: 'aero-kits',
    subCategoryName: 'Splitters & Diffusers',
    price: 9890,
    compareAtPrice: 11990,
    stock: 11,
    sku: 'MAAC-EXT-AERO-02',
    image: '/images/categories/exterior-accessories.jpg',
    badge: 'F1 STROBE',
    shortDesc: 'Aggressive 4-fin underbody flow extractor with strobe flashing center red F1 safety lamp.',
    specs: {
      'Material': 'High-Impact ABS / Polycarbonate Polymer',
      'Strobe Rate': '5-Flash Emergency Braking Cadence',
      'Fitment': 'Direct Under-Bumper Bolt-on Mounting'
    },
    rating: 4.7,
    reviewsCount: 24,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-ext-3',
    name: 'GT3 Swan-Neck Carbon Aero Rear Wing (Adjustable)',
    slug: 'gt3-swan-neck-carbon-rear-wing',
    categoryId: 'exterior',
    categoryName: 'Exterior Accessories',
    mainCategory: 'exterior',
    subCategory: 'spoilers',
    subCategoryName: 'Spoilers & Wings',
    price: 21490,
    compareAtPrice: 24990,
    stock: 4,
    sku: 'MAAC-EXT-AERO-03',
    image: '/images/categories/exterior-accessories.jpg',
    badge: 'CARBON FIBER',
    shortDesc: 'Top-mount swan-neck uprights preserve underside laminar flow for maximum track downforce without drag penalty.',
    specs: {
      'Blade': 'Dry Carbon Fiber 1450mm Airfoil Profile',
      'Uprights': 'CNC 6061-T6 Billet Aluminum Anodized Black',
      'Angle of Attack': 'Adjustable 0° to 18° Settings'
    },
    rating: 5.0,
    reviewsCount: 29,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-ext-4',
    name: 'Apex Forged Monoblock Lightweight Track Rims (Set of 4)',
    slug: 'apex-forged-monoblock-track-rims',
    categoryId: 'exterior',
    categoryName: 'Exterior Accessories',
    mainCategory: 'exterior',
    subCategory: 'wheels',
    subCategoryName: 'Track Rims & Hardware',
    price: 46990,
    compareAtPrice: 54990,
    stock: 3,
    sku: 'MAAC-EXT-WHL-01',
    image: '/images/categories/exterior-accessories.jpg',
    badge: 'FORGED ALLOY',
    shortDesc: '10,000-ton forged 6061-T6 aluminum monoblock wheel set with knurled bead seats to prevent tire slippage.',
    specs: {
      'Size Options': '18" x 8.5J / 19" x 9.5J Staggered or Square',
      'Bolt Patterns': '5x114.3 / 5x112 / 5x120 Multi-PCD Fitment',
      'Weight': 'Just 8.4kg per wheel (18-inch spec)'
    },
    rating: 5.0,
    reviewsCount: 44,
    featured: true,
    createdAt: '2026-09-21T19:35:12.331Z'
  },

  // ==========================================
  // CAR CARE CATEGORY PRODUCTS
  // ==========================================
  {
    id: 'prod-care-1',
    name: 'Apex Armor 10H Graphene Ceramic Coating Kit (50ml)',
    slug: 'apex-armor-10h-graphene-ceramic-coating',
    categoryId: 'car-care',
    categoryName: 'Car Care & Detailing',
    mainCategory: 'car-care',
    subCategory: 'ceramic',
    subCategoryName: 'Ceramic & Graphene',
    price: 3890,
    compareAtPrice: 4790,
    stock: 35,
    sku: 'MAAC-CARE-CER-01',
    image: '/images/categories/car-care.jpg',
    badge: '5-YEAR SHIELD',
    shortDesc: 'Reduced water spotting, extreme candy gloss reflectivity, and 115° contact angle hydrophobic bead discharge.',
    specs: {
      'Hardness': 'Certified 10H Pencil Scale Scratch Resistance',
      'Durability': 'Up to 5 Years / 60,000 Kilometers Protection',
      'Kit Contents': '50ml Vial, Suede Applicator, Leveling Towels, Nitrile Gloves'
    },
    rating: 4.9,
    reviewsCount: 78,
    featured: true,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-care-2',
    name: 'Iron Destroyer Decontaminant Wheel Cleaner (1000ml)',
    slug: 'iron-destroyer-wheel-cleaner',
    categoryId: 'car-care',
    categoryName: 'Car Care & Detailing',
    mainCategory: 'car-care',
    subCategory: 'cleaners',
    subCategoryName: 'Cleaners & Fallout',
    price: 890,
    compareAtPrice: 1190,
    stock: 49,
    sku: 'MAAC-CARE-CLN-01',
    image: '/images/categories/car-care.jpg',
    badge: 'COLOR-CHANGING',
    shortDesc: 'Acid-free pH-neutral formula turns purple on contact as it dissolves baked-on metallic brake dust and sintered iron.',
    specs: {
      'Safety': 'Safe on Anodized, Clear-Coated, and Diamond Cut Forged Rims',
      'Reaction Time': '3 to 5 Minutes Active Reaction Color Change',
      'Volume': '1000ml Ergonomic Trigger Sprayer'
    },
    rating: 4.9,
    reviewsCount: 92,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-care-3',
    name: 'Hyper-Suds pH-Neutral Snow Foam Citrus Pre-Wash (5000ml)',
    slug: 'hyper-suds-ph-neutral-snow-foam',
    categoryId: 'car-care',
    categoryName: 'Car Care & Detailing',
    mainCategory: 'car-care',
    subCategory: 'wash-towels',
    subCategoryName: 'Citrus Pre-Wash & Towels',
    price: 1490,
    compareAtPrice: 1890,
    stock: 28,
    sku: 'MAAC-CARE-WSH-01',
    image: '/images/categories/car-care.jpg',
    badge: 'THICK LATHER',
    shortDesc: 'High-foaming citrus emulsion safely encapsulates road grime without stripping existing wax, sealant, or ceramic coats.',
    specs: {
      'Formula': 'Biodegradable pH-Neutral Concentrate (1:10 Dilution)',
      'Foam Cannon': 'Compatible with all Pressure Washer Lance Cannons',
      'Scent': 'Fresh Crisp Bergamot Citrus'
    },
    rating: 4.8,
    reviewsCount: 46,
    createdAt: '2026-09-21T19:35:12.331Z'
  },
  {
    id: 'prod-care-4',
    name: 'Dual-Sided 1200 GSM Twisted Loop Microfiber Drying Towel',
    slug: 'dual-sided-1200gsm-twisted-loop-towel',
    categoryId: 'car-care',
    categoryName: 'Car Care & Detailing',
    mainCategory: 'car-care',
    subCategory: 'wash-towels',
    subCategoryName: 'Citrus Pre-Wash & Towels',
    price: 790,
    compareAtPrice: 990,
    stock: 60,
    sku: 'MAAC-CARE-WSH-02',
    image: '/images/categories/car-care.jpg',
    badge: '1200 GSM ULTRA',
    shortDesc: 'Absorbs up to 3 liters of water in a single swipe without marring, streaking, or linting on sensitive clear coats.',
    specs: {
      'Density': '1200 GSM Premium Korean Twisted Microfiber',
      'Dimensions': '70cm x 90cm Extra Large XL Format',
      'Edge': 'Silk-Banded Scratch-Free Border'
    },
    rating: 4.9,
    reviewsCount: 88,
    createdAt: '2026-09-21T19:35:12.331Z'
  }
];

export const WORKSHOP_DETAILS = {
  name: 'MAAC Wheels and Accessories',
  tagline: 'Premium Wheels, Lighting, Audio & Performance Styling',
  address: 'NH 36, Bypass, Koranattukkaruppur, Kumbakonam, Tamil Nadu 612501',
  plusCode: 'M58V+WJC, Kumbakonam',
  coordinates: {
    lat: 10.9829948,
    lng: 79.3907444
  },
  phone: '+91 63698 58746',
  whatsappRaw: '916369858746',
  hours: 'Mon – Sat: 9:30 AM – 8:30 PM | Sun: 10:00 AM – 4:00 PM',
  googleMapsUrl: 'https://share.google/hWR5KVybXsXrNBDDy',
  directionsUrl: 'https://share.google/hWR5KVybXsXrNBDDy'
};

/**
 * Generate a direct WhatsApp deep link with prefilled product inquiry details
 */
export function getProductWhatsAppUrl(product: Product, vehicle?: string): string {
  const message = [
    `*Inquiry for MAAC Wheels & Accessories:*`,
    `Product: *${product.name}*`,
    `SKU: ${product.sku}`,
    `Price: ₹${product.price.toLocaleString('en-IN')}`,
    `Category: ${product.categoryName} (${product.subCategoryName})`,
    vehicle ? `My Vehicle Make / Model / Year: *${vehicle}*` : null,
    ``,
    `Hi team, please let me know availability, fitment compatibility with my car, and quotation including installation.`
  ].filter(Boolean).join('\n');

  return `https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate general WhatsApp consultation deep link
 */
export function getGeneralWhatsAppUrl(subject?: string, messageText?: string): string {
  const message = [
    `*Inquiry for MAAC Wheels & Accessories (Kumbakonam):*`,
    subject ? `Subject: *${subject}*` : null,
    messageText ? `Details: ${messageText}` : `Hello! I would like to consult with your fitment specialists regarding wheels and accessories for my vehicle.`,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent(message)}`;
}
