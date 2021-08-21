import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
const { ENV = 'local' } = process.env

const YAML_CONFIG_FILENAME = `${ENV}.yml`

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>
}
