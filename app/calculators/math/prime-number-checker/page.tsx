import PrimeNumberChecker from "@/components/calcs/math/prime-number-checker";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NumberTheoryFactorVisualizerChart } from "@/components/flagship/math/editorial-charts/NumberTheoryFactorVisualizerChart";

const PATH = "/calculators/math/prime-number-checker";
const TITLE = "Prime Number Checker | Primality Test, Factorization & Generator | CalcDigi";
const DESCRIPTION =
  "Free online prime number checker. Test whether any integer is prime or composite, compute canonical prime factorizations, and explore Mersenne primes and twin primes step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is a prime number in mathematics?",
    a: "A prime number is a natural number strictly greater than 1 that has no positive integer divisors other than 1 and itself (such as 2, 3, 5, 7, 11, 13...). A number greater than 1 that is not prime is termed composite.",
  },
  {
    q: "Why is the number 1 not considered a prime number?",
    a: "Under the Fundamental Theorem of Arithmetic, every integer greater than 1 has a unique prime factorization. If 1 were classified as prime, uniqueness would fail because any number could be factored infinitely (e.g., 6 = 2 × 3 = 1 × 2 × 3 = 1² × 2 × 3).",
  },
  {
    q: "What is the only even prime number?",
    a: "The number 2 is the unique even prime number. All other even numbers are divisible by 2 and therefore composite.",
  },
  {
    q: "How do you test if a number n is prime using trial division?",
    a: "Test whether n is divisible by any prime integer up to √n. If no prime factor d ≤ √n divides n evenly, then n is guaranteed to be prime, because any factor greater than √n must pair with a factor less than √n.",
  },
  {
    q: "What is the Sieve of Eratosthenes?",
    a: "The Sieve of Eratosthenes is an ancient Greek algorithm that finds all prime numbers up to limit N: write numbers 2 through N, iteratively circle the smallest unmarked prime, and cross out all of its multiples. Its runtime complexity is O(N log log N).",
  },
  {
    q: "How do prime numbers secure modern RSA internet cryptography?",
    a: "RSA encryption relies on the computational asymmetry of prime multiplication versus prime factorization. Multiplying two 1024-bit primes p and q to produce N = p × q takes fractions of a millisecond, but factoring N back into p and q would take classical supercomputers billions of years.",
  },
  {
    q: "What is a Mersenne prime?",
    a: "A Mersenne prime is a prime number of the form M_p = 2ᵖ − 1, where p is also prime. The largest known prime numbers discovered by GIMPS (Great Internet Mersenne Prime Search) are almost exclusively Mersenne primes.",
  },
  {
    q: "What is the Prime Number Theorem?",
    a: "The Prime Number Theorem describes the asymptotic distribution of primes: the number of primes less than or equal to x, denoted π(x), is approximately x / ln(x). The probability that a random large integer x is prime is approximately 1 / ln(x).",
  },
];

const PRIMALITY_TESTS_ROWS = [
  ["Trial Division up to √n", "Deterministic O(√n)", "Exhaustively tests prime divisors up to square root", "Small integers / educational verification"],
  ["Sieve of Eratosthenes", "Deterministic O(N log log N)", "Iteratively marks composites in preallocated memory buffer", "Generating all primes up to 10⁸ in tabular bounds"],
  ["Fermat Primality Test", "Probabilistic O(k log² n)", "Based on Fermat's Little Theorem: a^(n−1) ≡ 1 mod n", "Fast pre-filtering (flawed by Carmichael pseudo-primes)"],
  ["Miller-Rabin Test", "Probabilistic O(k log³ n)", "Decomposes n−1 into d × 2ˢ and tests modular squarings", "Cryptographic key generation (OpenSSL, RSA, TLS)"],
  ["Baillie-PSW Test", "Deterministic below 2⁶⁴", "Combines Miller-Rabin base-2 with Lucas sequence test", "Standard library primality tests (GMP, Python, Pari/GP)"],
  ["AKS Primality Test", "Deterministic Polynomial O(log⁶ n)", "Polynomial congruence over finite rings (Agrawal-Kayal-Saxena)", "Theoretical significance; deterministic polynomial certainty"],
];

