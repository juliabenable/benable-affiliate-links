import { useState, useMemo, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Toaster, toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Search,
  Copy,
  Check,
  Share2,
  Link2,
  ChevronDown,
  Sparkles,
  LayoutGrid,
  List,
  Clock,
  TrendingUp,
  Package,
  X,
  Zap,
  Layers,
  SlidersHorizontal,
  Monitor,
  Smartphone,
} from "lucide-react";

/* ────────────────────── Types ────────────────────── */

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  category: string;
  note: string;
  affiliateLink: string;
  collection: string;
  commission: string;
  clicks: number;
  earned: number;
  createdAt: string;
}

/* ────────────────────── Mock Data ────────────────────── */

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wool Runners",
    brand: "Allbirds",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Fashion",
    note: "Day 1 favorite — super comfy for all-day wear",
    affiliateLink: "https://allbirds.com/ref/creator123",
    collection: "Daily Essentials",
    commission: "12%",
    clicks: 4922,
    earned: 1232.80,
    createdAt: "2025-10-06",
  },
  {
    id: "2",
    name: "Dunk Low Retro",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1612833603922-5c43e2e80310?w=400&h=400&fit=crop",
    category: "Fashion",
    note: "Goes with everything",
    affiliateLink: "https://nike.com/ref/creator123",
    collection: "Daily Essentials",
    commission: "8%",
    clicks: 3847,
    earned: 891.20,
    createdAt: "2025-09-15",
  },
  {
    id: "3",
    name: "Chuck Taylor All Stars",
    brand: "Converse",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    category: "Fashion",
    note: "Classic pick for any outfit",
    affiliateLink: "https://converse.com/ref/creator123",
    collection: "Daily Essentials",
    commission: "10%",
    clicks: 2156,
    earned: 543.00,
    createdAt: "2025-08-22",
  },
  {
    id: "4",
    name: "AirPods Pro 2",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
    category: "Tech",
    note: "Best noise canceling under $250",
    affiliateLink: "https://apple.com/ref/creator123",
    collection: "Tech Picks",
    commission: "4%",
    clicks: 8291,
    earned: 2847.50,
    createdAt: "2025-10-01",
  },
  {
    id: "5",
    name: "Stanley Quencher H2.0",
    brand: "Stanley",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Home",
    note: "The one that went viral — worth the hype",
    affiliateLink: "https://stanley.com/ref/creator123",
    collection: "Home Favorites",
    commission: "15%",
    clicks: 12450,
    earned: 4210.00,
    createdAt: "2025-07-14",
  },
  {
    id: "6",
    name: "Glow Recipe Dew Drops",
    brand: "Glow Recipe",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    category: "Beauty",
    note: "Holy grail serum for that dewy look",
    affiliateLink: "https://glowrecipe.com/ref/creator123",
    collection: "Beauty Must-Haves",
    commission: "18%",
    clicks: 6723,
    earned: 3456.90,
    createdAt: "2025-09-28",
  },
  {
    id: "7",
    name: "Kindle Paperwhite",
    brand: "Amazon",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78f08c?w=400&h=400&fit=crop",
    category: "Tech",
    note: "Changed my reading habits completely",
    affiliateLink: "https://amazon.com/ref/creator123",
    collection: "Tech Picks",
    commission: "6%",
    clicks: 3102,
    earned: 678.40,
    createdAt: "2025-11-02",
  },
  {
    id: "8",
    name: "Cloud Slides",
    brand: "Pillow Slides",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
    category: "Fashion",
    note: "Like walking on clouds — not exaggerating",
    affiliateLink: "https://pillowslides.com/ref/creator123",
    collection: "Daily Essentials",
    commission: "20%",
    clicks: 9876,
    earned: 5432.10,
    createdAt: "2025-06-30",
  },
  {
    id: "9",
    name: "Dyson Airwrap",
    brand: "Dyson",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54571a9f7?w=400&h=400&fit=crop",
    category: "Beauty",
    note: "Pricey but SO worth it for styling",
    affiliateLink: "https://dyson.com/ref/creator123",
    collection: "Beauty Must-Haves",
    commission: "5%",
    clicks: 5643,
    earned: 1987.60,
    createdAt: "2025-10-18",
  },
  {
    id: "10",
    name: "Linen Duvet Cover",
    brand: "Brooklinen",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
    category: "Home",
    note: "Upgraded my whole bedroom aesthetic",
    affiliateLink: "https://brooklinen.com/ref/creator123",
    collection: "Home Favorites",
    commission: "12%",
    clicks: 2345,
    earned: 789.30,
    createdAt: "2025-08-05",
  },
];

