// ── CalcDigi – Enhanced Layout Components ──

function getBasePath(){
  return '/';
}

// ── ALL CALCULATORS DATA ──
const CALC_DATA = {
  health: {
    label:'🩺 Health & Fitness', color:'tag-health', icon:'icon-health',
    calcs:[
      {name:'BMI Calculator',icon:'⚖️',url:'calculators/health/bmi-calculator'},
      {name:'Calorie Calculator',icon:'🥗',url:'calculators/health/calorie-calculator'},
      {name:'TDEE Calculator',icon:'⚡',url:'calculators/health/tdee-calculator'},
      {name:'BMR Calculator',icon:'🔥',url:'calculators/health/bmr-calculator'},
      {name:'Macro Calculator',icon:'🧬',url:'calculators/health/macro-calculator'},
      {name:'Ideal Weight Calculator',icon:'🏋️',url:'calculators/health/ideal-weight-calculator'},
      {name:'Body Fat Calculator',icon:'📊',url:'calculators/health/body-fat-calculator'},
      {name:'Water Intake Calculator',icon:'💧',url:'calculators/health/water-intake-calculator'},
      {name:'Protein Intake Calculator',icon:'🥩',url:'calculators/health/protein-intake-calculator'},
      {name:'Heart Rate Zone Calculator',icon:'❤️',url:'calculators/health/heart-rate-zone-calculator'},
      {name:'Weight Loss Calculator',icon:'📉',url:'calculators/health/weight-loss-calculator'},
      {name:'Lean Body Mass Calculator',icon:'💪',url:'calculators/health/lean-body-mass-calculator'},
      {name:'Pregnancy Due Date Calculator',icon:'🤰',url:'calculators/health/pregnancy-due-date-calculator'},
      {name:'Ovulation Calculator',icon:'📅',url:'calculators/health/ovulation-calculator'},
      {name:'Sleep Calculator',icon:'😴',url:'calculators/health/sleep-calculator'},
      {name:'Pace Calculator',icon:'🏃',url:'calculators/health/pace-calculator'},
      {name:'VO2 Max Calculator',icon:'🫁',url:'calculators/health/vo2-max-calculator'},
      {name:'One Rep Max Calculator',icon:'🏋️',url:'calculators/health/one-rep-max-calculator'},
      {name:'Waist to Hip Ratio',icon:'📏',url:'calculators/health/waist-to-hip-ratio-calculator'},
      {name:'Blood Pressure Analyzer',icon:'💊',url:'calculators/health/blood-pressure-calculator'},
      {name:'Bra Size Calculator',icon:'👙',url:'calculators/health/bra-size-calculator'},
      {name:'Period Calculator',icon:'🌸',url:'calculators/health/period-calculator'},
      {name:'Fertility Calculator',icon:'🌺',url:'calculators/health/fertility-calculator'},
      {name:'Baby Weight Calculator',icon:'👶',url:'calculators/health/baby-weight-calculator'},
      {name:'Child Height Predictor',icon:'📐',url:'calculators/health/child-height-predictor'},
      {name:'Pushup Fitness Test',icon:'💪',url:'calculators/health/pushup-test-calculator'},
      {name:'Swim Pace Calculator',icon:'🏊',url:'calculators/health/swim-pace-calculator'},
      {name:'Cycling Calculator',icon:'🚴',url:'calculators/health/cycling-calculator'},
      {name:'Calorie Burn Calculator',icon:'🔥',url:'calculators/health/calorie-burn-calculator'},
      {name:'Steps to Calories',icon:'👟',url:'calculators/health/steps-to-calories-calculator'},
      {name:'Intermittent Fasting',icon:'⏱️',url:'calculators/health/intermittent-fasting-calculator'},
      {name:'Alcohol Unit Calculator',icon:'🍷',url:'calculators/health/alcohol-unit-calculator'},
      {name:'Smoking Cost Calculator',icon:'🚬',url:'calculators/health/smoking-cost-calculator'},
      {name:'Waist to Height Ratio',icon:'📏',url:'calculators/health/waist-to-height-ratio-calculator'},
      {name:'Body Shape Calculator',icon:'👤',url:'calculators/health/body-shape-calculator'},
    ]
  },
  finance: {
    label:'💰 Finance & Money', color:'tag-finance', icon:'icon-finance',
    calcs:[
      {name:'Mortgage Calculator',icon:'🏠',url:'calculators/finance/mortgage-calculator'},
      {name:'Loan Calculator',icon:'💰',url:'calculators/finance/loan-calculator'},
      {name:'Auto Loan Calculator',icon:'🚗',url:'calculators/finance/auto-loan-calculator'},
      {name:'Credit Card Payoff',icon:'💳',url:'calculators/finance/credit-card-payoff-calculator'},
      {name:'Compound Interest',icon:'📈',url:'calculators/finance/compound-interest-calculator'},
      {name:'Savings Calculator',icon:'🏦',url:'calculators/finance/savings-calculator'},
      {name:'Retirement Calculator',icon:'🌅',url:'calculators/finance/retirement-calculator'},
      {name:'Tax Calculator',icon:'📋',url:'calculators/finance/tax-calculator'},
      {name:'Salary Calculator',icon:'💼',url:'calculators/finance/salary-calculator'},
      {name:'Inflation Calculator',icon:'📊',url:'calculators/finance/inflation-calculator'},
      {name:'Investment Calculator',icon:'📈',url:'calculators/finance/investment-calculator'},
      {name:'Budget Calculator',icon:'📊',url:'calculators/finance/budget-calculator'},
      {name:'Net Worth Calculator',icon:'💰',url:'calculators/finance/net-worth-calculator'},
      {name:'ROI Calculator',icon:'📈',url:'calculators/finance/roi-calculator'},
      {name:'Down Payment Calculator',icon:'🏡',url:'calculators/finance/down-payment-calculator'},
      {name:'Debt Payoff Calculator',icon:'💳',url:'calculators/finance/debt-payoff-calculator'},
      {name:'Emergency Fund Calculator',icon:'🆘',url:'calculators/finance/emergency-fund-calculator'},
      {name:'401k Calculator',icon:'💼',url:'calculators/finance/401k-calculator'},
      {name:'Sales Tax Calculator',icon:'🧾',url:'calculators/finance/sales-tax-calculator'},
      {name:'APR Calculator',icon:'📑',url:'calculators/finance/apr-calculator'},
      {name:'Dividend Calculator',icon:'💵',url:'calculators/finance/dividend-calculator'},
      {name:'Currency Converter',icon:'💱',url:'calculators/finance/currency-converter'},
      {name:'PayPal Fee Calculator',icon:'💸',url:'calculators/finance/paypal-fee-calculator'},
      {name:'Hourly to Salary',icon:'⏰',url:'calculators/finance/hourly-to-salary-calculator'},
      {name:'Take Home Pay',icon:'💵',url:'calculators/finance/take-home-pay-calculator'},
      {name:'Roth IRA Calculator',icon:'💼',url:'calculators/finance/roth-ira-calculator'},
      {name:'CD Calculator',icon:'🏦',url:'calculators/finance/cd-calculator'},
      {name:'APY Calculator',icon:'📈',url:'calculators/finance/apy-calculator'},
      {name:'Rent vs Buy Calculator',icon:'⚖️',url:'calculators/finance/rent-vs-buy-calculator'},
      {name:'Home Affordability',icon:'🏡',url:'calculators/finance/home-affordability-calculator'},
      {name:'Stock Return Calculator',icon:'📊',url:'calculators/finance/stock-return-calculator'},
      {name:'Crypto Profit Calculator',icon:'₿',url:'calculators/finance/crypto-profit-calculator'},
      {name:'Freelancer Tax Calculator',icon:'📋',url:'calculators/finance/freelancer-tax-calculator'},
      {name:'Business Profit Calculator',icon:'💼',url:'calculators/finance/business-profit-calculator'},
      {name:'VAT Calculator',icon:'🧾',url:'calculators/finance/vat-calculator'},
      {name:'Social Security Calculator',icon:'🛡️',url:'calculators/finance/social-security-calculator'},
      {name:'Child Support Calculator',icon:'👶',url:'calculators/finance/child-support-calculator'},
      {name:'Alimony Calculator',icon:'💑',url:'calculators/finance/alimony-calculator'},
      {name:'College Savings Calculator',icon:'🎓',url:'calculators/finance/college-savings-calculator'},
      {name:'Break Even Calculator',icon:'⚖️',url:'calculators/finance/break-even-calculator'},
    ]
  },
  math: {
    label:'📐 Math & Statistics', color:'tag-math', icon:'icon-math',
    calcs:[
      {name:'Percentage Calculator',icon:'%',url:'calculators/math/percentage-calculator'},
      {name:'Fraction Calculator',icon:'½',url:'calculators/math/fraction-calculator'},
      {name:'Scientific Calculator',icon:'🔬',url:'calculators/math/scientific-calculator'},
      {name:'Average Calculator',icon:'📐',url:'calculators/math/average-calculator'},
      {name:'Ratio Calculator',icon:'⚖️',url:'calculators/math/ratio-calculator'},
      {name:'Probability Calculator',icon:'🎲',url:'calculators/math/probability-calculator'},
      {name:'Square Root Calculator',icon:'√',url:'calculators/math/square-root-calculator'},
      {name:'Exponent Calculator',icon:'📈',url:'calculators/math/exponent-calculator'},
      {name:'Logarithm Calculator',icon:'📊',url:'calculators/math/logarithm-calculator'},
      {name:'Quadratic Equation Solver',icon:'🔢',url:'calculators/math/quadratic-equation-calculator'},
      {name:'Triangle Calculator',icon:'🔺',url:'calculators/math/triangle-calculator'},
      {name:'Area Calculator',icon:'📐',url:'calculators/math/area-calculator'},
      {name:'Volume Calculator',icon:'🧊',url:'calculators/math/volume-calculator'},
      {name:'Standard Deviation Calculator',icon:'📉',url:'calculators/math/standard-deviation-calculator'},
      {name:'Roman Numeral Converter',icon:'🏛️',url:'calculators/math/roman-numeral-converter'},
      {name:'GCF Calculator',icon:'🔢',url:'calculators/math/gcf-calculator'},
      {name:'LCM Calculator',icon:'📐',url:'calculators/math/lcm-calculator'},
      {name:'Prime Number Checker',icon:'🔍',url:'calculators/math/prime-number-checker'},
      {name:'Factorial Calculator',icon:'❗',url:'calculators/math/factorial-calculator'},
      {name:'Permutation Calculator',icon:'🔀',url:'calculators/math/permutation-calculator'},
      {name:'Combination Calculator',icon:'🎯',url:'calculators/math/combination-calculator'},
      {name:'Matrix Calculator',icon:'🔲',url:'calculators/math/matrix-calculator'},
      {name:'Decimal to Fraction',icon:'½',url:'calculators/math/decimal-to-fraction-calculator'},
      {name:'Percentage Change',icon:'📈',url:'calculators/math/percentage-change-calculator'},
      {name:'Long Division Calculator',icon:'➗',url:'calculators/math/long-division-calculator'},
      {name:'Absolute Value Calculator',icon:'||',url:'calculators/math/absolute-value-calculator'},
      {name:'Rounding Calculator',icon:'🔢',url:'calculators/math/rounding-calculator'},
      {name:'Significant Figures',icon:'🔬',url:'calculators/math/significant-figures-calculator'},
      {name:'Median Calculator',icon:'📊',url:'calculators/math/median-calculator'},
      {name:'Variance Calculator',icon:'📉',url:'calculators/math/variance-calculator'},
    ]
  },
  datetime: {
    label:'📅 Date & Time', color:'tag-datetime', icon:'icon-datetime',
    calcs:[
      {name:'Age Calculator',icon:'🎂',url:'calculators/datetime/age-calculator'},
      {name:'Date Difference Calculator',icon:'📅',url:'calculators/datetime/date-difference-calculator'},
      {name:'Time Calculator',icon:'⏱️',url:'calculators/datetime/time-calculator'},
      {name:'Days Until Calculator',icon:'⏳',url:'calculators/datetime/days-until-calculator'},
      {name:'Workdays Calculator',icon:'💼',url:'calculators/datetime/workdays-calculator'},
      {name:'Time Zone Converter',icon:'🌍',url:'calculators/datetime/time-zone-converter'},
      {name:'Birthday Calculator',icon:'🎉',url:'calculators/datetime/birthday-calculator'},
      {name:'Unix Timestamp Converter',icon:'🖥️',url:'calculators/datetime/unix-timestamp-converter'},
      {name:'Week Number Calculator',icon:'📆',url:'calculators/datetime/week-number-calculator'},
      {name:'Leap Year Calculator',icon:'🗓️',url:'calculators/datetime/leap-year-calculator'},
      {name:'Day of Week Calculator',icon:'📋',url:'calculators/datetime/date-to-day-calculator'},
      {name:'Time Duration Calculator',icon:'⏰',url:'calculators/datetime/time-duration-calculator'},
      {name:'Month Calculator',icon:'📆',url:'calculators/datetime/month-calculator'},
      {name:'Year Calculator',icon:'📅',url:'calculators/datetime/year-calculator'},
    ]
  },
  housing: {
    label:'🏠 Housing & Building', color:'tag-housing', icon:'icon-housing',
    calcs:[
      {name:'Mortgage Calculator',icon:'🏠',url:'calculators/housing/mortgage-calculator'},
      {name:'Home Affordability Calculator',icon:'🏡',url:'calculators/housing/home-affordability-calculator'},
      {name:'Rent vs Buy Calculator',icon:'🔑',url:'calculators/housing/rent-vs-buy-calculator'},
      {name:'Property Tax Calculator',icon:'🧾',url:'calculators/housing/property-tax-calculator'},
      {name:'Down Payment Calculator',icon:'💰',url:'calculators/housing/down-payment-calculator'},
      {name:'Refinance Calculator',icon:'🔄',url:'calculators/housing/refinance-calculator'},
      {name:'Square Footage Calculator',icon:'📐',url:'calculators/housing/square-footage-calculator'},
      {name:'Rent Affordability Calculator',icon:'🏘️',url:'calculators/housing/rent-calculator'},
      {name:'Flooring Calculator',icon:'🧱',url:'calculators/housing/flooring-calculator'},
      {name:'Paint Calculator',icon:'🎨',url:'calculators/housing/paint-calculator'},
      {name:'Renovation Cost Calculator',icon:'🔨',url:'calculators/housing/renovation-cost-calculator'},
      {name:'Room Area Calculator',icon:'📏',url:'calculators/housing/room-area-calculator'},
      {name:'Fence Cost Calculator',icon:'🚧',url:'calculators/housing/fence-cost-calculator'},
      {name:'Home Equity Calculator',icon:'💎',url:'calculators/housing/home-equity-calculator'},
      {name:'Concrete Calculator',icon:'🏗️',url:'calculators/housing/concrete-calculator'},
      {name:'Roof Area Calculator',icon:'🏚️',url:'calculators/housing/roof-area-calculator'},
      {name:'Land Area Calculator',icon:'🌍',url:'calculators/housing/land-area-calculator'},
      {name:'Electricity Cost Calculator',icon:'⚡',url:'calculators/housing/electricity-cost-calculator'},
    ]
  },
  conversion: {
    label:'📏 Measurements & Conversions', color:'tag-conversion', icon:'icon-conversion',
    calcs:[
      {name:'Length Converter',icon:'📏',url:'calculators/measurements/length-converter'},
      {name:'Weight Converter',icon:'⚖️',url:'calculators/measurements/weight-converter'},
      {name:'Temperature Converter',icon:'🌡️',url:'calculators/measurements/temperature-converter'},
      {name:'Volume Converter',icon:'🥄',url:'calculators/measurements/volume-converter'},
      {name:'Speed Converter',icon:'🚀',url:'calculators/measurements/speed-converter'},
      {name:'Area Converter',icon:'📐',url:'calculators/measurements/area-converter'},
      {name:'Pressure Converter',icon:'💨',url:'calculators/measurements/pressure-converter'},
      {name:'Energy Converter',icon:'⚡',url:'calculators/measurements/energy-converter'},
      {name:'Power Converter',icon:'💪',url:'calculators/measurements/power-converter'},
      {name:'Data Storage Converter',icon:'💾',url:'calculators/measurements/data-storage-converter'},
      {name:'Time Converter',icon:'⏱️',url:'calculators/measurements/time-converter'},
      {name:'Angle Converter',icon:'📐',url:'calculators/measurements/angle-converter'},
      {name:'Fuel Economy Converter',icon:'⛽',url:'calculators/measurements/fuel-economy-converter'},
      {name:'Cooking Measurement Converter',icon:'🍳',url:'calculators/measurements/cooking-measurement-converter'},
      {name:'Shoe Size Converter',icon:'👟',url:'calculators/measurements/shoe-size-converter'},
      {name:'Clothing Size Converter',icon:'👕',url:'calculators/measurements/clothing-size-converter'},
      {name:'Number System Converter',icon:'🔢',url:'calculators/measurements/number-system-converter'},
      {name:'Currency Converter',icon:'💱',url:'calculators/measurements/currency-converter'},
      {name:'Roman Numeral Converter',icon:'🏛️',url:'calculators/measurements/roman-numeral-converter'},
      {name:'Torque Converter',icon:'🔧',url:'calculators/measurements/torque-converter'},
    ]
  },
  electronics: {
    label:'⚡ Electronics & Engineering', color:'tag-electronics', icon:'icon-electronics',
    calcs:[
      {name:"Ohm's Law Calculator",icon:'⚡',url:'calculators/electronics/ohms-law-calculator'},
      {name:'Resistor Color Code Calculator',icon:'🎨',url:'calculators/electronics/resistor-color-code-calculator'},
      {name:'Battery Life Calculator',icon:'🔋',url:'calculators/electronics/battery-life-calculator'},
      {name:'Power Calculator',icon:'🔌',url:'calculators/electronics/power-calculator'},
      {name:'LED Resistor Calculator',icon:'💡',url:'calculators/electronics/led-resistor-calculator'},
      {name:'Frequency Calculator',icon:'📡',url:'calculators/electronics/frequency-calculator'},
      {name:'Capacitor Calculator',icon:'⚙️',url:'calculators/electronics/capacitor-calculator'},
      {name:'Inductor Calculator',icon:'🔁',url:'calculators/electronics/inductor-calculator'},
      {name:'Voltage Divider Calculator',icon:'🔽',url:'calculators/electronics/voltage-divider-calculator'},
      {name:'Transformer Calculator',icon:'🔄',url:'calculators/electronics/transformer-calculator'},
      {name:'Wire Gauge Calculator',icon:'🔧',url:'calculators/electronics/wire-gauge-calculator'},
      {name:'Solar Panel Calculator',icon:'☀️',url:'calculators/electronics/solar-panel-calculator'},
      {name:'Three Phase Power Calculator',icon:'⚡',url:'calculators/electronics/three-phase-power-calculator'},
      {name:'Decibel Calculator',icon:'🔊',url:'calculators/electronics/decibel-calculator'},
      {name:'RC Time Constant Calculator',icon:'⏱️',url:'calculators/electronics/rc-time-constant-calculator'},
    ]
  },
  internet: {
    label:'🌐 Internet & Technology', color:'tag-internet', icon:'icon-internet',
    calcs:[
      {name:'Internet Speed Calculator',icon:'🌐',url:'calculators/internet/internet-speed-calculator'},
      {name:'Download Time Calculator',icon:'⬇️',url:'calculators/internet/download-time-calculator'},
      {name:'Bandwidth Calculator',icon:'📊',url:'calculators/internet/bandwidth-calculator'},
      {name:'IP Subnet Calculator',icon:'🔗',url:'calculators/internet/ip-subnet-calculator'},
      {name:'Data Usage Calculator',icon:'📡',url:'calculators/internet/data-usage-calculator'},
      {name:'Email Size Calculator',icon:'📧',url:'calculators/internet/email-size-calculator'},
      {name:'Cloud Storage Calculator',icon:'☁️',url:'calculators/internet/cloud-storage-calculator'},
      {name:'Ping & Latency Calculator',icon:'🏓',url:'calculators/internet/ping-latency-calculator'},
      {name:'VPN Speed Calculator',icon:'🔒',url:'calculators/internet/vpn-speed-calculator'},
      {name:'Streaming Quality Calculator',icon:'📺',url:'calculators/internet/streaming-quality-calculator'},
      {name:'Server Uptime Calculator',icon:'🖥️',url:'calculators/internet/server-uptime-calculator'},
      {name:'Website Load Time Calculator',icon:'⚡',url:'calculators/internet/website-load-time-calculator'},
    ]
  },
  education: {
    label:'🎓 Education & School', color:'tag-education', icon:'icon-education',
    calcs:[
      {name:'GPA Calculator',icon:'🎓',url:'calculators/education/gpa-calculator'},
      {name:'Grade Calculator',icon:'📊',url:'calculators/education/grade-calculator'},
      {name:'Final Grade Calculator',icon:'🏁',url:'calculators/education/final-grade-calculator'},
      {name:'Percentage Grade Calculator',icon:'📝',url:'calculators/education/percentage-grade-calculator'},
      {name:'CGPA Calculator',icon:'📈',url:'calculators/education/cgpa-calculator'},
      {name:'Test Score Calculator',icon:'✏️',url:'calculators/education/test-score-calculator'},
      {name:'Study Hours Calculator',icon:'⏱️',url:'calculators/education/study-hours-calculator'},
      {name:'Reading Speed Calculator',icon:'📖',url:'calculators/education/reading-speed-calculator'},
      {name:'College Cost Calculator',icon:'🏫',url:'calculators/education/college-cost-calculator'},
      {name:'Student Loan Calculator',icon:'💰',url:'calculators/education/student-loan-calculator'},
      {name:'Scholarship Calculator',icon:'🏅',url:'calculators/education/scholarship-calculator'},
      {name:'SAT Score Calculator',icon:'📋',url:'calculators/education/sat-score-calculator'},
      {name:'ACT Score Calculator',icon:'📋',url:'calculators/education/act-score-calculator'},
      {name:'Class Rank Calculator',icon:'🏆',url:'calculators/education/class-rank-calculator'},
      {name:'Attendance Calculator',icon:'📅',url:'calculators/education/attendance-calculator'},
    ]
  },
  weather: {
    label:'🌤️ Weather & Nature', color:'tag-weather', icon:'icon-weather',
    calcs:[
      {name:'Heat Index Calculator',icon:'🌡️',url:'calculators/weather/heat-index-calculator'},
      {name:'Wind Chill Calculator',icon:'🌬️',url:'calculators/weather/wind-chill-calculator'},
      {name:'Dew Point Calculator',icon:'💧',url:'calculators/weather/dew-point-calculator'},
      {name:'UV Index Calculator',icon:'☀️',url:'calculators/weather/uv-index-calculator'},
      {name:'Rainfall Calculator',icon:'🌧️',url:'calculators/weather/rainfall-calculator'},
      {name:'Snowfall Calculator',icon:'❄️',url:'calculators/weather/snowfall-calculator'},
      {name:'Humidity Calculator',icon:'💨',url:'calculators/weather/humidity-calculator'},
      {name:'Lightning Distance Calculator',icon:'⚡',url:'calculators/weather/severe-weather-calculator'},
    ]
  },
  transportation: {
    label:'🚗 Transportation & Travel', color:'tag-transport', icon:'icon-transport',
    calcs:[
      {name:'Fuel Cost Calculator',icon:'⛽',url:'calculators/transportation/fuel-cost-calculator'},
      {name:'MPG Calculator',icon:'📊',url:'calculators/transportation/mpg-calculator'},
      {name:'Road Trip Cost Calculator',icon:'🛣️',url:'calculators/transportation/road-trip-cost-calculator'},
      {name:'Car Depreciation Calculator',icon:'📉',url:'calculators/transportation/car-depreciation-calculator'},
      {name:'EV Savings Calculator',icon:'🔋',url:'calculators/transportation/ev-savings-calculator'},
      {name:'Commute Cost Calculator',icon:'🏙️',url:'calculators/transportation/commute-cost-calculator'},
      {name:'Speed Distance Time',icon:'⏱️',url:'calculators/transportation/speed-distance-time-calculator'},
      {name:'Car Payment Calculator',icon:'💳',url:'calculators/transportation/car-payment-calculator'},
      {name:'Tire Size Calculator',icon:'🔵',url:'calculators/transportation/tire-size-calculator'},
      {name:'Flight Time Calculator',icon:'✈️',url:'calculators/transportation/flight-time-calculator'},
      {name:'Parking Cost Calculator',icon:'🅿️',url:'calculators/transportation/parking-cost-calculator'},
      {name:'Toll Cost Calculator',icon:'🛣️',url:'calculators/transportation/toll-cost-calculator'},
      {name:'Bike Pace Calculator',icon:'🚴',url:'calculators/transportation/bike-pace-calculator'},
      {name:'Distance Calculator',icon:'📍',url:'calculators/transportation/distance-calculator'},
      {name:'Moving Cost Calculator',icon:'📦',url:'calculators/transportation/moving-cost-calculator'},
    ]
  },
  food: {
    label:'🍕 Food & Cooking', color:'tag-food', icon:'icon-food',
    calcs:[
      {name:'Recipe Scaler',icon:'🍽️',url:'calculators/food/recipe-scaler'},
      {name:'Cooking Conversion Calculator',icon:'🔄',url:'calculators/food/cooking-conversion-calculator'},
      {name:'Food Cost Calculator',icon:'💰',url:'calculators/food/food-cost-calculator'},
      {name:'Cooking Time Calculator',icon:'⏱️',url:'calculators/food/cooking-time-calculator'},
      {name:'Nutrition Calculator',icon:'🥗',url:'calculators/food/nutrition-calculator'},
      {name:'Tip Calculator',icon:'🧾',url:'calculators/food/tip-calculator'},
      {name:'Alcohol Unit Calculator',icon:'🍺',url:'calculators/food/alcohol-unit-calculator'},
      {name:'Caffeine Calculator',icon:'☕',url:'calculators/food/coffee-caffeine-calculator'},
      {name:'Baking Substitution Calculator',icon:'🧁',url:'calculators/food/baking-substitution-calculator'},
      {name:'Calorie Burn Calculator',icon:'🔥',url:'calculators/food/calorie-burn-calculator'},
    ]
  },
  business: {
    label:'💼 Business & Entrepreneurship', color:'tag-business', icon:'icon-business',
    calcs:[
      {name:'ROI Calculator',icon:'📈',url:'calculators/business/roi-calculator'},
      {name:'Break Even Calculator',icon:'⚖️',url:'calculators/business/break-even-calculator'},
      {name:'Profit Margin Calculator',icon:'💹',url:'calculators/business/profit-margin-calculator'},
      {name:'Markup Calculator',icon:'🏷️',url:'calculators/business/markup-calculator'},
      {name:'Discount Calculator',icon:'🎯',url:'calculators/business/discount-calculator'},
      {name:'Sales Tax Calculator',icon:'🧾',url:'calculators/business/sales-tax-calculator'},
      {name:'Invoice Calculator',icon:'📄',url:'calculators/business/invoice-calculator'},
      {name:'Freelance Rate Calculator',icon:'💻',url:'calculators/business/freelance-rate-calculator'},
      {name:'CAC Calculator',icon:'📊',url:'calculators/business/cac-calculator'},
      {name:'LTV Calculator',icon:'♾️',url:'calculators/business/ltv-calculator'},
      {name:'Burn Rate Calculator',icon:'🔥',url:'calculators/business/burn-rate-calculator'},
      {name:'COGS Calculator',icon:'📦',url:'calculators/business/cogs-calculator'},
      {name:'Employee Cost Calculator',icon:'👥',url:'calculators/business/employee-cost-calculator'},
      {name:'Ecommerce Profit Calculator',icon:'🛒',url:'calculators/business/ecommerce-profit-calculator'},
      {name:'Business Loan Calculator',icon:'🏦',url:'calculators/business/business-loan-calculator'},
      {name:'Wholesale Price Calculator',icon:'🏭',url:'calculators/business/wholesale-price-calculator'},
      {name:'Startup Valuation Calculator',icon:'🚀',url:'calculators/business/startup-valuation-calculator'},
      {name:'Business Revenue Calculator',icon:'💰',url:'calculators/business/business-revenue-calculator'},
      {name:'Payroll Calculator',icon:'💵',url:'calculators/business/payroll-calculator'},
      {name:'Shrinkage Calculator',icon:'📉',url:'calculators/business/shrinkage-calculator'},
    ]
  },
  science: {
    label:'⚗️ Science & Chemistry', color:'tag-science', icon:'icon-science',
    calcs:[
      {name:'Molecular Weight Calculator',icon:'🧬',url:'calculators/science/molecular-weight-calculator'},
      {name:'Molarity Calculator',icon:'⚗️',url:'calculators/science/molarity-calculator'},
      {name:'pH Calculator',icon:'🧪',url:'calculators/science/ph-calculator'},
      {name:'Ideal Gas Law Calculator',icon:'💨',url:'calculators/science/ideal-gas-law-calculator'},
      {name:'Density Calculator',icon:'⚖️',url:'calculators/science/density-calculator'},
      {name:'Half-Life Calculator',icon:'☢️',url:'calculators/science/half-life-calculator'},
      {name:'Specific Heat Calculator',icon:'🌡️',url:'calculators/science/specific-heat-calculator'},
      {name:'Percent Yield Calculator',icon:'📊',url:'calculators/science/percent-yield-calculator'},
      {name:'Stoichiometry Calculator',icon:'⚙️',url:'calculators/science/stoichiometry-calculator'},
      {name:'Buffer Calculator',icon:'🔬',url:'calculators/science/buffer-calculator'},
      {name:'Concentration Calculator',icon:'💧',url:'calculators/science/concentration-calculator'},
      {name:'Osmolarity Calculator',icon:'🩺',url:'calculators/science/osmolarity-calculator'},
      {name:'Boiling Point Calculator',icon:'🫧',url:'calculators/science/boiling-point-calculator'},
      {name:'Empirical Formula Calculator',icon:'🔭',url:'calculators/science/empirical-formula-calculator'},
      {name:"Ohm's Law Calculator",icon:'⚡',url:'calculators/science/ohms-law-calculator'},
    ]
  },
  physics: {
    label:'🔭 Physics', color:'tag-physics', icon:'icon-physics',
    calcs:[
      {name:'Velocity Calculator',icon:'🏃',url:'calculators/physics/velocity-calculator'},
      {name:'Acceleration Calculator',icon:'🚀',url:'calculators/physics/acceleration-calculator'},
      {name:'Force Calculator',icon:'💪',url:'calculators/physics/force-calculator'},
      {name:'Momentum Calculator',icon:'🎱',url:'calculators/physics/momentum-calculator'},
      {name:'Kinetic Energy Calculator',icon:'⚡',url:'calculators/physics/kinetic-energy-calculator'},
      {name:'Potential Energy Calculator',icon:'🏔️',url:'calculators/physics/potential-energy-calculator'},
      {name:'Work Energy Calculator',icon:'🔧',url:'calculators/physics/work-energy-calculator'},
      {name:'Power Calculator',icon:'💡',url:'calculators/physics/power-calculator'},
      {name:'Projectile Motion Calculator',icon:'🎯',url:'calculators/physics/projectile-motion-calculator'},
      {name:'Free Fall Calculator',icon:'🪂',url:'calculators/physics/free-fall-calculator'},
      {name:'Gravitational Force Calculator',icon:'🌍',url:'calculators/physics/gravitational-force-calculator'},
      {name:'Circular Motion Calculator',icon:'🔄',url:'calculators/physics/circular-motion-calculator'},
      {name:'Wave Frequency Calculator',icon:'🌊',url:'calculators/physics/wave-frequency-calculator'},
      {name:'Pressure Calculator',icon:'🗜️',url:'calculators/physics/pressure-calculator'},
      {name:'Torque Calculator',icon:'⚙️',url:'calculators/physics/torque-calculator'},
    ]
  },
  environment: {
    label:'🌱 Environment', color:'tag-env', icon:'icon-env',
    calcs:[
      {name:'Carbon Footprint Calculator',icon:'&#127807;',url:'calculators/environment/carbon-footprint-calculator'},
      {name:'Solar Panel Calculator',icon:'&#9728;&#65039;',url:'calculators/environment/solar-panel-calculator'},
      {name:'Water Usage Calculator',icon:'&#128167;',url:'calculators/environment/water-usage-calculator'},
      {name:'Energy Consumption Calculator',icon:'&#9889;',url:'calculators/environment/energy-consumption-calculator'},
      {name:'Tree Planting Calculator',icon:'&#127795;',url:'calculators/environment/tree-planting-calculator'},
      {name:'Recycling Savings Calculator',icon:'&#9851;&#65039;',url:'calculators/environment/recycling-savings-calculator'},
      {name:'EV Savings Calculator',icon:'&#128664;',url:'calculators/environment/electric-vehicle-savings-calculator'},
      {name:'Air Quality Index Calculator',icon:'&#127807;',url:'calculators/environment/air-quality-index-calculator'},
    ]
  },
  entertainment: {
    label:'🎲 Entertainment', color:'tag-ent', icon:'icon-ent',
    calcs:[
      {name:'Movie Ticket Calculator',icon:'&#127916;',url:'calculators/entertainment/movie-ticket-price-calculator'},
      {name:'Streaming Cost Calculator',icon:'&#128250;',url:'calculators/entertainment/streaming-cost-calculator'},
      {name:'Gaming PC Build Calculator',icon:'&#127918;',url:'calculators/entertainment/gaming-pc-build-calculator'},
      {name:'Concert Ticket Calculator',icon:'&#127927;',url:'calculators/entertainment/concert-ticket-calculator'},
      {name:'Book Reading Time Calculator',icon:'&#128214;',url:'calculators/entertainment/book-reading-time-calculator'},
      {name:'Spotify Listening Stats',icon:'&#127925;',url:'calculators/entertainment/spotify-listening-stats-calculator'},
      {name:'Video Game Hours Calculator',icon:'&#127918;',url:'calculators/entertainment/video-game-hours-calculator'},
      {name:'Party Planning Calculator',icon:'&#127882;',url:'calculators/entertainment/party-planning-calculator'},
      {name:'Vacation Entertainment Budget',icon:'&#9992;&#65039;',url:'calculators/entertainment/travel-entertainment-calculator'},
      {name:'Podcast Length Calculator',icon:'&#127911;',url:'calculators/entertainment/podcast-length-calculator'},
    ]
  },
  engineering: {
    label:'&#127959;&#65039; Engineering', color:'tag-eng', icon:'icon-eng',
    calcs:[
      {name:'Beam Load Calculator',icon:'&#127959;&#65039;',url:'calculators/engineering/beam-load-calculator'},
      {name:'Concrete Mix Calculator',icon:'&#128296;',url:'calculators/engineering/concrete-mix-calculator'},
      {name:'Pipe Flow Calculator',icon:'&#128262;',url:'calculators/engineering/pipe-flow-calculator'},
      {name:'Gear Ratio Calculator',icon:'&#9881;&#65039;',url:'calculators/engineering/gear-ratio-calculator'},
      {name:'Electrical Load Calculator',icon:'&#9889;',url:'calculators/engineering/electrical-load-calculator'},
      {name:'HVAC Load Calculator',icon:'&#10052;&#65039;',url:'calculators/engineering/hvac-load-calculator'},
      {name:'Structural Steel Calculator',icon:'&#127959;&#65039;',url:'calculators/engineering/structural-steel-calculator'},
      {name:'Pump Calculator',icon:'&#128260;',url:'calculators/engineering/pump-calculator'},
      {name:'Bolt Torque Calculator',icon:'&#128295;',url:'calculators/engineering/bolt-torque-calculator'},
      {name:'Heat Transfer Calculator',icon:'&#127777;&#65039;',url:'calculators/engineering/heat-transfer-calculator'},
      {name:'Signal-to-Noise Calculator',icon:'&#128246;',url:'calculators/engineering/signal-to-noise-calculator'},
      {name:'Reynolds Number Calculator',icon:'&#128336;',url:'calculators/engineering/reynolds-number-calculator'},
    ]
  },
  geography: {
    label:'&#127760; Geography', color:'tag-geo', icon:'icon-geo',
    calcs:[
      {name:'Distance Between Cities',icon:'&#127760;',url:'calculators/geography/distance-between-cities-calculator'},
      {name:'Latitude Longitude Calc',icon:'&#128205;',url:'calculators/geography/latitude-longitude-calculator'},
      {name:'Time Zone Difference',icon:'&#128336;',url:'calculators/geography/time-zone-difference-calculator'},
      {name:'Map Scale Calculator',icon:'&#128506;',url:'calculators/geography/map-scale-calculator'},
      {name:'Elevation Grade Calc',icon:'&#9968;&#65039;',url:'calculators/geography/elevation-grade-calculator'},
      {name:'Country Statistics Calc',icon:'&#127988;',url:'calculators/geography/country-area-population-calculator'},
    ]
  },
  baby: {
    label:'&#128118; Baby & Parenting', color:'tag-baby', icon:'icon-baby',
    calcs:[
      {name:'Due Date Calculator',icon:'&#128118;',url:'calculators/baby/due-date-calculator'},
      {name:'Baby Weight Percentile',icon:'&#9878;&#65039;',url:'calculators/baby/baby-weight-percentile-calculator'},
      {name:'Baby Feeding Calculator',icon:'&#127868;',url:'calculators/baby/baby-feeding-calculator'},
      {name:'Diaper Cost Calculator',icon:'&#129529;',url:'calculators/baby/diaper-cost-calculator'},
      {name:'Baby Sleep Calculator',icon:'&#128564;',url:'calculators/baby/baby-sleep-calculator'},
      {name:'Child Height Predictor',icon:'&#128200;',url:'calculators/baby/child-height-predictor-calculator'},
      {name:'Childcare Cost Calculator',icon:'&#127968;',url:'calculators/baby/childcare-cost-calculator'},
      {name:'Baby Name Popularity',icon:'&#127775;',url:'calculators/baby/baby-name-popularity-calculator'},
    ]
  }
};

