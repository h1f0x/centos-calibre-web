#!/usr/bin/env bash

if [ "$(ls -A /auto_add)" ]; then
     calibredb add -r "/auto_add" --library-path="/books"
     rm /auto_add/*
fi