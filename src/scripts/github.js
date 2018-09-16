import packageJson from '../../package'
import axios from 'axios'

export const GITHUB_DOMAIN = 'https://github.com/'
export const GITHUB_API = 'https://api.github.com/'

export async function fetchContributors() {
  return await axios.get(GITHUB_API + `repos/${packageJson.repository.split(':')[1]}/contributors`)
}
