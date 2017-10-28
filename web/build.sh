
cp [model_files] [somewhere in web]
cp [webpack_bundle] web/server/draw/static/draw/

cd web
python3 server/manage.py collectstatic
python3 server/manage.py runserver
