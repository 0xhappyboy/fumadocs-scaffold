import Link from "next/link";
import { BookOpen, Zap, Shield, Cpu } from "lucide-react";
import { GitHubIcon } from "@/icons/GitHubIcon";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isZh = lang === "zh";

  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[calc(100vh-4rem)] px-6 relative overflow-hidden">
      {/* Background gradient orbs - black/white/gray only */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px] -z-10" />
      <div className="absolute top-[30%] right-[20%] w-[20%] h-[20%] rounded-full bg-white/5 blur-[100px] -z-10" />

      {/* Logo */}
      <div className="mb-8">
        <img
          src=""
          alt="fumadocs-scaffold"
          className="w-35 h-35"
        />
      </div>

      {/* Main heading */}
      <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight text-foreground">
        fumadocs-scaffold
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl">
        {isZh ? "Demo" : "Demo"}
      </p>

      {/* Description */}
      <p className="text-base text-muted-foreground/70 mb-10 max-w-xl">
        {isZh
          ? "Demo"
          : "Demo"}
      </p>

      {/* Feature chips - black/white style */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {[
          { icon: Zap, label: isZh ? "Demo" : "Demo" },
          { icon: Shield, label: isZh ? "Demo" : "Demo" },
          { icon: Cpu, label: isZh ? "Demo" : "Local First" },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 text-xs text-muted-foreground"
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href={`/${lang}/docs`}
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/80 transition-all hover:scale-105 active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          {isZh ? "阅读文档" : "Read Docs"}
        </Link>
        <Link
          href="https://github.com/0xhappyboy/fumadocs-scaffold"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition-all hover:scale-105 active:scale-95"
        >
          <GitHubIcon className="w-4 h-4" />
          GitHub
        </Link>
      </div>
    </div>
  );
}
