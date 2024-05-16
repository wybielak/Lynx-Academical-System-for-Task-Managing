@ECHO OFF
SETLOCAL EnableDelayedExpansion


ECHO %date%
ECHO dzien: %date:~0,2%
ECHO miesiac: %date:~3,2%
ECHO rok: %date:~-4,4%

ECHO %time%
ECHO godzina: %time:~0,2%
ECHO minuta: %time:~3,2%
ECHO sekunda: %time:~-5,2%
