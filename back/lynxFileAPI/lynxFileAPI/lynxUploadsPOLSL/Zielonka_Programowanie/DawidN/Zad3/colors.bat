@echo off
SETLOCAL EnableDelayedExpansion


for /F %%a in ('echo prompt $E ^| cmd') do (
  set "ESC=%%a"
)
echo ^<ESC^>[4m %ESC%[4mUnderline DisableDelayedExpansion%ESC%[0m


echo !ESC![35mCzerwony


echo !ESC![101;93m STYLES !ESC![0m
echo ^<ESC^>[4m !ESC![4mUnderline!ESC![0m
echo ^<ESC^>[0m !ESC![0mReset!ESC![0m
echo ^<ESC^>[1m !ESC![1mBold!ESC![0m
echo ^<ESC^>[7m !ESC![7mInverse!ESC![0m
echo.
echo !ESC![101;93m NORMAL FOREGROUND COLORS !ESC![0m
echo ^<ESC^>[30m !ESC![30mBlack!ESC![0m (black)
echo ^<ESC^>[31m !ESC![31mRed!ESC![0m
echo ^<ESC^>[32m !ESC![32mGreen!ESC![0m
echo ^<ESC^>[33m !ESC![33mYellow!ESC![0m
echo ^<ESC^>[34m !ESC![34mBlue!ESC![0m
echo ^<ESC^>[35m !ESC![35mMagenta!ESC![0m
echo ^<ESC^>[36m !ESC![36mCyan!ESC![0m
echo ^<ESC^>[37m !ESC![37mWhite!ESC![0m
echo.
echo !ESC![101;93m NORMAL BACKGROUND COLORS !ESC![0m
echo ^<ESC^>[40m !ESC![40mBlack!ESC![0m
echo ^<ESC^>[41m !ESC![41mRed!ESC![0m
echo ^<ESC^>[42m !ESC![42mGreen!ESC![0m
echo ^<ESC^>[43m !ESC![43mYellow!ESC![0m
echo ^<ESC^>[44m !ESC![44mBlue!ESC![0m
echo ^<ESC^>[45m !ESC![45mMagenta!ESC![0m
echo ^<ESC^>[46m !ESC![46mCyan!ESC![0m
echo ^<ESC^>[47m !ESC![47mWhite!ESC![0m (white)

for /l %%x in (1,1,50) DO (
  echo !ESC![%%xm %%xm lololol
  echo test123 hello!ESC![0m
)

echo !ESC![6m
echo !ESC![36m Mrugajacy Teskt weeee
echo !ESC![31m Mrugajacy Teskt weeee



pause
exit