import http.server
from functools import partial

PORT = 5599
DIRECTORY = r"C:\9club"

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

if __name__ == "__main__":
    handler = partial(NoCacheHandler, directory=DIRECTORY)
    server = http.server.ThreadingHTTPServer(("", PORT), handler)
    print(f"9club serving (no-cache, threaded) on http://localhost:{PORT}")
    server.serve_forever()
