import type { Metadata } from "next";
import Link from "next/link";
import ServerUptimeCalculatorComponent from "@/components/calcs/internet/server-uptime-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ServerUptimeNinesDowntimeChart } from "@/components/flagship/internet/editorial-charts";

const PATH = "/calculators/internet/server-uptime-calculator";
const TITLE = "Server Uptime Calculator | High Availability SLA Downtime Budget";
const DESCRIPTION =
  "Calculate permitted server downtime across 99%, 99.9%, 99.99%, and 99.999% SLA availability tiers. Model daily, monthly, and annual outage budgets.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const RELATED_CALCULATORS = [
  { href: "/calculators/internet/website-load-time-calculator", icon: "🚀", name: "Website Load Time" },
  { href: "/calculators/internet/ping-latency-calculator", icon: "⚡", name: "Ping & Latency" },
  { href: "/calculators/internet/cloud-storage-calculator", icon: "☁️", name: "Cloud Storage" },
  { href: "/calculators/internet/ip-subnet-calculator", icon: "🔢", name: "IP Subnet" },
  { href: "/calculators/internet/bandwidth-calculator", icon: "📊", name: "Bandwidth Calc" },
  { href: "/calculators/internet/internet-speed-calculator", icon: "🌐", name: "Internet Speed" },
];

const FAQ_ITEMS = [
  {
    q: "What does 'Five Nines' (99.999%) availability mean in enterprise computing?",
    a: "Five Nines (99.999%) is the gold standard for mission-critical enterprise systems (telecommunications backbones, hospital health records, financial payment gateways). A 99.999% SLA permits a total annual unscheduled downtime of only 5 minutes and 15 seconds across the entire year (or approximately 25.9 seconds per month), requiring fully redundant active-active multi-region failover infrastructure.",
  },
  {
    q: "What is the difference between planned maintenance and unscheduled downtime in SLAs?",
    a: "Service Level Agreements (SLAs) typically distinguish between Planned Maintenance Windows (pre-scheduled maintenance during off-peak hours with advance customer notice) and Unscheduled Outages (unexpected hardware failures, DDoS attacks, database corruptions). Many enterprise contracts exclude agreed-upon planned maintenance from SLA penalty calculations.",
  },
  {
    q: "What are SLA financial penalty credits?",
    a: "When a cloud hosting provider or SaaS vendor breaches its contractual availability guarantee (e.g. dropping to 99.7% against a 99.9% commitment), the agreement mandates financial reimbursement termed 'Service Credits'. Customers typically receive a 10% to 50% discount or credit on their subsequent monthly invoice, scaling with the severity of the outage.",
  },
  {
    q: "What architectural patterns are required to achieve Four Nines (99.99%) availability?",
    a: "Four Nines permits just 4.32 minutes of downtime per month (52.6 minutes per year). Achieving this requires eliminating all Single Points of Failure (SPOFs) via redundant load balancers, multi-availability zone database replication with automated health-check failover, stateless microservices containers, and blue-green deployment pipelines.",
  },
];

