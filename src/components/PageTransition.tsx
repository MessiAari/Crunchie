"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { primaryIngredients, secondaryIngredients, type TransitionAsset } from "./pageTransitionAssets";
import styles from "./PageTransition.module.css";

const TAP_ACKNOWLEDGEMENT_MS = 50;
const WAVE_DURATION_MS = 700;
const MAX_INSTANCE_DELAY_MS = 16;
const PEAK_PROGRESS = 0.5;
const MIN_COLUMNS = 3;
const MAX_COLUMNS = 16;
const MAX_INSTANCES = 320;
const SECONDARY_RATIO = 0.22;
const PRIMARY_SELECTION_WEIGHTS = [
  { family: "almond", weight: 30 },
  { family: "pistachio", weight: 25 },
  { family: "cashew", weight: 25 },
] as const;
const SECONDARY_SELECTION_WEIGHTS = [
  { family: "pumpkin-seed", weight: 8 },
  { family: "raisin", weight: 6 },
  { family: "cranberry", weight: 6 },
] as const;
const DEPTH_TIERS = [
  { name: "foreground", opacity: 1, blur: 0 },
  { name: "middle", opacity: 0.93, blur: 0 },
  { name: "background", opacity: 0.8, blur: 1 },
] as const;

type WavePhase = "idle" | "acknowledging" | "primed" | "running" | "resetting";

type IngredientInstance = {
  asset: TransitionAsset;
  id: string;
  left: number;
  top: number;
  delay: number;
  drift: number;
  driftIn: number;
  driftOut: number;
  enter: number;
  enterNear: number;
  exit: number;
  exitNegative: number;
  exitNear: number;
  verticalOffset: number;
  depthOpacity: number;
  depthBlur: number;
  layer: "primary" | "secondary";
};

type WaveRequest = {
  id: number;
  href: string;
  phase: Exclude<WavePhase, "idle">;
};

