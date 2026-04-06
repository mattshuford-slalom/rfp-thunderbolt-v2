/* ============================================================
   DATA — static content, generated clients, product info,
           recommendation copy, and the main D data object
   ============================================================ */

function genClients() {
  const FN = ['James','Robert','Michael','William','David','Richard','Joseph','Thomas','Charles','Christopher','Daniel','Matthew','Anthony','Mark','Donald','Steven','Paul','Andrew','Joshua','Kenneth','Kevin','Brian','George','Timothy','Ronald','Edward','Jason','Jeffrey','Ryan','Jacob','Gary','Nicholas','Eric','Jonathan','Stephen','Larry','Justin','Scott','Brandon','Benjamin','Samuel','Raymond','Gregory','Frank','Alexander','Patrick','Jack','Dennis','Jerry','Tyler','Aaron','Jose','Henry','Adam','Douglas','Nathan','Peter','Zachary','Kyle','Walter','Harold','Jeremy','Ethan','Carl','Keith','Roger','Gerald','Christian','Terry','Sean','Arthur','Austin','Noah','Lawrence','Jesse','Joe','Bryan','Albert','Willie','Dylan','Louis','Johnny','Logan','Carlos','Howard','Teresa','Sandra','Patricia','Linda','Barbara','Elizabeth','Jennifer','Maria','Susan','Dorothy','Lisa','Nancy','Karen','Betty','Helen','Sharon','Donna','Carol','Ruth','Michelle','Laura','Sarah','Kimberly','Deborah','Jessica','Shirley','Angela','Melissa','Brenda','Amy','Anna','Rebecca','Virginia','Kathleen','Pamela','Martha','Amanda','Stephanie','Carolyn','Christine','Marie','Janet','Catherine','Frances','Ann','Joyce','Diane','Alice','Julie','Heather','Doris','Gloria','Evelyn','Jean','Cheryl','Katherine','Joan','Ashley','Judith','Rose','Janice','Kelly','Nicole','Judy','Christina','Kathy','Theresa','Beverly','Denise','Tammy','Irene','Jane','Lori','Rachel','Megan','Amber','Lauren','Brittany','Danielle','Samantha','Emma','Olivia','Sophia','Isabella','Ava','Mia','Chloe','Grace','Hannah'];
  const LN = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts','Phillips','Evans','Turner','Parker','Collins','Edwards','Stewart','Morris','Murphy','Cook','Rogers','Morgan','Peterson','Cooper','Reed','Bailey','Bell','Gomez','Kelly','Howard','Ward','Cox','Diaz','Richardson','Wood','Watson','Brooks','Bennett','Gray','James','Reyes','Cruz','Hughes','Price','Myers','Long','Foster','Sanders','Ross','Morales','Powell','Sullivan','Russell','Ortiz','Jenkins','Gutierrez','Perry','Butler','Barnes','Fisher','Henderson','Coleman','Simmons','Patterson','Jordan','Reynolds','Hamilton','Graham','Kim','Gonzales','Alexander','Ramos','Wallace','Griffin','West','Cole','Hayes','Chavez','Gibson','Bryant','Ellis','Stevens','Murray','Ford','Marshall','Owens','McDonald','Harrison','Ruiz','Kennedy','Wells','Alvarez','Woods','Mendoza','Castillo','Olson','Webb','Washington','Tucker','Freeman','Burns','Henry','Vasquez','Snyder','Simpson','Crawford','Jimenez','Porter','Mason','Shaw','Gordon','Wagner','Hunter','Romero','Hicks','Dixon','Hunt','Palmer','Robertson','Black','Holmes','Stone','Meyer','Boyd','Mills','Warren','Fox','Rose','Rice','Moreno','Schmidt','Patel','Marsh','Warren'];
  const PFXS = ['Apex','Summit','Ridge','Valley','Peak','Crest','Blue','Green','Iron','Golden','Silver','Eagle','Falcon','Hawk','Bear','Wolf','Bright','Clear','Swift','Stone','Oak','Pine','Cedar','Maple','River','Lake','Bridge','Crown','Star','Premier','Allied','United','National','Metro','Central','Pacific','Atlantic','Southern','Northern','Western','Eastern','Lakeside','Hillside','Riverside','Heritage','Legacy','Pioneer','Horizon','Keystone','Cornerstone','Prestige','Excel','Prime','Core','Arch','Beacon','Charter'];
  const SFXS = ['Construction','Services','Logistics','Group','Industries','Solutions','Enterprises','Properties','Foods','Healthcare','Technology','Consulting','Associates','Partners','Holdings','Capital','Ventures','Works','Co.','Inc.','LLC','Management','Advisors','Systems','Supply','Distributors','Contractors','Builders','Specialists','Professionals'];
  const INDS = ['Construction','Logistics','Healthcare','Legal Services','Food & Beverage','HVAC / Contracting','Landscaping','Food Manufacturing','Plumbing / Contracting','Retail','Technology','Real Estate','Financial Services','Manufacturing','Transportation','Education','Hospitality','Auto Services','Dental','Veterinary','Fitness','Electrical','Roofing','Flooring','Painting','Staffing','Marketing','Accounting','Printing','Security','Janitorial','Pest Control','Photography','Catering','Bakery','Brewery','Winery','Trucking','Warehousing','Childcare','Senior Care','Physical Therapy','Optometry','Chiropractic','Architecture','Engineering','Interior Design'];
  const LOCS = ['Charlotte, NC','Raleigh, NC','Atlanta, GA','Dallas, TX','Phoenix, AZ','Tampa, FL','Nashville, TN','Austin, TX','Denver, CO','Seattle, WA','Portland, OR','Minneapolis, MN','Detroit, MI','Columbus, OH','Indianapolis, IN','Louisville, KY','Memphis, TN','Richmond, VA','Baltimore, MD','Pittsburgh, PA','Cleveland, OH','Cincinnati, OH','Kansas City, MO','St. Louis, MO','Oklahoma City, OK','San Antonio, TX','Fort Worth, TX','Jacksonville, FL','Orlando, FL','Miami, FL','Charlotte, NC','Birmingham, AL','Greensboro, NC','Virginia Beach, VA','Chandler, AZ','Scottsdale, AZ','Henderson, NV','Laredo, TX','Buffalo, NY','Rochester, NY','Akron, OH','Omaha, NE','Tulsa, OK','Arlington, TX','Aurora, CO','Anaheim, CA','Santa Ana, CA','Corpus Christi, TX','Lexington, KY','Anchorage, AK','Stockton, CA','Riverside, CA','St. Paul, MN','Cincinnati, OH','Toledo, OH','Greensboro, NC','Newark, NJ','Plano, TX','Henderson, NV','Lincoln, NE','Bakersfield, CA','Baton Rouge, LA','Fremont, CA','Hialeah, FL','Garland, TX','Madison, WI','Scottsdale, AZ','Glendale, AZ','Winston-Salem, NC','Chesapeake, VA','Norfolk, VA'];
  const PRODS_ALL = ['Treasury','BLOC','LOC','CD','Payroll','Card','Merchant Services','Business Savings','Checking'];
  const RECS = [null,null,null,'nudge','propensity','rules','rt'];
  const HEALTHS = ['g','g','g','g','g','a','a','r','x'];
  const LCDS = [0,1,2,3,5,7,10,14,21,28,35,42,60];
  const TRIGS = [
    (c,lcd)=>`Revenue growth signal detected · ${c.prop}% propensity · engagement window open`,
    (c,lcd)=>`No contact in ${lcd} days · re-engagement trigger · account activity normal`,
    (c,lcd)=>`CD matures in ${Math.floor(Math.random()*40)+10} days · renewal outreach not yet logged`,
    (c,lcd)=>`Payroll volume up ${Math.floor(Math.random()*30)+10}% over 60 days · treasury conversation opportunity`,
    (c,lcd)=>`Proposal sent ${lcd} days ago with no response · follow-up recommended`,
    (c,lcd)=>`Website intent signal detected · ${c.prop}% propensity for lending products`,
    (c,lcd)=>`BLOC utilization at ${Math.floor(Math.random()*40)+50}% · expansion conversation warranted`,
    (c,lcd)=>`Account anniversary approaching · relationship review opportunity`,
    (c,lcd)=>`Peer benchmark shows under-penetration · ${c.prop}% propensity for additional products`,
    (c,lcd)=>`High wire transfer volume this month · cash management window narrowing`,
  ];
  const NOTES = [
    c=>`${c.ind} client with ${c.emp} employees. Revenue ${c.rev}. Good cross-sell potential based on product mix and transaction patterns.`,
    c=>`Established relationship since ${c.since}. ${c.health==='r'?'At-risk — needs immediate outreach.':c.health==='a'?'Needs attention — engagement declining.':'Healthy account. Monitor for upsell opportunities.'}`,
    c=>`Located in ${c.loc}. Primary products: ${c.prods.join(', ')}. ${c.prop}% propensity score based on peer benchmarks.`,
    c=>`Single-owner ${c.ind.toLowerCase()} business. Seasonal revenue patterns likely. Review for treasury and payroll fit.`,
    c=>`Client since ${c.since}. ${c.rec?'Open recommendation requires follow-up within the week.':'No active recommendation — schedule routine check-in.'}`,
  ];
  let seed = 31337;
  const rng=()=>{seed=((seed*1664525+1013904223)&0x7fffffff);return seed/0x7fffffff;};
  const pick=arr=>arr[Math.floor(rng()*arr.length)];
  const rInt=(a,b)=>a+Math.floor(rng()*(b-a+1));
  const clients=[];
  for(let i=0;i<584;i++){
    const id=i+9;
    const fn=pick(FN), ln=pick(LN);
    const name=fn+' '+ln;
    const ini=fn[0]+ln[0];
    const co=pick(PFXS)+' '+pick(SFXS);
    const ind=pick(INDS);
    const loc=pick(LOCS);
    const since=String(rInt(2015,2024));
    const lcd=pick(LCDS);
    const lc=lcd===0?'Today':lcd===1?'Yesterday':lcd+' days ago';
    const health=pick(HEALTHS);
    const rec=health==='x'?null:pick(RECS);
    const tier=rng()>0.5?'Tier I':'Tier II';
    const prop=rInt(20,92);
    const revN=rng()>0.4?(rInt(10,99)/10).toFixed(1):rInt(1,9);
    const rev='$'+revN+'M';
    const emp=rInt(4,150);
    const nProds=rInt(1,4);
    const shuffled=[...PRODS_ALL].sort(()=>rng()-0.5).slice(0,nProds);
    if(!shuffled.includes('Checking'))shuffled.unshift('Checking');
    const prods=shuffled;
    const trig=rec?pick(TRIGS)({prop,emp,prods,health,ind,rev,since},lcd):null;
    const rt=rec?(lcd===0?'Today':lcd<=2?lcd+'d ago':lcd+'d ago'):null;
    const cObj={id,ini,name,co,tier,loc,since,lc,lcd,health,rec,prods,trig,rt,prop,rev,emp,ind,notes:''};
    cObj.notes=pick(NOTES)(cObj);
    clients.push(cObj);
  }
  return clients;
}

