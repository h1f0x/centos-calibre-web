#!/bin/bash

if [ "$(ls -A /auto_add)" ]; then
     /opt/calibre/calibredb add -r "/auto_add" --library-path="/books"
     rm /auto_add/*
fi