export default  {
  'pr-wip-time': {
    name: 'Work in progress time',
    description: 'From the 1st commit of the pull request until the review is requested.',
  },
  'pr-wip-count': {
    name: 'Work in progress count',
    description: 'Number of work in progress tickets, counting in the PR Wip Time.',
  },
  'pr-review-time': {
    name: 'Review time',
    description: 'From the moment the review is requested until the pull request is approved.',
  },
  'pr-review-count': {
    name: 'Review count',
    description: 'Number of in review tickets, counting in the PR Review Time.',
  },
  'pr-merging-time': {
    name: 'Merging time',
    description: 'From the moment the pull request is approved until it is merged.',
  },
  'pr-merging-count': {
    name: 'Merging count',
    description: 'Number of merged tickets, counting in the PR Merging Time.',
  },
  'pr-release-time': {
    name: 'Release time',
    description: 'From the moment the pull request gets merged until it is released.',
  },
  'pr-release-count': {
    name: 'Release count',
    description: 'Number of released tickets, counting in the PR Release Time.',
  },
  'pr-lead-time': {
    name: 'Lead time',
    description: 'Elapsed time between the ticket moved to In Progress and the issue being resolved.',
  },
  'pr-lead-count': {
    name: 'Lead count',
    description: 'Number of pull requests, counting in the PR Lead Time.',
  },
  'pr-cycle-time': {
    name: 'Cycle time',
    description: 'Elapsed time between the creation of the 1st commit in a pull request and the code being used in production.',
  },
  'pr-cycle-count': {
    name: 'Cycle count',
    description: 'Number of pull requests from 1st commit to released.',
  },
  'pr-opened': {
    name: 'Opened ',
    description: 'Number of open pull requests.',
  },
  'pr-reviewed': {
    name: 'Reviewed',
    description: 'Number of reviewed pull requests.',
  },
  'pr-not-reviewed': {
    name: 'Not reviewed',
    description: 'Number of not-reviewed pull requests.',
  },
  'pr-merged': {
    name: 'Merged',
    description: 'Number of merged pull requests.',
  },
  'pr-rejected': {
    name: 'Rejected',
    description: 'Number of rejected pull requests.',
  },
  'pr-closed': {
    name: 'Closed',
    description: 'Number of closed pull requests.',
  },
  'pr-done': {
    name: 'Done',
    description: 'Number of pull requests that is done.',
  },
}
