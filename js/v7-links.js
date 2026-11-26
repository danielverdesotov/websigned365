/* ============================================================
   SIGNED365 | EVOLUTION V7
   Avisos para enlaces pendientes de configuración

   Función:
   Interceptar los enlaces que todavía no tienen un destino
   configurado y mostrar una notificación temporal al usuario.
   ============================================================ */


(() => {


    /* ========================================================
       01. IDENTIFICACIÓN DE ENLACES PENDIENTES
       Selecciona los enlaces que todavía no tienen un destino
       definitivo dentro del sitio web.
       ======================================================== */

    document.querySelectorAll(
        'a[href="#sinlink"],' +
        'a[href="#demo"],' +
        'a[href="#acceso"],' +
        'a[href="#administracion"]'
    ).forEach(a => {


        /* ====================================================
           02. DETECCIÓN DEL EVENTO CLICK
           Ejecuta el aviso cuando el usuario selecciona
           cualquiera de los enlaces identificados.
           ==================================================== */

        a.addEventListener('click', e => {


            /* 02.1. Cancelar la navegación predeterminada */

            e.preventDefault();


            /* =================================================
               03. IDENTIFICACIÓN DEL CONTENEDOR DE AVISOS
               Busca el elemento HTML con el identificador toast.
               ================================================= */

            const t = document.querySelector('#toast');


            /* =================================================
               04. CONFIGURACIÓN Y VISUALIZACIÓN DEL AVISO
               Verifica que el contenedor exista antes de
               modificar su contenido y visibilidad.
               ================================================= */

            if (t) {


                /* 04.1. Texto del mensaje informativo */

                t.textContent =
                    'Este enlace está pendiente de configuración por el desarrollador DAV2.';


                /* 04.2. Mostrar la notificación */

                t.style.display = 'block';


                /* =============================================
                   05. CIERRE AUTOMÁTICO DE LA NOTIFICACIÓN
                   Oculta el aviso después de 3000 milisegundos
                   (3 segundos).
                   ============================================= */

                setTimeout(() => {

                    t.style.display = 'none';

                }, 3000);


            }


        });


    });


})();


/* ============================================================
   FIN DEL ARCHIVO | AVISOS DE ENLACES PENDIENTES
   SIGNED365 EVOLUTION V7
   ============================================================ */
