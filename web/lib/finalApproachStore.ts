"use client";

import type { Letter } from "@/data/finalApproach/types";

/**
 * A tiny localStorage-backed external store for Final Approach answers, one
 * instance per subject, read via `useSyncExternalStore`.
 *
 * This shape — rather than "read localStorage in a useEffect and setState" —
 * exists to get free, correct SSR/hydration behaviour: React calls
 * `getServerSnapshot` for both the server render and the client's first
 * hydration pass (so they always agree, static export or not), then swaps to
 * `getSnapshot` once mounted. A manual effect-based load would either mean a
 * visible second render after mount (fine) or fight the "don't setState
 * synchronously inside an effect" lint rule for no benefit, since this store
 * already does the sync/re-render dance `useSyncExternalStore` expects.
 *
 * Writes are debounced, then flushed immediately on `pagehide` and on the
 * tab going hidden — a reload or tab-close inside the debounce window would
 * otherwise silently drop the most recent answer, which the spec explicitly
 * rules out ("no answer should ever be lost on refresh").
 */

export type AnswerState = {
  /** MCQ */
  selected?: Letter;
  checked?: boolean;
  /** Written */
  text?: string;
  revealed?: boolean;
  band?: string;
};

export type AnswersMap = Record<string, AnswerState>;

export type FinalApproachStore = {
  subscribe(callback: () => void): () => void;
  getSnapshot(): AnswersMap;
  getServerSnapshot(): AnswersMap;
  setAnswer(id: string, patch: Partial<AnswerState>): void;
  updateAnswers(update: (prev: AnswersMap) => AnswersMap): void;
};

const EMPTY: AnswersMap = {};
const SAVE_DEBOUNCE_MS = 300;

const stores = new Map<string, FinalApproachStore>();

function createStore(subjectSlug: string): FinalApproachStore {
  const storageKey = `finalApproach:${subjectSlug}:v1`;

  let cache: AnswersMap = EMPTY;
  let cacheLoaded = false;
  let flushListenersRegistered = false;
  let saveTimer: ReturnType<typeof setTimeout> | null = null;
  const listeners = new Set<() => void>();

  /** localStorage can throw (private browsing, quota, disabled) or simply be
   * empty — every access here is wrapped so a bad environment degrades to
   * "nothing persists this session" rather than a crashed page. */
  function readFromStorage(): AnswersMap {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return EMPTY;
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed as AnswersMap;
      return EMPTY;
    } catch {
      return EMPTY;
    }
  }

  function writeNow() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(cache));
    } catch {
      // Nothing further to do — the session just won't survive a reload.
    }
  }

  function flushPersist() {
    if (saveTimer) {
      clearTimeout(saveTimer);
      saveTimer = null;
    }
    writeNow();
  }

  function persist() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTimer = null;
      writeNow();
    }, SAVE_DEBOUNCE_MS);
  }

  function ensureFlushListeners() {
    if (flushListenersRegistered || typeof window === "undefined") return;
    flushListenersRegistered = true;
    // pagehide covers reload/navigate/close; visibilitychange also catches
    // switching tabs or backgrounding on mobile, where pagehide can be late
    // or skipped entirely.
    window.addEventListener("pagehide", flushPersist);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flushPersist();
    });
  }

  function ensureLoaded() {
    if (cacheLoaded) return;
    cacheLoaded = true;
    if (typeof window !== "undefined") {
      cache = readFromStorage();
      ensureFlushListeners();
    }
  }

  function notify() {
    for (const l of listeners) l();
  }

  return {
    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    getSnapshot() {
      ensureLoaded();
      return cache;
    },
    // Used for the server render and the client's first hydration pass —
    // must stay a stable, storage-free reference so the two always match.
    getServerSnapshot() {
      return EMPTY;
    },
    setAnswer(id, patch) {
      ensureLoaded();
      cache = { ...cache, [id]: { ...cache[id], ...patch } };
      notify();
      persist();
    },
    updateAnswers(update) {
      ensureLoaded();
      cache = update(cache);
      notify();
      persist();
    },
  };
}

/** One store per subject slug, memoized so every component reading the same
 * subject shares the same in-memory cache and listener set. */
export function getFinalApproachStore(subjectSlug: string): FinalApproachStore {
  let store = stores.get(subjectSlug);
  if (!store) {
    store = createStore(subjectSlug);
    stores.set(subjectSlug, store);
  }
  return store;
}