const PROD_NAMES = {
  Checking:            'Dynamic Business Checking',
  Treasury:            'Treasury Management',
  BLOC:                'Business Line of Credit',
  LOC:                 'Small Business Line of Credit',
  CD:                  'Business Certificate of Deposit',
  Payroll:             'Truist Online Payroll',
  Card:                'Business Cash Rewards Card',
  'Merchant Services': 'Merchant Services',
  'Business Savings':  'Business Money Market',
};

const PROD_TAGLINE = {
  Checking:            'Full-featured checking with 500 monthly transactions and tier-based relationship perks.',
  Treasury:            'Full cash management suite — sweep accounts, payment automation, and working capital optimization.',
  BLOC:                'Revolving credit up to $250K (with collateral) — flexible access to working capital as needs arise.',
  LOC:                 'Revolving line of credit up to $100K — manage seasonal cash flow and short-term working capital gaps.',
  CD:                  'Guaranteed fixed return on idle cash — choose your term from 7 days to 5 years.',
  Payroll:             'Fully automated payroll, tax filing, and direct deposit for businesses with 1–100 employees.',
  Card:                'Cash back on every purchase — no annual fee, 0% intro APR for 9 months, $300 welcome bonus.',
  'Merchant Services': 'Point-of-sale and payment acceptance solutions to capture revenue at every transaction.',
  'Business Savings':  'Business Money Market with competitive APY and check-writing access on balances over $5K.',
};

