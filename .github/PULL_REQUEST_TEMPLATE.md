## What does this PR do?

<!--
Please include a summary of the change and which issue is fixed.
Please also include relevant motivation and context.
List any dependencies that are required for this change.
List all the breaking changes introduced by this pull request.
-->

Fixes #\<issue_number>

## Before submitting

- [ ] Did you make sure **title is self-explanatory** and **the description concisely explains the PR**?
- [ ] Did you make sure your **PR does only one thing**, instead of bundling different changes together?
- [ ] Did you list all the **breaking changes** introduced by this pull request?
- [ ] Did you ensure serverless functions import shared types from `src/types`?
- [ ] Did you ensure no `VITE_` secrets are used in server code under `api/`?
- [ ] Did you ensure `GitHubRepository.id` uses `full_name` (string) consistently?
- [ ] Is the serverless handler typed with `@vercel/node` request/response types?
- [ ] Are cache headers set once with no duplicated response code paths?
- [ ] Does the client log and remove invalid cached items when parse fails?

## Did you have fun?

Make sure you had fun coding 🙃