export default function ServerUptimeCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/internet", label: "Internet & Technology" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <strong>Quick Uptime Guidance:</strong> High Availability (HA) Service Level Agreements govern cloud reliability by defining permissible system downtime across daily, monthly, and annual operational periods. By calculating the exact minutes and seconds of allowable outage across industry 'Nines of Availability' (99.0% to 99.999%), this tool establishes precise engineering error budgets. Measure web application responsiveness with our <Link href="/calculators/internet/website-load-time-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">website load time calculator</Link> and monitor network round-trip response via our <Link href="/calculators/internet/ping-latency-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">ping latency calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: High Availability SLAs: Permitted Monthly Downtime Budget (Minutes)
          </h2>
          <ServerUptimeNinesDowntimeChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern cloud architecture, digital system downtime translates directly into catastrophic corporate revenue loss, regulatory penalties, and brand destruction. When enterprise software, e-commerce checkouts, or banking APIs fail, every elapsed minute carries massive financial liability. Understanding how small decimal fractions in an SLA impact permitted outage minutes is essential for Site Reliability Engineers (SREs). Sizing multi-region storage backups is explored in our <Link href="/calculators/internet/cloud-storage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">cloud storage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Availability Percentages & Error Budgets
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            System Availability (<Formula>{"A"}</Formula>) is mathematically defined as the ratio of total operational uptime (<Formula>{"T_{\\text{up}}"}</Formula>) to total elapsed time (<Formula>{"T_{\\text{total}}"}</Formula>):
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"A = \\left( \\frac{T_{\\text{up}}}{T_{\\text{total}}} \\right) \\times 100 = \\left( \\frac{T_{\\text{total}} - T_{\\text{down}}}{T_{\\text{total}}} \\right) \\times 100"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"S"}</Formula> denote the contracted SLA availability percentage (e.g. <Formula>{"S = 99.9\\%"}</Formula>). The permitted downtime fraction (<Formula>{"F_{\\text{down}}"}</Formula>) is:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"F_{\\text{down}} = \\frac{100 - S}{100}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Across standard non-leap temporal periods—where an annual year contains 8,760 hours (31,536,000 seconds), an average month contains 720 hours (2,592,000 seconds), and a week contains 168 hours (604,800 seconds)—the permitted downtime allowances are:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"D_{\\text{annual (hrs)}} = 8,760 \\times F_{\\text{down}}"}</Formula>
          </div>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"D_{\\text{monthly (min)}} = \\frac{2,592,000 \\times F_{\\text{down}}}{60} = 43,200 \\times F_{\\text{down}}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Network architects structuring high-availability router subnets can calculate host allocations via our <Link href="/calculators/internet/ip-subnet-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ip subnet calculator</Link>. Sizing data backup bandwidth pipelines is managed in our <Link href="/calculators/internet/bandwidth-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">bandwidth calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            High Availability SLA Nines Reference Matrix: Permitted Outage Windows
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following table displays permitted downtime allowances across standard industry availability tiers from Two Nines (99%) to Five Nines (99.999%):
          </p>

          <DataTable
            head={["Availability SLA Tier", "Daily Downtime", "Weekly Downtime", "Monthly Downtime", "Annual Downtime", "Infrastructure Complexity"]}
            rows={[
              ["99.0% (Two Nines)", "14.4 minutes", "1.68 hours", "7.20 hours", "3.65 days", "Single Server / Basic Cloud VM"],
              ["99.5% (Two and a Half)", "7.2 minutes", "50.4 minutes", "3.60 hours", "1.83 days", "Automated Daily Backups"],
              ["99.9% (Three Nines - SaaS)", "1.44 minutes", "10.08 minutes", "43.2 minutes", "8.76 hours", "Redundant VMs & Auto-Restart"],
              ["99.95% (High Tier Cloud)", "43.2 seconds", "5.04 minutes", "21.6 minutes", "4.38 hours", "Multi-AZ Cloud Load Balancer"],
              ["99.99% (Four Nines - Enterprise)", "8.64 seconds", "1.01 minutes", "4.32 minutes", "52.6 minutes", "Active-Passive Automated Failover"],
              ["99.999% (Five Nines - Mission Critical)", "0.86 seconds", "6.05 seconds", "25.9 seconds", "5.26 minutes", "Active-Active Multi-Region Zero SPOF"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Engineering Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: E-Commerce Black Friday 99.9% vs 99.99% Cost-Benefit Analysis
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An e-commerce retailer generates $120,000 per hour ($2,000/minute) in gross merchandise volume during Q4 holiday shopping. The company evaluates two hosting architectures: Standard Multi-AZ Cloud with a 99.9% SLA vs Multi-Region Active-Active with a 99.99% SLA.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under 99.9% (Three Nines), the permitted annual downtime is 8.76 hours (525.6 minutes), representing potential revenue at risk of <Formula>{"525.6 \\times \\$2,000 = \\$1,051,200"}</Formula>. Under 99.99% (Four Nines), annual downtime shrinks to 52.6 minutes, reducing revenue at risk to <Formula>{"52.6 \\times \\$2,000 = \\$105,200"}</Formula>—a net risk reduction of $946,000. Because upgrading to a multi-region active-active deployment costs $60,000 annually in additional cloud infrastructure, the business case yields a 15x return on investment. Web performance can be audited via our <Link href="/calculators/internet/website-load-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">website load time calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: SaaS Provider SLA Breach & Customer Credit Exposure
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A B2B enterprise SaaS vendor contracts a 99.95% monthly uptime commitment with 200 corporate clients, each paying $5,000/month ($1,000,000 monthly revenue). The SLA promises a 25% credit if uptime drops below 99.95%, and a 50% credit if uptime drops below 99.5%. A 99.95% monthly SLA permits maximum 21.6 minutes of downtime.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            During a flawed database migration, the production cluster crashes for 2 hours and 15 minutes (135 minutes), achieving only <Formula>{"(43,200 - 135) / 43,200 = 99.69\\%"}</Formula> monthly availability. Because availability fell below 99.95%, the vendor must issue a 25% refund credit to all 200 accounts, resulting in an immediate $250,000 financial write-off. Adopting canary deployment pipelines completely mitigates this exposure. Broadband transfer speeds during database restores can be verified in our <Link href="/calculators/internet/internet-speed-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">internet speed calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Site Reliability Engineering (SRE): Error Budgets & The MTBF / MTTR Equation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern Site Reliability Engineering, pioneered by Google, re-frames availability through the concept of the &lsquo;Error Budget.&rsquo; Rather than striving for an impossible 100% uptime, an organization with a 99.9% SLA treats the 0.1% allowable downtime (43.2 minutes per month) as a budget to spend on innovation, feature deployments, and infrastructure refactoring.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mathematically, availability is governed by Mean Time Between Failures (<Formula>{"\\text{MTBF}"}</Formula>) and Mean Time to Repair (<Formula>{"\\text{MTTR}"}</Formula>):
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"A = \\left( \\frac{\\text{MTBF}}{\\text{MTBF} + \\text{MTTR}} \\right) \\times 100"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To increase availability from Three Nines to Four Nines, engineering teams can either double MTBF (preventing failures through exhaustive testing) or dramatically shrink MTTR (recovering from failures within seconds using automated container healing).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative High-Availability Standards & Operational Frameworks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Data center tier classifications, high-availability SLA definitions, and business continuity metrics are defined by international industry authorities:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Uptime Institute (Tier Standard: Topology):</strong> Global benchmark classifying data center physical infrastructure from Tier I (99.671%) to Tier IV (99.995% fault tolerant).
            </li>
            <li>
              <strong>ISO/IEC 20000-1:</strong> International standard for Information Technology Service Management (ITSM), specifying service level management and incident resolution compliance.
            </li>
            <li>
              <strong>Information Technology Infrastructure Library (ITIL v4):</strong> Best-practice framework governing change management, service continuity, and availability engineering.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Chaos Engineering: Verifying High Availability Before Outages Strike
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Achieving Four or Five Nines availability cannot rely on theoretical architecture diagrams alone. Resilient engineering teams practice Chaos Engineering (pioneered by Netflix Chaos Monkey), deliberately injecting automated failures into live production environments—such as abruptly terminating database instances, severing network connections between cloud regions, and inducing latency spikes.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By proving that automated load balancers and container orchestrators (Kubernetes) reroute live production traffic within seconds without human intervention, organizations build verified confidence in their contractual SLA guarantees.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Synthetic Monitoring vs Real User Monitoring (RUM) SLA Verification
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To legally enforce or prove SLA compliance, organizations implement dual monitoring strategies. Synthetic Monitoring deploys automated headless browser agents across global data centers, pinging server API health-check endpoints every 30 to 60 seconds to detect partial regional outages.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Simultaneously, Real User Monitoring (RUM) embeds JavaScript telemetry inside client applications, tracking actual HTTP error rates experienced by real human visitors. Combining both datasets eliminates blind spots, ensuring precise, unassailable uptime reporting.
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering the mathematics of server uptime and SLA downtime budgets empowers technology executives and engineering teams to design resilient systems that protect corporate revenue.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By eliminating single points of failure and tracking error budgets proactively, digital organizations deliver dependable, world-class availability to global users.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The CAP Theorem Trade-Offs & Distributed Database Consensus
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Architecting systems for Five Nines availability requires navigating the fundamental constraints of distributed systems engineering, encapsulated by Eric Brewer&apos;s CAP Theorem. The theorem proves that a distributed data store can simultaneously guarantee at most two out of three core properties: Consistency (every read receives the most recent write), Availability (every request receives a non-error response), and Partition Tolerance (the system continues operating despite arbitrary network packet loss).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To achieve high availability across geographically isolated cloud regions, systems adopt &lsquo;AP&rsquo; architectures (Eventual Consistency) using distributed consensus algorithms like Raft or Multi-Paxos. By allowing local replicas to serve customer requests during transatlantic fiber cuts, organizations maintain 99.999% availability while synchronizing database states asynchronously. Monitoring data consumption during background database replication is calculated in our <Link href="/calculators/internet/data-usage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">data usage calculator</Link> and file transfer durations via our <Link href="/calculators/internet/download-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">download time calculator</Link>.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Canary Releases & Blue-Green Zero-Downtime Deployment Patterns
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Software updates represent the primary trigger for catastrophic enterprise outages. To maintain strict Four and Five Nines SLAs, high-performing DevOps teams eliminate maintenance windows entirely by utilizing Blue-Green and Canary deployment pipelines. Under Blue-Green patterns, two identical production environments exist simultaneously: live traffic routes to &lsquo;Blue&rsquo; while new software builds deploy to &lsquo;Green.&rsquo;
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Once automated integration tests pass, load balancers switch 100% of incoming traffic to Green in milliseconds. If unexpected runtime exceptions occur, traffic instantly reverts to Blue with zero customer-facing downtime, preserving organizational SLA compliance and protecting customer trust.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Disaster Recovery Objectives: RPO and RTO Architecture Calibration
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Achieving rigorous server uptime metrics requires establishing Recovery Point Objectives (RPO) and Recovery Time Objectives (RTO). RPO dictates the maximum permissible data loss measured in time, while RTO specifies the duration required to restore operational service following an infrastructure outage. Architecting multi-region active-active clusters with automated DNS failover enables enterprises to meet sub-minute RTO and RPO targets, shielding business continuity from catastrophic regional cloud failures.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Implementing real-time synthetic monitoring probes across diverse geographic regions guarantees rapid anomaly detection before outages impact end users.
          </p>

</>
      }
    >
      <ServerUptimeCalculatorComponent />
    </CalcPage>
  );
}