const CATEGORIES = ["All", "Fashion", "Tech", "Home", "Beauty"];
const COLLECTIONS = ["All Collections", "Daily Essentials", "Tech Picks", "Home Favorites", "Beauty Must-Haves"];

/* ────────────────────── Helpers ────────────────────── */

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function formatNumber(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function getLastCopiedProduct(): Product | null {
  const id = localStorage.getItem("lastCopiedProductId");
  if (!id) return null;
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}

/* ────────────────────── App ────────────────────── */

function App() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCollection, setActiveCollection] = useState("All Collections");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [lastCopied, setLastCopied] = useState<Product | null>(getLastCopiedProduct);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  // Determine effective mobile state: actual mobile OR user toggled to mobile preview
  const showMobile = isMobile || previewMode === "mobile";

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesCollection = activeCollection === "All Collections" || product.collection === activeCollection;
      const matchesSearch =
        search === "" ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.note.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesCollection && matchesSearch;
    });
  }, [search, activeCategory, activeCollection]);

  const totalEarned = useMemo(() => filteredProducts.reduce((sum, p) => sum + p.earned, 0), [filteredProducts]);
  const totalClicks = useMemo(() => filteredProducts.reduce((sum, p) => sum + p.clicks, 0), [filteredProducts]);

  const handleCopy = useCallback(async (product: Product) => {
    try {
      await navigator.clipboard.writeText(product.affiliateLink);
      setCopiedId(product.id);
      setLastCopied(product);
      localStorage.setItem("lastCopiedProductId", product.id);
      toast.success("Link copied!", { description: `${product.brand} · ${product.name}` });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  }, []);

  const handleShare = useCallback(
    async (product: Product) => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${product.name} by ${product.brand}`,
            text: product.note,
            url: product.affiliateLink,
          });
        } catch {
          /* cancelled */
        }
      } else {
        handleCopy(product);
      }
    },
    [handleCopy],
  );

  // Close collection dropdown when clicking outside
  useEffect(() => {
    const handler = () => setShowCollectionDropdown(false);
    if (showCollectionDropdown) {
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    }
  }, [showCollectionDropdown]);

  /* ────── Quick Copy Banner ────── */
  const QuickCopyBanner = () => {
    if (!lastCopied) return null;
    return (
      <div className="relative overflow-hidden border-b border-primary/10 bg-gradient-to-r from-primary/8 via-accent/40 to-accent/10">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-accent-foreground">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium">Quick copy</span>
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate text-xs font-medium text-foreground">
              {lastCopied.brand} · {lastCopied.name}
            </span>
          </div>
          <button
            onClick={() => handleCopy(lastCopied)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-all hover:bg-primary/85 active:scale-95"
          >
            <Copy className="h-3 w-3" />
            Copy again
          </button>
        </div>
      </div>
    );
  };

  /* ────── Stats Row ────── */
  const StatsRow = () => (
    <div className={`grid gap-2 ${showMobile ? "grid-cols-3" : "grid-cols-3"}`}>
      {[
        { label: "Products", value: filteredProducts.length.toString(), icon: Package, color: "text-primary", bg: "bg-primary/8" },
        { label: "Total clicks", value: formatNumber(totalClicks), icon: TrendingUp, color: "text-chart-2", bg: "bg-chart-2/8" },
        { label: "Earned", value: formatCurrency(totalEarned), icon: Sparkles, color: "text-chart-4", bg: "bg-chart-4/8" },
      ].map((stat) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-1.5 rounded-2xl border border-border/40 p-3 sm:p-4 ${stat.bg}`}
        >
          <div className="flex items-center gap-1.5">
            <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
            <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">{stat.label}</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{stat.value}</span>
        </div>
      ))}
    </div>
  );

  /* ────── Product Card (Grid) ────── */
  const ProductCardGrid = ({ product }: { product: Product }) => (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex w-full gap-2 p-3">
            <button
              onClick={() => handleCopy(product)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold backdrop-blur-sm transition-all active:scale-95 ${
                copiedId === product.id
                  ? "bg-chart-2 text-white"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              {copiedId === product.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedId === product.id ? "Copied!" : "Copy link"}
            </button>
            <button
              onClick={() => handleShare(product)}
              className="flex items-center justify-center rounded-full bg-white/90 p-2 backdrop-blur-sm transition-all hover:bg-white active:scale-95"
            >
              <Share2 className="h-3.5 w-3.5 text-foreground" />
            </button>
          </div>
        </div>
        {/* Commission badge */}
        <div className="absolute right-2 top-2">
          <span className="rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm shadow-sm">
            {product.commission}
          </span>
        </div>
      </div>
      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="text-[11px] font-medium tracking-wide text-primary/70 uppercase">{product.brand}</span>
        <span className="line-clamp-1 text-sm font-semibold text-foreground">{product.name}</span>
        <span className="line-clamp-1 text-xs text-muted-foreground">{product.note}</span>
        {/* Metrics */}
        <div className="mt-2 flex items-center gap-3 border-t border-border/30 pt-2">
          <span className="text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">{formatNumber(product.clicks)}</span> clicks
          </span>
          <span className="text-[11px] text-muted-foreground">
            <span className="font-semibold text-chart-2">{formatCurrency(product.earned)}</span>
          </span>
        </div>
      </div>
    </div>
  );

  /* ────── Product Card (List) ────── */
  const ProductCardList = ({ product }: { product: Product }) => (
    <div
      className="group flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-3 transition-all duration-200 hover:border-primary/20 hover:bg-accent/30 sm:gap-4 sm:p-4"
    >
      {/* Image */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-16 sm:w-16">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium tracking-wide text-primary/70 uppercase">{product.brand}</span>
          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">{product.commission}</span>
        </div>
        <span className="truncate text-sm font-semibold text-foreground">{product.name}</span>
        <span className="truncate text-xs text-muted-foreground">{product.note}</span>
      </div>

      {/* Desktop: metrics + actions */}
      {!showMobile && (
        <div className="hidden shrink-0 items-center gap-6 sm:flex">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs font-semibold text-foreground">{formatNumber(product.clicks)}</span>
            <span className="text-[10px] text-muted-foreground">clicks</span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs font-semibold text-chart-2">{formatCurrency(product.earned)}</span>
            <span className="text-[10px] text-muted-foreground">earned</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          onClick={() => handleShare(product)}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Share2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleCopy(product)}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all active:scale-95 ${
            copiedId === product.id
              ? "bg-chart-2 text-white"
              : "bg-primary text-white hover:bg-primary/85 shadow-sm"
          }`}
        >
          {copiedId === product.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copiedId === product.id ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );

  /* ────── Mobile Product Card ────── */
  const MobileProductCard = ({ product }: { product: Product }) => (
    <div
      className="group flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-3 transition-all duration-200 active:scale-[0.98] active:bg-accent/30"
      onClick={() => handleCopy(product)}
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-secondary">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold text-foreground">{product.name}</span>
          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">{product.commission}</span>
        </div>
        <span className="text-[11px] text-primary/60">{product.brand}</span>
        <div className="mt-0.5 flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>{formatNumber(product.clicks)} clicks</span>
          <span>·</span>
          <span className="font-medium text-chart-2">{formatCurrency(product.earned)}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center">
        {copiedId === product.id ? (
          <div className="rounded-full bg-chart-2 p-2 shadow-sm">
            <Check className="h-4 w-4 text-white" />
          </div>
        ) : (
          <div className="rounded-full bg-primary/10 p-2 text-primary transition-colors">
            <Copy className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <div className={`flex min-h-screen flex-col bg-background ${showMobile && !isMobile ? "items-center bg-secondary/50 py-8" : ""}`}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1A1A1A",
            color: "#FFFFFF",
            borderRadius: "16px",
            border: "none",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            backdropFilter: "blur(20px)",
          },
        }}
      />

      {/* Device toggle (only on desktop) */}
      {!isMobile && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full border border-primary/20 bg-card p-1 shadow-lg shadow-primary/10" style={{ backdropFilter: "blur(20px)" }}>
          <button
            onClick={() => setPreviewMode("desktop")}
            className={`rounded-full p-2.5 transition-all ${previewMode === "desktop" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-primary"}`}
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPreviewMode("mobile")}
            className={`rounded-full p-2.5 transition-all ${previewMode === "mobile" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-primary"}`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Mobile shell wrapper when previewing mobile on desktop */}
      <div
        className={
          showMobile && !isMobile
            ? "relative flex w-[390px] flex-col overflow-hidden rounded-[3rem] border-[8px] border-primary/15 bg-background shadow-2xl shadow-primary/10"
            : "flex w-full flex-1 flex-col"
        }
        style={showMobile && !isMobile ? { height: "844px", minHeight: "844px" } : undefined}
      >
        {/* Phone notch */}
        {showMobile && !isMobile && (
          <div className="absolute left-1/2 top-0 z-50 h-7 w-36 -translate-x-1/2 rounded-b-2xl bg-primary/15" />
        )}

        <div className={showMobile && !isMobile ? "flex flex-1 flex-col overflow-y-auto" : "flex flex-1 flex-col"}>
          {/* Quick Copy Banner */}
          <QuickCopyBanner />

          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-border/30 bg-background/80" style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
            <div className={`mx-auto flex flex-col gap-3 px-4 py-4 ${showMobile ? "" : "max-w-5xl sm:px-6"}`}>
              {/* Title row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                    <Link2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">My Links</h1>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* View toggle (only on desktop) */}
                  {!showMobile && (
                    <div className="flex items-center gap-0.5 rounded-full border border-border/50 bg-secondary/50 p-0.5">
                      <button
                        onClick={() => setViewMode("list")}
                        className={`rounded-full p-1.5 transition-all ${viewMode === "list" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <List className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`rounded-full p-1.5 transition-all ${viewMode === "grid" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <LayoutGrid className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Search + Collection filter */}
              <div className={`flex gap-2 ${showMobile ? "flex-col" : "flex-row"}`}>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                  <Input
                    placeholder="Search products, brands..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-10 rounded-full border-border/50 bg-secondary/50 pl-9 text-sm transition-colors focus:border-primary/30 focus:bg-background focus:ring-2 focus:ring-primary/10"
                  />
                  {search && (
                    <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Collection dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCollectionDropdown(!showCollectionDropdown);
                    }}
                    className="inline-flex h-10 w-full items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-accent/30 sm:w-auto"
                  >
                    <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="truncate">{activeCollection === "All Collections" ? "Collection" : activeCollection}</span>
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  </button>
                  {showCollectionDropdown && (
                    <div
                      className="absolute right-0 top-full z-30 mt-1 w-56 overflow-hidden rounded-xl border border-border/50 bg-card shadow-xl"
                      style={{ backdropFilter: "blur(20px)" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {COLLECTIONS.map((col) => (
                        <button
                          key={col}
                          onClick={() => {
                            setActiveCollection(col);
                            setShowCollectionDropdown(false);
                          }}
                          className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
                            activeCollection === col ? "bg-primary/10 font-medium text-primary" : "text-foreground hover:bg-secondary"
                          }`}
                        >
                          {activeCollection === col && <Check className="h-3.5 w-3.5" />}
                          <span className={activeCollection === col ? "" : "pl-5"}>{col}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Category pills */}
            <div className={`mx-auto px-4 pb-3 ${showMobile ? "" : "max-w-5xl sm:px-6"}`}>
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-white shadow-sm"
                        : "border border-border/50 bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className={`mx-auto w-full flex-1 px-4 py-4 ${showMobile ? "" : "max-w-5xl sm:px-6"}`}>
            {/* Stats */}
            <div className="mb-4">
              <StatsRow />
            </div>

            {/* Active filters */}
            {(activeCollection !== "All Collections" || activeCategory !== "All" || search) && (
              <div className="mb-3 flex flex-wrap items-center gap-1.5">
                <SlidersHorizontal className="h-3 w-3 text-muted-foreground" />
                {activeCategory !== "All" && (
                  <Badge variant="secondary" className="gap-1 rounded-full border-primary/15 bg-accent text-accent-foreground text-[11px]">
                    {activeCategory}
                    <button onClick={() => setActiveCategory("All")}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
                {activeCollection !== "All Collections" && (
                  <Badge variant="secondary" className="gap-1 rounded-full border-primary/15 bg-accent text-accent-foreground text-[11px]">
                    {activeCollection}
                    <button onClick={() => setActiveCollection("All Collections")}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
                {search && (
                  <Badge variant="secondary" className="gap-1 rounded-full border-primary/15 bg-accent text-accent-foreground text-[11px]">
                    "{search}"
                    <button onClick={() => setSearch("")}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                  <Search className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">No products found</p>
                  <p className="mt-1 text-xs text-muted-foreground">Try a different search or category</p>
                </div>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                    setActiveCollection("All Collections");
                  }}
                  className="mt-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary/85 active:scale-95"
                >
                  Clear all filters
                </button>
              </div>
            ) : showMobile ? (
              /* Mobile list */
              <div className="flex flex-col gap-2">
                {filteredProducts.map((product) => (
                  <MobileProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : viewMode === "grid" ? (
              /* Desktop Grid */
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCardGrid key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Desktop List */
              <div className="flex flex-col gap-2">
                {filteredProducts.map((product) => (
                  <ProductCardList key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Footer */}
            {filteredProducts.length > 0 && (
              <div className="mt-6 flex items-center justify-center gap-1.5 pb-8 text-[11px] text-muted-foreground/60">
                <Clock className="h-3 w-3" />
                <span>Updated just now</span>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