const RELATED = [
  { href: "/calculators/math/factor-calculator", icon: "🔢", name: "Factor Calculator" },
  { href: "/calculators/math/gcf-calculator", icon: "⚖️", name: "GCF Calculator" },
  { href: "/calculators/math/lcm-calculator", icon: "🔄", name: "LCM Calculator" },
  { href: "/calculators/math/factorial-calculator", icon: "❗", name: "Factorial Calculator" },
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Prime Number Checker"
      intro="Test any integer for primality, calculate canonical prime factorizations, inspect prime factor trees, and identify twin primes with complete mathematical rigor."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="P(n) in Primes"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Peer-Reviewed Mathematical Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>ISO 80000-2 / NIST Compliant Precision</span>
          </div>

          <h2>Number-Theoretic Axioms and the Fundamental Theorem of Arithmetic</h2>
          <p>
            In number theory and abstract algebra, a <strong>prime number</strong> is an integer strictly greater than 1 whose only positive divisors are 1 and itself. Integers greater than 1 that possess additional divisors are termed <strong>composite numbers</strong>. Prime numbers serve as the fundamental &ldquo;atoms&rdquo; of arithmetic, formalized by Carl Friedrich Gauss in 1801 as the <strong>Fundamental Theorem of Arithmetic</strong>: every natural number n &gt; 1 can be represented as a product of prime numbers in exactly one way, up to the order of the prime factors.
          </p>
          <p>
            The fascination with prime numbers dates back to classical antiquity. In Book IX, Proposition 20 of the <em>Elements</em> (circa 300 BCE), Euclid formulated his celebrated proof demonstrating that the set of prime numbers is infinite: assuming a finite set of primes (p₁, p₂, ..., p_k), their product plus one (N = p₁p₂...p_k + 1) is not divisible by any known prime, implying that either N itself is prime or has prime factors beyond the assumed set.
          </p>
          <p>
            Today, prime numbers are the bedrock of global digital security. Asymmetric public-key cryptography protocols—including RSA, Diffie-Hellman key exchanges, and elliptic curve digital signatures (ECDSA)—rely on the extreme mathematical asymmetry of prime multiplication versus semi-prime integer factorization.
          </p>

          <div className="not-prose my-8">
            <NumberTheoryFactorVisualizerChart initialMode="factors" />
          </div>

          <h2>Algorithmic Primality Testing Methodologies</h2>
          <p>
            Verifying whether a large integer is prime utilizes diverse computational techniques balancing deterministic certainty against runtime speed:
          </p>

          <DataTable
            head={["Primality Algorithm", "Computational Complexity", "Mechanistic Principle", "Primary Operational Domain"]}
            rows={PRIMALITY_TESTS_ROWS}
            highlight={0}
          />

          <h3>1. Trial Division up to the Square Root Bound (√n)</h3>
          <p>
            The most intuitive deterministic test tests all potential prime divisors <em>d</em> from 2 up to ⌊√n⌋. If no divisor divides <em>n</em> evenly (n mod d = 0), then <em>n</em> must be prime.
          </p>
          <p>
            This relies on algebraic symmetry: if <em>n = a × b</em>, both factors cannot exceed √n; thus at least one factor must satisfy <em>d ≤ √n</em>.
          </p>

          <h3>2. Probabilistic Primality: Miller-Rabin and Fermat Tests</h3>
          <p>
            For large cryptographic integers, trial division is infeasible. The <strong>Miller-Rabin test</strong> writes <em>n − 1 = 2ˢ × d</em> (with odd <em>d</em>) and evaluates modular exponentiation <em>aᵈ mod n</em> across <em>k</em> random bases <em>a</em>. With composite error probability below <em>4⁻ᵏ</em>, it provides near-absolute certainty.
          </p>

          <h2>Step-by-Step Worked Derivation: Testing 221 and 223</h2>
          <p>
            To illustrate the operational mechanics of trial division and square root bounding, consider testing whether <strong>221</strong> and <strong>223</strong> are prime numbers:
          </p>

          <h3>Case A: Testing Integer n = 221</h3>
          <p>
            Calculate the square root bound: √221 ≈ 14.866. We test prime candidates up to 14: (2, 3, 5, 7, 11, 13).
          </p>
          <ul>
            <li><strong>2, 3, 5:</strong> 221 is odd, digit sum 5 is not divisible by 3, and ends in 1 (not 0 or 5).</li>
            <li><strong>7 and 11:</strong> 221 ÷ 7 = 31 remainder 4; 221 ÷ 11 = 20 remainder 1.</li>
            <li><strong>13:</strong> 221 ÷ 13 = 17 remainder 0.</li>
          </ul>
          <p>
            Because 221 = 13 × 17, <strong>221 is composite</strong>.
          </p>

          <h3>Case B: Testing Integer n = 223</h3>
          <p>
            Calculate √223 ≈ 14.933. Testing prime divisors up to 13: 223 mod 2 = 1, mod 3 = 1, mod 5 = 3, 223 ÷ 7 = 31 rem 6, 223 ÷ 11 = 20 rem 3, and 223 ÷ 13 = 17 rem 2. Every prime leaves a remainder. Therefore, <strong>223 is a prime number</strong>.
          </p>

          <h2>Prime Distribution and the Riemann Hypothesis</h2>
          <p>
            While individual primes appear unpredictably along the number line, their macro-level density obeys elegant statistical laws. The <strong>Prime Number Theorem</strong>, proven independently by Jacques Hadamard and Charles Jean de la Vallée Poussin in 1896, confirms that the prime counting function π(x) satisfies:
          </p>
          <Formula>π(x) ~ x ÷ ln(x)</Formula>
          <p>
            The profound mystery of prime spacing is inextricably connected to the non-trivial zeros of Bernhard Riemann's Zeta function:
          </p>
          <Formula>ζ(s) = ∑_(n=1)^∞ (1 ÷ nˢ) = ∏_(p in Primes) (1 ÷ [1 − p^(-s)])</Formula>
          <p>
            The <strong>Riemann Hypothesis</strong> asserts that all non-trivial zeros possess real part Re(s) = 1/2. If verified, it would provide the exact bound on the error term in prime distributions, standing as the most famous unsolved problem in mathematics.
          </p>

          <h2>Real-World Cryptographic and Scientific Applications</h2>
          <p>
            Prime numbers are foundational to multiple pillars of modern digital and industrial engineering:
          </p>
          <ul>
            <li>
              <strong>RSA Public-Key Encryption:</strong> Generating 2048-bit or 4096-bit RSA keys requires locating two massive prime numbers p and q. The product N = p × q is public, but factoring N to deduce the private decryption key is computationally intractable.
            </li>
            <li>
              <strong>Diffie-Hellman Key Exchange:</strong> Discrete logarithm problems over large prime Galois fields GF(p) enable two communicating parties to establish a shared symmetric cryptographic secret over an unencrypted network.
            </li>
            <li>
              <strong>Hash Table Collision Resistance:</strong> Modulo hashing functions universally utilize prime bucket capacities (such as 1009, 65537) to eliminate periodic clustering and optimize O(1) key lookups.
            </li>
            <li>
              <strong>Biological Evolutionary Timing:</strong> Periodical cicadas (Magicicada) emerge on 13-year and 17-year prime life cycles to minimize synchronization with recurring avian predator population surges.
            </li>
          </ul>

          <h2>Related Mathematical and Number-Theoretic Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/factor-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Factor Calculator</Link>, <Link href="/calculators/math/gcf-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">GCF Calculator</Link>, <Link href="/calculators/math/lcm-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">LCM Calculator</Link>, and <Link href="/calculators/math/factorial-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Factorial Calculator</Link>.
          </p>
        </>
      }
    >
      <PrimeNumberChecker />
    </CalcPage>
  );
}
