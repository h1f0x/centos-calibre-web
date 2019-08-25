#!/usr/bin/env bash

if [ "$(ls -A /config/calibre/auto_add)" ]; then
     calibredb add -r "/config/calibre/auto_add" --library-path="/books"
     rm /config/calibre/auto_add/*
fi