import type { Metadata } from "next";
import Link from "next/link";
import DataStorageConverterComponent from "@/components/calcs/measurements/data-storage-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DataStorageBinaryVsDecimalStandardChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/data-storage-converter";
const TITLE = "Data Storage Converter | Bits, Bytes, Megabytes & Gigabytes";
const DESCRIPTION =
  "Convert bits, bytes, kilobytes, megabytes, gigabytes, and terabytes with decimal SI versus binary IEC standards and storage capacity modeling.";

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
  { href: "/calculators/internet/bandwidth-calculator", icon: "🌐", name: "Bandwidth Calculator" },
  { href: "/calculators/internet/download-time-calculator", icon: "⏳", name: "Download Time" },
  { href: "/calculators/measurements/number-system-converter", icon: "🔢", name: "Number System" },
  { href: "/calculators/measurements/time-converter", icon: "⏱️", name: "Time Converter" },
  { href: "/calculators/measurements/energy-converter", icon: "⚡", name: "Energy Converter" },
  { href: "/pages/measurements", icon: "💾", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why does my 1 TB hard drive only show 931 GB in Windows?",
    a: "This ubiquitous discrepancy stems from differing measurement standards. Hard drive manufacturers sell drives using decimal SI units (1 TB = 10¹² bytes = 1,000,000,000,000 bytes). However, Microsoft Windows displays file sizes using binary IEC units (1 TiB = 2⁴⁰ bytes = 1,099,511,627,776 bytes) but labels them confusingly as 'GB'. Dividing 1,000,000,000,000 by 1,024³ yields exactly 931.32 GiB.",
  },
  {
    q: "What is the difference between a bit (b) and a byte (B)?",
    a: "A bit (binary digit, lowercase 'b') is the fundamental atomic unit of digital information, representing a single binary state of 0 or 1. A byte (uppercase 'B') consists of exactly 8 contiguous bits, capable of representing 2⁸ = 256 unique alphanumeric characters or integers. Telecommunications and internet speeds are quoted in bits per second (e.g., 500 Mbps), while disk storage and RAM are measured in bytes (e.g., 64 GB).",
  },
  {
    q: "What are IEC binary prefixes (KiB, MiB, GiB, TiB)?",
    a: "In December 1998, the International Electrotechnical Commission (IEC) formally standardized binary prefixes to eliminate confusion with metric SI decimal prefixes. In the IEC standard: 1 Kibibyte (KiB) = 2¹⁰ = 1,024 bytes; 1 Mebibyte (MiB) = 2²⁰ = 1,048,576 bytes; 1 Gibibyte (GiB) = 2³⁰ = 1,073,741,824 bytes; and 1 Tebibyte (TiB) = 2⁴⁰ = 1,099,511,627,776 bytes.",
  },
  {
    q: "How many bits are in a nibble and a word in computer architecture?",
    a: "In computer architecture, a 'nibble' equals exactly 4 bits (half a byte), corresponding to exactly one hexadecimal digit (0 to F). A 'word' represents the natural data unit width processed by a computer CPU architecture: 16 bits (2 bytes) in legacy x86 systems, 32 bits (4 bytes) in x86/ARM32 systems, and 64 bits (8 bytes) in modern x86-64 and ARM64 architectures.",
  },
];