function rankMissingProds(c) {
  const pool = ['Treasury','BLOC','LOC','CD','Payroll','Card','Merchant Services','Business Savings'];
  const missing = pool.filter(p => !c.prods.includes(p));
  const revM = parseFloat((c.rev || '0').replace(/[^0-9.]/g, '')) || 0;
  const ind = (c.ind || '').toLowerCase();
  const score = p => {
    if (p === 'Payroll')           return c.emp >= 10 ? 90 : c.emp >= 5 ? 65 : 35;
    if (p === 'Card')              return 70;
    if (p === 'Business Savings')  return revM >= 2 ? 72 : 55;
    if (p === 'Treasury')          return revM >= 5 ? 88 : revM >= 2 ? 58 : 28;
    if (p === 'BLOC')              return revM >= 3 ? 78 : 48;
    if (p === 'LOC')               { const base = revM < 3 ? 68 : 42; return c.prods.includes('BLOC') ? base - 30 : base; }
    if (p === 'CD')                return revM >= 2 ? 55 : 40;
    if (p === 'Merchant Services') return /food|retail|catering|dental|health/.test(ind) ? 75 : 40;
    return 50;
  };
  return missing.sort((a, b) => score(b) - score(a));
}

/* ── MAIN DATA OBJECT ────────────────────────────────────── */
const D = {
  rm: { name: 'Jordan Williams', initials: 'JW' },
  day: 'Thursday, Mar 19',
  clients: [
    { id:1,  ini:'MC', name:'Maria Chen',         co:'Palo Verde Catering',    tier:'Tier I',  loc:'Charlotte, NC',  since:'2021', lc:'2 days ago',  lcd:2,  health:'g', rec:'propensity', prods:['Checking','Card'],                         trig:'$185K deposit · 72% propensity for cash mgmt · Business Money Market opportunity',                                  rt:'2d ago',  prop:72, rev:'$2.1M', emp:18,  ind:'Food & Beverage',       notes:'Long-term relationship. Referred 2 other clients. Seasonal revenue peaks in Q2 and Q4.' },
    { id:2,  ini:'RH', name:'Ridgeline HVAC',      co:'Ridgeline Services',     tier:'Tier II', loc:'Raleigh, NC',    since:'2019', lc:'14 days ago', lcd:14, health:'g', rec:'nudge',      prods:['Checking','LOC'],                          trig:'Proposal stalled · no follow-up in 14 days',                                                                          rt:'14d ago', prop:58, rev:'$4.8M', emp:34,  ind:'HVAC / Contracting',    notes:'Active LOC. Equipment financing proposal was sent 14 days ago — needs follow-up urgently before the deal goes cold.' },
    { id:3,  ini:'BH', name:'Blue Heron Logistics', co:'Blue Heron LLC',        tier:'Tier II', loc:'Atlanta, GA',    since:'2022', lc:'6 days ago',  lcd:6,  health:'g', rec:'rules',      prods:['Checking','Payroll'],                      trig:'Payroll up 34% · growth conversation opportunity',                                                                     rt:'Today',   prop:65, rev:'$7.2M', emp:62,  ind:'Logistics',             notes:'Fast-growing company. Payroll volume increased significantly — strong potential for treasury and expanded banking relationship.' },
    { id:4,  ini:'HD', name:'Harmon & Diaz LLC',   co:'Harmon Legal Group',     tier:'Tier II', loc:'Charlotte, NC',  since:'2020', lc:'12 days ago', lcd:12, health:'g', rec:'rules',      prods:['Checking','CD'],                           trig:'CD maturity in 28 days · no renewal outreach logged',                                                                  rt:'Today',   prop:48, rev:'$3.4M', emp:21,  ind:'Legal Services',        notes:'CD maturing soon. Client is rate-sensitive — be prepared to discuss current options before they shop elsewhere.' },
    { id:5,  ini:'PV', name:'Palo Verde Dental',   co:'Palo Verde Health',      tier:'Tier I',  loc:'Phoenix, AZ',    since:'2023', lc:'Today',       lcd:0,  health:'g', rec:'rt',         prods:['Checking'],                                trig:'Searched "business loan" on truist.com',                                                                               rt:'8:32a',   prop:55, rev:'$1.8M', emp:12,  ind:'Healthcare',            notes:'Newer client. Recent web activity indicates lending interest. Good opportunity to deepen the relationship early.' },
    { id:6,  ini:'BF', name:'Brightwell Foods',    co:'Brightwell Inc.',        tier:'Tier I',  loc:'Tampa, FL',      since:'2018', lc:'2 days ago',  lcd:2,  health:'g', rec:null,         prods:['Checking','Treasury','Payroll','Card'],    trig:null, rt:null,   prop:82, rev:'$11M',  emp:88,  ind:'Food Manufacturing',    notes:'Top client. Treasury management and Online Payroll fully established for 88 employees. Business Cash Rewards Card active. Next opportunity: Merchant Services or Business Line of Credit.' },
    { id:7,  ini:'AP', name:'Apex Plumbing',       co:'Apex Services Co.',      tier:'Tier II', loc:'Nashville, TN',  since:'2021', lc:'5 days ago',  lcd:5,  health:'g', rec:null,         prods:['Checking','BLOC','Card'],                  trig:null, rt:null,   prop:41, rev:'$2.9M', emp:24,  ind:'Plumbing / Contracting',notes:'Healthy relationship. Business Line of Credit recently accepted. Business Cash Rewards Card added for materials purchasing. Follow up in 30 days to explore Truist Online Payroll for 24 employees.' },
    { id:8,  ini:'ML', name:'Meza Landscaping',    co:'Meza Group',             tier:'Tier I',  loc:'Dallas, TX',     since:'2020', lc:'38 days ago', lcd:38, health:'r', rec:null,         prods:['Checking'],                                trig:null, rt:null,   prop:22, rev:'$900K', emp:9,   ind:'Landscaping',           notes:'No contact in 38 days. Single product. Potential churn risk — needs a check-in call this week.' },
    { id:601,ini:'JB', name:'Jason Burke',         co:'Summit Roofing Co.',     tier:'Tier II', loc:'Charlotte, NC',  since:'2022', lc:'38 days ago', lcd:38, health:'r', rec:null,         prods:['Checking','LOC'],                          trig:null, rt:null,   prop:67, rev:'$3.2M', emp:22,  ind:'Roofing',               notes:'Healthy relationship. Premier referral completed with banker intro scheduled. Annual review done — no immediate product need. Follow up in 60 days for payroll conversation.' },
    { id:602,ini:'DH', name:'Derek Hale',          co:'Eastbrook Mechanical',   tier:'Tier II', loc:'Raleigh, NC',    since:'2023', lc:'45 days ago', lcd:45, health:'r', rec:'nudge',      prods:['Checking'],                                trig:'No contact in 45 days · client deferred outreach to Q3 · re-engagement window approaching',                            rt:'45d ago', prop:44, rev:'$1.9M', emp:14,  ind:'HVAC / Contracting',    notes:'Flagged for nurture after client pushed engagement to Q3. Single product — strong candidate for LOC and payroll when timing is right.' },
    { id:603,ini:'PM', name:'Priya Menon',         co:'Clarity Wellness Group', tier:'Tier II', loc:'Atlanta, GA',    since:'2022', lc:'21 days ago', lcd:21, health:'a', rec:'nudge',      prods:['Checking'],                                trig:'LOC offer under CFO review · response pending · second outreach queued',                                               rt:'21d ago', prop:61, rev:'$2.8M', emp:19,  ind:'Fitness',               notes:'LOC offer presented and under internal CFO review. Growth-stage multi-location wellness brand. Second outreach attempt queued — strong propensity for credit.' },
    { id:604,ini:'CT', name:'Camille Torres',      co:'Vantage Print & Design', tier:'Tier II', loc:'Tampa, FL',      since:'2021', lc:'12 days ago', lcd:12, health:'g', rec:null,         prods:['Checking','BLOC'],                         trig:null, rt:null,   prop:52, rev:'$1.4M', emp:11,  ind:'Printing',              notes:'Equipment loan referral recently closed and disbursed. Business Line of Credit active. Healthy account — check in within 30 days for card and payroll opportunity.' },
    { id:605,ini:'MW', name:'Marcus Webb',         co:'Irongate Construction',  tier:'Tier I',  loc:'Nashville, TN',  since:'2019', lc:'14 days ago', lcd:14, health:'g', rec:'propensity', prods:['Checking','LOC'],                          trig:'Treasury offer demo completed · decision expected by end of month · equipment financing referral pending',             rt:'14d ago', prop:74, rev:'$8.5M', emp:58,  ind:'Construction',          notes:'Treasury offer demo completed — decision expected by end of month. Equipment financing referral also submitted awaiting signed docs. High-value Tier I relationship requiring close follow-up.' },
    { id:606,ini:'SR', name:'Steve Rafferty',      co:'Keystone Auto Group',    tier:'Tier II', loc:'Columbus, OH',   since:'2023', lc:'9 days ago',  lcd:9,  health:'g', rec:'nudge',      prods:['Checking','Card'],                         trig:'No answer on last outreach · voicemail left · follow-up pending next week',                                            rt:'9d ago',  prop:48, rev:'$5.1M', emp:33,  ind:'Auto Services',         notes:'No answer on last outreach. Voicemail left — follow up next week. Mid-size auto group with strong cross-sell potential for payroll and merchant services.' },
    { id:607,ini:'SH', name:'Sandra Holloway',     co:'Meridian Title Co.',     tier:'Tier II', loc:'Richmond, VA',   since:'2020', lc:'17 days ago', lcd:17, health:'a', rec:null,         prods:['Checking','CD','Business Savings'],        trig:null, rt:null,   prop:45, rev:'$2.3M', emp:16,  ind:'Real Estate',           notes:'CD ladder accepted — three-rung structure initiated. Business Money Market added alongside checking. Relationship deepening. Low churn risk — monitor for treasury fit.' },
    { id:608,ini:'GN', name:'Greg Navarro',        co:'Sunstone Realty',        tier:'Tier II', loc:'Phoenix, AZ',    since:'2022', lc:'19 days ago', lcd:19, health:'a', rec:null,         prods:['Checking','Business Savings'],             trig:null, rt:null,   prop:38, rev:'$3.7M', emp:21,  ind:'Real Estate',           notes:'Business Money Market referral completed. Checking-to-money-market transition smooth. Solid relationship — revisit in 60 days for treasury fit as revenue continues to grow.' },
    { id:609,ini:'KP', name:'Dr. Kim Park',        co:'Lakewood Family Dental', tier:'Tier I',  loc:'Charlotte, NC',  since:'2021', lc:'20 days ago', lcd:20, health:'a', rec:null,         prods:['Checking','LOC'],                          trig:null, rt:null,   prop:62, rev:'$2.1M', emp:12,  ind:'Dental',                notes:'Premier Banker referral completed with warm handoff confirmed. High-revenue dental practice with strong personal banking potential. Tier I relationship — schedule annual review.' },
    { id:610,ini:'BS', name:'Ben Stroud',          co:'Crestview Flooring',     tier:'Tier II', loc:'Denver, CO',     since:'2022', lc:'21 days ago', lcd:21, health:'a', rec:null,         prods:['Checking'],                                trig:null, rt:null,   prop:18, rev:'$1.1M', emp:8,   ind:'Flooring',              notes:'Client relocating operations — relationship status uncertain. Single product. Reach out to confirm new location and assess whether the banking relationship will continue.' },
    { id:611,ini:'TM', name:'Tyler Mast',          co:'Parkside Brewing Co.',   tier:'Tier II', loc:'Austin, TX',     since:'2023', lc:'22 days ago', lcd:22, health:'a', rec:'rules',      prods:['Checking'],                                trig:'Seasonal LOC interest confirmed · spring drawdown anticipated · follow-up recommended',                                 rt:'22d ago', prop:55, rev:'$1.7M', emp:13,  ind:'Brewery',               notes:'Seasonal line of credit conversation active. Client interested in spring drawdown. Single product — strong upsell opportunity for payroll and merchant services.' },
    { id:612,ini:'AR', name:'Al Russo',            co:'Harbor Freight Repair',  tier:'Tier II', loc:'Baltimore, MD',  since:'2026', lc:'28 days ago', lcd:28, health:'a', rec:'rt',         prods:['Checking'],                                trig:'New client onboarding · advice acted on · checking opened · early relationship signals positive',                      rt:'28d ago', prop:41, rev:'$800K', emp:6,   ind:'Auto Services',         notes:'New client. Business checking opened following real-time advice signal. Onboarding complete. Early-stage relationship — check in to explore payroll and card as headcount grows.' },
    { id:613,ini:'AM', name:'Dr. Alicia Morse',    co:'Redstone Veterinary',    tier:'Tier II', loc:'Seattle, WA',    since:'2021', lc:'29 days ago', lcd:29, health:'a', rec:'rules',      prods:['Checking','LOC'],                          trig:'Rate increase concern raised · retention at risk · referral delivered · follow-up critical',                           rt:'29d ago', prop:49, rev:'$1.6M', emp:10,  ind:'Veterinary',            notes:'Client raised rate increase concern on last call. Retention referral delivered. Monitor closely — competitive offers likely in play. Follow up within the week to confirm status.' },
    { id:614,ini:'DC', name:'Denise Carroll',      co:'Hilltop Youth Services', tier:'Tier II', loc:'Memphis, TN',    since:'2020', lc:'30 days ago', lcd:30, health:'a', rec:'nudge',      prods:['Checking'],                                trig:'Checking upgrade declined · budget constraints cited · re-engagement recommended',                                      rt:'30d ago', prop:28, rev:'$600K', emp:7,   ind:'Childcare',             notes:'Nonprofit organization. Checking upgrade declined due to budget constraints. Relationship is tenuous — review nonprofit banking options that may be a better fit.' },
    { id:615,ini:'RF', name:'Raymond Fitch',       co:'Cascade Urgent Care',    tier:'Tier II', loc:'Portland, OR',   since:'2023', lc:'32 days ago', lcd:32, health:'r', rec:'rules',      prods:['Checking'],                                trig:'SBA loan application submitted · decision pending · proactive outreach recommended',                                    rt:'32d ago', prop:66, rev:'$3.4M', emp:27,  ind:'Healthcare',            notes:'SBA loan application submitted and under review. Growing urgent care group with high lending propensity. Reach out proactively while decision is pending to maintain momentum.' },
    { id:616,ini:'GC', name:'Gary Collins',        co:'Collins Pest Control',   tier:'Tier II', loc:'Jacksonville, FL',since:'2022',lc:'40 days ago', lcd:40, health:'r', rec:'propensity', prods:['Checking','Card'],                         trig:'Payroll demo completed · 30-day trial evaluation window open · follow-up needed',                                      rt:'40d ago', prop:58, rev:'$1.3M', emp:15,  ind:'Pest Control',          notes:'Payroll offer demo completed. Client evaluating with 30-day trial decision window. Strong opportunity to deepen relationship — payroll for 15 employees and merchant services both fit.' },
    { id:617,ini:'VO', name:'Victor Olsen',        co:'Northgate Auto Repair',  tier:'Tier II', loc:'Indianapolis, IN',since:'2020',lc:'44 days ago', lcd:44, health:'r', rec:'rules',      prods:['Checking','LOC'],                          trig:'LOC limit increase approved and renewed · cross-sell window open',                                                     rt:'44d ago', prop:53, rev:'$2.2M', emp:18,  ind:'Auto Services',         notes:'LOC limit increase approved and renewed. Healthy utilization. Good candidate for payroll (18 employees) and business card. Annual review recommended within the next 30 days.' },
    ...genClients(),
  ],
  activity: [
    { id:1,  cn:'Brightwell Foods',       desc:'Treasury mgmt opened · offer accepted · model updated',              out:'c', time:'03/19/26', rec:'propensity', method:'Phone call' },
    { id:2,  cn:'Maria Chen',             desc:'Cash mgmt meeting scheduled · outcome pending',                        out:'p', time:'03/19/26', rec:'nudge',      method:'Phone call' },
    { id:3,  cn:'Ridgeline HVAC',         desc:'Follow-up call scheduled · proposal still active',                     out:'p', time:'03/19/26', rec:'nudge',      method:'Email' },
    { id:4,  cn:'Meza Landscaping',       desc:'Not interested · recommendation dismissed · feedback logged',           out:'d', time:'03/18/26', rec:'rules',      method:'Phone call' },
    { id:5,  cn:'Summit Roofing Co.',     desc:'Premier referral accepted · banker intro scheduled',                   out:'c', time:'03/17/26', rec:'propensity', method:'In-person meeting' },
    { id:6,  cn:'Apex Plumbing',          desc:'BLOC accepted · nudge acted on within 36h of trigger',                 out:'c', time:'03/16/26', rec:'nudge',      method:'Phone call' },
    { id:7,  cn:'Harmon & Diaz LLC',      desc:'CD renewal confirmed · referral to rate conversation completed',        out:'c', time:'03/14/26', rec:'rules',      method:'Phone call' },
    { id:8,  cn:'Blue Heron Logistics',   desc:'Payroll expansion offer discussed · treasury intro requested',          out:'c', time:'03/13/26', rec:'propensity', method:'Phone call' },
    { id:9,  cn:'Palo Verde Dental',      desc:'Advice acted on · loan inquiry followed up · terms sheet sent',        out:'p', time:'03/13/26', rec:'rt',         method:'Email' },
    { id:10, cn:'Eastbrook Mechanical',   desc:'Not a good time · client pushing to Q3 · flagged for nurture',          out:'d', time:'03/12/26', rec:'nudge',      method:'Phone call' },
    { id:11, cn:'Clarity Wellness Group', desc:'LOC offer presented · client reviewing with CFO',                       out:'p', time:'03/11/26', rec:'propensity', method:'Video call' },
    { id:12, cn:'Vantage Print & Design', desc:'Equipment loan referral closed · disbursement confirmed',               out:'c', time:'03/10/26', rec:'rules',      method:'Phone call' },
    { id:13, cn:'Irongate Construction',  desc:'Treasury offer demo completed · decision expected by end of month',    out:'p', time:'03/10/26', rec:'propensity', method:'In-person meeting' },
    { id:14, cn:'Keystone Auto Group',    desc:'No answer · voicemail left · follow-up scheduled for next week',        out:'p', time:'03/09/26', rec:'nudge',      method:'Phone call' },
    { id:15, cn:'Meridian Title Co.',     desc:'CD ladder referral accepted · three-rung setup initiated',              out:'c', time:'03/07/26', rec:'rules',      method:'Phone call' },
    { id:16, cn:'Brightwell Foods',       desc:'Second treasury offer deferred · revisit in 60 days',                  out:'d', time:'03/06/26', rec:'propensity', method:'Email' },
    { id:17, cn:'Sunstone Realty',        desc:'Checking-to-money-market referral completed',                           out:'c', time:'03/05/26', rec:'rules',      method:'Phone call' },
    { id:18, cn:'Lakewood Family Dental', desc:'Referred to Premier Banker · warm handoff confirmed',                  out:'c', time:'03/04/26', rec:'propensity', method:'In-person meeting' },
    { id:19, cn:'Crestview Flooring',     desc:'Client relocating operations · relationship status uncertain',           out:'d', time:'03/03/26', rec:'nudge',      method:'Phone call' },
    { id:20, cn:'Parkside Brewing Co.',   desc:'Seasonal LOC offer discussed · client interested in spring drawdown',   out:'p', time:'03/02/26', rec:'propensity', method:'Video call' },
    { id:21, cn:'Apex Plumbing',          desc:'Checked in after BLOC close · client satisfied · NPS noted',            out:'c', time:'02/28/26', rec:'nudge',      method:'Phone call' },
    { id:22, cn:'Harbor Freight Repair',  desc:'Advice acted on · business checking opened · onboarding complete',     out:'c', time:'02/26/26', rec:'rt',         method:'In-person meeting' },
    { id:23, cn:'Redstone Veterinary',    desc:'Rate increase concern raised · retention referral delivered',           out:'p', time:'02/25/26', rec:'rules',      method:'Phone call' },
    { id:24, cn:'Hilltop Youth Services', desc:'Nonprofit checking upgrade declined · budget constraints cited',         out:'d', time:'02/24/26', rec:'nudge',      method:'Email' },
    { id:25, cn:'Summit Roofing Co.',     desc:'Annual review completed · no immediate product need · noted healthy',   out:'c', time:'02/21/26', rec:'propensity', method:'In-person meeting' },
    { id:26, cn:'Cascade Urgent Care',    desc:'SBA loan offer evaluated · application submitted for review',           out:'p', time:'02/20/26', rec:'propensity', method:'Phone call' },
    { id:27, cn:'Meza Landscaping',       desc:'Re-engagement attempt · client still not ready to move forward',        out:'d', time:'02/18/26', rec:'rules',      method:'Phone call' },
    { id:28, cn:'Irongate Construction',  desc:'Equipment financing referral sent · awaiting signed docs',              out:'p', time:'02/17/26', rec:'nudge',      method:'Email' },
    { id:29, cn:'Collins Pest Control',   desc:'Payroll offer demo completed · client wants 30-day trial',              out:'p', time:'02/14/26', rec:'propensity', method:'Video call' },
    { id:30, cn:'Northgate Auto Repair',  desc:'LOC referral renewed · limit increased per request',                    out:'c', time:'02/12/26', rec:'rules',      method:'Phone call' },
    { id:31, cn:'Palo Verde Dental',      desc:'Advice acted on · dental equipment loan funded · client satisfied',     out:'c', time:'02/10/26', rec:'rt',         method:'Phone call' },
    { id:32, cn:'Clarity Wellness Group', desc:'Initial outreach — no response · second attempt queued',                out:'p', time:'02/07/26', rec:'nudge',      method:'Email' },
  ],
};

