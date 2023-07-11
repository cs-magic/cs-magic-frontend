import path from 'path'

export const LIB_DIR = path.dirname(__filename)
export const SRC_DIR = path.dirname(LIB_DIR)
export const PROJECT_DIR = path.dirname(SRC_DIR)


export const ENV_PATH = path.join(PROJECT_DIR, '.env')
