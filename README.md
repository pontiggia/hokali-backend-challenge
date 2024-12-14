# Hokali Backend Project

Este proyecto consiste en un backend desarrollado con Node.js para la gestión de exámenes, preguntas, respuestas y usuarios. Incluye endpoints para la creación de usuarios y exámenes, el inicio y finalización de exámenes, el envío de respuestas y la obtención de resultados.

## Instrucciones de Configuración

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/pontiggia/hokali-backend-challenge.git
   ```

2. **Navega al directorio del proyecto:**

   ```bash
   cd hokali-backend-challenge
   ```

3. **Instala las dependencias:**

   ```bash
   npm install
   ```

4. **Configura la base de datos en un archivo `.env`. Por ejemplo:**

   ```env
   DATABASE_URL="file:./dev.db"
   ```

5. **Ejecuta las migraciones de Prisma para configurar la base de datos SQLite:**

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

7. **Ejecuta las pruebas (opcional):**
   ```bash
   npm test
   ```

## Documentación de la API

### Descripción General de Endpoints

| Método | Endpoint                                            | Descripción                                                  |
| ------ | --------------------------------------------------- | ------------------------------------------------------------ |
| POST   | `api/v1/users`                                      | Crea un nuevo usuario                                        |
| POST   | `api/v1/exams`                                      | Crea un nuevo examen                                         |
| POST   | `api/v1/exams/:id/start`                            | Inicia un examen para un usuario                             |
| POST   | `api/v1/exams/:examId/questions/:questionId/answer` | Envía la respuesta a una pregunta en un examen               |
| POST   | `api/v1/exams/:id/finish`                           | Finaliza un examen                                           |
| GET    | `api/v1/exams/:id/results?userId=1`                 | Obtiene los resultados del examen para un usuario específico |

### Ejemplos de Solicitudes (HTTP)

Documentacion de endpoints completa: [documentación de Postman](https://documenter.getpostman.com/view/32451698/2sAYHxoj2u).

#### Crear un Usuario

**Solicitud:**

```http
POST api/v1/users
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
}
```

**Respuesta:**

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
}
```

#### Crear un Examen

**Solicitud:**

```http
POST api/v1/exams
Content-Type: application/json

{
  "title": "Examen de Historia",
  "questions": [
    {
      "text": "¿Quién descubrió América?",
      "type": "multiple_choice",
      "options": ["Cristóbal Colón", "Américo Vespucio", "Fernando de Magallanes", "Hernán Cortés"]
    },
    {
      "text": "La Revolución Francesa ocurrió en 1789.",
      "type": "true_false"
    }
  ]
}
```

**Respuesta:**

```json
{
  "id": 1,
  "title": "Examen de historia",
  "questions": [
    {
      "id": 1,
      "text": "¿Quién descubrió América?",
      "type": "multiple_choice",
      "options": [
        "Cristóbal Colón",
        "Américo Vespucio",
        "Fernando de Magallanes",
        "Hernán Cortés"
      ]
    },
    {
      "id": 2,
      "text": "La Revolución Francesa ocurrió en 1789.",
      "type": "true_false",
      "options": null
    }
  ]
}
```

## Diagrama de Clases

El diagrama de clases del proyecto:
![Diagrama de Clases](http://www.plantuml.com/plantuml/png/ZP4_JmCn3CNtV0hhHb0hkju0FGc6ZWYO44FKir2a93rYdoX2V7Vofr5zpTBfdf_FxoSxMs8TU7PMxQqcWZV20ByAuDQCFUmy9-crmnvUE1Z_cMfqsjY5STHkO4OtCVNmTAxUFzIVAj7PRgBPi5raVyr8R0u-vZoVP0ovbb57MWuUMMBuPrfW3rE6LkkX4dUdY4gGu0OY1s8v4mPHvak_cdJAHysOLBArfsyCaJna8RSfJeFH1L-ZnT64LMBbYlk04JiEBFWHbL-ystImMjr3TxTUttHoIPNqPR-UkMssmrLV_bQMK-LpRcv4-XRzE3lx3m00)