/* ── RECOMMENDATION COPY ─────────────────────────────────── */
const WHY = {
  1: '<strong>$185K wire received Tue</strong> — 3.2× avg velocity. 72% propensity for Business Money Market and cash management. Premier threshold met.',
  2: '<strong>Commercial Vehicle & Equipment Loan proposal sent 14 days ago</strong> (up to $250K, 84-mo terms) with no response logged. Risk of losing deal to a competitor.',
  3: '<strong>Truist Online Payroll volume up 34%</strong> over 60 days. Growth trajectory indicates readiness for Treasury Management and expanded credit lines.',
  4: '<strong>Business Certificate of Deposit matures in 28 days.</strong> No renewal outreach logged. Client is rate-sensitive — consider laddering into Business Money Market.',
  5: '<strong>Website intent signal:</strong> searched "business loan" at 8:32am — high-intent trigger for a Simple Business Loan (up to $50K, no collateral) or Line of Credit conversation.',
};

const OPENER = {
  1: `"Maria, I noticed some strong activity in your account — wanted to check in on how the business is tracking."`,
  2: `"Hi, I wanted to follow up on the equipment financing proposal we sent over — did you have a chance to review it?"`,
  3: `"I noticed your payroll volume has grown significantly — I'd love to discuss how we can support that growth."`,
  4: `"Your CD is coming up for maturity soon. I wanted to reach out before that date to make sure we find the right option."`,
  5: `"Hi, I noticed some activity on our site and wanted to reach out personally — happy to help with any financing needs."`,
};