export default function DataStorageConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Digital Storage Guidance:</strong> Digital information quantifies discrete binary states. In computer systems engineering, cloud storage provisioning, and telecommunications, cross-reference transfer throughput in our <Link href="/calculators/internet/bandwidth-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">bandwidth calculator</Link> and calculate transmission durations using our <Link href="/calculators/internet/download-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">download time calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Information Theory & The Shannon Entropy of Digital Memory
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Digital data storage represents humanity&apos;s externalized cognitive memory. In 1948, American mathematician Claude Shannon published his seminal work &apos;A Mathematical Theory of Communication&apos;, establishing the bit (binary digit) as the fundamental unit of information entropy: the resolution of uncertainty between two equally probable discrete alternatives (0 or 1). In physical hardware, bits are recorded via bistable magnetic domains on hard disk platters, trapped electron charges in NAND flash floating gates, or polarized ferroelectric crystal domains.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Throughout computing history, an unfortunate conflict developed between metric base-10 engineering prefixes (kilo = 10³, mega = 10⁶) and natural binary base-2 computer memory addressing (2¹⁰ = 1,024, 2²⁰ = 1,048,576). Because computer RAM addressing logic naturally partitions memory in powers of two, software engineers co-opted decimal metric prefixes for binary powers. This dual usage produced recurring commercial disputes, legal class-action lawsuits against hard drive vendors, and widespread consumer confusion regarding &apos;missing&apos; hard drive space.
          </p>

          <DataStorageBinaryVsDecimalStandardChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivations: Decimal (SI 10^N) vs Binary (IEC 2^N)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Digital data capacity converts through the base byte (8 bits). In the International System of Units (SI standard ISO/IEC 80000-13), decimal prefixes strictly denote powers of 10:
          </p>
          <Formula>{"1 \\text{ KB} = 10^3 \\text{ B} = 1,000 \\text{ B}, \\quad 1 \\text{ MB} = 10^6 \\text{ B}, \\quad 1 \\text{ GB} = 10^9 \\text{ B}, \\quad 1 \\text{ TB} = 10^{12} \\text{ B}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In the International Electrotechnical Commission (IEC 60027-2) binary standard, prefixes denote exact integer powers of 2:
          </p>
          <Formula>{"1 \\text{ KiB} = 2^{10} \\text{ B} = 1,024 \\text{ B}, \\quad 1 \\text{ MiB} = 2^{20} \\text{ B} = 1,048,576 \\text{ B}"}</Formula>
          <Formula>{"1 \\text{ GiB} = 2^{30} \\text{ B} = 1,073,741,824 \\text{ B}, \\quad 1 \\text{ TiB} = 2^{40} \\text{ B} = 1,099,511,627,776 \\text{ B}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The percentage divergence gap between decimal and binary representations compounds dramatically with higher orders of magnitude: 2.4% at the Kilobyte tier, 7.37% at the Gigabyte tier, 9.95% at the Terabyte tier, and 12.59% at the Petabyte tier. For positional radix conversions, explore our <Link href="/calculators/measurements/number-system-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">number system converter</Link> and calculate transmission runtimes in our <Link href="/calculators/measurements/time-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">time converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Data Storage Capacities
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact decimal SI and binary IEC conversion factors from individual bits to enterprise exabytes:
          </p>
          <DataTable
            head={["Unit Name", "Symbol", "Decimal Bytes (SI 10^N)", "Binary Bytes (IEC 2^N)", "Divergence Gap (%)"]}
            rows={[
              ["Bit", "b", "0.125 B", "0.125 B", "0.0%"],
              ["Byte", "B", "1.0 B", "1.0 B", "0.0%"],
              ["Kilobyte / Kibibyte", "KB / KiB", "1,000 B", "1,024 B", "+2.40%"],
              ["Megabyte / Mebibyte", "MB / MiB", "1,000,000 B", "1,048,576 B", "+4.86%"],
              ["Gigabyte / Gibibyte", "GB / GiB", "1,000,000,000 B", "1,073,741,824 B", "+7.37%"],
              ["Terabyte / Tebibyte", "TB / TiB", "10¹² B", "1,099,511,627,776 B", "+9.95%"],
              ["Petabyte / Pebibyte", "PB / PiB", "10¹⁵ B", "1,125,899,906,842,624 B", "+12.59%"],
              ["Exabyte / Exbibyte", "EB / EiB", "10¹⁸ B", "1,152,921,504,606,846,976 B", "+15.29%"],
              ["Zettabyte / Zebibyte", "ZB / ZiB", "10²¹ B", "1.18059 × 10²¹ B", "+18.06%"],
              ["Yottabyte / Yobibyte", "YB / YiB", "10²⁴ B", "1.20893 × 10²⁴ B", "+20.89%"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Enterprise Cloud SAN Storage Allocation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a cloud infrastructure architect provisioning a storage area network (SAN) for an enterprise relational database cluster. The vendor contract specifies 48 raw decimal Terabytes (TB) of enterprise NVMe SSD capacity. The Linux system administrator must calculate formatted ext4 file system capacity in binary Tebibytes (TiB), account for 5% reserved root blocks, and verify partition sizing:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Calculate Raw Bytes from Vendor Rating):</strong> 48 TB = 48 × 10¹² bytes = 48,000,000,000,000 bytes.</li>
            <li><strong>Step 2 (Convert to Binary Tebibytes for Linux OS):</strong> 48,000,000,000,000 ÷ 1,024⁴ (1,099,511,627,776) = 43.655 TiB.</li>
            <li><strong>Step 3 (Deduct Linux OS Reserved Superuser Blocks):</strong> 43.655 TiB × (1 - 0.05) = 41.472 TiB of usable file storage space.</li>
            <li><strong>Step 4 (Network Transfer Window Verification):</strong> Backing up 41.472 TiB over a dedicated 10 Gbps fiber link can be modeled in our <Link href="/calculators/internet/bandwidth-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">bandwidth calculator</Link> and download duration confirmed in our <Link href="/calculators/internet/download-time-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">download time calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Physical Storage Media Architectures: Magnetic Platters to 3D NAND
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The physical density of digital data storage has scaled aggressively over seven decades, outpacing even Moore&apos;s Law for transistor scaling. The earliest commercial magnetic hard drive, the IBM 305 RAMAC introduced in 1956, required fifty 24-inch aluminum platters to store 5 megabytes of data, with an areal recording density of approximately 2,000 bits per square inch.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By contrast, modern Heat-Assisted Magnetic Recording (HAMR) hard drives achieve areal densities exceeding 2 terabits per square inch, utilizing nanometer laser diodes to momentarily heat magnetic recording grains above their Curie temperature before recording magnetic flux transitions. Simultaneously, 3D NAND flash memory stacks over 200 microscopic vertical cell layers in a microscopic silicon die, storing multiple bits per cell (TLC 3 bits/cell, QLC 4 bits/cell) via precision Fowler-Nordheim tunneling charge programming.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            File System Allocation Units & Cluster Slack Space Overhead
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Operating system file systems (such as Microsoft NTFS, Apple APFS, or Linux ext4) do not allocate storage byte-by-byte; rather, they partition disk volumes into discrete allocation units termed clusters (typically 4,096 bytes or 4 KiB). Even a tiny text file containing only 12 bytes of ASCII text consumes an entire 4 KiB cluster on disk.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The unused remainder of that cluster (4,096 - 12 = 4,084 bytes) is known as &apos;slack space&apos;. In software repositories containing millions of tiny source code files and JSON configuration manifests, file system cluster slack space overhead can consume over 20% of total physical volume capacity. You can evaluate memory storage percentages using our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Smartphone Specs, Video Streaming & Cloud Backup
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In daily consumer electronics, understanding data storage units is essential when selecting smartphone storage tiers (128 GB, 256 GB, 512 GB, 1 TB). High-resolution 4K video recorded at 60 frames per second using ProRes codecs consumes approximately 5.5 Gigabytes per minute of footage, rapidly depleting base storage. In cloud computing, services like AWS S3 and Google Cloud Storage bill tenants based on gigabyte-months of stored data and egress transfer volume.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In academic and computer science coursework, mastering binary data conversions is fundamental to hardware design, operating systems engineering, and database indexing. For student performance tools, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and visit our comprehensive <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <DataStorageConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Enterprise RAID Topologies & Usable Parity Storage Capacity Formulas
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In enterprise data centers and network-attached storage (NAS) appliances, raw drive capacities must be aggregated into fault-tolerant Redundant Arrays of Independent Disks (RAID). Software architects must calculate net usable storage capacity versus parity overhead:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>RAID 0 (Block Striping):</strong> Capacity = N × C_drive (100% capacity utilization, zero redundancy). A single drive failure destroys the entire array volume.</li>
            <li><strong>RAID 1 (Drive Mirroring):</strong> Capacity = C_drive (50% capacity in a 2-drive pair). Complete bit-for-bit duplication protects against single drive loss.</li>
            <li><strong>RAID 5 (Distributed Parity):</strong> Capacity = (N - 1) × C_drive. Dedicates the equivalent of one full drive to XOR parity, surviving any single drive failure. In an 8-drive array of 16 TB drives, raw capacity is 128 TB, but usable RAID 5 capacity is (8 - 1) × 16 = 112 TB.</li>
            <li><strong>RAID 6 (Dual Distributed Parity):</strong> Capacity = (N - 2) × C_drive. Employs Galois field polynomial parity to survive simultaneous two-drive hardware failures.</li>
            <li><strong>RAID 10 (Striped Mirrors):</strong> Capacity = (N / 2) × C_drive. Combines high random I/O performance with mirror redundancy at 50% capacity overhead.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Error-Correcting Codes (ECC) & Bit Error Rate (BER) Scaling
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At microscopic nanometer silicon scales, digital memory is vulnerable to transient bit flips caused by cosmic ray neutron spallation and thermal noise. Enterprise server DDR5 memory modules incorporate On-Die Error-Correcting Code (ECC) alongside sideband ECC parity chips utilizing Hamming error-correction algorithms: (72, 64) SECDED (Single Error Correction, Double Error Detection). For every 64 data bits, 8 auxiliary parity bits are stored, introducing an exact 12.5% physical storage overhead.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In enterprise hard drives and solid-state drives, Low-Density Parity-Check (LDPC) codes achieve unrecoverable bit error rates (UBER) below 1 in 10¹⁵ bits read. Storage systems engineers convert raw NAND flash gross capacities to net provisioned LBA (Logical Block Address) capacities, allocating 7% to 28% of physical flash memory to internal controller over-provisioning for garbage collection and wear leveling.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Database Storage Engines: B+ Tree Indexing & Write-Ahead Logging (WAL)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In database engineering (such as PostgreSQL, MySQL InnoDB, or Oracle), relational table rows are stored inside fixed disk pages (typically 8 KiB or 16 KiB blocks). To facilitate rapid binary search queries, storage engines build B+ Tree indexes, which introduce secondary storage amplification. For every gigabyte of raw table data, index structures often consume an additional 300 to 600 Megabytes of disk capacity.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, ACID transactional durability requires Write-Ahead Logging (WAL) where every data modification is sequentially flushed to append-only log segments before being applied to data table pages. Database administrators compute total IOPS (Input/Output Operations Per Second) and convert between MiB/s throughput and disk sector capacities to optimize cloud storage provisioning.
          </p>

    </CalcPage>
  );
}
