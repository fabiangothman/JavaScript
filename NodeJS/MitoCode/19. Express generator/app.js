/*
    1. Instalar Express-generator a nivel global, para cualquier momento que se quiera usar
        npm install express-generator -g

    2. Generar el proyecto con el motor de plantilla que queramos
        express --view=pug nueva_app_pug_generada
        express --view=hbs nueva_app_hbs_generada

    3. Instalar las dependencias que creadas que necesita, entonces dentro de la carpeta ejecutar:
        npm install

    4. Ejecutar (dependiendo del SO y programa)
        $env:DEBUG='nueva_app_pug_generada:*'; npm start    (poweshell)
        $env:DEBUG='nueva_app_hbs_generada:*'; npm start

        set DEBUG=nueva_app_pug_generada:* & npm start      (cmd)
        set DEBUG=nueva_app_hbs_generada:* & npm star

        node app.js                                         (muchas veces no se recomienda ni se deja)
        npm start
        npm run test/dev/prod
        
*/