// Flatten all calcs for search
const ALL_CALCS = Object.entries(CALC_DATA).flatMap(([cat, data]) =>
  data.calcs.map(c => ({...c, cat: cat, catLabel: data.label}))
);

function renderNav(activePage=''){
  const base=getBasePath();
  const path=typeof window!=='undefined'?window.location.pathname:'';
  const isHome=activePage==='home'||path===base;
  const isCalc=activePage==='calculators'||path.indexOf(base+'calculators')===0;
  const isBlog=activePage==='blog'||path.indexOf(base+'pages/blog')===0;
  const isAbout=activePage==='about'||path.indexOf(base+'pages/about')===0;
  const cur=(on)=>on?'aria-current="page" class="active"':'';
  document.getElementById('site-nav').innerHTML=`
<nav class="nav" role="navigation" aria-label="Main navigation">
  <div class="container">
    <div class="nav-inner">
      <a href="${base}" class="logo" aria-label="CalcDigi Home">
        <span class="logo-mark">CalcDigi<span class="logo-dot"></span></span>
      </a>

      <ul class="nav-links" role="list">
        <li><a href="${base}" ${cur(isHome)}>Home</a></li>
        <li><a href="${base}calculators" class="nav-calc-link${isCalc?' active':''}" ${isCalc?'aria-current="page"':''}>Calculators</a></li>
        <li><a href="${base}pages/blog" ${cur(isBlog)}>Blog</a></li>
        <li><a href="${base}pages/about" ${cur(isAbout)}>About</a></li>
      </ul>

      <div class="nav-right">
        <button class="dark-toggle" id="dark-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">🌙</button>
        <button class="ai-btn" id="ai-fab-nav" aria-label="Open AI Assistant">
          <span class="ai-btn-pulse"></span> AI
        </button>
        <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</nav>

<!-- MEGA MENU PANEL -->
<div class="mega-panel" id="mega-panel" style="display:none;">
  <div class="mega-panel-inner">

    <!-- Search inside mega menu -->
    <div class="mega-search-wrap">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--c-ink3);pointer-events:none;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="search" id="mega-search" placeholder="Search all calculators…" autocomplete="off" aria-label="Search calculators">
      <div class="mega-search-results" id="mega-search-results"></div>
    </div>

    <!-- Category Sidebar + Content -->
    <div class="mega-body">
      <!-- Left: Category List -->
      <div class="mega-cats">
        <div class="mega-cat-item active" data-cat="health" onclick="switchMegaCat(this,'health')">
          <span>🩺</span> Health & Fitness
          <span class="mega-cat-count">35</span>
        </div>
        <div class="mega-cat-item" data-cat="finance" onclick="switchMegaCat(this,'finance')">
          <span>💰</span> Finance & Money
          <span class="mega-cat-count">40</span>
        </div>
        <div class="mega-cat-item" data-cat="math" onclick="switchMegaCat(this,'math')">
          <span>📐</span> Math & Statistics
          <span class="mega-cat-count">30</span>
        </div>
        <div class="mega-cat-item" data-cat="datetime" onclick="switchMegaCat(this,'datetime')">
          <span>📅</span> Date & Time
          <span class="mega-cat-count">14</span>
        </div>
        <div class="mega-cat-item" data-cat="housing" onclick="switchMegaCat(this,'housing')">
          <span>🏠</span> Housing & Building
          <span class="mega-cat-count">18</span>
        </div>
        <div class="mega-cat-item" data-cat="conversion" onclick="switchMegaCat(this,'conversion')">
          <span>📏</span> Measurements
          <span class="mega-cat-count">20</span>
        </div>
        <div class="mega-cat-item" data-cat="electronics" onclick="switchMegaCat(this,'electronics')">
          <span>⚡</span> Electronics
          <span class="mega-cat-count">15</span>
        </div>

        <div class="mega-cat-item" data-cat="internet" onclick="switchMegaCat(this,'internet')">
          <span>🌐</span> Internet & Tech
          <span class="mega-cat-count">12</span>
        </div>
        <div class="mega-cat-item" data-cat="education" onclick="switchMegaCat(this,'education')">
          <span>🎓</span> Education
          <span class="mega-cat-count">15</span>
        </div>
        <div class="mega-cat-item" data-cat="weather" onclick="switchMegaCat(this,'weather')">
          <span>🌤️</span> Weather
          <span class="mega-cat-count">8</span>
        </div>
        <div class="mega-cat-item" data-cat="transportation" onclick="switchMegaCat(this,'transportation')">
          <span>🚗</span> Transportation
          <span class="mega-cat-count">15</span>
        </div>
        <div class="mega-cat-item" data-cat="food" onclick="switchMegaCat(this,'food')">
          <span>🍕</span> Food & Cooking
          <span class="mega-cat-count">10</span>
        </div>
        <div class="mega-cat-item" data-cat="business" onclick="switchMegaCat(this,'business')">
          <span>💼</span> Business
          <span class="mega-cat-count">20</span>
        </div>
        <div class="mega-cat-item" data-cat="science" onclick="switchMegaCat(this,'science')">
          <span>⚗️</span> Science
          <span class="mega-cat-count">15</span>
        </div>
        <div class="mega-cat-item" data-cat="physics" onclick="switchMegaCat(this,'physics')">
          <span>🔭</span> Physics
          <span class="mega-cat-count">15</span>
        </div>
        <div class="mega-cat-item" data-cat="environment" onclick="switchMegaCat(this,'environment')">
          <span>🌱</span> Environment
          <span class="mega-cat-count">8</span>
        </div>
        <div class="mega-cat-item" data-cat="entertainment" onclick="switchMegaCat(this,'entertainment')">
          <span>&#127918;</span> Entertainment
          <span class="mega-cat-count">10</span>
        </div>
        <div class="mega-cat-item" data-cat="engineering" onclick="switchMegaCat(this,'engineering')">
          <span>&#127959;&#65039;</span> Engineering
          <span class="mega-cat-count">12</span>
        </div>
        <div class="mega-cat-item" data-cat="geography" onclick="switchMegaCat(this,'geography')"><span>&#127760;</span> Geography<span class="mega-cat-count">6</span></div>
        <div class="mega-cat-item" data-cat="baby" onclick="switchMegaCat(this,'baby')"><span>&#128118;</span> Baby &amp; Parenting<span class="mega-cat-count">8</span></div>
      </div>

      <!-- Right: Calculators Grid -->
      <div class="mega-calcs-wrap">
        <div class="mega-calcs-header" id="mega-calcs-header">
          <span id="mega-cat-title">🩺 Health & Fitness</span>
          <span id="mega-cat-count-label" style="font-size:12px;color:var(--c-ink3);">35 calculators</span>
        </div>
        <div class="mega-calcs-grid" id="mega-calcs-grid"></div>
        <a href="#" id="mega-view-all" class="mega-view-all-btn">View All Health Calculators →</a>
      </div>
    </div>
  </div>
</div>
<div class="mega-overlay" id="mega-overlay" onclick="closeMega()"></div>

<!-- Mobile Nav -->
<div class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Mobile navigation">
  <a href="${base}">🏠 Home</a>
  <a href="${base}calculators">🧮 All Calculators</a>
  <a href="${base}pages/health">🩺 Health Calculators</a>
  <a href="${base}calculators/finance/mortgage-calculator">💰 Finance Calculators</a>
  <a href="${base}calculators/math/percentage-calculator">📐 Math Calculators</a>
  <a href="${base}pages/blog">📖 Blog</a>
  <a href="${base}pages/about">ℹ️ About Us</a>
  <a href="${base}pages/contact">📧 Contact</a>
  <a href="${base}pages/privacy-policy">🔒 Privacy Policy</a>
</div>

<!-- AI Assistant Panel -->
<div class="ai-assistant-panel" id="ai-panel" role="dialog" aria-label="AI Calculator Assistant">
  <div class="ai-panel-header">
    <div class="ai-panel-title"><span>✨</span> CalcDigi AI Assistant</div>
    <button class="ai-panel-close" id="ai-panel-close" aria-label="Close AI panel">✕</button>
  </div>
  <div class="ai-panel-messages" id="ai-panel-messages">
    <div class="ai-msg bot">Hi! I'm your CalcDigi AI assistant. Ask me anything about calculations, finance, health metrics, or math concepts. I can also explain your results!</div>
  </div>
  <div class="ai-panel-input">
    <input type="text" id="ai-panel-input" placeholder="Ask me anything…" aria-label="AI chat input">
    <button class="ai-send-btn" id="ai-send-btn" aria-label="Send message">➤</button>
  </div>
</div>

<!-- Toast -->
<div class="toast" id="toast"></div>`;

  // Render default category (health)
  setTimeout(()=>{
    renderMegaCalcs('health', base);
  }, 0);
}

