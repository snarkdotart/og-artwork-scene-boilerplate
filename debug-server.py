#!/usr/bin/python3
"""
Debug server for serving dev JSON data.
1. Start server.
2. Open browser and go to: http://localhost:9000
3. Edit data in debug.json file to change input data for generative scene.
"""
import json
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path


DEFAULT_DATA = {'text': 'example'}
DEBUG_FILE = Path(os.getenv('DEBUG_FILE', 'debug.json'))


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(self.get_debug_data()).encode())

    def get_debug_data(self):
        if not DEBUG_FILE.exists():
            DEBUG_FILE.write_text(json.dumps(DEFAULT_DATA))
            print('Created debug json file:', DEBUG_FILE.as_posix())
        with DEBUG_FILE.open() as f:
            return json.load(f)


if __name__ == '__main__':
    host = os.getenv('DEBUG_HOST', '0.0.0.0')
    port = int(os.getenv('DEBUG_PORT', 9000))
    httpd = HTTPServer((host, port), SimpleHTTPRequestHandler)
    print(f'Server started at http://{host}:{port}')
    print('Debug data file:', DEBUG_FILE.as_posix())
    httpd.serve_forever()
