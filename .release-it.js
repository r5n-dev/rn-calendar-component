module.exports = {
  git: {
    requireUpstream: false,
    requireCleanWorkingDir: false,
    tag: true,
    tagName: '${version}',
    commit: true,
    commitMessage: 'chore(:bookmark:): rn-calendar ${version}',
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
      infile: 'CHANGELOG.md',
    },
  },
};
