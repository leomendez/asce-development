import { loadCorpus } from "./corpus";
import type { Hit } from "./relevance";
import type { SearchIndex } from "./search";

type Engine = typeof import("./search");

let enginePromise: Promise<{ engine: Engine; index: SearchIndex }> | null = null;

/**
 * Built lazily on first query — a few milliseconds at this corpus size. The
 * `./search` import is dynamic so MiniSearch stays out of the initial bundle:
 * most visitors never ask a question, and the engine is useless until they do.
 */
const getEngine = () =>
  (enginePromise ??= Promise.all([loadCorpus(), import("./search")]).then(
    ([{ chunks }, engine]) => ({ engine, index: engine.createIndex(chunks) }),
  ));

export const search = async (query: string): Promise<Hit[]> => {
  if (!query.trim()) return [];
  const { engine, index } = await getEngine();
  return engine.runSearch(index, query);
};
