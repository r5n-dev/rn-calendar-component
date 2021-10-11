module.exports = {
  git: {
    requireUpstream: false,
    requireCleanWorkingDir: false,
    tag: true,
    tagName: '${version}',
    commit: true,
    commitMessage: 'chore(:bookmark:): v${version}',
  },
  github: {
    release: true,
    releaseName: '${version}',
    draft: false,
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
    },
  },
};
