import { createSelector } from 'reselect'

const selectDirectory = state => {
  return state.directory
}

export const selectDirectorySection = createSelector(
  [selectDirectory],
  directory => {
    return directory.sections
  }
)