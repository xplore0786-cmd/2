export interface AffiliateItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  buttonText: string;
  affiliateUrl: string; // placeholder or empty string
  iconName: string;
}

// Config flag to enable or disable affiliate box rendering globally
export const AFFILIATES_ENABLED = false;

export const AFFILIATE_ITEMS: AffiliateItem[] = [
  {
    id: 'scanner-app',
    title: 'High-Resolution Document Scanner',
    description: 'Crisp A4 document scanning with automatic edge flattening and contrast enhancement for official form submissions.',
    badge: 'Recommended Tool',
    buttonText: 'Check Tool',
    affiliateUrl: 'https://example.com/affiliate-doc-scanner',
    iconName: 'Smartphone',
  },
  {
    id: 'exam-prep-books',
    title: 'Govt Exam Previous Year Solved Papers',
    description: 'Comprehensive chapter-wise question banks for SSC, UPSC, and Banking exams with official answer keys.',
    badge: 'Study Material',
    buttonText: 'View Prep Guides',
    affiliateUrl: 'https://example.com/affiliate-exam-prep',
    iconName: 'BookOpen',
  },
  {
    id: 'photo-printer-paper',
    title: 'Glossy 4x6 Passport Photo Paper',
    description: 'High-DPI professional photo paper pack suitable for domestic inkjet printers to print DIY passport photos.',
    badge: 'Hardware',
    buttonText: 'View on Amazon',
    affiliateUrl: 'https://example.com/affiliate-photo-paper',
    iconName: 'Printer',
  }
];
