import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Toaster, toast } from "sonner";
import {
  Search,
  Copy,
  Check,
  Share2,
  Link2,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  category: string;
  note: string;
  affiliateLink: string;
  listName: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wool Runners",
    brand: "Allbirds",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    category: "Fashion",
    note: "Day 1 favorite — super comfy for all-day wear",
    affiliateLink: "https://allbirds.com/ref/creator123",
    listName: "Daily Essentials",
  },
  {
    id: "2",
    name: "Dunk Low Retro",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1612833603922-5c43e2e80310?w=200&h=200&fit=crop",
    category: "Fashion",
    note: "Goes with everything",
    affiliateLink: "https://nike.com/ref/creator123",
    listName: "Daily Essentials",
  },
  {
    id: "3",
    name: "Chuck Taylor All Stars",
    brand: "Converse",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=200&h=200&fit=crop",
    category: "Fashion",
    note: "Classic pick for any outfit",
    affiliateLink: "https://converse.com/ref/creator123",
    listName: "Daily Essentials",
  },
  {
    id: "4",
    name: "AirPods Pro 2",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop",
    category: "Tech",
    note: "Best noise canceling under $250",
    affiliateLink: "https://apple.com/ref/creator123",
    listName: "Tech Picks",
  },
  {
    id: "5",
    name: "Stanley Quencher H2.0",
    brand: "Stanley",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
    category: "Home",
    note: "The one that went viral — worth the hype",
    affiliateLink: "https://stanley.com/ref/creator123",
    listName: "Home Favorites",
  },
  {
    id: "6",
    name: "Glow Recipe Dew Drops",
    brand: "Glow Recipe",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop",
    category: "Beauty",
    note: "Holy grail serum for that dewy look",
    affiliateLink: "https://glowrecipe.com/ref/creator123",
    listName: "Beauty Must-Haves",
  },
  {
    id: "7",
    name: "Kindle Paperwhite",
    brand: "Amazon",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78f08c?w=200&h=200&fit=crop",
    category: "Tech",
    note: "Changed my reading habits completely",
    affiliateLink: "https://amazon.com/ref/creator123",
    listName: "Tech Picks",
  },
  {
    id: "8",
    name: "Cloud Slides",
    brand: "Pillow Slides",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=200&h=200&fit=crop",
    category: "Fashion",
    note: "Like walking on clouds — not exaggerating",
    affiliateLink: "https://pillowslides.com/ref/creator123",
    listName: "Daily Essentials",
  },
  {
    id: "9",
    name: "Dyson Airwrap",
    brand: "Dyson",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54571a9f7?w=200&h=200&fit=crop",
    category: "Beauty",
    note: "Pricey but SO worth it for styling",
    affiliateLink: "https://dyson.com/ref/creator123",
    listName: "Beauty Must-Haves",
  },
  {
    id: "10",
    name: "Linen Duvet Cover",
    brand: "Brooklinen",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop",
    category: "Home",
    note: "Upgraded my whole bedroom aesthetic",
    affiliateLink: "https://brooklinen.com/ref/creator123",
    listName: "Home Favorites",
  },
];

