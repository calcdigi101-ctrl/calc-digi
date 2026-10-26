import type { Metadata } from "next";
import Link from "next/link";
import IpSubnetCalculatorComponent from "@/components/calcs/internet/ip-subnet-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { IpSubnetAddressSpaceDistributionChart } from "@/components/flagship/internet/editorial-charts";

const PATH = "/calculators/internet/ip-subnet-calculator";
const TITLE = "IP Subnet Calculator | IPv4 CIDR Prefix, Netmask & Host Range";
const DESCRIPTION =
  "Calculate IPv4 CIDR subnet masks, usable host IP address ranges, broadcast addresses, wildcard masks, and binary network boundary allocations.";

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
  { href: "/calculators/internet/bandwidth-calculator", icon: "📊", name: "Bandwidth Calc" },
  { href: "/calculators/internet/ping-latency-calculator", icon: "⚡", name: "Ping & Latency" },
  { href: "/calculators/internet/server-uptime-calculator", icon: "⏱️", name: "Server Uptime" },
  { href: "/calculators/internet/website-load-time-calculator", icon: "🚀", name: "Website Load Time" },
  { href: "/calculators/internet/vpn-speed-calculator", icon: "🛡️", name: "VPN Speed" },
  { href: "/calculators/internet/internet-speed-calculator", icon: "🌐", name: "Internet Speed" },
];

const FAQ_ITEMS = [
  {
    q: "What is Classless Inter-Domain Routing (CIDR) notation?",
    a: "Classless Inter-Domain Routing (CIDR) represents an IPv4 subnet mask by appending a forward slash followed by the count of contiguous leading network bits (e.g. /24). In an IPv4 address comprising 32 binary bits, a /24 prefix indicates that the first 24 bits designate the network prefix (255.255.255.0), leaving the remaining 8 bits to identify individual host endpoints.",
  },
  {
    q: "Why are two IP addresses subtracted when calculating usable host capacity?",
    a: "In standard IPv4 subnets, the very first address (where all host bits are binary 0) is reserved to identify the Network Address itself, and the very last address (where all host bits are binary 1) is reserved as the Subnet Directed Broadcast Address. Consequently, usable host capacity is strictly formulated as 2^(32 - prefix) - 2.",
  },
  {
    q: "What is a /30 subnet and why is it used for router point-to-point links?",
    a: "A /30 subnet possesses exactly 2 host bits (2^2 = 4 total addresses). Subtracting the reserved network and broadcast addresses leaves exactly 2 usable host IP addresses. Network engineers historically provisioned /30 subnets for serial point-to-point interconnection links between adjacent enterprise core routers to eliminate wasted IP space.",
  },
  {
    q: "What are the three official RFC 1918 Private IPv4 address blocks?",
    a: "Under IETF RFC 1918, three IPv4 ranges are reserved for unrouted private local area networks: Class A (10.0.0.0/8 providing 16,777,214 hosts), Class B (172.16.0.0/12 providing 1,048,574 hosts), and Class C (192.168.0.0/16 providing 65,534 hosts across 256 /24 subnets). These private addresses connect to the global internet via Network Address Translation (NAT).",
  },
];

