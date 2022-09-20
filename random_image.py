#!/usr/bin/python

# This little webserver serves random images from the directory it was was started in


import http.server
import socketserver

from urllib.parse import urlparse, parse_qs, unquote

import json
import random
from os import walk

# Set the hostname and port
HOST = "0.0.0.0"
PORT = 19000

class SimpleHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):

        params = {}
        parsed_url = unquote(self.path)
        if "get" in self.path:
            self.send_response(301)

            filenames = next(walk('.'), (None, None, []))[2]
            filenames = [k for k in filenames if '.jpeg' in k or '.jpg' in k]
            item = random.choice(tuple(filenames))

            print(item)
            self.send_header('Location', item)
            self.end_headers()
            self.wfile.write(json.dumps(params).encode())
        else:
            self.send_response(200)  
            self.send_header('Content-type','image/jpeg')
            self.end_headers()
            f = open(parsed_url.replace('/','').replace('..',''), "rb")
            self.wfile.write(f.read())
            f.close()
        def do_POST(self):
            self.send_response(200)
            if self.rfile:
            # print urlparse.parse_qs(self.rfile.read(int(self.headers['Content-Length'])))
                for key,value in dict(urlparse.parse_qs(self.rfile.read(int(self.headers['Content-Length'])))).items():
                    print(key + " = " + value[0])


# Declare object of the class
webServer = http.server.HTTPServer((HOST, PORT), SimpleHandler)

# Print the URL of the webserver
print("Server started http://%s:%s" % (HOST, PORT))

try:
    # Run the web server
    webServer.serve_forever()
except KeyboardInterrupt:
    # Stop the web server
    webServer.server_close()
    print("The server is stopped.")


