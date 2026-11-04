# Install the GitHub profile README

These files are a draft for the profile repository, not the portfolio website README.

1. Create or open the public repository `sahan24854/sahan24854`. GitHub uses that exact repository name for your profile README.
2. Copy this folder's README.md into the root of that repository. Review any existing README before replacing it.
3. Copy `.github/workflows/contribution-snake.yml` into the same path in that repository.
4. In its Actions tab, run “Generate contribution animation”. It uses GitHub's automatically supplied GITHUB_TOKEN; no personal token or API key is needed.
5. Once the workflow succeeds, the `output` branch contains both contribution SVGs and the README animation will load. Until then, that image will be unavailable. It refreshes daily while scheduled workflows are enabled.

The typing animation, technology icons, and badges are externally hosted images. The snake is generated from sahan24854's own contribution activity. No Medium, Twitter, Discord, or YouTube accounts have been assumed.

Animation sources: https://github.com/Platane/snk and https://github.com/DenverCoder1/readme-typing-svg.
