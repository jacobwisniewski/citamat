type Env = {
  ASSETS: Fetcher;
};

export default {
  fetch: (request: Request, env: Env): Promise<Response> => env.ASSETS.fetch(request),
} satisfies ExportedHandler<Env>;