export default function IpSubnetCalculatorPage() {
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
            <strong>Quick Networking Guidance:</strong> IPv4 subnetting partitions contiguous 32-bit address spaces into hierarchically organized sub-networks using Classless Inter-Domain Routing (CIDR) masks. By calculating usable host capacities, broadcast boundaries, and dotted-decimal netmasks, this tool simplifies IP address management (IPAM) for enterprise systems. Allocate office bandwidth using our <Link href="/calculators/internet/bandwidth-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">bandwidth calculator</Link> and monitor router response times with our <Link href="/calculators/internet/ping-latency-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">ping latency calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: IPv4 CIDR Subnet Scaling & Usable Host Capacity Distribution
          </h2>
          <IpSubnetAddressSpaceDistributionChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Subnetting forms the foundational bedrock of modern internet routing protocols and local area network (LAN) segmentation. Without hierarchical subnetting, internet routers would be forced to maintain routing table entries for over four billion individual endpoints, causing immediate global router memory exhaustion. Subnet math operates through precise binary boolean logic, mirroring mathematical frameworks found in our <Link href="/calculators/internet/server-uptime-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">server uptime calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Binary Host Bit Allocation & Netmasks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An IPv4 address consists of exactly 32 bits grouped into four 8-bit octets (<Formula>{"32 \\text{ bits total}"}</Formula>). Let <Formula>{"P"}</Formula> represent the CIDR prefix length (<Formula>{"1 \\le P \\le 30"}</Formula>). The number of remaining host bits (<Formula>{"H"}</Formula>) is defined as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"H = 32 - P"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The total number of IP addresses contained within the subnet block (<Formula>{"N_{\\text{total}}"}</Formula>) scales as a power of 2:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"N_{\\text{total}} = 2^H = 2^{32 - P}"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because the first address is reserved as the Network ID and the final address is reserved for Subnet Broadcast, the number of usable host IP addresses (<Formula>{"N_{\\text{usable}}"}</Formula>) available for assignment to physical computers, servers, and interfaces is:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"N_{\\text{usable}} = 2^{32 - P} - 2 \\quad (\\text{for } P \\le 30)"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Network engineers calculate wildcard masks by subtracting each octet of the subnet mask from 255. Wildcard masks are essential for configuring Access Control Lists (ACLs) and OSPF routing areas, which protect web servers analyzed in our <Link href="/calculators/internet/website-load-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">website load time calculator</Link>. Users connecting remote subnets via encrypted tunnels can model encapsulation overhead in our <Link href="/calculators/internet/vpn-speed-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">vpn speed calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Standard IPv4 Subnetting Reference Matrix (/24 to /30)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following table displays common CIDR prefix lengths, corresponding dotted-decimal subnet masks, wildcard masks, total address space, and usable host capacity:
          </p>

          <DataTable
            head={["CIDR Prefix", "Subnet Mask (Dotted Decimal)", "Wildcard Mask", "Total Addresses", "Usable Host Addresses", "Standard Network Application"]}
            rows={[
              ["/24", "255.255.255.0", "0.0.0.255", "256", "254 Hosts", "Standard Departmental Office LAN"],
              ["/25", "255.255.255.128", "0.0.0.127", "128", "126 Hosts", "Medium Branch Office Segment"],
              ["/26", "255.255.255.192", "0.0.0.63", "64", "62 Hosts", "Security DMZ / Server Subnet"],
              ["/27", "255.255.255.224", "0.0.0.31", "32", "30 Hosts", "Management VLAN / IP Cameras"],
              ["/28", "255.255.255.240", "0.0.0.15", "16", "14 Hosts", "Small Server Cluster / SAN"],
              ["/29", "255.255.255.248", "0.0.0.7", "8", "6 Hosts", "Public ISP Static IP Block"],
              ["/30", "255.255.255.252", "0.0.0.3", "4", "2 Hosts", "Point-to-Point Router Interconnect"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Engineering Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: Enterprise Corporate Campus VLAN Segmentation
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A network administrator is assigned the private network block 192.168.10.0/24. The organization requires three isolated Virtual Local Area Networks (VLANs): Corporate Staff (needs 100 hosts), Engineering Lab (needs 50 hosts), and VoIP Telephony (needs 25 hosts).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Applying Variable Length Subnet Masking (VLSM): Corporate Staff requires a /25 subnet (<Formula>{"2^7 - 2 = 126 \\text{ hosts}"}</Formula>), assigned 192.168.10.0/25 (usable 192.168.10.1 to 192.168.10.126). The second half (192.168.10.128) is partitioned further: Engineering Lab takes a /26 subnet (<Formula>{"2^6 - 2 = 62 \\text{ hosts}"}</Formula>), assigned 192.168.10.128/26 (usable 192.168.10.129 to 192.168.10.190). VoIP Telephony takes a /27 subnet (<Formula>{"2^5 - 2 = 30 \\text{ hosts}"}</Formula>), assigned 192.168.10.192/27 (usable 192.168.10.193 to 192.168.10.222). Exactly 32 addresses remain unallocated for future expansion, achieving 100% address conservation without IP collision. Evaluating internet speed across these VLANs is conducted in our <Link href="/calculators/internet/internet-speed-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">internet speed calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: Public Cloud Virtual Private Cloud (VPC) CIDR Sizing
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A DevOps engineer architects an Amazon Web Services (AWS) VPC. The cloud architect provisions a 10.0.0.0/16 base CIDR block, planning four availability zones with public web subnets and private database tiers.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Crucially, AWS reserves the first four IP addresses and the last IP address of every subnet for internal infrastructure (Network ID, VPC Router, DNS Resolver, Future Use, and Broadcast). Thus, a /24 subnet in AWS provides <Formula>{"256 - 5 = 251 \\text{ usable IPs}"}</Formula> rather than standard on-premise 254. By calculating subnet allocations in advance, the engineer avoids subnet exhaustion when autoscaling container clusters, ensuring seamless communication across database storage calculated in our <Link href="/calculators/internet/cloud-storage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">cloud storage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Depletion of IPv4 & The Transition to IPv6 (128-Bit Addressing)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The global pool of unallocated 32-bit IPv4 addresses managed by the Internet Assigned Numbers Authority (IANA) was officially exhausted in 2011. To preserve the scalability of the global digital economy, network engineers developed Carrier-Grade NAT (CGNAT) and accelerated the global transition to Internet Protocol version 6 (IPv6).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            IPv6 replaces 32-bit dotted-decimal addresses with 128-bit hexadecimal strings, expanding global address capacity from 4.3 billion to an astronomical 340 undecillion (<Formula>{"3.4 \\times 10^{38}"}</Formula>) unique endpoints. In IPv6, the standard end-user local subnet is a /64, providing <Formula>{"2^{64} = 18.4 \\text{ quintillion}"}</Formula> addresses on every single local LAN segment, rendering address scarcity and complex NAT traversal obsolete.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative IP Addressing Standards & Global Registry Organizations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Global IP address distribution, autonomous system numbering, and subnetting RFC specifications are coordinated by international governing bodies:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Internet Assigned Numbers Authority (IANA):</strong> Master authority overseeing the global allocation of IPv4/IPv6 address blocks and autonomous system numbers (ASNs).
            </li>
            <li>
              <strong>Regional Internet Registries (RIRs - ARIN, RIPE NCC, APNIC, LACNIC, AFRINIC):</strong> Non-profit regional organizations managing IP allocation and BGP routing integrity across their respective continents.
            </li>
            <li>
              <strong>Internet Engineering Task Force (IETF RFC 4632):</strong> The formal specification defining Classless Inter-domain Routing (CIDR) architecture and address assignment strategies.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Subnetting Best Practices: Supernetting & Route Summarization
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In enterprise wide-area networks (WANs), network architects utilize Route Summarization (also known as Supernetting) to collapse multiple contiguous subnets into a single aggregated route advertisement. For example, four /24 subnets (192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, and 192.168.3.0/24) can be summarized into a single /22 prefix (192.168.0.0/22).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Route summarization reduces routing table recalculation overhead in Border Gateway Protocol (BGP) and OSPF routers, stabilizing network convergence times and preventing route flapping from degrading enterprise performance.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            DHCP Scope Planning & Static IP Exclusion Reserves
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When configuring Dynamic Host Configuration Protocol (DHCP) servers on a local subnet, network administrators must establish structured address exclusion zones. Assigning the entire usable host pool to dynamic DHCP leasing introduces severe IP conflict risks with critical network infrastructure.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Industry standard practice reserves the initial 10 to 30 IP addresses on every subnet for default gateways, managed switches, enterprise access points, and physical servers. Reserving the final 10 IP addresses for network printers and out-of-band management interfaces ensures orderly IPAM administration across campus environments.
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering IPv4 binary arithmetic, CIDR prefix masks, and host capacity formulas empowers network engineers to design robust, scalable telecommunication architectures.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By structuring IP subnets with mathematical precision, organizations eliminate address waste, streamline routing efficiency, and safeguard critical enterprise infrastructure.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Carrier-Grade NAT (CGNAT) & RFC 6598 Shared Address Space (100.64.0.0/10)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Due to the complete exhaustion of public IPv4 addresses, modern residential broadband providers (particularly mobile 5G home internet and rural fiber operators) implement Carrier-Grade Network Address Translation (CGNAT). Under CGNAT, the ISP assigns customer routers private non-routable IP addresses drawn from the RFC 6598 Shared Address Space (100.64.0.0/10 block, containing 4,194,304 addresses).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Hundreds of distinct customer households share a single public IPv4 address, multiplexed through dynamic port translation. While CGNAT conserves scarce IPv4 blocks, it introduces severe architectural obstacles for self-hosted home servers, peer-to-peer gaming, and port forwarding. Network engineers evaluate monthly data consumption across CGNAT gateways using our <Link href="/calculators/internet/data-usage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">data usage calculator</Link> and benchmark file transfer times via our <Link href="/calculators/internet/download-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">download time calculator</Link>.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Variable Length Subnet Masking (VLSM) Design Principles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Enterprise network architecture relies on Variable Length Subnet Masking (VLSM) to prevent catastrophic IP address waste. Rather than applying a uniform /24 mask across all organizational branches, VLSM allows engineers to tailor subnet boundaries to exact endpoint populations. Large headquarters campuses receive /22 blocks, regional branches receive /26 blocks, and point-to-point router links utilize tight /30 or /31 subnets.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering binary CIDR calculations enables systems administrators to structure corporate infrastructure with maximum scalability and uncompromised security.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Supernetting & Classless Inter-Domain Routing (CIDR) Aggregation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Supernetting represents the inverse operation of sub-networking, combining contiguous smaller network blocks into a single consolidated routing table entry. For example, aggregating four contiguous /24 subnets (such as 192.168.0.0/24 through 192.168.3.0/24) produces a unified /22 route prefix with a subnet mask of 255.255.252.0. Route summarization significantly decreases the memory footprint and CPU processing burdens on core autonomous system routers, preventing routing table fragmentation across modern Internet exchange backbones.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Subnet planning also dictates broadcast domain boundaries within switched Ethernet environments. Containing broadcast traffic within localized subnets minimizes network chatter and protects network infrastructure from broadcast storms.
          </p>

</>
      }
    >
      <IpSubnetCalculatorComponent />
    </CalcPage>
  );
}
