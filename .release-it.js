module.exports = {
  git: {
    commitMessage: 'chore(release): :bookmark: Release ${version}',
    push: true,
    requireUpstream: false,
    tag: true,
    tagName: 'v${version}',
  },
  github: {
    release: true,
    releaseName: 'rn-calendar@${version}',
    draft: false,
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
    },
  },
};