function toggleMega(e){
  e.preventDefault();
  const panel=document.getElementById('mega-panel');
  const overlay=document.getElementById('mega-overlay');
  const isOpen=panel.style.display!=='none';
  if(isOpen){closeMega();}
  else{
    panel.style.display='block';
    overlay.style.display='block';
    document.body.style.overflow='hidden';
  }
}

function closeMega(){
  const panel=document.getElementById('mega-panel');
  const overlay=document.getElementById('mega-overlay');
  if(panel)panel.style.display='none';
  if(overlay)overlay.style.display='none';
  document.body.style.overflow='';
}

function switchMegaCat(el, cat){
  // Remove active from all
  document.querySelectorAll('.mega-cat-item').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
  const base=getBasePath();
  renderMegaCalcs(cat, base);
}

function renderMegaCalcs(cat, base){
  const grid=document.getElementById('mega-calcs-grid');
  const title=document.getElementById('mega-cat-title');
  const countLabel=document.getElementById('mega-cat-count-label');
  const viewAllBtn=document.getElementById('mega-view-all');
  if(!grid)return;
  const data=CALC_DATA[cat];
  if(!data){
    grid.innerHTML=`<div style="padding:40px;text-align:center;color:var(--c-ink3);font-size:14px;">🚧 Coming Soon!<br><span style="font-size:12px;">These calculators are being built.</span></div>`;
    if(title)title.textContent='Coming Soon';
    if(countLabel)countLabel.textContent='';
    if(viewAllBtn)viewAllBtn.style.display='none';
    return;
  }
  if(title)title.textContent=data.label;
  if(countLabel)countLabel.textContent=data.calcs.length+' calculators';
  if(viewAllBtn){
    viewAllBtn.style.display='flex';
    viewAllBtn.textContent='View All '+data.label.replace(/^[^ ]+ /,'')+' →';
    const catPageMap={
      health:'pages/health',
      finance:'pages/finance',
      math:'pages/math',
      datetime:'pages/datetime',
      housing:'pages/housing',
      measurements:'pages/measurements',
      electronics:'pages/electronics',
      internet:'pages/internet',
      education:'pages/education',
      weather:'pages/weather',
      transportation:'pages/transportation',
      food:'pages/food',
      business:'pages/business',
      science:'pages/science',
      physics:'pages/physics',
      environment:'pages/environment',
      entertainment:'pages/entertainment',
      engineering:'pages/engineering',
    geography:'pages/geography',
      baby:'pages/baby',};
    viewAllBtn.href=catPageMap[cat]?base+catPageMap[cat]:base+'#calculators';
  }
  grid.innerHTML=data.calcs.map(c=>`
    <a href="${base}${c.url}" class="mega-calc-item" onclick="closeMega()">
      <span class="mega-calc-icon">${c.icon}</span>
      <span class="mega-calc-name">${c.name}</span>
    </a>
  `).join('');
}

