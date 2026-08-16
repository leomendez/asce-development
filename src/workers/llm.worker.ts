/// <reference lib="webworker" />
import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

/**
 * All inference runs here, off the main thread. WebLLM ships the message
 * protocol, so this file only has to own the handler's lifetime.
 *
 * The heavy `@mlc-ai/web-llm` import lives in this module rather than in any
 * component, and the worker itself is only constructed when a visitor opts in
 * — so page load costs nothing for everyone else.
 */
const handler = new WebWorkerMLCEngineHandler();

self.onmessage = (event: MessageEvent) => {
  handler.onmessage(event);
};
