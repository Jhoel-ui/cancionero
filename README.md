# Cancionero Renovación

Página web del Ministerio de Alabanza Renovación (Alto Ballivián): alabanzas con acordes, repertorios con nombre, fecha, partes y tonos, mensaje de WhatsApp y PDF.

Es una página estática (HTML, CSS y JS, sin instalar nada). Los datos viven en Firebase (Firestore), que los sincroniza al instante y los guarda en el teléfono para leerlos sin señal.

## Archivos
- `index.html`, `css/app.css`, `js/app.js`: la página.
- `js/acordes.js`: lectura de acordes `[G]`, transposición y conversión desde "acordes arriba".
- `js/datos.js`: conexión a los datos (Firebase, vista previa en claude.ai o modo de prueba local).
- `js/sacar.js`: **Sacar acordes**: link de YouTube o audio → acordes con su tiempo, tono y BPM para revisar y pasar a una alabanza. Las correcciones se guardan en `analisis` para entrenar el analizador.
- `servidor-acordes/`: el analizador (madmom), para publicar gratis en Hugging Face; ver su README. Su dirección va en `js/config.js` (`ANALIZADOR_ACORDES`).
- `js/config.js`: configuración de Firebase del ministerio (vacía = modo de prueba).
- `firestore.rules`: quién puede ver, editar y borrar.
- `sw.js`: guarda la página en el teléfono para abrirla sin señal.
- `herramientas/armar-vista-previa.py`: arma el archivo único para la vista previa en claude.ai.

## Puesta en línea (una sola vez)
1. En https://console.firebase.google.com crea un proyecto (por ejemplo `cancionero-renovacion`).
2. Firestore Database: Crear base de datos, modo producción, región `southamerica-east1` o la más cercana.
3. Authentication: Comenzar, activar el proveedor Google.
4. Configuración del proyecto > Tus apps > Web (`</>`): registra la app y copia `apiKey`, `authDomain`, `projectId` y `appId` en `js/config.js`.
5. Firestore > Reglas: pega el contenido de `firestore.rules` y publica.
6. Firestore > Datos: crea la colección `config` con el documento `equipo` y dos campos tipo array:
   - `lideres`: correos (en minúsculas) de quienes pueden borrar alabanzas.
   - `miembros`: correos de quienes pueden agregar y editar.
7. Authentication > Configuración > Dominios autorizados: agrega el dominio donde quede publicada la página (por ejemplo `jhoel-ui.github.io`).
8. Publica la carpeta en GitHub Pages (Settings > Pages > Deploy from branch `main`, carpeta raíz).

Cualquiera con el link puede ver las alabanzas y los repertorios. Para editar, cada miembro toca **Entrar** con su cuenta de Google.
