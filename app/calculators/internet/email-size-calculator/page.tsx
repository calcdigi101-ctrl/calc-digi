import type { Metadata } from "next";
import Link from "next/link";
import EmailSizeCalculatorComponent from "@/components/calcs/internet/email-size-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { EmailPayloadBase64ExpansionChart } from "@/components/flagship/internet/editorial-charts";

const PATH = "/calculators/internet/email-size-calculator";
const TITLE = "Email Size Calculator | MIME Base64 Overhead & Attachment Limits";
const DESCRIPTION =
  "Calculate total email payload size, 33% Base64 MIME encoding overhead, attachment limits (25 MB Gmail/Outlook), and bounce rate risks.";

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
  { href: "/calculators/internet/data-usage-calculator", icon: "📡", name: "Data Usage" },
  { href: "/calculators/internet/cloud-storage-calculator", icon: "☁️", name: "Cloud Storage" },
  { href: "/calculators/internet/bandwidth-calculator", icon: "📊", name: "Bandwidth Calc" },
  { href: "/calculators/internet/download-time-calculator", icon: "⏱️", name: "Download Time" },
  { href: "/calculators/internet/website-load-time-calculator", icon: "🚀", name: "Website Load Time" },
  { href: "/calculators/internet/server-uptime-calculator", icon: "⏱️", name: "Server Uptime" },
];

const FAQ_ITEMS = [
  {
    q: "Why do email attachments expand in size when sent over SMTP?",
    a: "The Simple Mail Transfer Protocol (SMTP) was historically architected in 1982 to transmit only 7-bit ASCII plain text. To transmit binary files (PDFs, images, ZIP archives), email clients must encode binary data into ASCII characters using Base64 encoding. Base64 maps 3 binary bytes (24 bits) into 4 ASCII characters (32 bits), introducing an unavoidable 33.33% mathematical size expansion over the wire.",
  },
  {
    q: "What is the true maximum file attachment size for Gmail and Google Workspace?",
    a: "While Google advertises a 25 MB email limit, this limit applies to the total encoded MIME wire payload, not the raw files on your hard drive. Because of Base64 expansion and MIME headers, the maximum raw file size you can attach without bouncing is approximately 18.0 to 18.5 MB. Attaching a 20 MB PDF will expand to 26.7 MB and be rejected by Gmail servers.",
  },
  {
    q: "What is the attachment size limit for Microsoft Outlook and Exchange?",
    a: "Microsoft Outlook and Office 365 default to a 20 MB message size ceiling (expandable to 150 MB by enterprise Exchange administrators). Factoring in 33% Base64 expansion, the maximum safe raw attachment size on default Microsoft accounts is approximately 14.5 MB.",
  },
  {
    q: "How does recipient mail server policy cause email bounces even if the sender allows it?",
    a: "Email transmission requires end-to-end consensus: if your corporate server allows 50 MB messages, but your client's receiving mail server enforces a strict 20 MB threshold, the recipient's Mail Transfer Agent (MTA) will reject the message with an SMTP 552 5.3.4 'Message size exceeds fixed maximum message size' bounce error.",
  },
];

