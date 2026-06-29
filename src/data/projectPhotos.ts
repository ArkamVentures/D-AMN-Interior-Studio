export interface ProjectPhoto {
  id: string;
  src: string;
  location: string;
  service: string;
  title: string;
}

export const serviceTypes = [
  'All',
  'Kitchen',
  'Glass Works',
  'Ceiling',
  'Partition',
  'Doors & Windows',
  'Interior',
] as const;

export const locations = [
  'All Locations',
  'Ambalangoda',
  'Bandarawala',
  'Benthota',
  'Dehiwela',
  'Dhargatown',
  'Dodangoda',
  'Elpitiya',
  'Horana',
  'Kaluthara',
  'Kande Vihara',
  'Karandeniya',
  'Kelaniya',
  'Mariyam Gold, Beruwela',
  'Mathugama',
  'Pahekanuwa',
  'Pelawatta',
  'Polgahawela',
  'Uragasmanhandiya',
] as const;

export const projectPhotos: ProjectPhoto[] = [
  // ─── Ambalangoda (17 photos) ───────────────────────────
  { id: 'amb-01', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_14.34.13.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Modern Kitchen Installation' },
  { id: 'amb-02', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_14.34.13_(1).jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Kitchen Cabinet Design' },
  { id: 'amb-03', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_14.34.14.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Premium Kitchen Cabinets' },
  { id: 'amb-04', src: '/projects/Ambalangoda_2_WhatsApp_Image_2026-06-29_at_14.45.01.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Kitchen Pantry Setup' },
  { id: 'amb-05', src: '/projects/Ambalangoda_2_WhatsApp_Image_2026-06-29_at_14.45.31.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Aluminium Kitchen Finish' },
  { id: 'amb-06', src: '/projects/Ambalangoda_2_WhatsApp_Image_2026-06-29_at_14.45.31_(1).jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Kitchen Interior Detail' },
  { id: 'amb-07', src: '/projects/Ambalangoda_2_WhatsApp_Image_2026-06-29_at_14.45.32.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Custom Kitchen Build' },
  { id: 'amb-08', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.30.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Kitchen Project Overview' },
  { id: 'amb-09', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.30_(1).jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Pantry Cabinet System' },
  { id: 'amb-10', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.31.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Kitchen Storage Solution' },
  { id: 'amb-11', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.31_(1).jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Aluminium Pantry Doors' },
  { id: 'amb-12', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.31_(2).jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Kitchen Worktop Finish' },
  { id: 'amb-13', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.31_(3).jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Cabinet Interior View' },
  { id: 'amb-14', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.54.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Kitchen Design Closeup' },
  { id: 'amb-15', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.54_(1).jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Modern Pantry Unit' },
  { id: 'amb-16', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.55.jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Kitchen Hardware Detail' },
  { id: 'amb-17', src: '/projects/Ambalangoda_WhatsApp_Image_2026-06-29_at_16.14.55_(1).jpeg', location: 'Ambalangoda', service: 'Kitchen', title: 'Complete Kitchen View' },

  // ─── Bandarawala (8 photos) ────────────────────────────
  { id: 'ban-01', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.13.jpeg', location: 'Bandarawala', service: 'Kitchen', title: 'Kitchen Cabinet Installation' },
  { id: 'ban-02', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.14.jpeg', location: 'Bandarawala', service: 'Kitchen', title: 'Aluminium Kitchen Setup' },
  { id: 'ban-03', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.14_(1).jpeg', location: 'Bandarawala', service: 'Kitchen', title: 'Kitchen Storage Unit' },
  { id: 'ban-04', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.14_(2).jpeg', location: 'Bandarawala', service: 'Kitchen', title: 'Pantry Cabinet Detail' },
  { id: 'ban-05', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.15.jpeg', location: 'Bandarawala', service: 'Interior', title: 'Interior Aluminium Work' },
  { id: 'ban-06', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.15_(1).jpeg', location: 'Bandarawala', service: 'Interior', title: 'Interior Finishing Detail' },
  { id: 'ban-07', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.16.jpeg', location: 'Bandarawala', service: 'Interior', title: 'Interior Design Project' },
  { id: 'ban-08', src: '/projects/Bandarawala_WhatsApp_Image_2026-06-29_at_16.07.17.jpeg', location: 'Bandarawala', service: 'Kitchen', title: 'Kitchen Completion View' },

  // ─── Benthota (5 photos) ──────────────────────────────
  { id: 'ben-01', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.29.34.jpeg', location: 'Benthota', service: 'Glass Works', title: 'Tempered Glass Installation' },
  { id: 'ben-02', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.29.35.jpeg', location: 'Benthota', service: 'Doors & Windows', title: 'Aluminium Door Fitting' },
  { id: 'ben-03', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.29.35_(1).jpeg', location: 'Benthota', service: 'Glass Works', title: 'Glass Panel Work' },
  { id: 'ben-04', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.36.33.jpeg', location: 'Benthota', service: 'Kitchen', title: 'Kitchen Cabinet Project' },
  { id: 'ben-05', src: '/projects/Benthota_WhatsApp_Image_2026-06-29_at_15.36.54.jpeg', location: 'Benthota', service: 'Kitchen', title: 'Premium Kitchen Design' },

  // ─── Dehiwela (5 photos) ──────────────────────────────
  { id: 'deh-01', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.05.jpeg', location: 'Dehiwela', service: 'Kitchen', title: 'Kitchen Pantry Project' },
  { id: 'deh-02', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.06.jpeg', location: 'Dehiwela', service: 'Kitchen', title: 'Modern Kitchen Cabinets' },
  { id: 'deh-03', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.06_(1).jpeg', location: 'Dehiwela', service: 'Kitchen', title: 'Kitchen Interior Finish' },
  { id: 'deh-04', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.07.jpeg', location: 'Dehiwela', service: 'Kitchen', title: 'Pantry Storage Design' },
  { id: 'deh-05', src: '/projects/Dehiwela_WhatsApp_Image_2026-06-29_at_15.36.07_(1).jpeg', location: 'Dehiwela', service: 'Kitchen', title: 'Kitchen Completion View' },

  // ─── Dhargatown (6 photos) ────────────────────────────
  { id: 'dha-01', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.22.jpeg', location: 'Dhargatown', service: 'Kitchen', title: 'Kitchen Design Project' },
  { id: 'dha-02', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.22_(1).jpeg', location: 'Dhargatown', service: 'Kitchen', title: 'Kitchen Cabinet Setup' },
  { id: 'dha-03', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.23.jpeg', location: 'Dhargatown', service: 'Kitchen', title: 'Aluminium Kitchen Work' },
  { id: 'dha-04', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.23_(1).jpeg', location: 'Dhargatown', service: 'Interior', title: 'Interior Partition Design' },
  { id: 'dha-05', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.23_(2).jpeg', location: 'Dhargatown', service: 'Interior', title: 'Interior Finishing Work' },
  { id: 'dha-06', src: '/projects/Dhargatown_WhatsApp_Image_2026-06-29_at_16.06.24.jpeg', location: 'Dhargatown', service: 'Kitchen', title: 'Kitchen Final View' },

  // ─── Dodangoda (4 photos) ─────────────────────────────
  { id: 'dod-01', src: '/projects/Dodangoda_WhatsApp_Image_2026-06-29_at_14.29.55.jpeg', location: 'Dodangoda', service: 'Kitchen', title: 'Kitchen Interior Project' },
  { id: 'dod-02', src: '/projects/Dodangoda_WhatsApp_Image_2026-06-29_at_14.30.42.jpeg', location: 'Dodangoda', service: 'Kitchen', title: 'Modern Kitchen Build' },
  { id: 'dod-03', src: '/projects/Dodangoda_WhatsApp_Image_2026-06-29_at_14.30.42_(1).jpeg', location: 'Dodangoda', service: 'Interior', title: 'Interior Design Work' },
  { id: 'dod-04', src: '/projects/Dodangoda_WhatsApp_Image_2026-06-29_at_14.30.42_(2).jpeg', location: 'Dodangoda', service: 'Interior', title: 'Interior Cabinet System' },

  // ─── Elpitiya (4 photos) ──────────────────────────────
  { id: 'elp-01', src: '/projects/Elpitiya_WhatsApp_Image_2026-06-29_at_16.07.44.jpeg', location: 'Elpitiya', service: 'Kitchen', title: 'Kitchen Cabinet Design' },
  { id: 'elp-02', src: '/projects/Elpitiya_WhatsApp_Image_2026-06-29_at_16.07.44_(1).jpeg', location: 'Elpitiya', service: 'Kitchen', title: 'Kitchen Storage Solution' },
  { id: 'elp-03', src: '/projects/Elpitiya_WhatsApp_Image_2026-06-29_at_16.07.45.jpeg', location: 'Elpitiya', service: 'Interior', title: 'Interior Aluminium Work' },
  { id: 'elp-04', src: '/projects/Elpitiya_WhatsApp_Image_2026-06-29_at_16.07.45_(1).jpeg', location: 'Elpitiya', service: 'Interior', title: 'Interior Finishing Detail' },

  // ─── Horana (4 photos) ────────────────────────────────
  { id: 'hor-01', src: '/projects/Horana_WhatsApp_Image_2026-06-29_at_14.36.30.jpeg', location: 'Horana', service: 'Partition', title: 'Aluminium Partition Wall' },
  { id: 'hor-02', src: '/projects/Horana_WhatsApp_Image_2026-06-29_at_14.48.45.jpeg', location: 'Horana', service: 'Kitchen', title: 'Kitchen Cabinet Project' },
  { id: 'hor-03', src: '/projects/Horana_WhatsApp_Image_2026-06-29_at_14.48.49.jpeg', location: 'Horana', service: 'Kitchen', title: 'Modern Kitchen Installation' },
  { id: 'hor-04', src: '/projects/Horana_WhatsApp_Image_2026-06-29_at_14.48.49_(1).jpeg', location: 'Horana', service: 'Kitchen', title: 'Kitchen Design Overview' },

  // ─── Kaluthara (9 photos) ─────────────────────────────
  { id: 'kal-01', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.23.23.jpeg', location: 'Kaluthara', service: 'Kitchen', title: 'Kitchen Cabinet Installation' },
  { id: 'kal-02', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.23.24.jpeg', location: 'Kaluthara', service: 'Kitchen', title: 'Kitchen Design Detail' },
  { id: 'kal-03', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.23.25.jpeg', location: 'Kaluthara', service: 'Kitchen', title: 'Kitchen Pantry System' },
  { id: 'kal-04', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.26.50.jpeg', location: 'Kaluthara', service: 'Ceiling', title: 'Aluminium Ceiling Installation' },
  { id: 'kal-05', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_14.26.50_(1).jpeg', location: 'Kaluthara', service: 'Ceiling', title: 'Ceiling Design Project' },
  { id: 'kal-06', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_16.08.29.jpeg', location: 'Kaluthara', service: 'Kitchen', title: 'Modern Kitchen Setup' },
  { id: 'kal-07', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_16.08.29_(1).jpeg', location: 'Kaluthara', service: 'Kitchen', title: 'Kitchen Interior View' },
  { id: 'kal-08', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_16.08.29_(2).jpeg', location: 'Kaluthara', service: 'Kitchen', title: 'Kitchen Storage Design' },
  { id: 'kal-09', src: '/projects/Kaluthara_WhatsApp_Image_2026-06-29_at_16.08.30.jpeg', location: 'Kaluthara', service: 'Kitchen', title: 'Kitchen Completion' },

  // ─── Kande Vihara (6 photos) ──────────────────────────
  { id: 'kan-01', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.23.48.jpeg', location: 'Kande Vihara', service: 'Interior', title: 'Interior Design Project' },
  { id: 'kan-02', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.27.31.jpeg', location: 'Kande Vihara', service: 'Kitchen', title: 'Kitchen Cabinet System' },
  { id: 'kan-03', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.27.39.jpeg', location: 'Kande Vihara', service: 'Kitchen', title: 'Kitchen Interior Design' },
  { id: 'kan-04', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.36.08.jpeg', location: 'Kande Vihara', service: 'Interior', title: 'Interior Aluminium Work' },
  { id: 'kan-05', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.36.08_(1).jpeg', location: 'Kande Vihara', service: 'Interior', title: 'Interior Detail View' },
  { id: 'kan-06', src: '/projects/Kande_vihara_WhatsApp_Image_2026-06-29_at_15.36.08_(2).jpeg', location: 'Kande Vihara', service: 'Interior', title: 'Interior Finishing Work' },

  // ─── Karandeniya (4 photos) ───────────────────────────
  { id: 'kar-01', src: '/projects/Karandeniya_WhatsApp_Image_2026-06-29_at_16.03.46.jpeg', location: 'Karandeniya', service: 'Kitchen', title: 'Kitchen Project Overview' },
  { id: 'kar-02', src: '/projects/Karandeniya_WhatsApp_Image_2026-06-29_at_16.04.13.jpeg', location: 'Karandeniya', service: 'Kitchen', title: 'Kitchen Cabinet Build' },
  { id: 'kar-03', src: '/projects/Karandeniya_WhatsApp_Image_2026-06-29_at_16.04.13_(1).jpeg', location: 'Karandeniya', service: 'Kitchen', title: 'Kitchen Interior Work' },
  { id: 'kar-04', src: '/projects/Karandeniya_WhatsApp_Image_2026-06-29_at_16.04.13_(2).jpeg', location: 'Karandeniya', service: 'Kitchen', title: 'Kitchen Completion View' },

  // ─── Kelaniya (3 photos) ──────────────────────────────
  { id: 'kel-01', src: '/projects/Kelaniya_WhatsApp_Image_2026-06-29_at_15.36.01.jpeg', location: 'Kelaniya', service: 'Kitchen', title: 'Kitchen Cabinet Installation' },
  { id: 'kel-02', src: '/projects/Kelaniya_WhatsApp_Image_2026-06-29_at_15.36.01_(1).jpeg', location: 'Kelaniya', service: 'Kitchen', title: 'Kitchen Design Detail' },
  { id: 'kel-03', src: '/projects/Kelaniya_WhatsApp_Image_2026-06-29_at_15.36.01_(2).jpeg', location: 'Kelaniya', service: 'Interior', title: 'Interior Design Work' },

  // ─── Mariyam Gold, Beruwela (4 photos) ────────────────
  { id: 'mar-01', src: '/projects/Mariyam_gold,_Beruwela_WhatsApp_Image_2026-06-29_at_16.05.39.jpeg', location: 'Mariyam Gold, Beruwela', service: 'Kitchen', title: 'Kitchen Cabinet Project' },
  { id: 'mar-02', src: '/projects/Mariyam_gold,_Beruwela_WhatsApp_Image_2026-06-29_at_16.05.40.jpeg', location: 'Mariyam Gold, Beruwela', service: 'Kitchen', title: 'Kitchen Design Work' },
  { id: 'mar-03', src: '/projects/Mariyam_gold,_Beruwela_WhatsApp_Image_2026-06-29_at_16.05.40_(1).jpeg', location: 'Mariyam Gold, Beruwela', service: 'Kitchen', title: 'Kitchen Interior View' },
  { id: 'mar-04', src: '/projects/Mariyam_gold,_Beruwela_WhatsApp_Image_2026-06-29_at_16.05.41.jpeg', location: 'Mariyam Gold, Beruwela', service: 'Kitchen', title: 'Kitchen Completion' },

  // ─── Mathugama (3 photos) ─────────────────────────────
  { id: 'mat-01', src: '/projects/Mathugama_WhatsApp_Image_2026-06-29_at_16.04.48.jpeg', location: 'Mathugama', service: 'Kitchen', title: 'Kitchen Cabinet Design' },
  { id: 'mat-02', src: '/projects/Mathugama_WhatsApp_Image_2026-06-29_at_16.05.07.jpeg', location: 'Mathugama', service: 'Kitchen', title: 'Kitchen Interior Project' },
  { id: 'mat-03', src: '/projects/Mathugama_WhatsApp_Image_2026-06-29_at_16.05.08.jpeg', location: 'Mathugama', service: 'Kitchen', title: 'Kitchen Final View' },

  // ─── Pahekanuwa (5 photos) ────────────────────────────
  { id: 'pah-01', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.43.jpeg', location: 'Pahekanuwa', service: 'Kitchen', title: 'Kitchen Cabinet System' },
  { id: 'pah-02', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.43_(1).jpeg', location: 'Pahekanuwa', service: 'Kitchen', title: 'Kitchen Design Overview' },
  { id: 'pah-03', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.43_(2).jpeg', location: 'Pahekanuwa', service: 'Interior', title: 'Interior Design Project' },
  { id: 'pah-04', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.44.jpeg', location: 'Pahekanuwa', service: 'Interior', title: 'Interior Aluminium Work' },
  { id: 'pah-05', src: '/projects/Pahekanuwa_PahekanuwaWhatsApp_Image_2026-06-29_at_14.21.44_(1).jpeg', location: 'Pahekanuwa', service: 'Kitchen', title: 'Kitchen Completion View' },

  // ─── Pelawatta (3 photos) ─────────────────────────────
  { id: 'pel-01', src: '/projects/Pelawatta_WhatsApp_Image_2026-06-29_at_16.05.59.jpeg', location: 'Pelawatta', service: 'Kitchen', title: 'Kitchen Cabinet Installation' },
  { id: 'pel-02', src: '/projects/Pelawatta_WhatsApp_Image_2026-06-29_at_16.05.59_(1).jpeg', location: 'Pelawatta', service: 'Kitchen', title: 'Kitchen Design Detail' },
  { id: 'pel-03', src: '/projects/Pelawatta_WhatsApp_Image_2026-06-29_at_16.05.59_(2).jpeg', location: 'Pelawatta', service: 'Kitchen', title: 'Kitchen Interior View' },

  // ─── Polgahawela (5 photos) ───────────────────────────
  { id: 'pol-01', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.46.jpeg', location: 'Polgahawela', service: 'Kitchen', title: 'Kitchen Cabinet Design' },
  { id: 'pol-02', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.47.jpeg', location: 'Polgahawela', service: 'Kitchen', title: 'Kitchen Interior Project' },
  { id: 'pol-03', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.47_(1).jpeg', location: 'Polgahawela', service: 'Kitchen', title: 'Kitchen Storage System' },
  { id: 'pol-04', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.48.jpeg', location: 'Polgahawela', service: 'Kitchen', title: 'Kitchen Worktop Detail' },
  { id: 'pol-05', src: '/projects/Polgahawela_WhatsApp_Image_2026-06-29_at_16.19.48_(1).jpeg', location: 'Polgahawela', service: 'Kitchen', title: 'Kitchen Final View' },

  // ─── Uragasmanhandiya (15 photos) ─────────────────────
  { id: 'ura-01', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.29.32.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Cabinet Project' },
  { id: 'ura-02', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.29.32_(1).jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Premium Kitchen Design' },
  { id: 'ura-03', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.09.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Interior Setup' },
  { id: 'ura-04', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.11.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Cabinet System' },
  { id: 'ura-05', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.12.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Storage Design' },
  { id: 'ura-06', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.12_2.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Detail View' },
  { id: 'ura-07', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.13.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Completion' },
  { id: 'ura-08', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.56.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Project Overview' },
  { id: 'ura-09', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.57.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Cabinet Build' },
  { id: 'ura-10', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.57_(1).jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Interior Work' },
  { id: 'ura-11', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.58.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Aluminium Kitchen Finish' },
  { id: 'ura-12', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_15.36.58_(1).jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Panel Detail' },
  { id: 'ura-13', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_16.01.55.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Design Closeup' },
  { id: 'ura-14', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_16.01.56.jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Hardware View' },
  { id: 'ura-15', src: '/projects/Uragasmanhandiya_WhatsApp_Image_2026-06-29_at_16.01.56_(1).jpeg', location: 'Uragasmanhandiya', service: 'Kitchen', title: 'Kitchen Final Overview' },
];
