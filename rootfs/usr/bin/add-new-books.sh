#!/bin/bash

if [ "$(ls -A /auto_add)" ]; then
     /opt/calibre/calibredb add -r "/auto_add/" --library-path="/config/calibre/db"
     rm -rf /auto_add/*
fi