module.exports = {
  git: {
    requireUpstream: false,
    requireCleanWorkingDir: false,
    tag: true,
    tagName: 'v${version}',
    commit: true,
    commitMessage: 'chore(:bookmark:): rn-calendar-component ${version}',
  },
  github: {
    release: true,
    releaseName: '${version}',
    draft: false,
  },
  npm: {
    publish: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
    },
  },
};