const TPS_EMAIL_VARIANTS = {
  1: [
    'Your revenue has real momentum — and a Business Money Market could put that idle cash between events to work at 3.40% APY instead of sitting in checking.',
    'Have you thought about what happens to your catering revenue in the downtime between events? A Business Money Market earns 3.40% APY on that balance — it\'s a simple move that adds up.',
    'One thing that keeps coming to mind for Palo Verde Catering: a Business Money Market. It\'s designed for exactly this — capturing idle revenue between bookings and earning 3.40% APY while you focus on the next event.',
  ],
  2: [
    'The equipment financing conversation we started is still very much on the table — a Commercial Vehicle & Equipment Loan up to $250K, with terms up to 84 months and 100% financing available.',
    'I didn\'t want that equipment loan proposal to go cold. Up to $250K, 84-month terms, 100% financing — the door is still open whenever you\'re ready to revisit it.',
    'Reaching back out on the equipment financing front — terms are still favorable (up to $250K, 84 months, 100% financing), and I\'d hate for the timing to slip away on you.',
  ],
  3: [
    'With 62 employees and $7.2M in revenue, Blue Heron has grown to a point where Treasury Management starts making a real difference — think sweep accounts and payment automation that scale with you.',
    'Your payroll growth tells a clear story — 62 employees, $7.2M revenue, and climbing. That\'s exactly when Treasury Management pays off: sweep accounts, payment automation, and a banking setup that keeps pace.',
    'I\'ve been thinking about where Truist can do more for Blue Heron. At your current size — 62 employees, $7.2M — Treasury Management isn\'t just a nice-to-have. Sweep accounts and payment automation would save real time and cost.',
  ],
  4: [
    'Your CD is coming up on maturity, and I want to make sure you have current rates in hand before you make a decision — I can hold a rate for you so there\'s no pressure to rush.',
    'Before that CD matures, I\'d love to walk you through where rates stand right now. I can put a brief rate hold in place so you\'re not rushed — just want to make sure you have the full picture.',
    'CD maturity dates have a way of sneaking up. Yours is approaching, and I\'d rather you hear current renewal rates from me than find yourself shopping around at the last minute. Happy to lock something in for you.',
  ],
  5: [
    'Based on what I saw from your recent activity, it looks like lending might be on your mind — and for a practice at your stage, a Simple Business Loan (up to $50K, no collateral required) is often the fastest path to get there.',
    'I noticed you were exploring financing options recently, and I wanted to reach out directly. For Palo Verde Health, a Simple Business Loan — up to $50K, no collateral — could be exactly what you\'re looking for.',
    'When I saw the recent activity on your account, I thought: this is worth a conversation. A Simple Business Loan up to $50K — no collateral required — is one of the most straightforward options for a healthcare practice at your revenue level.',
  ],
};

