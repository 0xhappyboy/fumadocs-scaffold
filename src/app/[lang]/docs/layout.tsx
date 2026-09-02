import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const allPages = source.getPages();
  const filteredPages = allPages.filter((page: any) => {
    const slugs = page.slugs || [];
    return slugs[0] === lang;
  });
  const tree = {
    name: lang === "zh" ? "文档" : "Docs",
    children: filteredPages.map((page: any) => {
      const slugs = page.slugs || [];
      return {
        type: "page" as const,
        name: page.data.title,
        url: `/${lang}/docs/${slugs.slice(1).join("/")}`,
      };
    }),
  };
  return (
    <DocsLayout tree={tree as any} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