export default function EmailSizeCalculatorPage() {
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
            <strong>Quick Email Guidance:</strong> Calculating email transmission safety requires evaluating the 33.33% Base64 MIME encoding expansion that occurs when binary attachments (PDFs, images, spreadsheets) traverse SMTP mail servers. By calculating your exact wire payload against provider limits (25 MB Gmail, 20 MB Outlook), this tool prevents undeliverable bounce rejections. Manage large digital archives with our <Link href="/calculators/internet/cloud-storage-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">cloud storage calculator</Link> and monitor monthly data quotas using our <Link href="/calculators/internet/data-usage-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">data usage calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Visual Analysis: Email Attachment MIME Expansion: Raw Disk Size vs Transmitted Wire Payload
          </h2>
          <EmailPayloadBase64ExpansionChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Electronic mail remains the undisputed transactional backbone of global commerce, legal document execution, and corporate communication. However, millions of high-priority business proposals, legal contracts, and architectural pitch decks bounce daily due to silent message size truncation. Senders frequently attach a 21 MB PDF assuming it fits comfortably under Gmail&apos;s 25 MB limit, unaware of the underlying transport protocol math. Sizing internet payloads utilizes transfer kinetics similar to those in our <Link href="/calculators/internet/download-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">download time calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            First-Principles Mathematical Formulations: Base64 MIME Encoding Expansion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under the Multipurpose Internet Mail Extensions (MIME) standard codified in RFC 2045, binary octets cannot traverse 7-bit ASCII SMTP channels natively. The Base64 algorithm groups 8-bit binary input octets into 24-bit buffers, dividing each buffer into four 6-bit chunks (<Formula>{"4 \\times 6 = 24 \\text{ bits}"}</Formula>). Each 6-bit chunk maps to a printable ASCII symbol. The theoretical expansion ratio (<Formula>{"\\rho_{\\text{base64}}"}</Formula>) is:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"\\rho_{\\text{base64}} = \\frac{4 \\text{ output bytes}}{3 \\text{ input bytes}} = 1.3333 \\quad (+33.33\\%)"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Let <Formula>{"S_{\\text{raw}}"}</Formula> denote the sum of raw binary file attachments on disk in Megabytes, and let <Formula>{"S_{\\text{body}}"}</Formula> represent the HTML body and inline CSS signatures. Accounting for MIME boundary delimiters, Content-Type headers, and newline characters (CRLF added every 76 characters), the total wire payload (<Formula>{"P_{\\text{wire}}"}</Formula>) in Megabytes is formulated as:
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"P_{\\text{wire}} = (S_{\\text{raw}} \\times 1.3333) + S_{\\text{body}} + 0.05"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To determine the maximum safe raw attachment size (<Formula>{"S_{\\text{safe}}"}</Formula>) that can be attached without exceeding a provider&apos;s published ceiling (<Formula>{"L_{\\text{provider}}"}</Formula>):
          </p>

          <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-mono text-sm dark:border-slate-800 dark:bg-slate-900/40">
            <Formula>{"S_{\\text{safe}} = \\frac{L_{\\text{provider}} - S_{\\text{body}} - 0.05}{1.3333} \\approx (L_{\\text{provider}} \\times 0.74)"}</Formula>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding web asset loading payloads for corporate landing pages is modeled in our <Link href="/calculators/internet/website-load-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">website load time calculator</Link>. Corporate email server availability and uptime guarantees can be audited via our <Link href="/calculators/internet/server-uptime-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">server uptime calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Global Email Provider Attachment Limits & Safe Raw Thresholds
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The following table displays published message limits across major consumer and enterprise email providers alongside their actual maximum safe raw attachment thresholds:
          </p>

          <DataTable
            head={["Email Service Provider", "Published Message Limit", "Base64 Wire Expansion", "Max Safe Raw Attachment", "Recommended Large File Workaround"]}
            rows={[
              ["Google Gmail / Workspace", "25 MB", "+33.33%", "18.5 MB Raw", "Google Drive Cloud Share Link"],
              ["Microsoft Outlook / Office 365", "20 MB (Default)", "+33.33%", "14.8 MB Raw", "OneDrive Cloud Attachment"],
              ["Apple iCloud Mail", "20 MB", "+33.33%", "14.8 MB Raw", "iCloud Mail Drop (Up to 5 GB)"],
              ["Yahoo! Mail", "25 MB", "+33.33%", "18.5 MB Raw", "Dropbox / Box Integration"],
              ["Proton Mail (Encrypted)", "25 MB", "+33.33%", "18.5 MB Raw", "Proton Drive Secure Link"],
              ["Enterprise Exchange (Custom)", "50 – 100 MB", "+33.33%", "37.0 – 74.0 MB Raw", "Enterprise SFTP / ShareFile"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Worked Engineering Case Studies
          </h2>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study A: Legal Merger Contract Bounce on Closing Day
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A corporate attorney attempts to email signed acquisition closing documents to outside counsel. The PDF document package measures exactly 21.2 MB on the attorney&apos;s local drive. Outside counsel operates on standard Google Workspace (25 MB limit).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Upon clicking &lsquo;Send&rsquo;, the email client encodes the 21.2 MB file via Base64: <Formula>{"21.2 \\times 1.3333 = 28.26 \\text{ MB}"}</Formula>. Adding the HTML legal disclaimers and MIME boundary headers brings the total wire payload to 28.45 MB. Outside counsel&apos;s Google mail server immediately terminates the SMTP handshake, generating an automated non-delivery report (NDR) stating &lsquo;552 5.3.4 message size exceeds maximum allowed&rsquo;. Compressing the PDF to 16.5 MB drops the encoded wire payload to 22.05 MB, ensuring immediate, successful delivery. Managing office bandwidth during document transfers is evaluated in our <Link href="/calculators/internet/bandwidth-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">bandwidth calculator</Link>.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Case Study B: Architecture Firm High-Resolution Rendering RFP Submission
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An architectural consultancy prepares an RFP bid containing 8 high-resolution 3D site plan renderings totaling 35 MB of attachments. The municipal client operates an on-premise Microsoft Exchange server with a strict 20 MB message ceiling.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Recognizing that even a single 16 MB rendering will expand to 21.3 MB and bounce, the architect implements an enterprise cloud sharing strategy. The firm uploads the 35 MB package to a cloud object repository, generating an encrypted, time-limited direct download link. The resulting email measures only 85 KB, guaranteeing instant inbox arrival without triggering spam filters or gateway size rejections. Cloud repository capacity and bandwidth egress costs are budgeted through our <Link href="/calculators/internet/cloud-storage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">cloud storage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            MIME Standards Architecture: RFC 2045, RFC 2046 & Boundary Delimiters
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern multipart email transmission is orchestrated by the IETF MIME specification. Under MIME, a single email can encapsulate multiple disparate content streams—including plain text, formatted HTML, inline images, and binary document attachments. Each component is separated by a unique pseudo-random cryptographic boundary delimiter string (e.g. &lsquo;--=_boundary_12345&rsquo;).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Every discrete attachment carries individual MIME headers specifying Content-Type (e.g. application/pdf), Content-Disposition (inline vs attachment), and Content-Transfer-Encoding (base64). While these headers add minimal overhead (typically 1 to 2 KB per attachment), poor client implementations that split Base64 lines with excessive whitespace can introduce subtle size expansion.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Internet Messaging Standards & Governance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Email transport protocols, message size limits, and security encapsulation standards are maintained by international standards bodies:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Internet Engineering Task Force (IETF RFC 5321):</strong> The definitive Simple Mail Transfer Protocol (SMTP) standard governing mail exchange and message size negotiation (SIZE extension RFC 1870).
            </li>
            <li>
              <strong>IETF RFC 2045 & RFC 2046:</strong> Multipurpose Internet Mail Extensions (MIME) Parts One and Two, defining format architectures and Base64 transfer encoding algorithms.
            </li>
            <li>
              <strong>Messaging, Malware and Mobile Anti-Abuse Working Group (M3AAWG):</strong> Global industry alliance publishing best-practice guidelines for corporate mail server security and spam filtering hygiene.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Email Compression Techniques: Vector Optimization vs Lossy Image Downsampling
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When email attachments hover near size boundaries, applying strategic compression algorithms ensures safe delivery without sacrificing document readability. For scanned PDF contracts, standard office multi-function printers default to uncompressed 300 DPI TIFF images. Utilizing PDF optimization software to downsample images to 150 DPI and apply JBIG2 monochrome compression reduces document footprints by up to 75%.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Similarly, digital photographs taken on smartphones frequently measure 8 to 12 MB in uncompressed HEIC/JPEG formats. Converting images to WebP format or applying mozjpeg compression reduces file sizes below 1.5 MB while maintaining crystal-clear visual fidelity for corporate presentations.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Modern Cloud Link Alternatives: Overcoming Email File Size Ceilings
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Given the architectural constraints of 40-year-old SMTP protocols, transmitting multi-gigabyte media packages via email attachments is fundamentally obsolete. Modern productivity platforms integrate native cloud attachment mechanisms—such as Google Drive chips, OneDrive links, and Apple Mail Drop.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Apple Mail Drop, for instance, intercepts attachments exceeding 20 MB, uploads the assets to iCloud, and embeds a clean web download link within the message. Recipients can download up to 5 GB per transfer without consuming mail server storage quotas, ensuring effortless enterprise collaboration.
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding the mathematical reality of Base64 MIME encoding empowers business professionals to navigate email file size limits with confidence.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By auditing attachment payloads prior to transmission, corporate senders eliminate undeliverable bounce notifications and maintain professional communication reliability.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            SMTP Chunking Extensions (BDAT) vs Legacy DATA Commands
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under traditional SMTP protocol (RFC 821), message bodies are transmitted using the monolithic DATA command, which requires the sending client to scan through every byte to escape trailing dot characters (period transparency). Modern enterprise mail transfer agents (MTAs) implement the ESMTP CHUNKING extension codified in RFC 3030.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            CHUNKING replaces the DATA command with the binary BDAT verb, specifying exact byte lengths for each transmitted chunk. BDAT eliminates the need to scan and alter message bodies, accelerating delivery speed over high-bandwidth links audited in our <Link href="/calculators/internet/internet-speed-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">internet speed calculator</Link> and minimizing round-trip latency evaluated in our <Link href="/calculators/internet/ping-latency-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ping latency calculator</Link>.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            DKIM Cryptographic Signatures & Gateway Header Overhead
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern corporate email security mandates DomainKeys Identified Mail (DKIM) signatures, Sender Policy Framework (SPF) validation, and DMARC alignment. As an email traverses corporate security filters, anti-spam gateways (such as Proofpoint or Mimecast) inject detailed cryptographic authentication headers, disclaimer banners, and routing trace stamps.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            These administrative security headers add 40 to 80 KB of text metadata to every outbound message. For emails hovering within 100 KB of hard provider limits, this gateway header expansion can trigger unexpected size threshold rejections, underscoring the critical need to maintain a 15% safety buffer.
          </p>

        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Enterprise Mail Server Transport Architecture & Queue Mechanics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When mail user agents inject oversized messages into corporate SMTP transport pipelines, messages traverse multiple security scanning layers including anti-spam heuristics, zero-day sandboxes, and data loss prevention (DLP) engines. Processing Base64-encoded file attachments forces mail transfer agents to allocate significant memory buffers for real-time MIME unpacking. Enforcing strict message size thresholds protects email transport relays from memory exhaustion and denial-of-service vulnerabilities.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Configuring automated attachment offloading to secure cloud storage repositories ensures smooth enterprise mail transfer agent operation.
          </p>

</>
      }
    >
      <EmailSizeCalculatorComponent />
    </CalcPage>
  );
}
