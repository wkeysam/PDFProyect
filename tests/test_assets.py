import os
import glob
import unittest
from html.parser import HTMLParser


class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and 'href' in attrs:
            self.assets.append(attrs['href'])
        elif tag == 'script' and 'src' in attrs:
            self.assets.append(attrs['src'])


def collect_assets(html_path):
    parser = AssetParser()
    with open(html_path, 'r', encoding='utf-8') as f:
        parser.feed(f.read())
    return parser.assets


class AssetTest(unittest.TestCase):
    def test_local_assets_exist(self):
        template_dir = os.path.join(os.path.dirname(__file__), '..', 'templates')
        html_files = glob.glob(os.path.join(template_dir, '*.html'))
        for html_file in html_files:
            assets = collect_assets(html_file)
            for asset in assets:
                if asset.startswith('http://') or asset.startswith('https://'):
                    continue
                abs_path = os.path.normpath(os.path.join(os.path.dirname(html_file), asset))
                self.assertTrue(os.path.isfile(abs_path), f'{html_file} references missing asset {asset}')


if __name__ == '__main__':
    unittest.main()
