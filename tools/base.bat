@REM This is a script to publish to build images and publish them to Docker hub automatically
@echo off

echo "Building base image"
cd ../
docker build . -t staijn/angulon:nx-base

echo "Uploading base image"
docker push staijn/angulon:nx-base
echo "Done!"
pause
