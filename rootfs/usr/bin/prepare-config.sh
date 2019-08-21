#!/usr/bin/env bash

mkdir -p /config/calibre-web
mkdir -p /config/calibre-web/logs
mkdir -p /config/calibre
mkdir -p /config/calibre/tmp
mkdir -p /config/cache/calibre/

if [ ! -f /config/calibre-web/app.db ]; then
    cp -r /defaults/calibre-web/* /config/calibre-web/
fi

if [ ! -f /config/calibre/data/metadata.db ]; then
    cp -r /defaults/calibre/* /config/calibre/
fi

ln -sf /config/calibre-web/app.db /opt/calibre-web-0.6.4/app.db
ln -sf /config/calibre-web/gdrive.db /opt/calibre-web-0.6.4/gdrive.db