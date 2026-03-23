/**
 * Truist Small Business Product Catalog
 * Source: truist.com/small-business — assessed March 23, 2026
 *
 * Categories: checking, savings, credit_cards, loans, line_of_credit, digital_services
 * Each product has: id, name, category, subcategory (optional), tagline, features[], keyDetail (highlight stat or differentiator)
 */

const TRUIST_SB_PRODUCTS = {

  checking: [
    {
      id: 'simple-checking',
      name: 'Truist Simple Business Checking',
      category: 'checking',
      tagline: 'Straightforward checking with no monthly maintenance fee.',
      features: [
        'No monthly maintenance fee (waived with $250 min daily balance, $500 avg monthly, or $100 recurring deposit)',
        'Earn $400 bonus for new clients depositing $2,000+ within 30 days of opening',
        '$100 minimum opening deposit',
        'Mobile deposit, bill pay, Zelle access via online banking',
        'Best for startups and businesses just getting started',
      ],
      keyDetail: 'No monthly fee · $400 new account bonus',
      applyUrl: 'https://businessdeposits.digitalcommerce.truist.com/product/110',
    },
    {
      id: 'dynamic-checking',
      name: 'Truist Dynamic Business Checking',
      category: 'checking',
      tagline: 'Full-featured checking that rewards higher balances with more perks.',
      features: [
        '500 monthly transactions included',
        '$25,000 monthly cash deposits included',
        'Monthly fee waived with $5,000 combined avg relationship ledger balance',
        'Tier-based rewards: Core, Plus (0.25% loan discount), Preferred (0.50% loan discount)',
        'Pairs with savings/money market accounts for relationship balance tiers',
        'Earn $400 bonus for new clients depositing $2,000+ within 30 days of opening',
        'Acts as relationship anchor product — unlocks rate discounts on loans and card perks',
      ],
      keyDetail: '500 txns/mo · Up to 0.50% loan rate discount',
      applyUrl: 'https://businessdeposits.digitalcommerce.truist.com/product/169',
    },
  ],

  savings: [
    {
      id: 'simple-savings',
      name: 'Truist Simple Business Savings',
      category: 'savings',
      tagline: 'Basic business savings account — start putting money away with minimal requirements.',
      features: [
        'Monthly fee waived with $250 min daily balance, $500 avg monthly, or $100 recurring transfer',
        'Up to 20 deposit items and $5,000 cash per month at no charge',
        'Best for balances under $5,000',
        'Can be paired with Dynamic Business Checking for relationship tier benefits',
      ],
      keyDetail: 'Fee waived at $250 min daily · Best for <$5K balances',
      applyUrl: 'https://businessdeposits.digitalcommerce.truist.com/product/110',
    },
    {
      id: 'money-market',
      name: 'Truist Business Money Market',
      category: 'savings',
      tagline: 'Higher-yield savings with check-writing access and competitive APY.',
      features: [
        '3.40% APY (promotional rate)',
        'Check-writing capabilities directly from the account',
        'Up to 10 deposit items and $5,000 cash per month at no charge',
        'Monthly fee waived with $5,000 min daily ledger balance',
        'Best for balances over $5,000',
        'Up to 6 no-fee withdrawals/transfers per month ($5 fee after)',
        'Can be paired with Dynamic Business Checking for relationship tier benefits',
      ],
      keyDetail: '3.40% APY · Check-writing · Best for $5K+ balances',
      applyUrl: 'https://businessdeposits.digitalcommerce.truist.com/product/169',
    },
    {
      id: 'business-cds',
      name: 'Truist Business Certificates of Deposit (CDs)',
      category: 'savings',
      tagline: 'Lock in a guaranteed fixed rate for a term you choose — from 7 days to 5 years.',
      features: [
        'Terms from 7 days to 5 years',
        'Guaranteed fixed interest rate — no market risk',
        'Best for businesses that can leave cash in place for the term',
        'Open in-branch',
      ],
      keyDetail: '7 days – 5 years · Fixed guaranteed return',
      applyUrl: null, // branch-only
    },
  ],

  credit_cards: [
    {
      id: 'cash-rewards-card',
      name: 'Truist Business Cash Rewards Credit Card',
      category: 'credit_cards',
      tagline: 'Cash back on every purchase with no annual fee and a 0% intro period.',
      features: [
        'No annual fee',
        '0% intro APR on purchases for 9 months after account opening',
        '15.74%–24.74% variable APR after intro period',
        '$300 bonus cash back after $3,000 spend in first 90 days',
        'Cash back on all eligible purchases',
        'Employee cards with purchase limit controls',
        'Manage cards in online banking',
      ],
      keyDetail: 'No annual fee · $300 bonus · 0% intro 9 mo.',
      applyUrl: 'https://businesscreditcard.digitalcommerce.truist.com/product/SBC',
    },
    {
      id: 'premium-card',
      name: 'Truist Business Premium Credit Card',
      category: 'credit_cards',
      tagline: 'Premium rewards card with a 10% Loyalty Cash Bonus when redeemed to a Truist deposit account.',
      features: [
        '$299 annual fee (waived year 1; waived any year with $100,000+ spend)',
        '$1,000 bonus after $15,000 spend in first 90 days',
        '10% Loyalty Cash Bonus when rewards redeemed to Truist business deposit account',
        '15.74%–24.74% variable APR on purchases and balance transfers',
        'Straight-forward rewards structure on every purchase',
        'Employee cards available',
      ],
      keyDetail: '$1,000 bonus · 10% loyalty bonus to Truist deposit · $299 annual fee',
      applyUrl: 'https://appointments.truist.com/schedule', // appointment-based
    },
    {
      id: 'travel-card',
      name: 'Truist Business Travel Rewards Credit Card',
      category: 'credit_cards',
      tagline: 'Miles-based travel card with double miles on airfare, hotels, and car rentals.',
      features: [
        '$49 annual fee (waived year 1)',
        '20,000 bonus miles after $2,000 spend in first 90 days',
        '2x miles on airfare, car rentals, and hotels',
        'Up to $120 statement credit per organization every 4 years for TSA Pre✓ or Global Entry',
        '15.74%–24.74% variable APR on purchases and balance transfers',
      ],
      keyDetail: '2x travel miles · $49/yr fee · $120 TSA Pre✓/GE credit',
      applyUrl: 'https://businesscreditcard.digitalcommerce.truist.com/product/SBT',
    },
    {
      id: 'business-card',
      name: 'Truist Business Credit Card',
      category: 'credit_cards',
      tagline: 'No-frills card with the lowest rate of all Truist business card options.',
      features: [
        'No annual fee',
        '0% intro APR on purchases for 12 months after account opening',
        '13.74%–22.74% variable APR after intro period (lowest among Truist business cards)',
        'Best for cost-conscious businesses that prioritize a lower ongoing rate',
        'Employee cards available',
      ],
      keyDetail: 'No annual fee · Lowest APR · 0% intro 12 mo.',
      applyUrl: 'https://businesscreditcard.digitalcommerce.truist.com/product/SBL',
    },
  ],

  loans: [
    {
      id: 'simple-loan',
      name: 'Simple Business Loan',
      category: 'loans',
      tagline: 'Fast, unsecured term loan up to $50K — no collateral or financial statements required for eligible requests.',
      features: [
        'Borrow up to $50,000 (up to $25K for businesses under 2 years old)',
        'No collateral required',
        'No origination fee',
        'No financial statements or liquidity verification for eligible requests',
        'Terms up to 60 months',
        'Not to exceed 2 months gross revenue (1 month for non-profits)',
        'Apply online, by phone, or in branch',
        'Dynamic Business Checking clients may qualify for 0.25%–0.50% rate discount',
      ],
      keyDetail: 'Up to $50K · No collateral · No origination fee · Up to 60 mo.',
      applyUrl: 'https://businesslending.digitalcommerce.truist.com/product/C30',
    },
    {
      id: 'auto-loan',
      name: 'Small Business Auto Loan',
      category: 'loans',
      tagline: 'Purchase or refinance business vehicles — cars, vans, light trucks, and SUVs up to $250K.',
      features: [
        'Loan amounts up to $250,000',
        'Terms up to 75 months',
        'Up to 100% financing available',
        'Up to 10% additional financing for soft costs (taxes, delivery, tag & license)',
        'Subject to credit approval',
        'Dynamic Business Checking clients may qualify for 0.25%–0.50% rate discount',
      ],
      keyDetail: 'Up to $250K · 100% financing · Up to 75 mo.',
      applyUrl: 'https://businesslending.digitalcommerce.truist.com/product/C30',
    },
    {
      id: 'equipment-loan',
      name: 'Small Business Commercial Vehicle & Equipment Loan',
      category: 'loans',
      tagline: 'Replace, upgrade, or expand business equipment and commercial vehicles up to $250K.',
      features: [
        'Loan amounts up to $250,000',
        'Terms up to 84 months',
        'Up to 100% financing available',
        'Up to 10% additional financing for soft costs (delivery, taxes, warranties excluded)',
        'Subject to credit approval',
        'Dynamic Business Checking clients may qualify for 0.25%–0.50% rate discount',
      ],
      keyDetail: 'Up to $250K · 100% financing · Up to 84 mo.',
      applyUrl: 'https://businesslending.digitalcommerce.truist.com/product/C30',
    },
    {
      id: 'real-estate-loan',
      name: 'Small Business Real Estate Loan',
      category: 'loans',
      tagline: 'Buy or refinance commercial or business-purpose real estate up to $250K.',
      features: [
        'Loan amounts up to $250,000',
        'Up to 85% loan-to-value ratio',
        'Flexible terms',
        'Eligible collateral: commercial or 1–4 family residential (business purpose only)',
        'Not for primary/secondary residences or multifamily (5+) investment properties',
        'Subject to credit approval',
        'Dynamic Business Checking clients may qualify for 0.25%–0.50% rate discount',
      ],
      keyDetail: 'Up to $250K · Up to 85% LTV · CRE & residential business purpose',
      applyUrl: 'https://businesslending.digitalcommerce.truist.com/product/C30',
    },
  ],

  line_of_credit: [
    {
      id: 'business-loc',
      name: 'Small Business Line of Credit',
      category: 'line_of_credit',
      tagline: 'Revolving access to working capital — borrow, repay, and re-borrow up to your limit.',
      features: [
        'Credit limit up to $100,000 (up to $250,000 with collateral)',
        'Terms 12–36 months (up to 60 months with collateral)',
        'Competitive rates; interest accrues only on outstanding balance',
        'Access funds via transfer to checking account or by writing checks',
        'Revolving — re-borrow up to limit over time',
        'Best for seasonal cash flow, inventory expansion, or opportunistic spending',
        'Dynamic Business Checking clients may qualify for 0.25%–0.50% rate discount',
      ],
      keyDetail: 'Up to $100K ($250K w/ collateral) · Revolving · Interest on balance only',
      applyUrl: 'https://businesslending.digitalcommerce.truist.com/product/C31',
    },
  ],

  digital_services: [
    {
      id: 'online-banking',
      name: 'Truist Small Business Online & Mobile Banking',
      category: 'digital_services',
      tagline: 'Manage your business finances anywhere — bill pay, Zelle, mobile deposit, and employee controls.',
      features: [
        'Bill pay and money movement',
        'Zelle for business payments (no fee to send; 1% receive fee, max $15/transaction)',
        'Mobile check deposit via Truist app',
        'Custom alerts and notifications',
        'Employee access controls and security settings',
        'Multiple payment options (ACH, wire, etc.)',
        'Required for Online Payroll enrollment',
      ],
      keyDetail: 'Full-featured digital banking · Zelle · Mobile deposit · Employee controls',
      applyUrl: 'https://bank.truist.com/web/enroll/business',
    },
    {
      id: 'online-payroll',
      name: 'Truist Online Payroll',
      category: 'digital_services',
      tagline: 'Full-service payroll for businesses with 1–100 employees — run payroll in 3 clicks.',
      features: [
        'Designed for businesses with 1–100 employees (additional fees for 50+)',
        'Automatic calculation and filing of federal, state, and local payroll taxes',
        'Direct deposit at no extra cost',
        'W-2 and 1099 generation and printing',
        'Employee self-service portal for pay records, W-2s, and 1099s',
        '20+ standard reports available online in real time',
        'Integrates with QuickBooks, Xero, Zoho Books, and AccountEdge',
        'Unlimited support from certified payroll specialists, CPAs, and bookkeepers',
        'Payday reminders and email notifications',
        'Requires Truist Small Business checking account and online banking enrollment',
        'Low monthly fee; standard payroll fees apply',
      ],
      keyDetail: '1–100 employees · Auto tax filing · 3-click payroll · QuickBooks/Xero integration',
      applyUrl: 'https://bank.truist.com/',
    },
  ],

};

/**
 * Flat array of all products for easy iteration / search
 */
const TRUIST_SB_PRODUCTS_FLAT = Object.values(TRUIST_SB_PRODUCTS).flat();

/**
 * Category metadata — display labels and sort order
 */
const TRUIST_SB_CATEGORIES = [
  { id: 'checking',         label: 'Checking',           icon: '🏦' },
  { id: 'savings',          label: 'Savings',             icon: '💰' },
  { id: 'credit_cards',     label: 'Credit Cards',        icon: '💳' },
  { id: 'loans',            label: 'Loans',               icon: '🏗️'  },
  { id: 'line_of_credit',   label: 'Line of Credit',      icon: '🔄' },
  { id: 'digital_services', label: 'Digital Services',    icon: '📱' },
];
