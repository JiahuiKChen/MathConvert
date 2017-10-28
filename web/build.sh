
cp [model_files] [somewhere in web]



cd web

(cd frontend; npm install; npm run build)

python3 server/manage.py collectstatic
python3 server/manage.py runserver
