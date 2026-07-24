"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import CampaignCard from "./campaign-card";
import { campaigns as fallback, testimonials } from "@/lib/data";
import { Campaign } from "@/lib/types";
import { api } from "@/lib/api";
const closingSoon = (items: Campaign[]) =>
  [...items]
    .filter((campaign) => new Date(campaign.deadline).getTime() > Date.now())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 6);
const topFunded = (items: Campaign[]) =>
  [...items].sort((a, b) => (b.raised || 0) - (a.raised || 0)).slice(0, 6);
const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};
export default function Home() {
  const [slide, setSlide] = useState(0);
  const [quote, setQuote] = useState(0);
  const [closingCampaigns, setClosingCampaigns] = useState<Campaign[]>([]);
  const [fundedCampaigns, setFundedCampaigns] = useState<Campaign[]>([]);
  const banners = [
    [
      "Small credits.",
      "Big beginnings.",
      "Discover people with brave ideas, follow every milestone, and help turn local imagination into lasting impact.",
    ],
    [
      "Back the bold.",
      "Build the better.",
      "From climate action to community health, fund projects that make tomorrow feel closer.",
    ],
    [
      "Your belief",
      "starts here.",
      "Give a creator the momentum they need to take their next meaningful step.",
    ],
  ];
  useEffect(() => {
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % banners.length),
      5000,
    );
    api<{ items: Campaign[] }>("/campaigns?limit=6&sort=deadline")
      .then((r) => setClosingCampaigns(r.items.length >= 6 ? closingSoon(r.items) : closingSoon(fallback)))
      .catch(() => setClosingCampaigns(closingSoon(fallback)));
    api<{ items: Campaign[] }>("/campaigns?limit=6&sort=highest")
      .then((r) => setFundedCampaigns(r.items.length >= 6 ? topFunded(r.items) : topFunded(fallback)))
      .catch(() => setFundedCampaigns(topFunded(fallback)));
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <section className="container-app py-5 md:py-8">
          <div className="relative flex min-h-[400px] items-center overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-white sm:min-h-[430px] md:min-h-[460px] md:px-12 md:py-14 lg:min-h-[490px] lg:px-16">
            <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90" alt="People collaborating on a community project" fill priority sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-forest/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(200,242,11,0.24),transparent_28%)]" />
            <div className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-forest/60 blur-3xl" />
            <motion.div
              key={slide}
              {...reveal}
              className="relative z-10 max-w-3xl"
            >
              <div className="eyebrow !text-lime">
                Community capital, real change
              </div>
              <h1 className="mt-4 text-4xl font-black leading-[.95] tracking-[-.05em] sm:text-5xl md:text-7xl lg:text-8xl">
                {banners[slide][0]}
                <br />
                <span className="text-lime">{banners[slide][1]}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
                {banners[slide][2]}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/explore" className="btn-lime">
                  Explore ideas <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link
                  href="/register"
                  className="rounded-full border border-white/20 px-6 py-3 font-bold"
                >
                  Launch your idea
                </Link>
              </div>
            </motion.div>
            <div className="absolute bottom-8 right-10 hidden rotate-3 rounded-2xl bg-white p-4 text-ink shadow-2xl lg:block">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-lime">
                  <Sparkles />
                </span>
                <div>
                  <b>৳1.2M+ impact</b>
                  <p className="text-xs text-black/50">created this month</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 flex gap-2 md:right-12">
              <button
                onClick={() => setSlide((slide + 2) % 3)}
                className="grid size-10 place-items-center rounded-full border border-white/30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setSlide((slide + 1) % 3)}
                className="grid size-10 place-items-center rounded-full bg-lime text-ink"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
        <section className="container-app py-10 md:py-16">
          <motion.div {...reveal} className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Top funded campaigns</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Big ideas with real momentum</h2>
            </div>
            <Link href="/explore" className="hidden shrink-0 font-bold md:block">View more →</Link>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {fundedCampaigns.map((campaign) => <CampaignCard key={campaign._id} campaign={campaign} />)}
          </div>
        </section>
        <section className="container-app py-16">
          <motion.div
            {...reveal}
            className="mb-8 flex items-end justify-between"
          >
            <div>
              <p className="eyebrow">Closing soon</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                Back them before time runs out
              </h2>
            </div>
            <Link href="/explore" className="hidden font-bold md:block">
              View more →
            </Link>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {closingCampaigns.map((c) => (
              <CampaignCard key={c._id} campaign={c} />
            ))}
          </div>
        </section>
        <section className="container-app py-16">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-lime lg:grid-cols-2">
            <div className="p-8 md:p-14">
              <p className="eyebrow">How it works</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">
                From a spark to a shared success.
              </h2>
              <div className="mt-10 space-y-7">
                {[
                  [
                    Lightbulb,
                    "Tell your story",
                    "Set a goal, add rewards and show the world why your idea matters.",
                  ],
                  [
                    HeartHandshake,
                    "Find your people",
                    "Supporters contribute credits and follow your progress.",
                  ],
                  [
                    CheckCircle2,
                    "Deliver the impact",
                    "Share updates, reach milestones and withdraw approved funds.",
                  ],
                ].map(([Icon, title, text], i) => (
                  <div className="flex gap-4" key={String(title)}>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-lime">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-black">{String(title)}</h3>
                      <p className="mt-1 text-sm leading-6 text-black/65">
                        {String(text)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-96">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
                alt="Community planning a project"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
        <section className="container-app grid gap-5 py-16 md:grid-cols-3">
          {[
            ["1,240+", "ideas launched"],
            ["86%", "funds reach creators"],
            ["42K", "community supporters"],
          ].map(([n, l]) => (
            <motion.div {...reveal} key={l} className="card p-8 text-center">
              <div className="text-5xl font-black">{n}</div>
              <div className="mt-2 text-black/50">{l}</div>
            </motion.div>
          ))}
        </section>
        <section className="container-app py-16">
          <div className="text-center">
            <p className="eyebrow">Built on trust</p>
            <h2 className="mt-3 text-4xl font-black">
              What our community says
            </h2>
          </div>
          <div className="mx-auto mt-9 max-w-2xl">
            <motion.div
              key={quote}
              {...reveal}
              className="card p-8 text-center md:p-12"
            >
              <p className="text-xl leading-8">“{testimonials[quote].quote}”</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Image
                  src={testimonials[quote].photo}
                  alt={testimonials[quote].name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="text-left">
                  <b>{testimonials[quote].name}</b>
                  <p className="text-xs text-black/50">
                    {testimonials[quote].role}
                  </p>
                </div>
              </div>
              <div className="mt-7 flex justify-center gap-2">
                <button
                  onClick={() => setQuote((quote + 2) % 3)}
                  className="grid size-9 place-items-center rounded-full bg-cream"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setQuote((quote + 1) % 3)}
                  className="grid size-9 place-items-center rounded-full bg-ink text-white"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
        <section id="about" className="container-app py-12 md:py-16">
          <div className="grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-8 md:p-12">
              <p className="eyebrow !text-lime">About Fundora</p>
              <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">More than funding. A place for ideas to grow.</h2>
              <p className="mt-6 max-w-2xl leading-7 text-white/70">Fundora helps thoughtful supporters discover meaningful projects, and gives creators a transparent way to turn brave ideas into real community impact.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-white/10 p-5"><b className="text-lime">Transparent progress</b><p className="mt-2 text-sm leading-6 text-white/65">See goals, funding progress, deadlines and campaign updates in one clear place.</p></div><div className="rounded-2xl bg-white/10 p-5"><b className="text-lime">Built for community</b><p className="mt-2 text-sm leading-6 text-white/65">Every credit supports creators who are building practical change around them.</p></div></div>
              <Link href="/explore" className="btn-lime mt-8">Discover campaigns <ArrowRight className="ml-2" size={18} /></Link>
            </div>
            <div className="relative min-h-72"><Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85" alt="Creators collaborating on an idea" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /></div>
          </div>
        </section>
        <section className="container-app pb-8 pt-16">
          <div className="rounded-[2.5rem] bg-forest p-10 text-center text-white md:p-16">
            <ShieldCheck className="mx-auto text-lime" size={42} />
            <h2 className="mt-5 text-4xl font-black">
              Good ideas deserve a fair start.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/65">
              Every campaign is reviewed, every contribution is tracked, and
              every creator is accountable to their supporters.
            </p>
            <Link href="/register" className="btn-lime mt-8">
              Start with 20 free credits
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
