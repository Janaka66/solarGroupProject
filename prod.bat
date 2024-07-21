@echo off

REM Start MySQL Server
net start MySQL

REM Start Node.js Server
cd \server
start cmd /k "npm run debug"