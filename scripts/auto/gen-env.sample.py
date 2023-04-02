import re
import os

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
ENV_PATH = os.path.join(PROJECT_DIR, '.env')
ENV_SAMPLE_PATH = ENV_PATH + ".sample"

with open(ENV_PATH, 'r') as f:
    new_content = ''
    for line in f:
        new_content += re.sub(r'(?<==)\S+', lambda x: 'x' * len(x[0]), line)
    with open(ENV_SAMPLE_PATH, 'w') as g:
        g.write(new_content)