const CATEGORIES = ["All", "Fashion", "Tech", "Home", "Beauty"];

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        search === "" ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.note.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const handleCopy = async (product: Product) => {
    try {
      await navigator.clipboard.writeText(product.affiliateLink);
      setCopiedId(product.id);
      toast.success("Link copied!", {
        description: `${product.brand} — ${product.name}`,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async (product: Product) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} by ${product.brand}`,
          text: product.note,
          url: product.affiliateLink,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy(product);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Toaster: Benable dark theme toast — dark bg, white text, md radius */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1A1A1A",
            color: "#FFFFFF",
            borderRadius: "12px",
            border: "none",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          },
        }}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-10 bg-background"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
      >
        <div className="mx-auto flex max-w-lg flex-col gap-3 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center"
                style={{ borderRadius: "8px", background: "#AE94F9" }}
              >
                <Link2 className="h-4 w-4 text-white" />
              </div>
              {/* Title: Helvetica Neue Bold, title-xs (20px) */}
              <h1
                className="font-bold"
                style={{ fontSize: "20px", color: "#1A1A1A" }}
              >
                My Links
              </h1>
            </div>
            {/* Product count tag — Benable Tag: outlined, neutral */}
            <span
              className="inline-flex items-center gap-1 font-medium"
              style={{
                fontSize: "12px",
                color: "#7F7F7F",
                border: "1px solid #ECECEC",
                borderRadius: "40px",
                padding: "4px 12px",
              }}
            >
              {MOCK_PRODUCTS.length} products
            </span>
          </div>

          {/* Search — Benable Input: Left Icon variant */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "#B3B3B3" }}
            />
            <Input
              placeholder="Search products or brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              style={{
                borderRadius: "12px",
                border: "1px solid #ECECEC",
                fontSize: "14px",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            />
          </div>
        </div>
      </header>

      {/* Category Chips — Benable Chips component: pill shape, brand purple selected */}
      <div style={{ borderBottom: "1px solid #ECECEC" }}>
        <ScrollArea className="mx-auto max-w-lg">
          <div className="flex gap-2 px-4 py-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  borderRadius: "40px",
                  padding: "6px 16px",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  transition: "all 0.15s ease",
                  flexShrink: 0,
                  ...(activeCategory === category
                    ? {
                        background: "#AE94F9",
                        color: "#FFFFFF",
                        border: "1px solid #AE94F9",
                      }
                    : {
                        background: "transparent",
                        color: "#1A1A1A",
                        border: "1px solid #ECECEC",
                      }),
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Product List */}
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-3">
        {filteredProducts.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div
              className="flex h-12 w-12 items-center justify-center"
              style={{ borderRadius: "50%", background: "#F5F5F5" }}
            >
              <Search className="h-5 w-5" style={{ color: "#B3B3B3" }} />
            </div>
            <div>
              <p
                className="font-medium"
                style={{ fontSize: "16px", color: "#1A1A1A" }}
              >
                No products found
              </p>
              <p style={{ fontSize: "14px", color: "#7F7F7F" }}>
                Try a different search or category
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3"
                style={{
                  borderRadius: "16px",
                  border: "1px solid #ECECEC",
                  background: "#FFFFFF",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#F5F3FC")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#FFFFFF")
                }
              >
                {/* Product Image — sm radius (8px) */}
                <div
                  className="relative h-16 w-16 shrink-0 overflow-hidden"
                  style={{ borderRadius: "8px", background: "#F5F5F5" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="min-w-0 flex-1">
                  <span
                    className="block truncate font-medium"
                    style={{ fontSize: "14px", color: "#1A1A1A" }}
                  >
                    {product.name}
                  </span>
                  <span
                    className="block"
                    style={{ fontSize: "12px", color: "#7F7F7F" }}
                  >
                    {product.brand}
                  </span>
                  <span
                    className="mt-0.5 block truncate"
                    style={{ fontSize: "12px", color: "#B3B3B3" }}
                  >
                    {product.note}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1.5">
                  {/* Share — ghost icon button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    style={{ color: "#7F7F7F", borderRadius: "8px" }}
                    onClick={() => handleShare(product)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  {/* Copy — Benable Button Primary (brand purple, pill shape) */}
                  <button
                    onClick={() => handleCopy(product)}
                    className="inline-flex items-center justify-center gap-1.5 font-medium"
                    style={{
                      borderRadius: "40px",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontFamily:
                        "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      background:
                        copiedId === product.id ? "#2BAF87" : "#AE94F9",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                  >
                    {copiedId === product.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List source footer */}
        {filteredProducts.length > 0 && (
          <div className="mt-4 pb-6 text-center">
            <p style={{ fontSize: "12px", color: "#B3B3B3" }}>
              From{" "}
              {[...new Set(filteredProducts.map((p) => p.listName))].join(", ")}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
