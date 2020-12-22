module.exports = {
  git: {
    requireUpstream: false,
    requireCleanWorkingDir: false,
    tag: true,
    tagName: '${version}',
    commit: true,
    commitMessage: 'chore(:bookmark:): rn-calendar-component ${version}',
  },
  github: {
    release: true,
    releaseName: 'rn-calendar-component@${version}',
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
