@echo off
echo 🚀 Configurando base de datos Xmotion...
echo.

REM Ejecutar script SQL en MySQL
mysql -u root -p marketplace < backend\database.sql

echo.
echo ✅ Base de datos configurada exitosamente!
echo.
echo 📋 Credenciales creadas:
echo 👑 Admin: admin123@gmail.com / password
echo 👤 Usuario: user@test.com / password
echo.
pause