// Mega search
function initMegaSearch(){
  const input=document.getElementById('mega-search');
  const results=document.getElementById('mega-search-results');
  if(!input||!results)return;
  const base=getBasePath();
  input.addEventListener('input',function(){
    const q=this.value.trim().toLowerCase();
    if(q.length<2){results.style.display='none';return;}
    const matches=ALL_CALCS.filter(c=>c.name.toLowerCase().includes(q)||c.catLabel.toLowerCase().includes(q));
    if(matches.length===0){
      results.innerHTML='<div class="mega-sr-item" style="color:var(--c-ink3);">No calculators found</div>';
      results.style.display='block';return;
    }
    results.innerHTML=matches.slice(0,10).map(c=>`
      <a class="mega-sr-item" href="${base}${c.url}" onclick="closeMega()">
        <span class="mega-sr-icon">${c.icon}</span>
        <div>
          <div class="mega-sr-name">${c.name}</div>
          <div class="mega-sr-cat">${c.catLabel}</div>
        </div>
      </a>`).join('');
    results.style.display='block';
  });
  document.addEventListener('click',e=>{
    if(!input.contains(e.target)&&!results.contains(e.target))results.style.display='none';
  });
}

function renderFooter(){
  const base=getBasePath();
  document.getElementById('site-footer').innerHTML=`
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo"><span class="logo-mark" style="color:#fff">CalcDigi<span class="logo-dot"></span></span></div>
        <p>Free, accurate, and AI-powered calculators for health, finance, and math. Trusted by Americans for smarter everyday decisions.</p>
        <div style="display:flex;gap:12px;margin-top:16px;">
          <a href="${base}pages/about" style="font-size:12px;color:rgba(255,255,255,0.5);">About</a>
          <a href="${base}pages/contact" style="font-size:12px;color:rgba(255,255,255,0.5);">Contact</a>
          <a href="${base}sitemap.xml" style="font-size:12px;color:rgba(255,255,255,0.5);">Sitemap</a>
        </div>
      </div>
      <div>
        <h4>Health</h4>
        <ul>
          <li><a href="${base}calculators/health/bmi-calculator">BMI Calculator</a></li>
          <li><a href="${base}calculators/health/calorie-calculator">Calorie Calculator</a></li>
          <li><a href="${base}calculators/health/tdee-calculator">TDEE Calculator</a></li>
          <li><a href="${base}calculators/health/macro-calculator">Macro Calculator</a></li>
          <li><a href="${base}calculators/health/bmr-calculator">BMR Calculator</a></li>
          <li><a href="${base}calculators/health/weight-loss-calculator">Weight Loss</a></li>
          <li><a href="${base}calculators/health/body-fat-calculator">Body Fat</a></li>
          <li><a href="${base}pages/health">→ All 35 Health Calculators</a></li>
        </ul>
      </div>
      <div>
        <h4>Finance</h4>
        <ul>
          <li><a href="${base}calculators/finance/mortgage-calculator">Mortgage Calculator</a></li>
          <li><a href="${base}calculators/finance/loan-calculator">Loan Calculator</a></li>
          <li><a href="${base}calculators/finance/tax-calculator">Tax Calculator</a></li>
          <li><a href="${base}calculators/finance/compound-interest-calculator">Compound Interest</a></li>
          <li><a href="${base}calculators/finance/retirement-calculator">Retirement</a></li>
          <li><a href="${base}calculators/finance/salary-calculator">Salary Calculator</a></li>
          <li><a href="${base}pages/finance">→ All 40 Finance Calculators</a></li>
        </ul>
      </div>
      <div>
        <h4>Math</h4>
        <ul>
          <li><a href="${base}calculators/math/percentage-calculator">Percentage Calculator</a></li>
          <li><a href="${base}calculators/math/fraction-calculator">Fraction Calculator</a></li>
          <li><a href="${base}calculators/math/scientific-calculator">Scientific Calculator</a></li>
          <li><a href="${base}calculators/math/average-calculator">Average Calculator</a></li>
          <li><a href="${base}calculators/math/probability-calculator">Probability Calculator</a></li>
          <li><a href="${base}pages/math">→ All 30 Math Calculators</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="${base}pages/about">About Us</a></li>
          <li><a href="${base}pages/contact">Contact</a></li>
          <li><a href="${base}pages/blog">Blog</a></li>
          <li><a href="${base}pages/privacy-policy">Privacy Policy</a></li>
          <li><a href="${base}pages/terms-of-service">Terms of Service</a></li>
          <li><a href="${base}pages/disclaimer">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;margin-top:8px;">
      <div style="display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:rgba(255,255,255,0.4);">🔒 SSL Secure</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:rgba(255,255,255,0.4);">✓ No Sign-Up Required</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:rgba(255,255,255,0.4);">🧠 AI-Powered Insights</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:rgba(255,255,255,0.4);">📱 Mobile Friendly</div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} CalcDigi. All rights reserved. Results are for informational purposes only.</p>
      <div class="footer-bottom-links">
        <a href="${base}pages/privacy-policy">Privacy</a>
        <a href="${base}pages/terms-of-service">Terms</a>
        <a href="${base}pages/disclaimer">Disclaimer</a>
        <a href="${base}pages/contact">Contact</a>
      </div>
    </div>
  </div>
</footer>
<div class="cookie-banner" id="cookie-banner" role="alertdialog">
  <p>🍪 We use cookies to improve your experience and analyze traffic. <a href="${base}pages/privacy-policy" style="color:#6ee7b7;text-decoration:underline">Learn more</a></p>
  <div class="cookie-actions">
    <button class="cookie-decline" id="cookie-decline">Decline</button>
    <button class="cookie-accept" id="cookie-accept">Accept All</button>
  </div>
</div>
<button class="back-top" id="back-top" aria-label="Back to top">↑</button>`;
}