type PageTransitionContextValue = {
  requestNavigation: (href: string) => boolean;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function createRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function average(assets: readonly TransitionAsset[], key: "width" | "height") {
  return assets.reduce((sum, asset) => sum + asset[key], 0) / assets.length;
}

function ingredientFamily(asset: TransitionAsset) {
  return asset.id.slice(0, asset.id.lastIndexOf("-"));
}

function chooseWeightedIngredient(
  assets: readonly TransitionAsset[],
  weights: readonly { family: string; weight: number }[],
  random: () => number,
) {
  const threshold = random() * weights.reduce((total, option) => total + option.weight, 0);
  let cumulativeWeight = 0;
  const selected = weights.find((option) => {
    cumulativeWeight += option.weight;
    return threshold < cumulativeWeight;
  }) ?? weights[weights.length - 1];
  const familyAssets = assets.filter((asset) => ingredientFamily(asset) === selected.family);
  return familyAssets[Math.floor(random() * familyAssets.length)];
}

function createInstance(
  asset: TransitionAsset,
  id: string,
  left: number,
  top: number,
  height: number,
  random: () => number,
  layer: IngredientInstance["layer"],
): IngredientInstance {
  const positionOffsetX = (random() - 0.5) * 36;
  const positionOffsetY = (random() - 0.5) * 24;
  const finalLeft = left + positionOffsetX;
  const finalTop = top + positionOffsetY;
  const enter = Math.max(height - finalTop + 24, 24);
  const exit = Math.max(finalTop + asset.height + 24, 24);
  const drift = (random() < 0.5 ? -1 : 1) * (7 + random() * 4);
  const depth = DEPTH_TIERS[Math.floor(random() * DEPTH_TIERS.length)];

  return {
    asset,
    id,
    left: finalLeft,
    top: finalTop,
    delay: Math.round(random() * MAX_INSTANCE_DELAY_MS),
    drift,
    driftIn: drift * 0.66,
    driftOut: drift * 0.44,
    enter,
    enterNear: enter * 0.006,
    exit,
    exitNegative: -exit,
    exitNear: -exit * 0.006,
    verticalOffset: (random() - 0.5) * 12,
    depthOpacity: depth.opacity,
    depthBlur: depth.blur,
    layer,
  };
}

function pocketScore(candidate: { left: number; top: number }, primary: IngredientInstance[]) {
  return primary.reduce((nearest, instance) => {
    const centerX = instance.left + instance.asset.width / 2;
    const centerY = instance.top + instance.asset.height / 2;
    return Math.min(nearest, Math.hypot(candidate.left - centerX, candidate.top - centerY));
  }, Number.POSITIVE_INFINITY);
}

function buildIngredientWave(width: number, height: number, seed: number): IngredientInstance[] {
  if (!width || !height) return [];

  const random = createRandom(seed);
  const averagePrimaryWidth = average(primaryIngredients, "width");
  const averagePrimaryHeight = average(primaryIngredients, "height");
  const columnCount = clamp(Math.ceil(width / averagePrimaryWidth), MIN_COLUMNS, MAX_COLUMNS);
  const pitch = width / columnCount;
  const primaryBudget = Math.floor(MAX_INSTANCES / (1 + SECONDARY_RATIO));
  const rowsNeeded = Math.ceil((height + averagePrimaryHeight) / (averagePrimaryHeight * 0.9));
  const rowsPerColumn = Math.max(5, Math.min(rowsNeeded, Math.floor(primaryBudget / (columnCount * 2))));
  const layers: IngredientInstance[][][] = [];

  for (let layerIndex = 0; layerIndex < 2; layerIndex += 1) {
    const layerColumns: IngredientInstance[][] = [];
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      const column: IngredientInstance[] = [];
      const layerOffset = layerIndex === 0 ? 0 : pitch / 2;
      const columnCenter = (columnIndex + 0.5) * pitch + layerOffset + (random() - 0.5) * 12;
      let peakY = 0;

      for (let rowIndex = 0; rowIndex < rowsPerColumn; rowIndex += 1) {
        // Pick per instance, not per column, so ingredient families stay mixed.
        const asset = chooseWeightedIngredient(primaryIngredients, PRIMARY_SELECTION_WEIGHTS, random);
        if (rowIndex === 0) peakY = -asset.height * (0.78 + random() * 0.12) + layerIndex * averagePrimaryHeight * 0.5;
        const instance = createInstance(
          asset,
          `primary-${layerIndex}-${columnIndex}-${rowIndex}-${asset.id}`,
          columnCenter - asset.width / 2,
          peakY,
          height,
          random,
          "primary",
        );
        column.push(instance);
        peakY += asset.height * (0.75 + random() * 0.1);
      }
      layerColumns.push(column);
    }
    layers.push(layerColumns);
  }

  const primary = layers.flat(2);
  // Build pockets only after both masonry layers exist. The candidates are the
  // seams between rows, adjacent columns, and the two offset layers; scoring
  // favors the least dense of those actual coordinates.
  const gapCandidates: Array<{ left: number; top: number }> = [];
  for (const layerColumns of layers) {
    for (let columnIndex = 0; columnIndex < layerColumns.length; columnIndex += 1) {
      const column = layerColumns[columnIndex];
      for (let rowIndex = 0; rowIndex < column.length - 1; rowIndex += 1) {
        const upper = column[rowIndex];
        const lower = column[rowIndex + 1];
        gapCandidates.push({
          left: upper.left + upper.asset.width / 2,
          top: (upper.top + upper.asset.height + lower.top) / 2,
        });
      }
      const neighbor = layerColumns[columnIndex + 1];
      if (!neighbor) continue;
      for (let rowIndex = 0; rowIndex < Math.min(column.length, neighbor.length); rowIndex += 1) {
        const left = column[rowIndex];
        const right = neighbor[rowIndex];
        gapCandidates.push({
          left: (left.left + left.asset.width / 2 + right.left + right.asset.width / 2) / 2,
          top: (left.top + right.top) / 2 + Math.min(left.asset.height, right.asset.height) * 0.35,
        });
      }
    }
  }
  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    const baseColumn = layers[0][columnIndex];
    const offsetColumn = layers[1][columnIndex];
    for (let rowIndex = 0; rowIndex < Math.min(baseColumn.length, offsetColumn.length); rowIndex += 1) {
      const base = baseColumn[rowIndex];
      const offset = offsetColumn[rowIndex];
      gapCandidates.push({
        left: (base.left + base.asset.width / 2 + offset.left + offset.asset.width / 2) / 2,
        top: (base.top + base.asset.height / 2 + offset.top + offset.asset.height / 2) / 2,
      });
    }
  }

  const targetSecondary = Math.min(Math.floor(primary.length * SECONDARY_RATIO), MAX_INSTANCES - primary.length);
  const secondary = gapCandidates
    .map((candidate) => ({ ...candidate, score: pocketScore(candidate, primary) + random() * 8 }))
    .sort((first, second) => second.score - first.score)
    .slice(0, targetSecondary)
    .map((gap, index) => {
    const asset = chooseWeightedIngredient(secondaryIngredients, SECONDARY_SELECTION_WEIGHTS, random);
    const top = gap.top - asset.height / 2;
    return createInstance(asset, `secondary-${index}-${asset.id}`, gap.left - asset.width / 2, top, height, random, "secondary");
  });

  return [...primary, ...secondary];
}

function useViewportIngredients(wave: WaveRequest | null) {
  const [ingredients, setIngredients] = useState<IngredientInstance[]>([]);

  useEffect(() => {
    const updateIngredients = () => {
      if (wave) return;
      setIngredients(buildIngredientWave(window.innerWidth, window.innerHeight, Date.now()));
    };

    updateIngredients();
    window.addEventListener("resize", updateIngredients, { passive: true });
    return () => window.removeEventListener("resize", updateIngredients);
  }, [wave]);

  return ingredients;
}

