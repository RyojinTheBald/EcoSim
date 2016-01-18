@echo off
rm -rf ../release/*
node r.js -o build.js

cp -r index.html style.css lib tilesets maps ../release

pause