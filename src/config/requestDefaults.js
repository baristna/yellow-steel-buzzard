const baseParams = {
  account: 1,
  exclude_inactive: true,
}

const timeParams = {
  ...baseParams,
  for: [
    {
      repositories: [
        'github.com/athenianco/athenian-api',
        'github.com/athenianco/athenian-webapp',
        'github.com/athenianco/infrastructure',
        'github.com/athenianco/metadata',
      ],
    },
  ],
  granularities: ['day'],
}

const distParams = {
  ...baseParams,
  for: [
    {
      repositories: [
        'github.com/athenianco/athenian-api',
        'github.com/athenianco/athenian-webapp',
        'github.com/athenianco/infrastructure',
        'github.com/athenianco/metadata',
      ],
      repogroups: [[0], [1], [2], [3]],
    },
  ],
  granularities: ['all'],
}

export default {
  timeParams,
  distParams,
}
