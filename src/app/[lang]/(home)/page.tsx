import Link from "next/link";
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isZh = lang === "zh";
  return (
    <div className="flex flex-col justify-center text-center flex-1 min-h-[calc(100vh-4rem)] px-6">
      <h1 className="text-5xl font-bold mb-4">HippoxOS</h1>
      <p className="text-xl text-muted-foreground mb-8">
        {isZh ? "Demo文档" : "Demo Document"}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href={`/${lang}/docs`}
          className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/80 transition-colors"
        >
          {isZh ? "阅读文档" : "Read Docs"}
        </Link>
        <Link
          href="https://github.com/0xhappyboy/fumadocs-scaffold"
          className="rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
        >
          GitHub
        </Link>
      </div>
    </div>
  );
}
