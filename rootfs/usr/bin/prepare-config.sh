#!/usr/bin/env bash

CALIBRE_CONFIG_DIRECTORY="/config/calibre/"
CALIBRE_TEMP_DIR="/config/calibre/tmp/"
CALIBRE_CACHE_DIRECTORY="/config/calibre/"

mkdir -p /config/calibre-web
mkdir -p /config/calibre-web/logs
mkdir -p /config/calibre
mkdir -p /config/calibre/tmp
mkdir -p /config/calibre/cache

if [ ! -f /config/calibre-web/app.db ]; then
    cp -r /defaults/calibre-web/* /config/calibre-web/
fi

if [ ! -f /books/metadata.db ]; then
    cp -r /defaults/calibre/metadata.db /books/
fi

ln -sf /config/calibre-web/app.db /opt/calibre-web-0.6.4/app.db
ln -sf /config/calibre-web/gdrive.db /opt/calibre-web-0.6.4/gdrive.db