function IngredientWave({ ingredients, phase }: { ingredients: IngredientInstance[]; phase: WavePhase }) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.wave} ${styles[phase]}`}
      style={{ "--wave-duration": `${WAVE_DURATION_MS}ms` } as CSSProperties}
    >
      {ingredients.map((ingredient) => {
        const ingredientStyle = {
          left: `${ingredient.left}px`,
          top: `${ingredient.top}px`,
          "--delay": `${ingredient.delay}ms`,
          "--drift": `${ingredient.drift}px`,
          "--drift-in": `${ingredient.driftIn}px`,
          "--drift-out": `${ingredient.driftOut}px`,
          "--enter": `${ingredient.enter}px`,
          "--enter-near": `${ingredient.enterNear}px`,
          "--exit": `${ingredient.exit}px`,
          "--exit-negative": `${ingredient.exitNegative}px`,
          "--exit-near": `${ingredient.exitNear}px`,
          "--vertical-offset": `${ingredient.verticalOffset}px`,
          "--depth-opacity": ingredient.depthOpacity,
          "--depth-blur": `${ingredient.depthBlur}px`,
        } as CSSProperties;

        return (
          // Native dimensions come only from the PNG-derived HTML attributes.
          // CSS never sets a transition ingredient's width or height.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            className={`${styles.ingredient} ${ingredient.layer === "secondary" ? styles.secondary : styles.primary}`}
            data-transition-ingredient
            decoding="async"
            draggable={false}
            height={ingredient.asset.height}
            key={ingredient.id}
            src={ingredient.asset.src}
            style={ingredientStyle}
            width={ingredient.asset.width}
          />
        );
      })}
    </div>
  );
}

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [wave, setWave] = useState<WaveRequest | null>(null);
  const ingredients = useViewportIngredients(wave);

  const requestNavigation = useCallback((href: string) => {
    if (wave) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return true;
    }

    const id = Date.now();
    setWave({ id, href, phase: "acknowledging" });
    return true;
  }, [router, wave]);

  useEffect(() => {
    if (!wave || wave.phase !== "acknowledging") return;
    const acknowledgementTimer = window.setTimeout(() => {
      setWave((current) => current?.id === wave.id ? { ...current, phase: "primed" } : current);
    }, TAP_ACKNOWLEDGEMENT_MS);
    return () => window.clearTimeout(acknowledgementTimer);
  }, [wave]);

  useEffect(() => {
    if (!wave || wave.phase !== "primed") return;
    const frame = window.requestAnimationFrame(() => {
      setWave((current) => current?.id === wave.id ? { ...current, phase: "running" } : current);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [wave]);

  useEffect(() => {
    if (!wave || wave.phase !== "running") return;

    // Route swapping is intentionally timed at the center of the 46–54% density
    // window, not from an animation-complete callback.
    const routeTimer = window.setTimeout(() => {
      router.push(wave.href);
    }, WAVE_DURATION_MS * PEAK_PROGRESS);
    const resetTimer = window.setTimeout(() => {
      setWave((current) => current?.id === wave.id ? { ...current, phase: "resetting" } : current);
    }, WAVE_DURATION_MS + MAX_INSTANCE_DELAY_MS);

    return () => {
      window.clearTimeout(routeTimer);
      window.clearTimeout(resetTimer);
    };
  }, [router, wave]);

  useEffect(() => {
    if (!wave || wave.phase !== "resetting") return;
    const frame = window.requestAnimationFrame(() => setWave(null));
    return () => window.cancelAnimationFrame(frame);
  }, [wave]);

  const contextValue = useMemo(() => ({ requestNavigation }), [requestNavigation]);
  const phase: WavePhase = wave?.phase ?? "idle";

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}
      <IngredientWave ingredients={ingredients} phase={phase} />
    </PageTransitionContext.Provider>
  );
}

type TransitionLinkProps = ComponentProps<typeof NextLink>;

function hrefToString(href: TransitionLinkProps["href"]) {
  if (typeof href === "string") return href;
  if (href instanceof URL) return href.toString();
  const queryEntries = Object.entries(href.query ?? {}).flatMap(([key, value]) => {
    if (Array.isArray(value)) return value.map((item) => [key, String(item)]);
    return value === undefined ? [] : [[key, String(value)]];
  });
  const query = new URLSearchParams(queryEntries).toString();
  return `${href.pathname ?? ""}${query ? `?${query}` : ""}${href.hash ?? ""}`;
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(function TransitionLink(
  { href, onClick, target, download, ...props },
  ref,
) {
  const context = useContext(PageTransitionContext);

  return (
    <NextLink
      {...props}
      download={download}
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        if (
          event.defaultPrevented
          || event.button !== 0
          || event.metaKey
          || event.ctrlKey
          || event.shiftKey
          || event.altKey
          || target
          || download
          || !context
        ) return;

        const destination = new URL(hrefToString(href), window.location.href);
        const current = new URL(window.location.href);
        const nextHref = `${destination.pathname}${destination.search}${destination.hash}`;
        const currentHref = `${current.pathname}${current.search}${current.hash}`;
        if (destination.origin !== current.origin || nextHref === currentHref) return;

        event.preventDefault();
        context.requestNavigation(nextHref);
      }}
      ref={ref}
      target={target}
    />
  );
});

TransitionLink.displayName = "TransitionLink";
