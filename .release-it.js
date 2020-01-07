module.exports = {
  safeBump: false,
  git: {
    commitMessage: ':bookmark: Release ${version}',
    requireUpstream: true,
    tagName: 'v${version}',
  },
  github: {
    release: true,
    draft: true,
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
    },
  },
};