const TPS = {
  1: [
    'Open a Business Money Market to sweep idle catering revenue into a higher-yield account (3.40% APY) between events.',
    'Truist Online Payroll automates tax filing and direct deposit for 18 employees — save hours during Q2 and Q4 peak seasons.',
    'A Small Business Line of Credit (up to $100K, revolving) covers cash flow gaps between event deposits and vendor payment terms.',
  ],
  2: [
    'Revisit the Commercial Vehicle & Equipment Loan — up to $250K, terms up to 84 months, with 100% financing available.',
    'Highlight the Dynamic Business Checking relationship discount: up to 0.50% rate reduction on any loan.',
    'If the deal stalls, offer a Business Line of Credit (up to $250K with collateral) as a flexible alternative to term financing.',
  ],
  3: [
    'Introduce Treasury Management — payroll growth to 62 employees at $7.2M revenue signals the need for sweep accounts and payment automation.',
    'A Business Line of Credit (up to $250K with collateral) supports hiring and operational expansion during this growth phase.',
    'Confirm Truist Online Payroll is keeping pace with the 34% headcount increase — explore higher-tier plan if needed.',
  ],
  4: [
    'Present current Business Certificate of Deposit renewal rates — offer a brief rate hold to prevent rate shopping.',
    'Propose a CD laddering strategy across 3-month, 6-month, and 12-month terms for improved liquidity without sacrificing yield.',
    'Introduce the Business Money Market as a flexible alternative if they want check-writing access on a portion of idle cash.',
  ],
  5: [
    'For a healthcare practice at $1.8M revenue, a Simple Business Loan (up to $50K, no collateral required) is the fastest path to funding.',
    'If the need is larger or ongoing, a Small Business Line of Credit (up to $100K, revolving) may be the better long-term fit.',
    'Offer a 30-minute discovery call — reference the 8:32am site search directly as the conversation starter.',
  ],
};
