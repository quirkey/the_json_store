#!/usr/bin/env python

'''
Basic static file server for usage with Sammy's
"The JSON Store" tutorial, to avoid Chrome
XHR restrictions on 'file' AJAX calls.

'''

import sys
import SimpleHTTPServer,BaseHTTPServer

usage_help = (
'''usage: python server.py [port]
starting server, to kill use ^C.
to view page:  http://localhost:%i/'''
)


def run(port=8000,
    server_class=BaseHTTPServer.HTTPServer,
    handler_class=SimpleHTTPServer.SimpleHTTPRequestHandler
    ):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == "__main__":
    args = sys.argv[1:]
    port = 8000
    if args:
        port=int(args.pop(0))

    sys.stdout.write(usage_help % port + "\n")
    run(port=port)

