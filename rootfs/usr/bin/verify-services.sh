#!/usr/bin/env bash

# Restarting Services if dead
systemctl is-active --quiet calibre-web.service || systemctl restart calibre-web.service