@echo off

set "devdir=T:\IT Documents\IT Application Deployment\FrontendTemplate\TEST"
set "qadir=T:\IT Documents\IT Application Deployment\FrontendTemplate\QA"
set "proddir=T:\IT Documents\IT Application Deployment\FrontendTemplate\PROD"

set dir=""

IF [%1]==[/?] (
    echo ------------------
    echo command [-dev] [-qa] [-prod]
    echo example: deploy -dev
    echo ------------------
    echo Directory Settings
    echo ------------------
    echo DEV: %devdir%
    echo QA: %qadir%
    echo PROD: %proddir%
    echo.
    GOTO :end
)

IF /I %1%==-dev (
    echo Deploying to DEV...
    set "dir=%devdir%"
    set "BIND=dev"
)

IF /I %1%==-qa (
    echo Deploying to QA...
    set "dir=%qadir%"
    set "BIND=qa"
)

IF /I %1%==-prod (
    echo Deploying to PROD...
    set "dir=%proddir%"
    set "BIND=prod"
)

set dirWithoutDoubleQuotes=%dir:"=%

IF NOT "%dirWithoutDoubleQuotes%"=="" (
      ::Compile
      echo compiling code
      call npm run build

      ::Deploy .output/public folder to web server
      echo clearing old files in destination
      del /q "%dir%*"
      FOR /D %%p IN ("%dir%*.*") DO rmdir "%%p" /s /q
      echo copying .output\public folder to destination
      xcopy /s .output\public\*.* "%dir%"

      echo job complete
) else (echo incorrect environment parameter, missing - or environment incorrect)

:end
