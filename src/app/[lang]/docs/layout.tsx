import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
// Chinese display names for top-level folders
const folderNameMapZh: Record<string, string> = {
  videoeditor: "Demo",
};
// English display names for top-level folders
const folderNameMapEn: Record<string, string> = {
  videoeditor: "Demo",
};
// Order mapping for sidebar navigation
// Keys are directory names
const orderMap: Record<string, number> = {
  index: 1,
  generalchat: 2,
  videoeditor: 3,
  finance: 4,
  codeeditor: 5,
  map: 6,
  sandbox3d: 7,
};
/**
 * Build the navigation tree from page data
 * @param pages - Array of page objects from the source
 * @param lang - Current language code (zh or en)
 * @returns The navigation tree structure
 */
function buildTree(pages: any[], lang: string): any {
  const root: any = {
    name: lang === "zh" ? "文档" : "Docs",
    children: [],
  };
  const folderNameMap = lang === "zh" ? folderNameMapZh : folderNameMapEn;
  // Map to hold all pages grouped by their parent directory
  const folderMap: Record<string, any[]> = {};
  // Collect all pages and group them by directory
  for (const page of pages) {
    const slugs = page.slugs || [];
    // Remove language prefix (e.g., "en" or "zh")
    const segments = slugs.slice(1);
    if (segments.length === 0) {
      // Root index page: docs/zh/index.mdx
      // Store it separately with a special key
      if (!folderMap["__index__"]) {
        folderMap["__index__"] = [];
      }
      folderMap["__index__"].push({
        type: "page" as const,
        name: page.data.title,
        url: `/${lang}/docs`,
        file: "index",
        order: 1,
      });
    } else {
      // All other pages: group by the first segment (directory name)
      const dirName = segments[0];
      if (!folderMap[dirName]) {
        folderMap[dirName] = [];
      }
      // Determine if this is a top-level page (overview/index) or a sub-page
      // If it's overview.md or index.md, it should be the first item in the folder
      const isEntryPage =
        segments.length === 1 ||
        segments[segments.length - 1] === "overview" ||
        segments[segments.length - 1] === "index";
      // Use the full path for the URL
      const url =
        segments.length === 1
          ? `/${lang}/docs/${dirName}`
          : `/${lang}/docs/${segments.join("/")}`;
      folderMap[dirName].push({
        type: "page" as const,
        name: page.data.title,
        url: url,
        file: segments.join("/"),
        isEntry: isEntryPage,
        order: isEntryPage ? 0 : 1, // Entry pages come first
      });
    }
  }
  const children: any[] = [];
  // Sort folders by the order map
  const sortedFolderNames = Object.keys(folderMap).sort((a, b) => {
    // Handle special __index__ key
    if (a === "__index__") return -1;
    if (b === "__index__") return 1;
    const aOrder = orderMap[a] ?? 999;
    const bOrder = orderMap[b] ?? 999;
    return aOrder - bOrder;
  });
  for (const folderName of sortedFolderNames) {
    if (folderName === "__index__") {
      // Add the index page directly
      const indexPages = folderMap[folderName];
      // Sort index pages (should only be one)
      indexPages.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      children.push(...indexPages);
      continue;
    }
    const items = folderMap[folderName];
    // Sort items: entry pages first, then alphabetically by name
    items.sort((a, b) => {
      // Entry pages (overview/index) come first
      if (a.isEntry && !b.isEntry) return -1;
      if (!a.isEntry && b.isEntry) return 1;
      // Otherwise sort by name
      return a.name.localeCompare(b.name);
    });
    // Get the display name for the folder
    const displayName = folderNameMap[folderName] || folderName;
    // Create a folder node with all its pages as children
    children.push({
      type: "folder" as const,
      name: displayName,
      children: items,
      // Store the order for sorting folders
      _order: orderMap[folderName] ?? 999,
    });
  }
  // Sort the final children array (folders and pages mixed)
  children.sort((a, b) => {
    const aOrder = a._order ?? orderMap[a.file] ?? 999;
    const bOrder = b._order ?? orderMap[b.file] ?? 999;
    return aOrder - bOrder;
  });
  root.children = children;
  return root;
}
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
  const tree = buildTree(filteredPages, lang);
  return (
    <DocsLayout tree={tree as any} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
