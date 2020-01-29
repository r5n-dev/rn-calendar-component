module.exports = {
  git: {
    commitMessage: 'chore(release): :bookmark: Release ${version}',
    push: true,
    requireCleanWorkingDir: false,
    requireUpstream: true,
    tag: true,
    tagName: 'v${version}',
  },
  github: {
    release: true,
    releaseName: 'Release ${version}',
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
