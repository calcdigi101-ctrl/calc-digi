import type { CategoryId } from "./calculators";

export interface CategoryFaq {
  q: string;
  a: string;
}

export interface CategoryContent {
  introTitle: string;
  guideParagraphs: string[];
  keyFeatures: { title: string; desc: string }[];
  faqs: CategoryFaq[];
}

export const CATEGORY_CONTENT: Record<CategoryId, CategoryContent> = {
  baby: {
    introTitle: "Clinical & Practical Planning Calculators for Parents",
    guideParagraphs: [
      "Welcoming and caring for a child involves complex medical milestones, developmental tracking, and household budgeting. The CalcDigi Baby & Parenting calculator suite provides parents, expectant families, and pediatric caregivers with accurate, clinically referenced digital tools engineered to eliminate guesswork.",
      "Our tools are built around verified pediatric benchmarks, including the World Health Organization (WHO) and Centers for Disease Control and Prevention (CDC) infant growth curves, Naegele's rule for gestational dating, and standardized pediatric fluid intake recommendations. Whether you are estimating your due date, monitoring weekly percentile changes, calculating feeding fluid ounces by body weight, or projecting monthly childcare expenses, each tool delivers immediate, dependable results.",
      "All calculations are performed locally in your web browser with zero tracking, ensuring complete confidentiality for your family's sensitive health and developmental data."
    ],
    keyFeatures: [
      { title: "Gestational & Delivery Tracking", desc: "Calculate accurate due dates and trimester progression based on your last menstrual period (LMP) or ultrasound confirmation." },
      { title: "WHO & CDC Growth Percentiles", desc: "Compare infant weight, length, and head circumference against international clinical percentiles." },
      { title: "Feeding & Sleep Scheduling", desc: "Calculate daily milk intake requirements and age-appropriate wake windows to support healthy sleep habits." },
      { title: "Childcare & Household Budgeting", desc: "Forecast daycare costs, diaper expenses, and recurring supplies to manage your annual family budget." }
    ],
    faqs: [
      {
        q: "How does the Pregnancy Due Date Calculator determine my estimated delivery date?",
        a: "Our Due Date Calculator uses Naegele's rule, which adds 280 days (40 weeks) to the first day of your last menstrual period (LMP), adjusted for cycle lengths varying from the standard 28-day baseline."
      },
      {
        q: "What data standards are used for the Baby Weight Percentile Calculator?",
        a: "The calculator references the official WHO Child Growth Standards (for infants aged 0 to 24 months) and CDC growth charts, enabling accurate comparison across gender and age in days."
      },
      {
        q: "How are infant feeding amounts calculated?",
        a: "Feeding calculations follow American Academy of Pediatrics (AAP) guidelines, which generally recommend 2.5 ounces of formula or breast milk per pound of body weight daily for infants up to 6 months."
      },
      {
        q: "Can I forecast annual diaper costs based on newborn stages?",
        a: "Yes. Our Diaper Cost Calculator uses stage-specific daily consumption rates—from 10-12 diapers per day for newborns tapering to 5-6 per day for toddlers—to estimate monthly and annual diaper expenses."
      },
      {
        q: "Is my child's medical and developmental information stored on your servers?",
        a: "No. CalcDigi operates on a strict client-side architecture. All calculations, measurements, and milestone dates remain private in your browser and are never saved or transmitted."
      }
    ]
  },
  finance: {
    introTitle: "Actuarial & Personal Wealth Decision Calculators",
    guideParagraphs: [
      "Sound financial health requires exact numbers, transparent amortization schedules, and reliable projections. The CalcDigi Finance suite brings together institutional-grade mathematical models for mortgages, personal loans, compounding investments, tax projections, and retirement planning into clear, accessible tools.",
      "Each calculator applies standard financial formulas—including continuous compounding, fixed-rate loan amortization, internal rate of return (IRR), and net present value (NPV)—to deliver actionable clarity. Whether you are stress-testing a 30-year fixed home mortgage, assessing the tax-advantaged growth of a 401(k), or mapping out an accelerated debt-payoff schedule, CalcDigi provides the precision you need.",
      "Transparent breakdowns display principal versus interest trajectories, total borrowing costs, and yearly schedules so you can make confident, informed financial choices."
    ],
    keyFeatures: [
      { title: "Mortgage & Amortization", desc: "Model monthly principal and interest, property taxes, homeowners insurance, and PMI with full payoff schedules." },
      { title: "Investment & Compounding", desc: "Simulate compound interest trajectories with variable monthly contributions, dividend reinvestment, and inflation adjustments." },
      { title: "Retirement & 401(k) Modeling", desc: "Project portfolio longevity, employer match contributions, and withdrawal limits using actuarial standards." },
      { title: "Debt Payoff & Refinancing", desc: "Compare debt snowball and avalanche strategies to minimize total lifetime interest charges." }
    ],
    faqs: [
      {
        q: "How does the Mortgage Calculator calculate monthly principal and interest?",
        a: "It uses standard fixed-rate amortization formulas: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1], where P is principal, i is monthly interest rate, and n is total monthly payments."
      },
      {
        q: "Can I account for extra principal payments in the loan calculators?",
        a: "Yes. Our loan and mortgage tools allow you to model recurring or one-time lump-sum principal payments, showing exact interest savings and months shaved off your loan."
      },
      {
        q: "How is compound interest computed over multi-year horizons?",
        a: "We calculate compounding using A = P(1 + r/n)^(nt) alongside future value of series formulas for periodic contributions, supporting annual, monthly, and daily compounding frequencies."
      },
      {
        q: "Are inflation adjustments included in retirement projections?",
        a: "Yes. Our retirement and wealth calculators provide real versus nominal return toggles so you can evaluate future purchasing power in today's dollars."
      },
      {
        q: "Does CalcDigi store my salary, debt, or bank account figures?",
        a: "No. All financial calculations occur entirely inside your browser's local runtime. No financial figures or personal identifiers are sent to our servers."
      }
    ]
  },
  health: {
    introTitle: "Evidence-Based Health, Fitness & Nutrition Calculators",
    guideParagraphs: [
      "Achieving wellness, athletic goals, and healthy body composition requires clinical accuracy rather than vague estimates. CalcDigi Health & Fitness calculators utilize established physiological formulas published by the World Health Organization, CDC, and National Institutes of Health (NIH).",
      "From body mass index (BMI) with regional Asian WHO cut-offs and Mifflin-St Jeor Total Daily Energy Expenditure (TDEE) to macronutrient splits and target heart rate zones, our tools offer comprehensive biometric guidance. You can track body composition, plan calorie deficits or surpluses, and fine-tune hydration based on activity level.",
      "Clear visual indicators and clinical benchmark tables give you meaningful context on what your results mean for your long-term health."
    ],
    keyFeatures: [
      { title: "Biometric & Body Composition", desc: "Calculate BMI, body fat percentage via US Navy circumferences, and ideal body weight benchmarks." },
      { title: "Metabolic & Energy Expenditure", desc: "Estimate Basal Metabolic Rate (BMR) and TDEE using Mifflin-St Jeor and Katch-McArdle equations." },
      { title: "Nutritional Target Splits", desc: "Determine precise gram-level protein, carbohydrate, and dietary fat allocations tailored to your fitness goals." },
      { title: "Cardiovascular & Performance", desc: "Calculate Karvonen target heart rate training zones, running paces, and hydration requirements." }
    ],
    faqs: [
      {
        q: "Which formula is used for calculating BMR and daily caloric needs?",
        a: "We utilize the Mifflin-St Jeor equation—considered the gold standard for clinical metabolic estimation—alongside activity multipliers to calculate Total Daily Energy Expenditure (TDEE)."
      },
      {
        q: "Does the BMI calculator account for Asian population guidelines?",
        a: "Yes. Our BMI Calculator supports both standard WHO cutoffs and WHO Asian population risk categories, which classify overweight at BMI >= 23 and obesity at >= 27.5."
      },
      {
        q: "How does the Body Fat Calculator estimate body composition without calipers?",
        a: "It implements the validated US Navy Circumference Method, using neck, waist, hip, and height measurements to estimate body fat percentage within 3-4% of DEXA scans."
      },
      {
        q: "How are macro nutrient targets calculated for muscle gain or fat loss?",
        a: "Target calories are adjusted with a conservative surplus or deficit, then protein is allocated by lean body mass, with remaining calories split between healthy fats and complex carbohydrates."
      },
      {
        q: "Are the health calculators intended to replace medical diagnosis?",
        a: "No. CalcDigi health calculators provide evidence-based educational estimates. Always consult a qualified physician or dietitian for personalized clinical diagnoses."
      }
    ]
  },
  math: {
    introTitle: "High-Precision Mathematical Solvers & Educational Calculators",
    guideParagraphs: [
      "Mathematics is the foundation of science, finance, and engineering. The CalcDigi Math suite offers step-by-step clarity for everyday percentages, fractions, advanced algebra, Euclidean geometry, and statistical distributions.",
      "Whether solving percentage increases, standard deviations, quadratic roots, or right-triangle hypotenuses, our tools output verified solutions alongside step-by-step algebraic derivations and formulas. Each solver is designed for students, educators, and professionals who need fast, transparent verification.",
      "High-precision floating-point algorithms prevent rounding inaccuracies, ensuring your mathematical work is exact down to the last decimal place."
    ],
    keyFeatures: [
      { title: "Percentage & Ratio Tools", desc: "Calculate percentage changes, differences, reverse percentages, and proportional ratios." },
      { title: "Algebraic Solvers", desc: "Solve linear equations, quadratic formulas, exponents, logarithms, and polynomial factors." },
      { title: "Geometry & Trigonometry", desc: "Calculate surface areas, volumes, perimeter, angles, and trigonometric functions for 2D and 3D shapes." },
      { title: "Statistics & Probability", desc: "Compute mean, median, mode, variance, standard deviation, permutations, and combinations." }
    ],
    faqs: [
      {
        q: "How do I calculate percentage increase or decrease between two numbers?",
        a: "Percentage change is calculated using: ((New Value – Old Value) / |Old Value|) * 100. A positive result indicates an increase, while a negative result represents a decrease."
      },
      {
        q: "Can the scientific calculator handle complex trigonometric angles?",
        a: "Yes. You can switch seamlessly between degrees, radians, and gradians for all trigonometric, inverse trigonometric, and hyperbolic functions."
      },
      {
        q: "Does the statistics calculator compute sample or population standard deviation?",
        a: "Both. Our statistics calculator outputs both Sample Standard Deviation (divided by n – 1, Bessel's correction) and Population Standard Deviation (divided by N)."
      },
      {
        q: "Can I enter fractions and convert them to decimals?",
        a: "Yes. Our fraction calculators perform addition, subtraction, multiplication, and division on mixed and improper fractions, returning simplified fractions and decimal equivalents."
      },
      {
        q: "Are step-by-step mathematical solutions displayed?",
        a: "Yes. In addition to final results, each solver displays the underlying formula and intermediate algebraic steps to help you learn and verify your homework or derivations."
      }
    ]
  },
  business: {
    introTitle: "Commercial & Corporate Financial Modeling Calculators",
    guideParagraphs: [
      "Running a successful enterprise requires rigorous attention to unit economics, margin health, overhead ratios, and cash burn. The CalcDigi Business calculator suite delivers corporate-level financial models to founders, CFOs, freelancers, and small business owners.",
      "Evaluate profit margins, markups, customer acquisition cost (CAC), lifetime value (LTV), break-even volumes, and company valuations using standard managerial accounting practices. Our models make it simple to test pricing scenarios, model inventory turn, and forecast payroll burden.",
      "Clean interactive controls let you adjust key business assumptions on the fly and immediately see the impact on net profitability and runway."
    ],
    keyFeatures: [
      { title: "Margin & Markup Optimization", desc: "Distinguish between gross margin percentage and cost markup to protect product profitability." },
      { title: "Unit Economics & SaaS Metrics", desc: "Calculate CAC, LTV, CAC Payback period, and LTV:CAC ratios to ensure scalable customer acquisition." },
      { title: "Break-Even & Volume Modeling", desc: "Find the exact unit sales and dollar revenue needed to cover fixed overhead and variable costs." },
      { title: "Payroll & Employee Costing", desc: "Calculate full employee burden rates, including taxes, benefits, bonuses, and equipment." }
    ],
    faqs: [
      {
        q: "What is the difference between profit margin and markup?",
        a: "Margin is profit divided by revenue ((Price – Cost) / Price), whereas Markup is profit divided by cost ((Price – Cost) / Cost). A 50% markup equals a 33.3% gross profit margin."
      },
      {
        q: "How is the Break-Even Point calculated?",
        a: "Break-Even Units = Fixed Costs / (Selling Price per Unit – Variable Cost per Unit). Break-Even Sales Revenue is calculated by dividing Fixed Costs by the Contribution Margin Ratio."
      },
      {
        q: "What is a healthy LTV to CAC ratio for growing businesses?",
        a: "A standard benchmark for sustainable growth is an LTV:CAC ratio of 3:1 or higher. A ratio below 1:1 indicates that you are losing money on every customer acquired."
      },
      {
        q: "Can the startup valuation calculator apply multiple valuation methodologies?",
        a: "Yes. It supports revenue multiple models, EBITDA multiples, and discounted cash flow (DCF) estimates commonly used by angel investors and venture capital firms."
      },
      {
        q: "Are my company financials or pricing numbers kept private?",
        a: "Yes. All business calculations execute strictly in your local browser sandbox. No revenue numbers, cost structures, or customer counts are transmitted or stored."
      }
    ]
  },
  datetime: {
    introTitle: "Calendar, Time Difference & Chronological Calculators",
    guideParagraphs: [
      "Chronological scheduling, contract maturity, time zone coordination, and exact age calculations require accounting for leap years, variable month lengths, and daylight saving time. CalcDigi DateTime calculators deliver millisecond-accurate time calculations.",
      "Calculate elapsed days between two historical or future dates, determine workdays excluding regional holidays, convert UTC and local time zones, and find precise chronological ages down to years, months, and days.",
      "Engineered with strict ISO-8601 calendar compliance, our tools guarantee flawless date arithmetic for legal contracts, project management, and personal milestones."
    ],
    keyFeatures: [
      { title: "Exact Age & Milestone Calculation", desc: "Determine exact age in years, months, days, hours, and total lived seconds." },
      { title: "Date Difference & Duration", desc: "Compute total calendar days, business workdays, weeks, and hours between any two dates." },
      { title: "Time Zone & UTC Conversion", desc: "Convert times across global cities with automatic daylight saving time (DST) adjustments." },
      { title: "Project Workdays & Deadlines", desc: "Add or subtract business days from a starting date while excluding weekends and holidays." }
    ],
    faqs: [
      {
        q: "How does the Date Difference Calculator handle leap years?",
        a: "It adheres to the Gregorian calendar rules, adding a leap day (February 29) every 4 years, excluding years divisible by 100 unless also divisible by 400."
      },
      {
        q: "Can I calculate business workdays excluding weekends and holidays?",
        a: "Yes. Our Workdays Calculator lets you exclude Saturdays and Sundays, as well as select optional public holidays to determine net business days."
      },
      {
        q: "How is exact chronological age calculated?",
        a: "Age is computed using exact calendar month lengths and days, returning a breakdown of full completed years, remaining months, and remaining days rather than an approximate 365.25-day average."
      },
      {
        q: "Does the time zone converter adjust for Daylight Saving Time automatically?",
        a: "Yes. Time conversions use the IANA Time Zone Database to accurately account for regional DST shifts on the specific date chosen."
      },
      {
        q: "Can I convert Unix timestamps to human-readable dates?",
        a: "Yes. Our Unix Timestamp Converter translates epoch seconds and milliseconds into UTC and local date formats, and vice versa."
      }
    ]
  },
  housing: {
    introTitle: "Real Estate, Renting & Home Improvement Calculators",
    guideParagraphs: [
      "Purchasing property, negotiating leases, and estimating materials for home renovations represent significant financial and logistical commitments. The CalcDigi Housing suite provides homeowners, renters, real estate investors, and contractors with precision estimation tools.",
      "Compare the total financial cost of renting versus buying over multi-year horizons, calculate home affordability based on debt-to-income (DTI) caps, and estimate flooring, drywall, and paint requirements with built-in waste factors.",
      "With clear cost breakdowns and material estimations, you can avoid overpaying for property or overbuying supplies on your next home project."
    ],
    keyFeatures: [
      { title: "Rent vs. Buy Evaluation", desc: "Model total cost of ownership (property tax, maintenance, equity) against rent growth and stock market opportunity cost." },
      { title: "Home Affordability & DTI", desc: "Determine maximum home purchase price based on gross income, monthly debt, and 28/36 qualifying ratios." },
      { title: "Flooring, Tile & Paint Estimation", desc: "Calculate square footage and material requirements with customizable waste allowance margins." },
      { title: "Down Payment & Closing Costs", desc: "Estimate down payment savings targets and closing fee percentages across US loan types." }
    ],
    faqs: [
      {
        q: "What qualifying ratios are used in the Home Affordability Calculator?",
        a: "It uses standard conforming mortgage rules: a front-end ratio of 28% (housing costs to gross income) and a back-end ratio of 36% (total debts to gross income)."
      },
      {
        q: "How does the Rent vs. Buy Calculator compare financial outcomes?",
        a: "It compares unrecoverable buying costs (mortgage interest, property taxes, maintenance, HOA, closing fees) against unrecoverable renting costs (rent payments), factoring in investment returns on down payment capital."
      },
      {
        q: "How much material waste should I factor into flooring and tile calculations?",
        a: "Standard rectangular rooms typically require a 10% waste buffer. Complex layouts with diagonal cuts or herringbone patterns recommend 15% to 20% extra material."
      },
      {
        q: "Can I calculate paint gallon requirements for multiple rooms?",
        a: "Yes. Our Paint Calculator multiplies wall length by height, subtracts standard window and door openings, and divides by average coverage (350–400 sq ft per gallon)."
      },
      {
        q: "Are my property values and personal loan amounts kept secure?",
        a: "Yes. All computations run 100% locally on your device. We do not store, capture, or sell any real estate or financial data."
      }
    ]
  },
  conversion: {
    introTitle: "Universal Unit & Measurement Conversion Engines",
    guideParagraphs: [
      "Translating measurements across imperial, metric, and international scientific systems requires verified conversion constants and IEEE floating-point precision. The CalcDigi Measurement and Conversion suite delivers instant, bidirectionally accurate conversions.",
      "Convert length, mass, volume, temperature, pressure, digital data storage, speed, and culinary measurements with zero rounding artifacts. Every converter references National Institute of Standards and Technology (NIST) reference tables.",
      "Whether converting culinary milliliters to cups or engineering pascals to pounds per square inch, our converters provide instant results."
    ],
    keyFeatures: [
      { title: "Length, Distance & Area", desc: "Convert millimeters, inches, feet, meters, kilometers, miles, acres, and hectares." },
      { title: "Weight & Mass Conversion", desc: "Switch between grams, kilograms, pounds, ounces, stones, metric tonnes, and carats." },
      { title: "Temperature & Thermal Units", desc: "Convert between Celsius, Fahrenheit, Kelvin, Rankine, and Delisle scales." },
      { title: "Digital Storage & Data Transfer", desc: "Translate bytes, kilobytes, megabytes, gigabytes, and terabytes in base-2 (1024) and base-10 (1000)." }
    ],
    faqs: [
      {
        q: "Are conversions calculated using exact NIST scientific constants?",
        a: "Yes. All conversions reference official National Institute of Standards and Technology (NIST) conversion constants to ensure laboratory-grade accuracy."
      },
      {
        q: "How does the digital storage converter handle base-2 vs base-10 units?",
        a: "It supports both binary storage standards (1 GiB = 1024 MiB, commonly used by operating systems) and decimal storage standards (1 GB = 1000 MB, used by storage drive manufacturers)."
      },
      {
        q: "How is Celsius converted to Fahrenheit?",
        a: "The standard thermodynamic conversion formula is used: °F = (°C × 9/5) + 32. For the reverse conversion: °C = (°F – 32) × 5/9."
      },
      {
        q: "Can I convert complex cooking measurements like cups to grams?",
        a: "Yes. Our Cooking Measurement Converter provides ingredient-specific density mappings, recognizing that a cup of flour weighs less than a cup of sugar or butter."
      },
      {
        q: "Is there any limit to the number of decimal places returned?",
        a: "Calculators provide up to 10 decimal digits of precision with intelligent automatic rounding to prevent floating-point binary artifacts."
      }
    ]
  },
  electronics: {
    introTitle: "Electrical Engineering, Circuit & Component Calculators",
    guideParagraphs: [
      "Designing circuits, calculating component ratings, and estimating battery life require rigorous adherence to Ohm's law, Kirchhoff's laws, and electrical engineering fundamentals. The CalcDigi Electronics suite provides electrical engineers, hobbyists, and technicians with essential calculation tools.",
      "Calculate current, voltage, and power dissipation, decode 4-band and 5-band resistor color codes, compute RC time constants, size voltage dividers, and estimate runtimes on battery cells.",
      "Built-in safety checks highlight component power dissipation thresholds to help prevent thermal runaway or damaged hardware in your prototypes."
    ],
    keyFeatures: [
      { title: "Ohm's Law & Power Triangle", desc: "Compute voltage (V), current (I), resistance (R), and power (P) across any two known values." },
      { title: "Resistor Color Codes & Networks", desc: "Decode 4-band, 5-band, and 6-band resistors, and compute series and parallel equivalents." },
      { title: "Capacitor & Inductor Reactance", desc: "Calculate capacitive and inductive reactance, resonant frequencies, and RC/RL filter cutoff points." },
      { title: "Battery Runtime & Solar Sizing", desc: "Estimate hours of continuous operation from battery mAh ratings based on active circuit draw." }
    ],
    faqs: [
      {
        q: "What is the formula used for Ohm's Law calculations?",
        a: "Ohm's law defines V = I × R (Voltage = Current × Resistance). Power calculations utilize P = V × I, P = I² × R, and P = V² / R."
      },
      {
        q: "How do parallel resistors calculate compared to series resistors?",
        a: "Series resistors add directly (R_total = R1 + R2 + ...). Parallel resistors use the reciprocal formula: 1 / R_total = (1 / R1) + (1 / R2) + ..."
      },
      {
        q: "How does the Battery Life Calculator estimate runtime?",
        a: "Runtime (hours) is calculated as: (Battery Capacity in mAh / Load Current in mA) × Efficiency Factor (typically 0.70 to 0.85 to account for chemical discharge curves and self-discharge)."
      },
      {
        q: "Can I size current-limiting resistors for LEDs?",
        a: "Yes. Our LED Resistor Calculator applies: R = (Supply Voltage – LED Forward Voltage) / Desired LED Current in Amperes."
      },
      {
        q: "Does the calculator support 3-phase AC power calculations?",
        a: "Yes. Our Three-Phase Power Calculator computes active power (kW), apparent power (kVA), and reactive power (kVAR) using line-to-line and line-to-neutral equations."
      }
    ]
  },
  internet: {
    introTitle: "Networking, Bandwidth, Cloud & IT Infrastructure Calculators",
    guideParagraphs: [
      "Optimizing network throughput, subnetting IPv4 networks, planning storage capacity, and forecasting cloud bandwidth costs require precise network mathematics. The CalcDigi Internet & IT suite equips network engineers, sysadmins, and web developers with reliable tools.",
      "Calculate exact file download and upload times across varying connection speeds, calculate IPv4 CIDR subnet masks, convert data transfer units between megabits (Mbps) and megabytes (MB/s), and estimate video streaming bandwidth.",
      "Our networking tools account for real-world protocol overheads (such as TCP/IP packet headers) to give you realistic network performance estimates."
    ],
    keyFeatures: [
      { title: "Download & Upload Time Forecasting", desc: "Calculate transfer durations for large files and backups across broadband, fiber, and 5G speeds." },
      { title: "IPv4 Subnet & CIDR Notation", desc: "Calculate network addresses, broadcast addresses, usable host IP ranges, and wildcard masks." },
      { title: "Bandwidth & Data Rate Conversion", desc: "Convert seamlessly between megabits per second (Mbps), gigabits (Gbps), and megabytes per second (MB/s)." },
      { title: "Cloud Storage & Transfer Budgets", desc: "Estimate monthly egress bandwidth expenses and backup storage volume across cloud providers." }
    ],
    faqs: [
      {
        q: "Why does a 100 Mbps internet connection download at ~12.5 MB/s?",
        a: "Internet speeds are sold in megabits (bits), while file sizes are measured in megabytes (bytes). Since 1 Byte = 8 bits, 100 Mbps divided by 8 equals 12.5 MB/s (before accounting for ~5-10% protocol overhead)."
      },
      {
        q: "How does the IPv4 Subnet Calculator determine usable hosts?",
        a: "The number of usable hosts is calculated as 2^(32 – Prefix) – 2, subtracting 2 addresses reserved for the Network ID and the Broadcast address."
      },
      {
        q: "Does the Download Time Calculator include TCP/IP overhead?",
        a: "Yes. You can toggle optional network overhead allowances (typically 5% to 10%) to account for TCP handshakes, packet headers, and real-world packet retransmissions."
      },
      {
        q: "How much bandwidth is required for 4K video streaming?",
        a: "4K UHD streaming with modern compression (HEVC/H.265 or AV1) typically requires steady bandwidth between 15 Mbps and 25 Mbps per concurrent stream."
      },
      {
        q: "Are my internal IP addresses or network ranges stored?",
        a: "No. All subnet and IP calculations are processed client-side in your browser. We never log or transmit your IP infrastructure details."
      }
    ]
  },
  education: {
    introTitle: "Academic Performance, GPA & Student Loan Calculators",
    guideParagraphs: [
      "Navigating academic milestones, estimating final exam targets, and planning college financing demand exact numbers. The CalcDigi Education calculator suite assists students, educators, and parents in tracking scholastic progress.",
      "Calculate semester and cumulative grade point averages (GPA) on weighted and unweighted 4.0 scales, determine the exact score needed on your final exam to achieve a target course grade, and model student loan repayments.",
      "Transparent calculations help students set realistic study goals and make sound decisions about higher education costs."
    ],
    keyFeatures: [
      { title: "Weighted & Unweighted GPA", desc: "Calculate collegiate and high school GPA with Honors, AP, and IB course credit weightings." },
      { title: "Final Exam Score Goal Setter", desc: "Determine the exact final exam score required to pass or achieve an 'A' based on current coursework grades." },
      { title: "College Cost & Student Loans", desc: "Estimate tuition, living expenses, financial aid offsets, and post-graduation monthly loan repayments." },
      { title: "Reading Speed & Study Planning", desc: "Forecast reading duration for textbooks and syllabi to schedule effective study sessions." }
    ],
    faqs: [
      {
        q: "How is Cumulative GPA calculated across multiple semesters?",
        a: "Cumulative GPA is calculated as Total Quality Points (Grade Value × Credit Hours summed across all courses) divided by Total Attempted Credit Hours."
      },
      {
        q: "What is the difference between weighted and unweighted GPA?",
        a: "Unweighted GPA caps at 4.0 regardless of course difficulty. Weighted GPA adds extra points (typically +0.5 for Honors and +1.0 for AP/IB courses) on a 5.0 scale."
      },
      {
        q: "How does the Final Grade Calculator determine the score I need on my final exam?",
        a: "It uses: Required Final Score = (Target Grade – (Current Grade × (1 – Final Exam Weight))) / Final Exam Weight."
      },
      {
        q: "Can I model federal vs. private student loan repayment schedules?",
        a: "Yes. Our Student Loan Calculator models standard 10-year repayment terms, extended terms, and discretionary interest rates to show total interest paid over time."
      },
      {
        q: "Are my grades, test scores, or financial aid amounts saved?",
        a: "No. All academic grades and financial inputs are executed entirely in your local browser sandbox and are never recorded on external servers."
      }
    ]
  },
  weather: {
    introTitle: "Meteorological, Thermal Index & Atmospheric Calculators",
    guideParagraphs: [
      "Outdoor safety, aviation planning, and environmental monitoring rely on accurate thermal and atmospheric formulas. The CalcDigi Weather suite delivers meteorological calculations based on National Weather Service (NWS) and NOAA standards.",
      "Calculate wind chill factor, heat index (apparent temperature), dew point, relative humidity, and ultraviolet (UV) index exposure times. Understand how temperature and humidity interact to affect thermal comfort and safety.",
      "Clear safety classification badges highlight danger thresholds for heat exhaustion and frostbite risks."
    ],
    keyFeatures: [
      { title: "Heat Index & Apparent Temperature", desc: "Calculate felt temperature using the official Rothfusz regression equation for summer safety." },
      { title: "Wind Chill Equivalent Temperature", desc: "Compute winter chill factors based on ambient temperature and wind speed at face level." },
      { title: "Dew Point & Relative Humidity", desc: "Determine atmospheric moisture content using the Magnus-Tetens approximation formula." },
      { title: "Rainfall & Snowfall Accumulation", desc: "Convert liquid precipitation to estimated snowfall depths based on freezing-layer temperatures." }
    ],
    faqs: [
      {
        q: "What formula is used to calculate the Heat Index?",
        a: "We implement the National Oceanic and Atmospheric Administration (NOAA) Rothfusz regression equation, which models relative humidity and dry-bulb temperature above 80°F."
      },
      {
        q: "When does the Wind Chill formula apply?",
        a: "The standard NWS wind chill formula applies when air temperatures are at or below 50°F (10°C) and wind speeds exceed 3 mph (4.8 km/h)."
      },
      {
        q: "How is Dew Point calculated from temperature and relative humidity?",
        a: "Dew point is computed using the Magnus-Tetens approximation equation, accurate within 0.4°C over normal meteorological temperature ranges."
      },
      {
        q: "What is the standard snow-to-water liquid equivalent ratio?",
        a: "The standard climatological ratio is 10:1 (10 inches of snow for 1 inch of rain), but our calculator lets you adjust from 6:1 (wet heavy snow) up to 20:1 (dry powder)."
      },
      {
        q: "How does the UV Index calculator estimate safe sun exposure time?",
        a: "It correlates the current UV Index with Fitzpatrick skin phototypes to determine the time to minimal erythema (sunburn) without sunscreen."
      }
    ]
  },
  transportation: {
    introTitle: "Automotive, Commute, Fleet & Travel Cost Calculators",
    guideParagraphs: [
      "Commuting expenses, fleet logistics, vehicle ownership depreciation, and road trip budgeting all depend on fuel economy and operating cost equations. The CalcDigi Transportation suite provides travelers, car owners, and fleet managers with practical calculation tools.",
      "Calculate road trip fuel expenses, compare internal combustion vehicle costs against electric vehicle (EV) charging savings, evaluate vehicle depreciation, and calculate flight durations between international airports.",
      "Transparent breakdowns help drivers evaluate total cost per mile and make cost-effective decisions about vehicle financing and daily commutes."
    ],
    keyFeatures: [
      { title: "Fuel Cost & Mileage (MPG)", desc: "Calculate fuel expenses for specific trips or monthly commuting using local gas prices and vehicle MPG." },
      { title: "Electric Vehicle (EV) Savings", desc: "Compare electricity per kWh charging expenses against equivalent gasoline fuel costs per 100 miles." },
      { title: "Vehicle Depreciation & Loan Costs", desc: "Model 5-year automotive depreciation curves and monthly car loan payments." },
      { title: "Flight Duration & Distance", desc: "Calculate great-circle flight distances and estimated flight times between airport coordinates." }
    ],
    faqs: [
      {
        q: "How does the Fuel Cost Calculator compute trip expenses?",
        a: "Trip Fuel Cost is calculated as: (Total Trip Distance in Miles / Vehicle MPG) × Cost of Fuel per Gallon. Metric options are also fully supported."
      },
      {
        q: "How do EV charging costs compare to gasoline vehicles?",
        a: "Our EV Savings Calculator multiplies battery consumption (kWh per 100 miles) by residential or commercial electricity rates ($/kWh), comparing it directly to gasoline costs over identical mileage."
      },
      {
        q: "What standard depreciation rate applies to new vehicles?",
        a: "New passenger cars typically lose ~20% of their value in the first year and approximately 15% per year for years two through five, modeled via exponential decay."
      },
      {
        q: "How does the Commute Cost Calculator estimate annual travel expense?",
        a: "It combines round-trip mileage, fuel economy, local gas prices, highway tolls, parking fees, and estimated wear-and-tear per mile across 250 annual workdays."
      },
      {
        q: "Are my routes, destinations, or vehicle details tracked?",
        a: "No. All route distances, fuel rates, and financial inputs execute locally in your browser. We never log or store your travel destinations."
      }
    ]
  },
  food: {
    introTitle: "Culinary Scaling, Recipe Conversion & Kitchen Calculators",
    guideParagraphs: [
      "Culinary scaling, recipe conversions, and kitchen portion planning require accurate mathematical scaling to maintain taste, texture, and leavening balance. The CalcDigi Food & Culinary suite provides chefs, home bakers, and food businesses with practical kitchen tools.",
      "Scale recipe yields up or down without altering flavor proportions, convert volume measurements to weight for precise baking, and calculate cost per portion for catering menus.",
      "Specialized baking ratios and temperature converters ensure your culinary creations turn out consistently every time."
    ],
    keyFeatures: [
      { title: "Recipe Yield Scaling", desc: "Multiply or divide serving yields while maintaining precise ingredient ratios and seasonings." },
      { title: "Volume to Weight (Baking)", desc: "Convert cups and tablespoons into grams for flour, sugar, butter, and liquid ingredients." },
      { title: "Food Cost per Portion", desc: "Calculate ingredient cost per plate to price restaurant dishes and event catering menus profitably." },
      { title: "Cooking Measurement Conversions", desc: "Switch seamlessly between fluid ounces, milliliters, teaspoons, tablespoons, cups, pints, and liters." }
    ],
    faqs: [
      {
        q: "How do I scale a recipe for a different number of servings?",
        a: "Scaling Factor = Desired Servings / Original Servings. Each ingredient quantity is multiplied by this scaling factor to preserve culinary balance."
      },
      {
        q: "Why is weighing ingredients in grams better than volume cups for baking?",
        a: "Flour and dry goods vary in density depending on humidity and how tightly they are packed. Weighing in grams ensures exact chemical leavening and hydration ratios."
      },
      {
        q: "How does the Food Cost Calculator determine plate cost?",
        a: "It sums the purchase cost of each recipe ingredient based on its portion weight, then adds an optional waste percentage (typically 5–10%) to calculate true cost per portion."
      },
      {
        q: "Can I convert oven baking temperatures between Fahrenheit and Celsius?",
        a: "Yes. Our kitchen temperature converter translates standard baking temperatures (e.g. 350°F = ~175°C, 400°F = ~200°C) including gas mark equivalents."
      },
      {
        q: "Are my custom recipes or menu prices saved on your servers?",
        a: "No. All culinary formulas and ingredient inputs run entirely on your local device. We do not store, view, or sell your proprietary recipes."
      }
    ]
  },
  science: {
    introTitle: "Chemistry, Laboratory & Stoichiometry Calculators",
    guideParagraphs: [
      "Preparing chemical solutions, balancing molar concentrations, and verifying gas laws require exact stoichiometric and thermodynamic formulas. The CalcDigi Science suite equips chemistry students, laboratory researchers, and educators with verified computational tools.",
      "Calculate molecular weights from chemical formulas, determine solution molarity and dilution volumes (M1V1 = M2V2), evaluate ideal gas laws (PV = nRT), and calculate solution pH from hydrogen ion concentrations.",
      "Engineered with verified atomic weights from the International Union of Pure and Applied Chemistry (IUPAC), our science tools ensure laboratory-grade precision."
    ],
    keyFeatures: [
      { title: "Molecular Weight & Formula Mass", desc: "Parse empirical chemical formulas to compute exact molar mass in grams per mole (g/mol)." },
      { title: "Molarity, Molality & Dilutions", desc: "Calculate solute mass, solvent volume, and molar concentrations for accurate stock buffer dilutions." },
      { title: "Ideal Gas Law Modeling", desc: "Solve for Pressure, Volume, Moles, or Temperature under varying atmospheric and laboratory conditions." },
      { title: "pH & Acid-Base Equilibrium", desc: "Compute pH, pOH, [H+], and [OH-] concentrations for strong and weak acids and bases." }
    ],
    faqs: [
      {
        q: "What reference atomic weights are used for molecular weight calculations?",
        a: "Our chemical calculators utilize the standard atomic weights published by the IUPAC Commission on Isotopic Abundances and Atomic Weights."
      },
      {
        q: "How does the dilution formula work for laboratory preparation?",
        a: "It applies the conservation of moles equation: C1 × V1 = C2 × V2, where C represents concentration and V represents volume."
      },
      {
        q: "How is pH calculated from hydrogen ion concentration?",
        a: "pH is defined as: pH = –log10[H+]. Conversely, [H+] is calculated as 10^(–pH). At standard 25°C, pH + pOH = 14."
      },
      {
        q: "Which gas constant (R) is used in the Ideal Gas Law calculator?",
        a: "We support R = 0.08206 L·atm/(mol·K), R = 8.314 J/(mol·K), and equivalent engineering units for pressure in mmHg, kPa, and psi."
      },
      {
        q: "Can I balance chemical reaction stoichiometry?",
        a: "Yes. Our stoichiometry tools calculate theoretical yield, limiting reactants, and percentage yields based on balanced chemical equations."
      }
    ]
  },
  physics: {
    introTitle: "Classical Mechanics, Energy & Wave Physics Solvers",
    guideParagraphs: [
      "Understanding physical systems requires translating fundamental laws of motion, gravitation, energy, and wave dynamics into accurate quantitative solutions. The CalcDigi Physics suite provides STEM students, physicists, and engineers with verified physics solvers.",
      "Compute kinematic trajectories, velocity, constant acceleration, kinetic and gravitational potential energy, circular motion centripetal force, and wave frequencies.",
      "Step-by-step mathematical steps accompany each result, clarifying the underlying physical relationships."
    ],
    keyFeatures: [
      { title: "Kinematics & Projectile Motion", desc: "Solve 1D and 2D kinematics equations for displacement, initial velocity, time of flight, and apex height." },
      { title: "Newtonian Dynamics & Force", desc: "Apply F = m × a, friction equations, and universal gravitational attraction formulas." },
      { title: "Work, Energy & Momentum", desc: "Calculate kinetic energy, work done, gravitational potential energy, and elastic collision momentum." },
      { title: "Waves, Optics & Frequency", desc: "Compute wave velocity, wavelength, period, and frequency across sound and electromagnetic spectra." }
    ],
    faqs: [
      {
        q: "Which kinematic equations are used for constant acceleration problems?",
        a: "We apply the four standard equations: v = v0 + at, d = v0t + 0.5at², v² = v0² + 2ad, and d = ((v0 + v) / 2)t."
      },
      {
        q: "How does the Projectile Motion Calculator compute maximum height and range?",
        a: "Assuming zero drag: Max Height = (v0 × sin(θ))² / (2g); Range = (v0² × sin(2θ)) / g; Total Time of Flight = (2 × v0 × sin(θ)) / g."
      },
      {
        q: "How is kinetic energy calculated?",
        a: "Kinetic Energy is calculated as: KE = 0.5 × m × v², where m is mass in kilograms and v is velocity in meters per second, output in Joules (J)."
      },
      {
        q: "What acceleration due to gravity (g) is assumed in Earth physics calculations?",
        a: "Standard Earth gravity is set to g = 9.80665 m/s² (32.174 ft/s²), which can be adjusted for high-altitude or extraterrestrial problems."
      },
      {
        q: "Does the physics solver support metric and imperial engineering units?",
        a: "Yes. All physics tools allow flexible input and output unit switching between SI metric units (meters, kg, Newtons) and imperial units (feet, pounds, lbf)."
      }
    ]
  },
  environment: {
    introTitle: "Carbon Footprint, Solar Energy & Sustainability Calculators",
    guideParagraphs: [
      "Measuring environmental impact, planning residential solar installations, calculating water conservation, and projecting carbon offsets require transparent ecological modeling. The CalcDigi Environment suite provides homeowners, businesses, and sustainability advocates with actionable environmental tools.",
      "Calculate your household carbon footprint, estimate solar photovoltaic kilowatt-hour generation and payback periods, calculate electric vehicle emissions savings, and evaluate residential water savings.",
      "Referencing emission factor databases from the US Environmental Protection Agency (EPA) and International Energy Agency (IEA), our tools help you quantify your impact."
    ],
    keyFeatures: [
      { title: "Carbon Footprint Estimation", desc: "Calculate annual CO2 equivalent emissions across home energy, air travel, and vehicle usage." },
      { title: "Solar Panel System Sizing", desc: "Estimate solar PV array size, annual kWh production, and financial return on investment." },
      { title: "EV Emissions vs. Gasoline", desc: "Compare lifecycle greenhouse gas emissions of electric vehicles against conventional gasoline vehicles." },
      { title: "Water Conservation & Rainwater", desc: "Calculate household water reduction and rainwater catchment capacity based on roof square footage." }
    ],
    faqs: [
      {
        q: "How are carbon emissions calculated from home electricity usage?",
        a: "We utilize regional EPA eGRID emission factors that multiply your monthly kWh electricity consumption by the specific carbon intensity of your electrical grid."
      },
      {
        q: "How does the Solar Panel Calculator estimate annual energy generation?",
        a: "Annual Output (kWh) = System Size (kW) × Average Daily Peak Sun Hours × 365 × System Efficiency Derate Factor (typically ~0.80 to account for inverter loss and wiring)."
      },
      {
        q: "What emissions data is used to compare EVs against gasoline cars?",
        a: "Calculations factor in regional electrical grid emissions per kWh alongside average vehicle efficiency (e.g. 30 kWh/100 miles) versus gasoline burning at 8,887 grams of CO2 per gallon."
      },
      {
        q: "How is rainwater harvesting volume calculated from a roof?",
        a: "Harvested Gallons = Catchment Area (sq ft) × Rainfall (inches) × 0.623 (conversion factor) × Runoff Efficiency Coefficient (typically 0.85 to 0.90)."
      },
      {
        q: "Are my utility usage numbers or address saved?",
        a: "No. All sustainability assessments and utility numbers are computed client-side in your browser. No personal energy data is logged or transmitted."
      }
    ]
  },
  entertainment: {
    introTitle: "Budgeting & Planning Calculators for Events & Entertainment",
    guideParagraphs: [
      "Planning events, managing streaming subscriptions, building gaming PCs, and budgeting for concerts and vacations require careful cost optimization. The CalcDigi Entertainment & Leisure suite gives consumers and event organizers practical budgeting tools.",
      "Calculate total concert ticket costs including service and venue fees, audit monthly and annual streaming subscription bundles, estimate food and beverage quantities for party guests, and budget gaming PC hardware components.",
      "Transparent cost breakdowns ensure you stay within your entertainment budget without unexpected expenses."
    ],
    keyFeatures: [
      { title: "Event & Party Catering Estimators", desc: "Calculate food portions, beverage quantities, and ice supplies for gatherings of any size." },
      { title: "Streaming Subscription Audit", desc: "Sum up monthly video, music, and gaming subscriptions to identify cost savings and unused services." },
      { title: "Concert & Movie Ticket Fee Tracker", desc: "Calculate true total ticket expenses after dynamic service fees, facility charges, and parking." },
      { title: "Gaming PC Build Budgeting", desc: "Allocate budget across CPU, GPU, RAM, storage, and power supplies to avoid hardware bottlenecks." }
    ],
    faqs: [
      {
        q: "How does the Party Drink & Food Calculator calculate quantities for guests?",
        a: "It applies standard hospitality catering formulas: ~1 lb of food per guest, 2 drinks per guest for the first hour and 1 drink per hour thereafter, with a 1.5 lb ice allowance per attendee."
      },
      {
        q: "How can I audit my monthly streaming subscription costs?",
        a: "Our Streaming Subscription Calculator tallies recurring monthly and annual costs across all active services, highlighting annualized spend and opportunities to bundle."
      },
      {
        q: "Why do ticket fees add so much to the face value price?",
        a: "Ticketing platforms typically add 15% to 35% in combined convenience fees, service charges, facility fees, and order processing fees, which our tool calculates upfront."
      },
      {
        q: "How should I allocate budget when building a gaming computer?",
        a: "Standard balanced performance benchmarks recommend spending 35% to 45% of your total budget on the graphics card (GPU), 20% to 25% on the processor (CPU), and the remainder on motherboard, RAM, storage, and power."
      },
      {
        q: "Is any personal spending or subscription data stored?",
        a: "No. All entertainment budgets and subscription checklists run strictly inside your browser. No financial data is ever collected."
      }
    ]
  },
  engineering: {
    introTitle: "Structural, Mechanical & Civil Engineering Calculators",
    guideParagraphs: [
      "Sizing structural members, calculating hydraulic flow rates, estimating concrete pours, and determining bolt torque require adherence to rigorous engineering codes (AISC, ACI, ASME). The CalcDigi Engineering suite provides engineers, architects, and contractors with essential calculation tools.",
      "Calculate beam deflection and bending moments under point and distributed loads, determine cubic yards and bag requirements for concrete slabs and footings, compute pipe flow velocities and pressure drops, and size HVAC heating and cooling BTU requirements.",
      "Clear mechanical formulas and standard safety factor allowances help you verify project specs quickly."
    ],
    keyFeatures: [
      { title: "Structural Beam Deflection & Moments", desc: "Calculate maximum shear, bending moment, and deflection for simply supported and cantilever beams." },
      { title: "Concrete Mix & Slab Volume", desc: "Estimate exact cubic yards, tons of gravel and sand, and required 60lb/80lb premix bags with waste margins." },
      { title: "Pipe Flow & Hydraulics", desc: "Calculate volumetric flow rate, fluid velocity, Reynolds number, and pressure drop via the Darcy-Weisbach equation." },
      { title: "HVAC BTU Sizing & Sizing", desc: "Calculate heating and cooling BTU loads based on room square footage, ceiling height, and insulation factors." }
    ],
    faqs: [
      {
        q: "How is maximum deflection calculated for a simply supported beam with uniform load?",
        a: "Maximum center deflection is calculated as: δ_max = (5 × w × L⁴) / (384 × E × I), where w is load per unit length, L is span length, E is modulus of elasticity, and I is moment of inertia."
      },
      {
        q: "How do I calculate concrete yardage for a rectangular slab?",
        a: "Cubic Yards = (Length in feet × Width in feet × Thickness in feet) / 27. It is standard industry practice to add 10% to account for spillage, subgrade irregularities, and form flex."
      },
      {
        q: "What formula is used for calculating Bolt Torque?",
        a: "Torque is calculated using: T = K × D × F, where T is tightening torque, K is the nut factor (typically 0.20 for dry steel, 0.15 for lubricated), D is nominal bolt diameter, and F is target bolt preload tension."
      },
      {
        q: "How does the Pipe Flow Calculator determine fluid velocity?",
        a: "Velocity is calculated using the continuity equation: V = Q / A, where Q is volumetric flow rate and A is internal pipe cross-sectional area (π × r²)."
      },
      {
        q: "Are the engineering calculators suitable for certified stamped blueprints?",
        a: "No. CalcDigi engineering calculators provide rapid preliminary design estimates. Final structural, civil, and mechanical blueprints must always be reviewed and stamped by a licensed Professional Engineer (PE)."
      }
    ]
  },
  geography: {
    introTitle: "Geodetic Distance, Coordinate & Mapping Calculators",
    guideParagraphs: [
      "Navigating coordinates, computing true great-circle distances, translating map scales, and calculating elevation grades require spherical trigonometry and geodetic reference models. The CalcDigi Geography suite equips GIS professionals, surveyors, hikers, and students with reliable mapping tools.",
      "Calculate true distance between any two global cities or latitude/longitude coordinates using the Haversine formula, convert decimal degrees into degrees-minutes-seconds (DMS), translate map scales to real-world ground distances, and calculate road or trail slope percentages.",
      "All geodetic calculations reference the standard WGS-84 Earth ellipsoid model for spatial accuracy."
    ],
    keyFeatures: [
      { title: "Great-Circle Distance (Haversine)", desc: "Compute flight and maritime distances between global coordinates accounting for Earth's curvature." },
      { title: "Coordinate Conversion (DD & DMS)", desc: "Translate between decimal degrees (e.g. 40.7128, -74.0060) and degrees, minutes, seconds format." },
      { title: "Map Scale & Ground Distance", desc: "Convert map measurement ratios (e.g. 1:24,000 or 1:50,000) into real-world miles, kilometers, and meters." },
      { title: "Elevation Grade & Slope Percentage", desc: "Calculate topographic incline percentage and pitch from vertical rise and horizontal run." }
    ],
    faqs: [
      {
        q: "What formula is used to calculate distance between latitude and longitude points?",
        a: "We apply the Haversine formula: a = sin²(Δφ/2) + cos(φ1) × cos(φ2) × sin²(Δλ/2), followed by c = 2 × atan2(√a, √(1−a)) and d = R × c, using Earth mean radius R = 6,371 km (3,959 miles)."
      },
      {
        q: "How do I convert Degrees Minutes Seconds (DMS) to Decimal Degrees (DD)?",
        a: "Decimal Degrees = Degrees + (Minutes / 60) + (Seconds / 3600). South latitudes and West longitudes are expressed as negative decimal values."
      },
      {
        q: "How is Elevation Grade percentage calculated?",
        a: "Slope Percentage = (Vertical Rise / Horizontal Run) × 100. For example, a 6-foot rise over a 100-foot distance represents a 6% grade."
      },
      {
        q: "What does a 1:24,000 map scale mean in practice?",
        a: "A 1:24,000 scale means 1 unit on the map equals 24,000 identical units on the ground. For example, 1 inch on the map equals 24,000 inches (2,000 feet) in reality."
      },
      {
        q: "Are my coordinate lookups or location data stored?",
        a: "No. All coordinate math and distance calculations execute entirely in your local browser runtime. We never log or track your geographic queries."
      }
    ]
  }
};
